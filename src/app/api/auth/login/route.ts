import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = loginSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json({ 
                success: false, 
                error: validation.error.issues[0].message 
            }, { status: 400 });
        }
        
        const { email, password } = validation.data;

        if (!email || !password) {
            return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
        }

        // Security: Check if account is locked out
        if (user.lockedUntil && new Date() < new Date(user.lockedUntil)) {
            const minutesLeft = Math.ceil((new Date(user.lockedUntil).getTime() - new Date().getTime()) / 60000);
            return NextResponse.json({ 
                success: false, 
                error: `Account locked due to too many failed attempts. Try again in ${minutesLeft} minutes.` 
            }, { status: 429 });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Increment failed attempts
            const newAttempts = user.failedLoginAttempts + 1;
            let lockData: any = { failedLoginAttempts: newAttempts };
            
            if (newAttempts >= 5) {
                // Lock account for 15 minutes
                lockData.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
            }

            await prisma.user.update({
                where: { email },
                data: lockData
            });

            return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
        }

        // On successful login, clear the brute force counters
        if (user.failedLoginAttempts > 0 || user.lockedUntil !== null) {
            await prisma.user.update({
                where: { email },
                data: { failedLoginAttempts: 0, lockedUntil: null }
            });
        }

        // Check user status
        if (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN') {
            if (user.status === 'PENDING') {
                return NextResponse.json({ success: false, error: "Akun Anda belum disetujui oleh admin." }, { status: 403 });
            }
            if (user.status === 'SUSPENDED') {
                return NextResponse.json({ success: false, error: "Akun Anda telah ditangguhkan." }, { status: 403 });
            }
        }

        // Create JWT
        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);

        const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
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
            message: "Login successful",
            data: { username: user.username, email: user.email, role: user.role }
        });

    } catch (error: any) {
        console.error("Login Error:", error);
        
        // Provide more detail for debugging during deployment phase
        let errorMessage = "Internal server error";
        if (error.message && error.message.includes("JWT_SECRET")) {
            errorMessage = "Server configuration error: JWT_SECRET missing.";
        } else if (error.code === 'P2002' || error.code?.startsWith('P')) {
            errorMessage = `Database error (${error.code})`;
        } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }

        return NextResponse.json({ 
            success: false, 
            error: errorMessage,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined 
        }, { status: 500 });
    }
}
