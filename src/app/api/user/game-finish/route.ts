import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { incrementAchievement } from "@/lib/achievements";
import { serverCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // --- Optimized Rate Limiting (In-memory cache with TTL) ---
        const rateLimitKey = `rate_limit_game_${userId}`;
        const currentCount = serverCache.get<number>(rateLimitKey) || 0;
        if (currentCount >= 5) { // Increased to 5/minute for better UX
            return NextResponse.json({ success: false, error: "Too many game completions. Please take a break!" }, { status: 429 });
        }
        serverCache.set(rateLimitKey, currentCount + 1, 60);

        const body = await request.json();
        const { gameName, score, level } = body;
        if (!gameName) return NextResponse.json({ success: false, error: "Missing gameName" }, { status: 400 });

        // Get threshold config (Cached)
        const thresholdCacheKey = `game_threshold_${gameName}`;
        let thresholdConfig = serverCache.get<any>(thresholdCacheKey);
        if (!thresholdConfig) {
            thresholdConfig = await prisma.gameThreshold.findUnique({ where: { gameName } });
            if (thresholdConfig) serverCache.set(thresholdCacheKey, thresholdConfig, 3600);
        }

        const minScore = thresholdConfig?.minScore ?? 0;
        const defaultXpReward = thresholdConfig?.xpReward ?? 5;
        
        let currentScore = score ? parseInt(String(score)) : (level ? parseInt(String(level)) : 0);
        if (isNaN(currentScore) || currentScore < 0) currentScore = 0;

        const maxScoreLimit = gameName === "Addiction Test" ? 100 : 10000;
        if (currentScore > maxScoreLimit) currentScore = maxScoreLimit;

        const xpToAward = currentScore >= minScore ? defaultXpReward : 0;

        const result = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.findUnique({ where: { id: userId }, select: { xp: true, level: true } });
            if (!user) throw new Error("User not found");

            // Batch writes where possible
            const createSession = tx.gameSession.create({
                data: {
                    userId,
                    game: gameName,
                    xpEarned: xpToAward,
                    score: score !== undefined ? currentScore : null,
                    level: level ? parseInt(String(level)) : null
                }
            });

            const operations: Promise<any>[] = [createSession];

            if (gameName === "Addiction Test" && score !== undefined) {
                let category = "Low Risk";
                const s = parseInt(score);
                if (s > 70) category = "High Risk";
                else if (s > 40) category = "Medium Risk";

                operations.push(tx.addictionTest.create({
                    data: { userId, score: s, category }
                }));
            }

            const newTotalXp = user.xp + xpToAward;
            const newLevel = Math.floor(newTotalXp / 500) + 1;
            
            operations.push(tx.user.update({
                where: { id: userId },
                data: { xp: newTotalXp, level: newLevel, lastActivity: gameName }
            }));

            await Promise.all(operations);

            // Achievements (Run in parallel but inside tx for atomicity if needed)
            if (xpToAward > 0) {
                await incrementAchievement(userId, "logic_ninja", 1, tx);
                await incrementAchievement(userId, "cog_25", 1, tx);
            }

            return { leveledUp: newLevel > user.level, newLevel, newTotalXp };
        });

        return NextResponse.json({ 
            success: true, 
            data: { 
                xpEarned: xpToAward, 
                totalXp: result.newTotalXp,
                leveledUp: result.leveledUp,
                newLevel: result.newLevel
            } 
        });

    } catch (error: any) {
        console.error("Game Finish API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save progress" }, { status: 500 });
    }
}
