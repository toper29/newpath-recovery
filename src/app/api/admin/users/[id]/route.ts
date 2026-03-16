import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

async function verifyAdminServerSide() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;

    try {
        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) return false;
        
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        
        return payload.role === "SUPERADMIN" || payload.role === "ADMIN";
    } catch (e) {
        return false;
    }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        if (!await verifyAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { id } = await context.params;
        const body = await request.json();
        const { membership_status, admin_override } = body;
        
        const updateData: any = {};

        if (membership_status) {
            if (!['FREE', 'PREMIUM'].includes(membership_status)) {
                return NextResponse.json({ success: false, error: "Invalid membership status" }, { status: 400 });
            }
            updateData.membership_status = membership_status;
            if (membership_status === 'PREMIUM') {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30); // 30 days for manual grant
                updateData.premium_expiry_date = expiryDate;
                updateData.premium_start_date = new Date();
            }
        }

        if (admin_override !== undefined) {
            updateData.admin_override = admin_override;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error: any) {
        console.error("User Status Update Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update user status", detail: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        if (!await verifyAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { id } = await context.params;
        
        await prisma.user.delete({ where: { id } });
        
        return NextResponse.json({ success: true, message: "User permanently deleted" });
    } catch (error: any) {
        console.error("User Deletion Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete user", detail: error.message }, { status: 500 });
    }
}
