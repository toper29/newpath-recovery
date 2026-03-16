import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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

        // Get user creation date and program start
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { createdAt: true, streak: true, programStartedAt: true }
        });

        if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

        // Calculate days since starting the program
        // Use programStartedAt if it exists, otherwise fallback to createdAt
        const startDate = user.programStartedAt ? new Date(user.programStartedAt) : new Date(user.createdAt);
        startDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // Cap program at 14 days
        const programDay = Math.min(diffDays, 14);

        // Fetch check-in history for the last 14 days
        const checkIns = await (prisma as any).dailyCheckIn.findMany({
            where: { userId },
            orderBy: { checkedAt: "desc" },
            take: 14
        });

        // Calculate completion rate
        const completedCount = checkIns.length;
        const completionRate = Math.round((completedCount / 14) * 100);

        // Calculate Average Risk Score
        const riskScores = checkIns.map((ci: any) => ci.riskScore || 0);
        const avgRisk = riskScores.length > 0 
            ? Math.round((riskScores.reduce((a: number, b: number) => a + b, 0) / riskScores.length) * 100)
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                currentDay: programDay,
                isCompleted: diffDays >= 14,
                completedCount,
                completionRate,
                avgRisk,
                streak: user.streak,
                checkInHistory: checkIns
            }
        });

    } catch (error: any) {
        console.error("Progress API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch progress" }, { status: 500 });
    }
}
