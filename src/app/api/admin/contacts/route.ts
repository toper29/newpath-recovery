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

export async function GET() {
    try {
        if (!await verifyAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const contacts = await (prisma as any).emergencyContact.findMany({
            orderBy: { order: "asc" }
        });

        return NextResponse.json({ success: true, data: contacts });
    } catch (error) {
        console.error("GET Contacts Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Only Super Admin can manage contacts
        if (!await verifySuperAdminServerSide()) {
            return NextResponse.json({ success: false, error: "Forbidden: Super Admin only" }, { status: 403 });
        }

        const body = await request.json();
        const { name, number, description, order } = body;

        if (!name || !number) {
            return NextResponse.json({ success: false, error: "Name and number are required" }, { status: 400 });
        }

        const contact = await (prisma as any).emergencyContact.create({
            data: {
                name,
                number,
                description,
                order: order || 0
            }
        });

        // Audit Log
        await logAdminActivity({
            action: "CREATE_EMERGENCY_CONTACT",
            target: contact.id,
            details: { name, number }
        });

        return NextResponse.json({ success: true, data: contact });
    } catch (error) {
        console.error("POST Contact Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
