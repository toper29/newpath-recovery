import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Endpoint to initiate DOKU Payment.
 * For now, this is a mock implementation that returns a fake checkout URL.
 * In production, this would call the DOKU API to get a real session.
 */
export async function POST(request: Request) {
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
        const userId = payload.userId as string;

        // Create a pending donation record if needed (optional)
        await prisma.user.update({
            where: { id: userId },
            data: { donation_status: "PENDING" }
        });

        // Generate a mock DOKU checkout URL
        // In reality, you'd call DOKU here and get a response
        const checkoutUrl = `https://sandbox.doku.com/checkout/mock?invoice=${Date.now()}&user=${userId}`;

        return NextResponse.json({ 
            success: true, 
            data: { 
                checkoutUrl,
                message: "Proceed to payment" 
            } 
        });
    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ success: false, error: "Failed to initiate payment" }, { status: 500 });
    }
}
