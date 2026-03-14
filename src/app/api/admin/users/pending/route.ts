import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const pendingUsers = await prisma.user.findMany({
            where: { role: "USER", status: "PENDING" },
            orderBy: { createdAt: "asc" }
        });

        const formatted = pendingUsers.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            date: new Date(user.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error: any) {
        console.error("Approve Users API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch pending users" }, { status: 500 });
    }
}
