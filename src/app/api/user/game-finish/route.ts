import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { incrementAchievement } from "@/lib/achievements";

export const dynamic = "force-dynamic";

// In-memory rate limit specifically for game farming (3 completions per minute)
const gameRateLimit = new Map<string, { count: number, lastReset: number }>();

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

        // --- Rate Limiting ---
        const now = Date.now();
        const userLimit = gameRateLimit.get(userId);
        if (userLimit && now - userLimit.lastReset < 60000) {
            if (userLimit.count >= 3) {
                return NextResponse.json({ success: false, error: "Too many game completions. Please take a break!" }, { status: 429 });
            }
            userLimit.count++;
        } else {
            gameRateLimit.set(userId, { count: 1, lastReset: now });
        }

        const body = await request.json();
        const { gameName, score, level } = body;

        if (!gameName) return NextResponse.json({ success: false, error: "Missing gameName" }, { status: 400 });

        const thresholdConfig = await prisma.gameThreshold.findUnique({ where: { gameName } });
        const minScore = thresholdConfig?.minScore ?? 0;
        const defaultXpReward = thresholdConfig?.xpReward ?? 5;
        
        let currentScore = score 
            ? parseInt(String(score)) 
            : (level ? parseInt(String(level)) : 0);

        if (isNaN(currentScore) || currentScore < 0) currentScore = 0;

        const maxScoreLimit = gameName === "Addiction Test" ? 100 : 10000;
        if (currentScore > maxScoreLimit) currentScore = maxScoreLimit;

        let xpToAward = currentScore >= minScore ? defaultXpReward : 0;

        const result = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.findUnique({ where: { id: userId }, select: { xp: true, level: true } });
            if (!user) throw new Error("User not found");

            const session = await tx.gameSession.create({
                data: {
                    userId,
                    game: gameName,
                    xpEarned: xpToAward,
                    score: score !== undefined && score !== null ? currentScore : null,
                    level: level ? parseInt(String(level)) : null
                }
            });

            if (gameName === "Addiction Test" && score !== undefined) {
                let category = "Low Risk";
                const s = parseInt(score);
                if (s > 70) category = "High Risk";
                else if (s > 40) category = "Medium Risk";

                await tx.addictionTest.create({
                    data: { userId, score: s, category }
                });
            }

            const newTotalXp = user.xp + xpToAward;
            const newLevel = Math.floor(newTotalXp / 500) + 1;
            
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: { 
                    xp: newTotalXp,
                    level: newLevel,
                    lastActivity: gameName
                }
            });

            if (xpToAward > 0) {
                await incrementAchievement(userId, "logic_ninja");
                await incrementAchievement(userId, "cog_25");
            }

            return { session, updatedUser, leveledUp: newLevel > user.level };
        });

        return NextResponse.json({ 
            success: true, 
            data: { 
                xpEarned: xpToAward, 
                totalXp: result.updatedUser.xp,
                leveledUp: result.leveledUp,
                newLevel: result.updatedUser.level
            } 
        });

    } catch (error: any) {
        console.error("Game Finish API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save progress" }, { status: 500 });
    }
}
