import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { incrementAchievement } from "@/lib/achievements";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        // Since we don't have full auth wired up on the client side perfectly for all games yet,
        // we will extract token from cookies if available to identify the user
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
             return NextResponse.json({ success: false, error: "Unauthorized: No token" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        if (!userId) {
            return NextResponse.json({ success: false, error: "Unauthorized: Invalid token payload" }, { status: 401 });
        }

        const body = await request.json();
        const { gameName, score, level } = body;

        if (!gameName) {
             return NextResponse.json({ success: false, error: "Missing gameName" }, { status: 400 });
        }

        // Fetch threshold config
        const thresholdConfig = await prisma.gameThreshold.findUnique({
            where: { gameName }
        });

        const minScore = thresholdConfig?.minScore ?? 0;
        const defaultXpReward = thresholdConfig?.xpReward ?? 5;
        
        let currentScore = score 
            ? parseInt(String(score)) 
            : (level ? parseInt(String(level)) : 0);

        // Security check: Cap scores and prevent negative or NaN inputs
        if (isNaN(currentScore) || currentScore < 0) {
            currentScore = 0;
        }

        // Hard cap sanity check to prevent integer overflow or absurd rankings 
        // Example: max 100 for Addiction test, 10000 limit as a default safety net for generic games
        const maxScoreLimit = gameName === "Addiction Test" ? 100 : 10000;
        if (currentScore > maxScoreLimit) {
            currentScore = maxScoreLimit;
            console.warn(`[SECURITY] Potential API Abuse: Score capped for user ${userId} on ${gameName}. Original Input: ${score}`);
        }

        // Determine if XP should be awarded
        let xpToAward = 0;
        if (currentScore >= minScore) {
            xpToAward = defaultXpReward;
        }

        // Use Prisma transaction
        const [newGameSession, updatedUser] = await prisma.$transaction(async (tx: any) => {
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
                    data: {
                        userId,
                        score: s,
                        category
                    }
                });
            }

            const user = await tx.user.update({
                where: { id: userId },
                data: { 
                    xp: { increment: xpToAward },
                    lastActivity: gameName
                }
            });

            if (gameName === "Quick Math" && currentScore >= minScore) {
                await incrementAchievement(userId, "logic_ninja");
            }

            return [session, user];
        });

        // Extremely simple level up logic (every 500 XP = 1 level basically)
        const newLevel = Math.floor(updatedUser.xp / 500) + 1;
        
        if (newLevel > updatedUser.level) {
            await prisma.user.update({
                where: { id: userId },
                data: { level: newLevel }
            });
        }

        return NextResponse.json({ 
            success: true, 
            data: { 
                xpEarned: newGameSession.xpEarned, 
                totalXp: updatedUser.xp,
                leveledUp: newLevel > updatedUser.level,
                newLevel: newLevel
            } 
        });

    } catch (error: any) {
        console.error("Game Finish API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save game progress" }, { status: 500 });
    }
}
