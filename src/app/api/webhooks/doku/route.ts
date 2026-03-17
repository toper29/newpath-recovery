import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

/**
 * Webhook handler for DOKU notifications.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { invoice, user_id, status, signature } = body;

        console.log("DOKU Webhook received:", body);

        // Security Check: Verify signature from DOKU
        // const isValid = verifyDokuSignature(body); 
        // if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 403 });

        if (status === "SUCCESS") {
            await (prisma.user as any).update({
                where: { id: user_id },
                data: {
                    membership_status: "premium",
                    donation_status: "SUCCESS",
                    premium_activated_at: new Date(),
                    premium_type: "lifetime"
                }
            });

            console.log(`User ${user_id} upgraded to PREMIUM via DOKU`);
        }

        return NextResponse.json({ success: true, message: "Webhook processed" });
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
