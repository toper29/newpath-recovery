import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params;

        const updatedFeature = await prisma.feature.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                iconName: body.iconName,
                order: body.order
            }
        });

        return NextResponse.json({ success: true, data: updatedFeature });
    } catch (error: any) {
        console.error("Features API PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update feature" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.feature.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: "Feature deleted successfully" });
    } catch (error: any) {
        console.error("Features API DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete feature" }, { status: 500 });
    }
}
