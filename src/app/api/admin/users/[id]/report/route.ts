import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

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
                dailyCheckIns: {
                    orderBy: { checkedAt: "asc" },
                    take: 30
                },
                addictionTests: {
                    orderBy: { createdAt: "desc" },
                    take: 5
                }
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // Calculate statistics
        const checkInCount = user.dailyCheckIns.length;
        const totalRisk = user.dailyCheckIns.reduce((sum, ci) => sum + (ci.riskScore || 0), 0);
        const avgRisk = checkInCount > 0 ? (totalRisk / checkInCount) * 100 : 0;

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
                    avgRisk: Math.round(avgRisk),
                    completionRate: Math.min(Math.round((checkInCount / 14) * 100), 100)
                },
                history: {
                    checkIns: user.dailyCheckIns,
                    tests: user.addictionTests
                }
            }
        });

    } catch (error: any) {
        console.error("Report Data API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch report data" }, { status: 500 });
    }
}
