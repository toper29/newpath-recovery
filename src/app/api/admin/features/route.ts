import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json({ success: true, data: features });
    } catch (error: any) {
        console.error("Features API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch features" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.title || !body.description || !body.iconName) {
            return NextResponse.json({ success: false, error: "Title, description, and iconName are required" }, { status: 400 });
        }

        const newFeature = await prisma.feature.create({
            data: {
                title: body.title,
                description: body.description,
                iconName: body.iconName,
                order: body.order || 0
            }
        });

        return NextResponse.json({ success: true, data: newFeature });
    } catch (error: any) {
        console.error("Features API POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to create feature" }, { status: 500 });
    }
}
