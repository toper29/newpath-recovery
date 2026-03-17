import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Endpoint to initiate Pakasir Payment.
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

        // 1. Get Premium Price from SystemSetting (dynamic)
        const priceSetting = await prisma.systemSetting.findUnique({
            where: { key: "PREMIUM_PRICE" }
        });
        const amount = priceSetting ? parseInt(priceSetting.value) : 50000;

        // 2. Generate unique order_id
        const timestamp = Date.now();
        const shortUserId = userId.substring(0, 8);
        const order_id = `NP-${shortUserId}-${timestamp}`;

        // 3. Create pending transaction record
        await (prisma as any).transaction.create({
            data: {
                userId,
                order_id,
                amount,
                status: "pending"
            }
        });

        // 4. Construct Pakasir URL
        const projectSlug = process.env.PAKASIR_PROJECT_SLUG || "newpath";
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
        const callbackUrl = `${baseUrl}/payments/verify?order_id=${order_id}`;
        
        const checkoutUrl = `https://app.pakasir.com/pay/${projectSlug}/${amount}?order_id=${order_id}&redirect=${encodeURIComponent(callbackUrl)}&qris_only=1`;

        return NextResponse.json({ 
            success: true, 
            data: { 
                checkoutUrl,
                order_id,
                amount,
                message: "Proceed to premium upgrade" 
            } 
        });
    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ success: false, error: "Failed to initiate payment" }, { status: 500 });
    }
}
