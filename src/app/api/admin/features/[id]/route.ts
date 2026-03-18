import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const { id } = await params;

        const updatedFeature = await prisma.feature.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                iconName: body.iconName,
                order: body.order
            }
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, data: updatedFeature });
    } catch (error: any) {
        console.error("Features API PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update feature" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.feature.delete({
            where: { id }
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, message: "Feature deleted successfully" });
    } catch (error: any) {
        console.error("Features API DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete feature" }, { status: 500 });
    }
}
