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

        // 3. Addiction & Risk Distribution
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

        // 5. Reports & System Health
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
                    avgAddictionScore: totalScored > 0 ? Math.round(sumScore / totalScored) : 0,
                },
                health: systemHealth,
                distribution: {
                    high: totalScored > 0 ? Math.round((highRisk / totalScored) * 100) : 0,
                    medium: totalScored > 0 ? Math.round((medRisk / totalScored) * 100) : 0,
                    low: totalScored > 0 ? Math.round((lowRisk / totalScored) * 100) : 0
                },
                featureStats: featureStats.length > 0 ? featureStats : [
                    { name: "Emergency Reality Call", count: 0 },
                    { name: "Slot Trap Simulator", count: 0 },
                    { name: "Addiction Test", count: 0 }
                ],
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
