import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const thresholds = await prisma.gameThreshold.findMany({
            orderBy: { gameName: 'asc' }
        });
        return NextResponse.json({ success: true, data: thresholds });
    } catch (error: any) {
        console.error("API GET Thresholds Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch thresholds" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { gameName, minScore, xpReward, timeLimit } = body;

        if (!gameName) {
            return NextResponse.json({ success: false, error: "Missing gameName" }, { status: 400 });
        }

        // Validate and sanitize inputs
        const sanitizedMinScore = Math.max(0, parseInt(minScore) || 0);
        const sanitizedXpReward = Math.max(0, parseInt(xpReward) || 0);
        const sanitizedTimeLimit = Math.max(1, parseInt(timeLimit) || 60);

        const updated = await prisma.gameThreshold.upsert({
            where: { gameName },
            update: { 
                minScore: sanitizedMinScore, 
                xpReward: sanitizedXpReward,
                timeLimit: sanitizedTimeLimit
            },
            create: { 
                gameName, 
                minScore: sanitizedMinScore, 
                xpReward: sanitizedXpReward,
                timeLimit: sanitizedTimeLimit
            }
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        console.error("API POST Thresholds Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save threshold" }, { status: 500 });
    }
}
