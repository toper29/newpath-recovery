import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { detectRelapseRisk } from "@/lib/relapse-detection";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        const riskData = await detectRelapseRisk(userId);

        return NextResponse.json({ 
            success: true, 
            data: riskData 
        });

    } catch (error: any) {
        console.error("Relapse Risk API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch relapse risk" }, { status: 500 });
    }
}
