import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logAdminActivity } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "SUPERADMIN") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await context.params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                dailyCheckIns: { orderBy: { checkedAt: "asc" }, take: 30 },
                addictionTests: { orderBy: { createdAt: "desc" }, take: 10 },
                gamblingReports: { orderBy: { createdAt: "desc" } }
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // Real-time Calculation
        const checkInCount = user.dailyCheckIns.length;
        const totalRisk = (user.dailyCheckIns as any[]).reduce((sum, ci) => sum + (ci.riskScore || 0), 0);
        const avgRisk = checkInCount > 0 ? (totalRisk / checkInCount) * 100 : 0;
        const cleanDays = user.dailyCheckIns.filter(ci => !ci.didGamble).length;

        // Log the activity
        await logAdminActivity({
            action: "DOWNLOAD_USER_REPORT",
            target: user.username,
            details: { userId: user.id }
        });

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    username: user.username,
                    email: user.email,
                    joinDate: user.createdAt,
                    streak: user.streak,
                    xp: user.xp,
                    level: user.level
                },
                statistics: {
                    checkInCount,
                    cleanDays,
                    avgRisk: Math.round(avgRisk),
                    completionRate: Math.min(Math.round((checkInCount / 14) * 100), 100)
                },
                history: {
                    checkIns: user.dailyCheckIns,
                    tests: user.addictionTests,
                    gamblingReports: user.gamblingReports
                }
            }
        });

    } catch (error: any) {
        console.error("Report Data API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch report data" }, { status: 500 });
    }
}
