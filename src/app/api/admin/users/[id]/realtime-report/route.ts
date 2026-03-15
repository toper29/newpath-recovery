import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userId = params.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                dailyCheckIns: { orderBy: { checkedAt: "desc" }, take: 30 },
                addictionTests: { orderBy: { createdAt: "desc" }, take: 10 },
                gamblingReports: { orderBy: { createdAt: "desc" } },
                challengeProgress: { orderBy: { completedAt: "desc" } }
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // Real-time analysis logic
        const totalCheckIns = user.dailyCheckIns.length;
        const gambleFreeDays = user.dailyCheckIns.filter(c => !c.didGamble).length;
        const riskTrend = user.dailyCheckIns.slice(0, 7).map(c => c.riskScore || 0);
        const avgRisk = riskTrend.length > 0 ? riskTrend.reduce((a, b) => a + b, 0) / riskTrend.length : 0;

        // Categorize status based on activity
        let recoveryStatus = "BARU MULAI";
        if (totalCheckIns > 3) recoveryStatus = "DALAM PROSES";
        if (gambleFreeDays > 7) recoveryStatus = "STABIL";
        if (avgRisk < 0.2 && totalCheckIns > 10) recoveryStatus = "SANGAT BAIK";

        const reportData = {
            metadata: {
                generatedAt: new Date().toISOString(),
                user: {
                    name: user.username,
                    email: user.email,
                    level: user.level,
                    streak: user.streak
                }
            },
            analysis: {
                recoveryStatus,
                gambleFreePercentage: totalCheckIns > 0 ? (gambleFreeDays / totalCheckIns) * 100 : 0,
                riskLevel: avgRisk > 0.7 ? "TINGGI" : avgRisk > 0.3 ? "SEDANG" : "RENDAH",
                latestTestScore: user.addictionTests[0]?.score || 0
            },
            activities: {
                checkIns: user.dailyCheckIns.map(c => ({
                    date: c.checkedAt,
                    status: c.didGamble ? "RELAPSE" : "CLEAN",
                    risk: c.riskScore
                })),
                reportedSites: user.gamblingReports.length
            }
        };

        return NextResponse.json({ success: true, report: reportData });

    } catch (error) {
        console.error("Real-time Report Error:", error);
        return NextResponse.json({ success: false, error: "Gagal membuat report" }, { status: 500 });
    }
}
