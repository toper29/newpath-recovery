import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params;

        const updatedTestimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                author: body.author,
                content: body.content,
                role: body.role,
                avatarUrl: body.avatarUrl,
                isFeatured: body.isFeatured
            }
        });

        return NextResponse.json({ success: true, data: updatedTestimonial });
    } catch (error: any) {
        console.error("Testimonials API PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.testimonial.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error: any) {
        console.error("Testimonials API DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
    }
}
