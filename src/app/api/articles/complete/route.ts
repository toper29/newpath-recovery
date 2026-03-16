import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { incrementAchievement } from "@/lib/achievements";

export async function POST(request: Request) {
    try {
        const { articleId } = await request.json();
        
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // Check if already completed
        const existing = await (prisma as any).articleCompletion.findUnique({
            where: {
                userId_articleId: { userId, articleId }
            }
        });

        if (existing) {
            return NextResponse.json({ success: false, error: "Article already completed" }, { status: 400 });
        }

        // Create completion and award XP
        await prisma.$transaction([
            (prisma as any).articleCompletion.create({
                data: { userId, articleId }
            }),
            prisma.user.update({
                where: { id: userId },
                data: { 
                    xp: { increment: 20 }
                }
            })
        ]);

        // Trigger Achievement tracking
        await incrementAchievement(userId, "edu_2");
        await incrementAchievement(userId, "bookworm");

        // Check for level up (every 500 XP)
        const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
        if (updatedUser) {
            const newLevel = Math.floor(updatedUser.xp / 500) + 1;
            if (newLevel > updatedUser.level) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { level: newLevel }
                });
            }
        }

        return NextResponse.json({ success: true, xpEarned: 20 });
    } catch (error: any) {
        console.error("API Complete Article Error:", error);
        return NextResponse.json({ success: false, error: "Failed to complete article" }, { status: 500 });
    }
}
