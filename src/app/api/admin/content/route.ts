import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: "desc" }
        });
        
        const formatted = articles.map(art => ({
            id: art.id,
            title: art.title,
            category: art.category || "Uncategorized",
            thumbnail: art.thumbnail || "",
            content: art.content,
            author: art.createdBy,
            date: new Date(art.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error: any) {
        console.error("Content API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.title || !body.content) {
            return NextResponse.json({ success: false, error: "Title and content are required" }, { status: 400 });
        }

        const newArticle = await prisma.article.create({
            data: {
                title: body.title,
                content: body.content,
                category: body.category || "Uncategorized",
                thumbnail: body.thumbnail || "",
                createdBy: body.author || "Super Admin"
            }
        });

        return NextResponse.json({ success: true, data: newArticle });
    } catch (error: any) {
        console.error("Content API POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 });
    }
}
