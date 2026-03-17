import { NextResponse } from "next/server";

/**
 * Simulation endpoint for Pakasir webhook.
 * ONLY FOR DEVELOPMENT/TESTING.
 */
export async function POST(request: Request) {
    if (process.env.NODE_ENV === "production" && !process.env.ENABLE_PAYMENT_SIMULATION) {
        return NextResponse.json({ success: false, error: "Forbidden in production" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { order_id, status, amount } = body;

        // Forward to our own webhook
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const webhookUrl = `${baseUrl}/api/pakasir/webhook`;

        const apiKey = process.env.PAKASIR_API_KEY;
        const projectSlug = process.env.PAKASIR_PROJECT_SLUG || "newpath";

        const res = await fetch("https://app.pakasir.com/api/paymentsimulation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                project: projectSlug,
                order_id,
                amount,
                api_key: apiKey
            })
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Simulation Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
