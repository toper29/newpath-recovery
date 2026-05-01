import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { serverCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // Optimization: Use Promise.all to fetch independent data in parallel
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        const [user, challenges, todayCheckIn, articleCount] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { 
                    id: true, xp: true, level: true, username: true, email: true, phone: true, 
                    streak: true, longestStreak: true, role: true,
                    membership_status: true, premium_activated_at: true, is_admin_override: true
                }
            }),
            prisma.challengeProgress.findMany({
                where: { userId, status: "completed" },
                orderBy: { dayCompleted: 'asc' },
                select: { dayCompleted: true, completedAt: true }
            }),
            prisma.dailyCheckIn.findFirst({
                where: { userId, checkedAt: { gte: todayStart, lt: tomorrowStart } },
                select: { id: true }
            }),
            (async () => {
                const cached = serverCache.get<number>("article_count");
                if (cached !== null) return cached;
                const count = await prisma.article.count();
                serverCache.set("article_count", count, 600);
                return count;
            })()
        ]);

        if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

        // Logic for next task
        const latestChallenge = challenges.length > 0 ? challenges[challenges.length - 1] : null;
        let canDoNextTask = true;
        
        if (latestChallenge) {
             const lastCompleted = new Date(latestChallenge.completedAt);
             const today = new Date();
             if (lastCompleted.toDateString() === today.toDateString()) {
                 canDoNextTask = false;
             }
        }

        // Token refresh logic (session stale check)
        // Explicitly cast membership_status to string to satisfy TS
        const dbMembershipStatus = String(user.membership_status || "free");
        const isPremiumEffective = dbMembershipStatus === "premium" || user.is_admin_override === true;
        const targetTokenStatus = isPremiumEffective ? "premium" : dbMembershipStatus;
        
        const currentTokenStatus = String(payload.membership_status || "free");
        
        if (targetTokenStatus !== currentTokenStatus) {
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
            } catch (refreshErr) {
                console.error("Token refresh failed:", refreshErr);
            }
        }

        return NextResponse.json({ 
            success: true, 
            data: { 
                xp: user.xp, 
                level: user.level, 
                username: user.username,
                title: "The Awakening",
                email: user.email,
                phone: user.phone,
                streak: user.streak || 0,
                longestStreak: user.longestStreak || 0,
                membership_status: user.membership_status,
                premium_activated_at: user.premium_activated_at,
                is_admin_override: user.is_admin_override,
                isPremium: isPremiumEffective,
                hasCheckedInToday: !!todayCheckIn,
                cleanDays: challenges.length,
                completedChallengeDays: challenges.map(c => c.dayCompleted),
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
