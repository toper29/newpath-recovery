import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        let userId: string | null = null;

        if (token) {
            try {
                const secretStr = process.env.JWT_SECRET;
                if (secretStr) {
                    const secret = new TextEncoder().encode(secretStr);
                    const { payload } = await jwtVerify(token, secret);
                    userId = payload.userId as string;
                }
            } catch (e) {}
        }

        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
            include: userId ? {
                completions: {
                    where: { userId }
                }
            } : undefined
        });

        const data = articles.map((art: any) => ({
            ...art,
            isCompleted: art.completions && art.completions.length > 0
        }));

        return NextResponse.json({
            success: true,
            data: data
        });
    } catch (error: any) {
        console.error("API GET Articles Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 });
    }
}
