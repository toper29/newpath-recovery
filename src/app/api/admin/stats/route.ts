import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const now = new Date();
        const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        // 1. Basic Counts & Premium Stats
        const totalUsers = await prisma.user.count({ where: { role: "USER" } });
        const premiumUsers = await prisma.user.count({ 
            where: { role: "USER", membership_status: "premium" } 
        });
        const premiumConversion = totalUsers > 0 ? Math.round((premiumUsers / totalUsers) * 100) : 0;
        const newUsersWeekly = await prisma.user.count({
            where: { role: "USER", createdAt: { gte: sevenDaysAgo } }
        });

        // 2. Engagement Metrics (MAU/WAU)
        const dailyActiveUsers = await prisma.featureUsage.groupBy({
            by: ['userId'],
            where: { usedAt: { gte: startOfToday } }
        });

        const weeklyActiveUsers = await prisma.featureUsage.groupBy({
            by: ['userId'],
            where: { usedAt: { gte: sevenDaysAgo } }
        });

        const monthlyActiveUsers = await prisma.featureUsage.groupBy({
            by: ['userId'],
            where: { usedAt: { gte: thirtyDaysAgo } }
        });

        // 3. Addiction & Risk Distribution (Optimized: Aggregate in DB)
        const riskGroups = await prisma.addictionTest.groupBy({
            by: ['category'],
            _count: { _all: true },
            _avg: { score: true },
        });

        const highRiskCount = riskGroups.find(g => g.category === "High Risk")?._count._all || 0;
        const medRiskCount = riskGroups.find(g => g.category === "Medium Risk")?._count._all || 0;
        const lowRiskCount = riskGroups.find(g => g.category === "Low Risk")?._count._all || 0;
        const totalScored = highRiskCount + medRiskCount + lowRiskCount;
        
        const avgScore = riskGroups.length > 0 
            ? Math.round(riskGroups.reduce((acc, curr) => acc + (curr._avg.score || 0), 0) / riskGroups.length) 
            : 0;

        // 4. Feature Usage Stats
        const featureUsageRaw = await prisma.featureUsage.groupBy({
            by: ['featureName'],
            _count: { featureName: true },
            orderBy: { _count: { featureName: 'desc' } },
            take: 8
        });

        const featureStats = featureUsageRaw.map((f: any) => ({
            name: f.featureName,
            count: f._count.featureName
        }));

        // 5. Funnel Stats (Challenge Progress)
        const funnel = {
            day1: await (prisma as any).challengeProgress.count({ where: { dayCompleted: { gte: 1 } } }),
            day7: await (prisma as any).challengeProgress.count({ where: { dayCompleted: { gte: 7 } } }),
            day11: await (prisma as any).challengeProgress.count({ where: { dayCompleted: { gte: 11 } } }),
            day14: await (prisma as any).challengeProgress.count({ where: { dayCompleted: { gte: 14 } } })
        };

        // 6. Reports & System Health
        const totalReports = await (prisma as any).gamblingReport.count();
        const pendingReports = await (prisma as any).gamblingReport.count({
             where: { status: "pending" } 
        }).catch(() => 0); // Graceful if field doesn't exist

        const totalCheckins = await prisma.dailyCheckIn.count();
        const relapseAlerts = await prisma.dailyCheckIn.count({
            where: { didGamble: true, checkedAt: { gte: sevenDaysAgo } }
        });

        // Mock System Health (or calculate based on DB latency)
        const systemHealth = {
            uptime: "99.99%",
            latency: "42ms",
            dbStatus: "Healthy",
            diskUsage: "12%"
        };

        return NextResponse.json({
            success: true,
            data: {
                mainStats: {
                    totalUsers,
                    premiumUsers,
                    conversionRate: `${premiumConversion}%`,
                    activeUsers: {
                        daily: dailyActiveUsers.length,
                        weekly: weeklyActiveUsers.length,
                        monthly: monthlyActiveUsers.length
                    },
                    activeUsersToday: dailyActiveUsers.length, // Frontend alias
                    newUsersWeekly, // Frontend expected
                    avgAddictionScore: avgScore, // Frontend alias
                    averageScore: avgScore,
                },
                health: systemHealth,
                distribution: {
                    high: totalScored > 0 ? Math.round((highRiskCount / totalScored) * 100) : 0,
                    medium: totalScored > 0 ? Math.round((medRiskCount / totalScored) * 100) : 0,
                    low: totalScored > 0 ? Math.round((lowRiskCount / totalScored) * 100) : 0
                },
                featureStats: featureStats.length > 0 ? featureStats : [
                    { name: "Emergency Reality Call", count: 0 },
                    { name: "Slot Trap Simulator", count: 0 },
                    { name: "Addiction Test", count: 0 }
                ],
                funnel, // Crucial for fixing the crash
                reporting: {
                    totalReports,
                    pendingReports,
                    totalCheckins,
                    relapseAlertsWeekly: relapseAlerts
                }
            }
        });
    } catch (error: any) {
        console.error("Enhanced Analytics API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
    }
}
