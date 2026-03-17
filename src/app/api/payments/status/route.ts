import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Endpoint to poll transaction status.
 * Used by the client after redirect from Pakasir.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const order_id = searchParams.get("order_id");

        if (!order_id) {
            return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });
        }

        const transaction = await (prisma as any).transaction.findUnique({
            where: { order_id },
            select: { status: true }
        });

        if (!transaction) {
            return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            status: transaction.status // pending, completed, failed
        });
    } catch (error: any) {
        console.error("Status Check Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
