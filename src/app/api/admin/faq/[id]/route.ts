import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const { id } = await params;

        const updatedFaq = await prisma.fAQ.update({
            where: { id },
            data: {
                question: body.question,
                answer: body.answer,
                category: body.category,
                order: body.order
            }
        });

        return NextResponse.json({ success: true, data: updatedFaq });
    } catch (error: any) {
        console.error("FAQ API PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update FAQ" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.fAQ.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
    } catch (error: any) {
        console.error("FAQ API DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete FAQ" }, { status: 500 });
    }
}
