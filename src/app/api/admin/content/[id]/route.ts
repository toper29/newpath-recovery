import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.article.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true, message: "Article deleted" });
    } catch (error: any) {
        console.error("Article Delete Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete article" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedArticle = await prisma.article.update({
            where: { id: params.id },
            data: {
                title: body.title,
                category: body.category,
                content: body.content,
                thumbnail: body.thumbnail
            }
        });
        return NextResponse.json({ success: true, data: updatedArticle });
    } catch (error: any) {
        console.error("Article Patch Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update article" }, { status: 500 });
    }
}
