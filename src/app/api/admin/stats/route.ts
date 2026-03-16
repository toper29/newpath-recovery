import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // 1. Basic Counts
        const totalUsers = await prisma.user.count({ where: { role: "USER" } });
        const pendingApproval = 0; // Deprecated: All users are auto-approved
        const newUsersWeekly = await prisma.user.count({
            where: { role: "USER", createdAt: { gte: sevenDaysAgo } }
        });

        const activeUsersTodayGroup = await prisma.featureUsage.groupBy({
            by: ['userId'],
            where: { usedAt: { gte: startOfDay } }
        });

        // 2. Score Distribution (Latest test per user)
        const allUsers = await prisma.user.findMany({
            where: { role: "USER" },
            include: {
                addictionTests: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        let highRisk = 0, medRisk = 0, lowRisk = 0;
        let totalScored = 0;
        let sumScore = 0;

        allUsers.forEach((u: any) => {
            if (u.addictionTests && u.addictionTests.length > 0) {
                const s = u.addictionTests[0].score;
                sumScore += s;
                totalScored++;
                if (s > 70) highRisk++;
                else if (s > 40) medRisk++;
                else lowRisk++;
            }
        });

        // 3. Top Features
        const featureUsageRaw = await prisma.featureUsage.groupBy({
            by: ['featureName'],
            _count: { featureName: true },
            orderBy: { _count: { featureName: 'desc' } },
            take: 5
        });

        const featureStats = featureUsageRaw.map((f: any) => ({
            name: f.featureName,
            count: f._count.featureName
        }));

        // 4. Challenge Funnel (Drops off)
        const day1 = await prisma.challengeProgress.count({ where: { dayCompleted: 1 } });
        const day7 = await prisma.challengeProgress.count({ where: { dayCompleted: 7 } });
        const day14 = await prisma.challengeProgress.count({ where: { dayCompleted: 14 } });
        const day30 = await prisma.challengeProgress.count({ where: { dayCompleted: 30 } });

        return NextResponse.json({
            success: true,
            data: {
                mainStats: {
                    totalUsers,
                    activeUsersToday: activeUsersTodayGroup.length,
                    newUsersWeekly,
                    avgAddictionScore: totalScored > 0 ? Math.round(sumScore / totalScored) : 0,
                    pendingApproval
                },
                distribution: {
                    high: totalScored > 0 ? Math.round((highRisk / totalScored) * 100) : 0,
                    medium: totalScored > 0 ? Math.round((medRisk / totalScored) * 100) : 0,
                    low: totalScored > 0 ? Math.round((lowRisk / totalScored) * 100) : 0
                },
                featureStats: featureStats.length > 0 ? featureStats : [
                    { name: "Emergency Wheel", count: 0 },
                    { name: "Reality Simulator", count: 0 },
                    { name: "Addiction Test", count: 0 }
                ],
                challengeStats: {
                    started: day1,
                    completed: day30
                },
                funnel: { day1, day7, day14, day30 }
            }
        });
    } catch (error: any) {
        console.error("Global Analytics API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
    }
}
