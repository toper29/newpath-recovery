import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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

        const body = await request.json();
        const { day } = body;
        
        if (!day) return NextResponse.json({ success: false, error: "Day required" }, { status: 400 });

        // Get past challenges
        const challenges = await (prisma as any).challengeProgress.findMany({
            where: { userId, status: "completed" },
            orderBy: { dayCompleted: 'asc' }
        });

        const latestChallenge = challenges.length > 0 ? challenges[challenges.length - 1] : null;
        
        if (latestChallenge) {
             const lastCompleted = new Date(latestChallenge.completedAt);
             const today = new Date();
             
             if (lastCompleted.getFullYear() === today.getFullYear() && 
                 lastCompleted.getMonth() === today.getMonth() && 
                 lastCompleted.getDate() === today.getDate()) {
                 return NextResponse.json({ success: false, error: "Tunggu esok hari setelah jam 12 malam untuk task berikutnya." }, { status: 403 });
             }
        }

        const expectedNextDay = challenges.length + 1;
        if (day !== expectedNextDay) {
            return NextResponse.json({ success: false, error: `Invalid day. Expected Day ${expectedNextDay}` }, { status: 400 });
        }

        const xpEarned = 50;

        // Complete the day
        const [progress, updatedUser] = await prisma.$transaction([
            (prisma as any).challengeProgress.create({
                data: {
                    userId,
                    dayCompleted: day,
                    status: "completed",
                    completedAt: new Date()
                }
            }),
            prisma.user.update({
                where: { id: userId },
                data: { 
                    xp: { increment: xpEarned },
                    lastActivity: `Anti-Slot Challenge Hari ${day}`
                }
            })
        ]);

        const newLevel = Math.floor(updatedUser.xp / 500) + 1;
        if (newLevel > updatedUser.level) {
            await prisma.user.update({
                where: { id: userId },
                data: { level: newLevel }
            });
        }

        return NextResponse.json({ 
            success: true, 
             message: `Hari ${day} diselesaikan`,
             data: { level: newLevel, xp: updatedUser.xp }
        });

    } catch (error: any) {
        console.error("Challenge API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save progress" }, { status: 500 });
    }
}
