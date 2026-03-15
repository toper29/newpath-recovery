import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json({ success: true, data: faqs });
    } catch (error: any) {
        console.error("Public FAQ API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch FAQs" }, { status: 500 });
    }
}
