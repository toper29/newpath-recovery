import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { serverCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // 1. Fetch all static achievements (Cached)
        const cacheKeyMeta = "all_achievements_meta";
        let allAchievements = serverCache.get<any[]>(cacheKeyMeta);
        if (!allAchievements) {
            allAchievements = await prisma.achievement.findMany({ orderBy: { createdAt: 'asc' } });
            serverCache.set(cacheKeyMeta, allAchievements, 3600);
        }

        // 2. Fetch user's actual progress
        const userAchievements = await prisma.userAchievement.findMany({
            where: { userId }
        });

        // 3. Merge data
        const merged = allAchievements.map((ach: any) => {
            const up = userAchievements.find((p: any) => p.achievementId === ach.id);
            const isUnlocked = up ? (up.isUnlocked === true || (up.isUnlocked as any) === 1) : false;
            
            return {
                ...ach,
                progress: up?.progress || 0,
                isUnlocked: isUnlocked,
                unlockedAt: up?.unlockedAt || null
            };
        });

        // Optimization: Only run sync if user has NO achievements records (first time visit)
        if (userAchievements.length === 0) {
             // We can trigger a background sync or just do a simple one here for the first time
             // For now, let's keep it simple and just return the merged list with 0 progress
             // until they perform actions that trigger updates.
        }

        return NextResponse.json({ success: true, data: merged });
    } catch (error: any) {
        console.error("API GET Achievements Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch achievements" }, { status: 500 });
    }
}
