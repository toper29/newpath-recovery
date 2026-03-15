import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const admin = await prisma.user.findUnique({ where: { id } });
        if (!admin) {
            return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
        }

        const updateData: any = {};
        let action = "UPDATE_ADMIN";
        let detail = `Updated admin: ${admin.username}`;

        if (body.username) updateData.username = body.username;
        if (body.email) updateData.email = body.email;
        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 10);
            action = "RESET_PASSWORD";
            detail = `Reset password for admin: ${admin.username}`;
        }

        const updated = await prisma.user.update({
            where: { id },
            data: updateData
        });

        // Log the activity
        await prisma.AdminLog.create({
            data: {
                adminId: currentUser.userId,
                adminName: currentUser.email,
                action: action,
                target: admin.username,
                details: detail
            }
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        console.error("Patch Admin Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({ success: false, error: "Failed to update admin", details: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const admin = await prisma.user.findUnique({ where: { id } });
        if (!admin) {
            return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
        }

        // Prevent self-deletion if needed, but for now allow superadmins to manage all
        
        await prisma.user.delete({ where: { id } });

        // Log the activity
        await prisma.AdminLog.create({
            data: {
                adminId: currentUser.userId,
                adminName: currentUser.email,
                action: "DELETE_ADMIN",
                target: admin.username,
                details: `Deleted admin account: ${admin.username} (${admin.email})`
            }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Delete Admin Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({ success: false, error: "Failed to delete admin", details: error.message }, { status: 500 });
    }
}
