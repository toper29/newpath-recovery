import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isFeatured: true },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error: any) {
        console.error("Public Testimonials API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
    }
}
