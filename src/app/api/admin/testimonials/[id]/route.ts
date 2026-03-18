import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const { id } = await params;

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

        revalidatePath("/");
        return NextResponse.json({ success: true, data: updatedTestimonial });
    } catch (error: any) {
        console.error("Testimonials API PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.testimonial.delete({
            where: { id }
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error: any) {
        console.error("Testimonials API DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
    }
}
