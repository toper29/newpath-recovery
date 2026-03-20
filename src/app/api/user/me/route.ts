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
                    membership_status: true, premium_activated_at: true, is_admin_override: true
                } as any
            });
        } catch (e) {
            console.log("Standard findUnique failed, trying queryRaw fallback for User...");
            const rawUsers: any[] = await prisma.$queryRaw`SELECT xp, level, username, email, phone, streak, longestStreak, membership_status, premium_activated_at, is_admin_override FROM User WHERE id = ${userId} LIMIT 1`;
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
        const isPremium = user.membership_status === "premium" || user.is_admin_override === true;

        // Check if session is stale (DB says premium, but JWT might still say free)
        const jwtMembershipStatus = payload.membership_status as string;
        const dbMembershipStatus = user.membership_status as string;
        const isPremiumEffective = user.membership_status === "premium" || user.is_admin_override === true;
        const targetTokenStatus = isPremiumEffective ? "premium" : dbMembershipStatus;
        
        if (targetTokenStatus !== jwtMembershipStatus) {
            console.log(`API /api/user/me: Session stale (${jwtMembershipStatus} vs ${targetTokenStatus}), refreshing token...`);
            try {
                const { SignJWT } = await import("jose");
                const refreshedToken = await new SignJWT({ 
                    userId: user.id, 
                    email: user.email, 
                    role: user.role, 
                    membership_status: targetTokenStatus,
                    is_admin_override: user.is_admin_override
                })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("7d")
                    .sign(secret);

                cookieStore.set("token", refreshedToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/"
                });
                console.log("API /api/user/me: Token refreshed successfully");
            } catch (refreshErr) {
                console.error("API /api/user/me: Failed to refresh stale token", refreshErr);
            }
        }

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
                premium_activated_at: user.premium_activated_at,
                is_admin_override: user.is_admin_override,
                isPremium: isPremium,
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
