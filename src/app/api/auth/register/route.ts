import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ success: false, error: "Empty request body" }, { status: 400 });
        }
        const { username, email, password, phone } = body;

        if (!email || !password || !username) {
            return NextResponse.json({ success: false, error: "Username, email, and password are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, error: "Username or email already registered" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with PENDING status
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phone: phone || null,
                role: "USER",
                status: "PENDING", // Require admin approval
                xp: 0,
                level: 1
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registration successful. Please wait for admin approval.",
            data: { username: user.username, email: user.email }
        });

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
