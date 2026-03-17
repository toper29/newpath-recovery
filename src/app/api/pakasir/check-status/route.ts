import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Called by the /payments/verify page after Pakasir redirect.
 * Checks the order status directly against Pakasir API and upgrades user if paid.
 */
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET not configured");
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        const body = await request.json();
        const { order_id } = body;

        if (!order_id) {
            return NextResponse.json({ success: false, error: "Missing order_id" }, { status: 400 });
        }

        console.log(`[CHECK-STATUS] Checking status for order: ${order_id}, user: ${userId}`);

        // Step 1: Check if transaction already completed in DB
        const transaction = await (prisma as any).transaction.findUnique({
            where: { order_id }
        });

        if (transaction && transaction.status === "completed") {
            console.log(`[CHECK-STATUS] Transaction already completed for ${order_id}`);
            return NextResponse.json({ success: true, status: "completed", message: "Already premium!" });
        }

        if (!transaction) {
            return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
        }

        // Ensure the transaction belongs to this user
        if (transaction.userId !== userId) {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        // Step 2: Verify payment with Pakasir API
        const projectSlug = process.env.PAKASIR_PROJECT_SLUG || "newpath";
        const apiKey = process.env.PAKASIR_API_KEY;

        console.log(`[CHECK-STATUS] Verifying with Pakasir API for ${order_id}`);

        const verifyUrl = `https://app.pakasir.com/api/transactiondetail?project=${projectSlug}&amount=${transaction.amount}&order_id=${order_id}&api_key=${apiKey}`;
        const verifyRes = await fetch(verifyUrl);
        const verifyJson = await verifyRes.json();

        console.log(`[CHECK-STATUS] Pakasir response:`, JSON.stringify(verifyJson));

        const pakasirStatus = verifyJson?.transaction?.status;

        if (!verifyJson.transaction || (pakasirStatus !== "completed" && pakasirStatus !== "SUCCESS" && pakasirStatus !== "success")) {
            return NextResponse.json({ 
                success: false, 
                status: pakasirStatus || "pending",
                message: "Pembayaran belum dikonfirmasi oleh Pakasir." 
            });
        }

        // Step 3: Payment confirmed — upgrade user!
        await (prisma as any).transaction.update({
            where: { order_id },
            data: { status: "completed", payment_method: verifyJson.transaction.payment_method || "QRIS" }
        });

        await (prisma as any).user.update({
            where: { id: userId },
            data: {
                membership_status: "premium",
                premium_type: "lifetime",
                premium_activated_at: new Date(),
                lastActivity: "Upgraded to Premium"
            }
        });

        console.log(`[CHECK-STATUS] User ${userId} upgraded to PREMIUM via ${order_id}`);

        return NextResponse.json({ success: true, status: "completed", message: "Premium aktif! Selamat bergabung." });

    } catch (error: any) {
        console.error("[CHECK-STATUS] Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
