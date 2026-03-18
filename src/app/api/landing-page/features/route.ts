import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json({ success: true, data: features });
    } catch (error: any) {
        console.error("Public Features API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch features" }, { status: 500 });
    }
}
