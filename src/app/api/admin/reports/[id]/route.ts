import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        
        if (payload.role !== "SUPERADMIN" && payload.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { id } = await params;

        await prisma.gamblingReport.delete({
            where: { id }
        });

        return NextResponse.json({ 
            success: true, 
            message: "Laporan berhasil dihapus" 
        });
    } catch (error: any) {
        console.error("Admin Delete Report API Error:", error);
        return NextResponse.json({ success: false, error: "Gagal menghapus laporan" }, { status: 500 });
    }
}
