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
        const signature = request.headers.get("x-pakasir-signature");
        const webhookSecret = process.env.PAKASIR_WEBHOOK_SECRET;

        // Security: Validate signature if secret is configured
        if (webhookSecret && signature !== webhookSecret) {
            console.error(`[PAKASIR WEBHOOK] Invalid signature attempt`);
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 401 });
        }

        console.log(`[PAKASIR WEBHOOK] Received:`, JSON.stringify(body));
        const { amount, order_id, status, payment_method } = body;

        if (!order_id || !status) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Use transaction to ensure both transaction status and user upgrade happen together
        const result = await prisma.$transaction(async (tx: any) => {
            const transaction = await tx.transaction.findUnique({
                where: { order_id },
                include: { user: true }
            });

            if (!transaction) return { success: false, error: "Transaction not found", status: 404 };
            if (transaction.status === "completed") return { success: true, message: "Already processed" };

            if (status === "completed" || status === "SUCCESS" || status === "success") {
                await tx.transaction.update({
                    where: { order_id },
                    data: {
                        status: "completed",
                        payment_method: payment_method || "QRIS",
                    }
                });

                await tx.user.update({
                    where: { id: transaction.userId },
                    data: {
                        membership_status: "premium",
                        premium_type: "lifetime",
                        premium_activated_at: new Date(),
                        lastActivity: "Upgraded to Premium (Paid)"
                    }
                });

                return { success: true, message: "Premium activated" };
            } else {
                await tx.transaction.update({
                    where: { order_id },
                    data: { status }
                });
                return { success: true, message: `Status updated to ${status}` };
            }
        });

        if (!result.success && result.status) {
            return NextResponse.json({ success: false, error: result.error }, { status: result.status });
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[PAKASIR WEBHOOK] Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
