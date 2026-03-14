import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
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
        const userId = payload.userId as string;

        const { username, phone } = await request.json();

        if (!username) {
            return NextResponse.json({ success: false, error: "Username is required" }, { status: 400 });
        }

        // Check if username is already taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                username,
                NOT: { id: userId }
            }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, error: "Username already taken" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username,
                phone: phone || null
            },
            select: {
                username: true,
                email: true,
                phone: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error: any) {
        console.error("Update Profile Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
