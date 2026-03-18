import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json({ success: true, data: testimonials });
    } catch (error: any) {
        console.error("Testimonials API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.author || !body.content) {
            return NextResponse.json({ success: false, error: "Author and content are required" }, { status: 400 });
        }

        const newTestimonial = await prisma.testimonial.create({
            data: {
                author: body.author,
                content: body.content,
                role: body.role || "",
                avatarUrl: body.avatarUrl || "",
                isFeatured: body.isFeatured || false
            }
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, data: newTestimonial });
    } catch (error: any) {
        console.error("Testimonials API POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
    }
}
