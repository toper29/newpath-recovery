import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        const { featureName } = await request.json();
        if (!featureName) return NextResponse.json({ success: false, error: "Missing featureName" }, { status: 400 });

        await prisma.featureUsage.create({
            data: {
                userId,
                featureName
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Feature Usage API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to record feature usage" }, { status: 500 });
    }
}
