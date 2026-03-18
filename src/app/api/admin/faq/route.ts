import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json({ success: true, data: faqs });
    } catch (error: any) {
        console.error("FAQ API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.question || !body.answer) {
            return NextResponse.json({ success: false, error: "Question and answer are required" }, { status: 400 });
        }

        const newFaq = await prisma.fAQ.create({
            data: {
                question: body.question,
                answer: body.answer,
                category: body.category || "General",
                order: body.order || 0
            }
        });

        return NextResponse.json({ success: true, data: newFaq });
    } catch (error: any) {
        console.error("FAQ API POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to create FAQ" }, { status: 500 });
    }
}
