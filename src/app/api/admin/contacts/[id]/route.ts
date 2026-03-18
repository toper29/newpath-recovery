import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { logAdminActivity } from "@/lib/audit";

async function verifySuperAdminServerSide() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;

    try {
        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) return false;
        
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        
        return payload.role === "SUPERADMIN";
    } catch (e) {
        return false;
    }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        if (!await verifySuperAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Forbidden: Super Admin only" }, { status: 403 });
        }

        const { id } = await context.params;
        const body = await request.json();
        const { name, number, description, order } = body;

        const contact = await (prisma as any).emergencyContact.update({
            where: { id },
            data: {
                name,
                number,
                description,
                order: order !== undefined ? order : undefined
            }
        });

        // Audit Log
        await logAdminActivity({
            action: "UPDATE_EMERGENCY_CONTACT",
            target: id,
            details: { name, number }
        });

        return NextResponse.json({ success: true, data: contact });
    } catch (error) {
        console.error("PUT Contact Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        if (!await verifySuperAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Forbidden: Super Admin only" }, { status: 403 });
        }

        const { id } = await context.params;

        const contact = await (prisma as any).emergencyContact.delete({
            where: { id }
        });

        // Audit Log
        await logAdminActivity({
            action: "DELETE_EMERGENCY_CONTACT",
            target: id,
            details: { name: contact.name }
        });

        return NextResponse.json({ success: true, message: "Contact deleted" });
    } catch (error) {
        console.error("DELETE Contact Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
