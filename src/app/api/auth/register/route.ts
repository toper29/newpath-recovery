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

        // Create user with ACTIVE status (simplified flow)
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phone: phone || null,
                role: "USER",
                membership_status: "free",
                xp: 0,
                level: 1
            }
        });

        // Auto-login: Create JWT
        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);

        const token = await new SignJWT({ 
            userId: user.id, 
            email: user.email, 
            role: user.role,
            membership_status: user.membership_status 
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

        return NextResponse.json({
            success: true,
            message: "Registration successful. You are now logged in.",
            data: { username: user.username, email: user.email, role: user.role }
        });

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
