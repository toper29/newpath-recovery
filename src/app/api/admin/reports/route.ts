import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        
        if (payload.role !== "SUPERADMIN" && payload.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query") || "";
        
        // Fetch all reports for the table
        const reports = await prisma.gamblingReport.findMany({
            where: {
                OR: [
                    { siteName: { contains: query } },
                    { siteLink: { contains: query } }
                ]
            },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        // Group by siteName and siteLink for aggregated statistics
        const aggregatedReports = await prisma.gamblingReport.groupBy({
            by: ['siteName', 'siteLink'],
            _count: {
                _all: true
            },
            orderBy: {
                _count: {
                    siteName: 'desc'
                }
            }
        });

        const stats = {
            totalReports: await prisma.gamblingReport.count(),
            uniqueSites: aggregatedReports.length
        };

        return NextResponse.json({ 
            success: true, 
            data: {
                reports,
                aggregated: aggregatedReports.map(item => ({
                    siteName: item.siteName,
                    siteLink: item.siteLink,
                    count: item._count._all
                })),
                stats
            }
        });
    } catch (error: any) {
        console.error("Admin Reports API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch reports" }, { status: 500 });
    }
}
