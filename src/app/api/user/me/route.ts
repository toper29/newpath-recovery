import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            console.log("API /api/user/me: No token found");
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;
        console.log("API /api/user/me: Request from user", userId);

        let user: any;
        try {
            user = await prisma.user.findUnique({
                where: { id: userId },
                select: { 
                    xp: true, level: true, username: true, email: true, phone: true, 
                    streak: true, longestStreak: true,
                    membership_status: true, premium_start_date: true, premium_expiry_date: true, admin_override: true
                } as any
            });
        } catch (e) {
            console.log("Standard findUnique failed, trying queryRaw fallback for User...");
            const rawUsers: any[] = await prisma.$queryRaw`SELECT xp, level, username, email, phone, streak, longestStreak, membership_status, premium_start_date, premium_expiry_date, admin_override FROM User WHERE id = ${userId} LIMIT 1`;
            user = rawUsers[0];
        }

        if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

        // Get challenge progress
        const challenges = await (prisma as any).challengeProgress.findMany({
            where: { userId, status: "completed" },
            orderBy: { dayCompleted: 'asc' }
        });

        const latestChallenge = challenges.length > 0 ? challenges[challenges.length - 1] : null;
        let canDoNextTask = true;
        
        if (latestChallenge) {
             const lastCompleted = new Date(latestChallenge.completedAt);
             const today = new Date();
             
             // If completed today, cannot do next task until tomorrow (midnight passed)
             if (lastCompleted.getFullYear() === today.getFullYear() && 
                 lastCompleted.getMonth() === today.getMonth() && 
                 lastCompleted.getDate() === today.getDate()) {
                 canDoNextTask = false;
             }
        }

        // Check daily check-in status
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        const todayCheckIn = await (prisma as any).dailyCheckIn.findFirst({
            where: { userId, checkedAt: { gte: todayStart, lt: tomorrowStart } }
        });

        const articleCount = await prisma.article.count();

        // Calculate if user is premium
        const isPremium = user.membership_status === "PREMIUM" || user.admin_override === true;

        return NextResponse.json({ 
            success: true, 
            data: { 
                xp: user.xp, 
                level: user.level, 
                username: user.username,
                title: (user as any).title || "The Awakening",
                email: user.email,
                phone: user.phone,
                streak: (user as any).streak || 0,
                longestStreak: (user as any).longestStreak || 0,
                membership_status: user.membership_status,
                isPremium: isPremium,
                premium_start_date: user.premium_start_date,
                premium_expiry_date: user.premium_expiry_date,
                admin_override: user.admin_override,
                hasCheckedInToday: !!todayCheckIn,
                cleanDays: challenges.length,
                completedChallengeDays: challenges.map((c: any) => c.dayCompleted),
                canDoNextTask: canDoNextTask,
                educationCount: articleCount,
                journalCount: challenges.length
            } 
        });
    } catch (error: any) {
         console.error("API GET Error:", error);
         return NextResponse.json({ success: false, error: "Failed to fetch user data" }, { status: 500 });
    }
}
