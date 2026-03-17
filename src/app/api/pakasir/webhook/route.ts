import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Webhook endpoint for Pakasir payment notifications.
 * WAJIB & KRITIS: Validasi data sebelum memproses status premium.
 */
export async function GET() {
    return NextResponse.json({ 
        success: true, 
        message: "Pakasir Webhook is active. Please use POST for notifications." 
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(`[PAKASIR WEBHOOK] Raw Body:`, JSON.stringify(body));
        
        const { amount, order_id, status, payment_method, project } = body;

        console.log(`[PAKASIR WEBHOOK] Received:`, body);

        // 1. Basic validation
        const projectSlug = process.env.PAKASIR_PROJECT_SLUG || "newpath";
        const apiKey = process.env.PAKASIR_API_KEY;

        if (!order_id || !status || project !== projectSlug) {
            return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
        }

        // 2. Server-to-Server Verification (RECOMMENDED by Pakasir Docs Section E)
        // This prevents spoofed webhook calls.
        try {
            const verifyRes = await fetch(
                `https://app.pakasir.com/api/transactiondetail?project=${projectSlug}&amount=${amount}&order_id=${order_id}&api_key=${apiKey}`
            );
            const verifyJson = await verifyRes.json();
            
            if (!verifyJson.transaction || verifyJson.transaction.status !== "completed") {
                console.error(`[PAKASIR WEBHOOK] Verification failed for ${order_id}:`, verifyJson);
                return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
            }
            
            // Ensure the verified amount matches what the webhook reported
            if (parseInt(verifyJson.transaction.amount) !== parseInt(amount)) {
                console.error(`[PAKASIR WEBHOOK] Verified amount mismatch for ${order_id}`);
                return NextResponse.json({ success: false, error: "Amount verification mismatch" }, { status: 400 });
            }
        } catch (vError) {
            console.error(`[PAKASIR WEBHOOK] Error during API verification:`, vError);
            return NextResponse.json({ success: false, error: "Verification service unavailable" }, { status: 503 });
        }

        // 3. Find transaction in database
        const transaction = await (prisma as any).transaction.findUnique({
            where: { order_id },
            include: { user: true }
        });

        if (!transaction) {
            console.error(`[PAKASIR WEBHOOK] Transaction not found in DB: ${order_id}`);
            return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
        }

        // 4. Prevent duplicate processing
        if (transaction.status === "completed") {
            console.log(`[PAKASIR WEBHOOK] Transaction already completed in DB: ${order_id}`);
            return NextResponse.json({ success: true, message: "Already processed" });
        }

        // 5. Validate amount against internal record
        if (parseInt(amount) !== transaction.amount) {
            console.error(`[PAKASIR WEBHOOK] Internal amount mismatch: expected ${transaction.amount}, received ${amount}`);
            return NextResponse.json({ success: false, error: "Internal amount mismatch" }, { status: 400 });
        }

        // 5. Handle completed status
        if (status === "completed") {
            // Update transaction status
            await (prisma as any).transaction.update({
                where: { order_id },
                data: {
                    status: "completed",
                    payment_method: payment_method || "QRIS",
                }
            });

            // Update user to premium
            await (prisma.user as any).update({
                where: { id: transaction.userId },
                data: {
                    membership_status: "premium",
                    premium_type: "lifetime",
                    premium_activated_at: new Date(),
                    lastActivity: "Upgraded to Premium"
                }
            });

            console.log(`[PAKASIR WEBHOOK] User ${transaction.userId} successfully upgraded to PREMIUM via ${order_id}`);
            
            return NextResponse.json({ success: true, message: "Premium activated" });
        } else {
            // Handle failed/other status
            await (prisma as any).transaction.update({
                where: { order_id },
                data: { status: status === "failed" ? "failed" : status }
            });
            
            return NextResponse.json({ success: true, message: `Status updated to ${status}` });
        }

    } catch (error: any) {
        console.error("[PAKASIR WEBHOOK] Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
