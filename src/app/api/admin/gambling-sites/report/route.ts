import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logAdminActivity } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const reports = await prisma.gamblingReport.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: { select: { username: true } } }
        });

        // Aggregated Stats
        const totalReports = reports.length;
        const registeredSites = reports.filter(r => r.hasRegistered).length;
        
        // Frequent domains
        const domainCounts: Record<string, number> = {};
        reports.forEach(r => {
            try {
                const domain = new URL(r.siteLink).hostname;
                domainCounts[domain] = (domainCounts[domain] || 0) + 1;
            } catch (e) {}
        });
        const topDomains = Object.entries(domainCounts)
            .sort((a,b) => b[1] - a[1])
            .slice(0, 5);

        // Log the activity
        await logAdminActivity({
            action: "DOWNLOAD_SITE_REPORT",
            details: { totalReports }
        });

        return NextResponse.json({
            success: true,
            data: {
                summary: {
                    totalReports,
                    registeredSites,
                    topDomains
                },
                reports
            }
        });

    } catch (error) {
        console.error("Gambling Site Report Error:", error);
        return NextResponse.json({ success: false, error: "Gagal mengambil data laporan situs" }, { status: 500 });
    }
}
