import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { incrementAchievement, checkAchievement } from "@/lib/achievements";
import { z } from "zod";

const checkInSchema = z.object({
    didGamble: z.boolean(),
    feltLikeDepositing: z.boolean(),
    openedGamblingSite: z.boolean(),
    note: z.string().optional()
});

export const dynamic = "force-dynamic";

// Streak milestone XP rewards (3, 7, 14 day milestones)
const STREAK_MILESTONES: Record<number, number> = {
    3: 30,
    7: 70,
    14: 150,
};

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

        const body = await request.json();
        const validation = checkInSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json({ 
                success: false, 
                error: "Invalid input format: " + validation.error.issues.map(e => e.path.join(".")).join(", ")
            }, { status: 400 });
        }
        
        const { didGamble, feltLikeDepositing, openedGamblingSite } = validation.data;

        // Check if already checked in today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const existingCheckIn = await (prisma as any).dailyCheckIn.findFirst({
            where: {
                userId,
                checkedAt: { gte: today, lt: tomorrow }
            }
        });

        if (existingCheckIn) {
            return NextResponse.json({ 
                success: false, 
                error: "Kamu sudah melakukan check-in hari ini!" 
            }, { status: 409 });
        }

        // Get current user streak
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { streak: true, longestStreak: true, xp: true }
        });

        if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

        // Calculate Risk Score
        let riskScore = 0;
        if (didGamble) {
            riskScore = 1.0;
        } else {
            if (feltLikeDepositing) riskScore += 0.33;
            if (openedGamblingSite) riskScore += 0.33;
        }

        // Save check-in
        await (prisma as any).dailyCheckIn.create({
            data: { 
                userId, 
                didGamble, 
                feltLikeDepositing, 
                openedGamblingSite,
                riskScore
            }
        });

        // Calculate new streak
        let newStreak = user.streak;
        let xpBonus = 0;
        let streakBroken = false;

        if (!didGamble) {
            // Streak continues
            newStreak = user.streak + 1;
            
            // Check for milestone bonus XP
            if (STREAK_MILESTONES[newStreak]) {
                xpBonus = STREAK_MILESTONES[newStreak];
            }
        } else {
            // Streak reset - they gambled today
            newStreak = 0;
            streakBroken = true;
        }

        const newLongestStreak = Math.max(newStreak, user.longestStreak);
        const baseXp = 10; // Base XP for completing the check-in
        const totalXpToAdd = baseXp + xpBonus;

        // Update user streak, XP and set programStartedAt if first check-in
        const updateData: any = {
            streak: newStreak,
            longestStreak: newLongestStreak,
            xp: { increment: totalXpToAdd }
        };

        // If this is the very first check-in, set the program start date to today
        if (!user.streak && !user.longestStreak) {
             const startTs = new Date();
             startTs.setHours(0,0,0,0);
             updateData.programStartedAt = startTs;
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        // Trigger Achievement Checks
        await incrementAchievement(userId, "first_step"); // login 1
        await incrementAchievement(userId, "login_3");
        await incrementAchievement(userId, "login_7");
        await incrementAchievement(userId, "login_14");
        await incrementAchievement(userId, "login_30");

        if (newStreak >= 7) await checkAchievement(userId, "recovery_warrior", newStreak);
        if (newStreak >= 14) await checkAchievement(userId, "life_rebuilder", newStreak);
        if (newStreak >= 30) await checkAchievement(userId, "streak_30", newStreak);

        // Check if milestone achieved
        const milestoneAchieved = STREAK_MILESTONES[newStreak] ? newStreak : null;

        return NextResponse.json({
            success: true,
            data: {
                streak: newStreak,
                longestStreak: newLongestStreak,
                xpEarned: totalXpToAdd,
                streakBroken,
                milestoneAchieved
            }
        });

    } catch (error: any) {
        console.error("Daily Check-In Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save check-in" }, { status: 500 });
    }
}

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

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const existingCheckIn = await (prisma as any).dailyCheckIn.findFirst({
            where: { userId, checkedAt: { gte: today, lt: tomorrow } }
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { streak: true, longestStreak: true }
        });

        return NextResponse.json({
            success: true,
            data: {
                hasCheckedInToday: !!existingCheckIn,
                streak: user?.streak ?? 0,
                longestStreak: user?.longestStreak ?? 0
            }
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Failed to get check-in status" }, { status: 500 });
    }
}
