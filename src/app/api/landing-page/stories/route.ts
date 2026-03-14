import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const stories = await prisma.article.findMany({
            where: { category: "Recovery Stories" },
            orderBy: { createdAt: "desc" },
            take: 3
        });
        
        return NextResponse.json({ success: true, data: stories });
    } catch (error: any) {
        console.error("Failed to fetch stories", error);
        return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 });
    }
}
