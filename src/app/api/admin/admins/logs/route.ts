import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const logs = await prisma.AdminLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 50
        });

        const formatted = logs.map((log: any) => ({
            ...log,
            date: new Date(log.createdAt).toLocaleString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error: any) {
        console.error("Admins Logs API GET Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({ success: false, error: "Failed to fetch admin logs", details: error.message }, { status: 500 });
    }
}
