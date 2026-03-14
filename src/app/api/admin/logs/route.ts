import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? parseInt(limitParam) : 50;
        const type = searchParams.get('type') || "ALL";

        const whereClause: any = {};
        if (type !== "ALL") {
            whereClause.type = type;
        }

        const logs = await prisma.securityLog.findMany({
            where: whereClause,
            orderBy: { timestamp: "desc" },
            take: limit
        });

        const formatted = logs.map((log: any) => ({
            id: log.id,
            type: log.type,
            ip: log.ipAddress,
            user: "System / Unknown", // Schema doesn't have a user relation currently
            date: new Date(log.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
            status: log.type.includes('BLOCKED') || log.details.includes('Failed') ? 'Blocked' : 'Investigating',
            details: log.details
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error: any) {
        console.error("Security Logs API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch security logs" }, { status: 500 });
    }
}
