import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { logAdminActivity } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const admins = await prisma.user.findMany({
            where: { role: "SUPERADMIN" },
            orderBy: { createdAt: "asc" }
        });

        const formatted = admins.map((admin: any) => ({
            id: admin.id,
            username: admin.username,
            email: admin.email,
            date: new Date(admin.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error: any) {
        console.error("Admins API GET Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({ success: false, error: "Failed to fetch admins", details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validation
        if (!body.username || !body.email || !body.password) {
            return NextResponse.json({ success: false, error: "Tolong isi semua field." }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: body.email }, { username: body.username }]
            }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, error: "Email atau username sudah terdaftar!" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create SUPERADMIN
        const newAdmin = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
                role: "SUPERADMIN"
            }
        });

        // Log the activity
        await logAdminActivity({
            action: "CREATE_ADMIN",
            target: newAdmin.username,
            details: { email: newAdmin.email }
        });

        return NextResponse.json({ success: true, data: {
            id: newAdmin.id,
            username: newAdmin.username,
            email: newAdmin.email,
            date: new Date(newAdmin.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        }});
    } catch (error: any) {
        console.error("Admins API POST Error Details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({ success: false, error: "Failed to create admin", details: error.message }, { status: 500 });
    }
}
