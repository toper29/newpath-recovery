import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "SUPERADMIN") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "50");
        const action = searchParams.get("action");

        const logs = await (prisma as any).adminLog.findMany({
            where: action ? { action } : {},
            orderBy: { createdAt: "desc" },
            take: limit
        });

        return NextResponse.json({ success: true, logs });
    } catch (error: any) {
        console.error("Fetch Logs Error:", error);
        return NextResponse.json({ success: false, error: "Gagal mengambil log sistem" }, { status: 500 });
    }
}
