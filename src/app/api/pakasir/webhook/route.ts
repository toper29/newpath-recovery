import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    return NextResponse.json({ 
        success: true, 
        message: "Pakasir Webhook is active." 
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(`[PAKASIR WEBHOOK] Received:`, JSON.stringify(body));

        const { amount, order_id, status, payment_method } = body;

        if (!order_id || !status) {
            console.error(`[PAKASIR WEBHOOK] Missing required fields`);
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Find transaction in DB
        const transaction = await (prisma as any).transaction.findUnique({
            where: { order_id },
            include: { user: true }
        });

        if (!transaction) {
            // Transaction not found — might be a race condition.
            // Try to find the user from the order_id format: NP-{userId8}-{timestamp}
            console.error(`[PAKASIR WEBHOOK] Transaction not found for ${order_id}`);
            return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
        }

        // Prevent duplicate processing
        if (transaction.status === "completed") {
            console.log(`[PAKASIR WEBHOOK] Already processed: ${order_id}`);
            return NextResponse.json({ success: true, message: "Already processed" });
        }

        // Handle completed payment
        if (status === "completed" || status === "SUCCESS" || status === "success") {
            // Update transaction record
            await (prisma as any).transaction.update({
                where: { order_id },
                data: {
                    status: "completed",
                    payment_method: payment_method || "QRIS",
                }
            });

            // Upgrade user to premium
            await (prisma as any).user.update({
                where: { id: transaction.userId },
                data: {
                    membership_status: "premium",
                    premium_type: "lifetime",
                    premium_activated_at: new Date(),
                    lastActivity: "Upgraded to Premium"
                }
            });

            console.log(`[PAKASIR WEBHOOK] SUCCESS - User ${transaction.userId} upgraded to PREMIUM. Order: ${order_id}`);
            return NextResponse.json({ success: true, message: "Premium activated" });

        } else {
            // Other status (pending, failed, etc.)
            await (prisma as any).transaction.update({
                where: { order_id },
                data: { status }
            });

            console.log(`[PAKASIR WEBHOOK] Status updated to ${status} for ${order_id}`);
            return NextResponse.json({ success: true, message: `Status updated to ${status}` });
        }

    } catch (error: any) {
        console.error("[PAKASIR WEBHOOK] Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
