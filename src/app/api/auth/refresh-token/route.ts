import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

/**
 * Endpoint to refresh the user's JWT token with the latest data from the database.
 * This is useful after a payment or profile update to ensure the session is not stale.
 */
export async function POST() {
    try {
        const session = await verifySession();
        if (!session || !session.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // Fetch fresh user data from DB
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                email: true,
                role: true,
                membership_status: true,
                is_admin_override: true
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // Create new JWT
        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);

        // Calculate true premium status for session
        const isPremium = user.membership_status === "premium" || (user as any).is_admin_override === true;
        const effectiveMembershipStatus = isPremium ? "premium" : user.membership_status;

        const token = await new SignJWT({ 
            userId: user.id, 
            email: user.email, 
            role: user.role,
            membership_status: effectiveMembershipStatus,
            is_admin_override: (user as any).is_admin_override
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
            message: "Session refreshed",
            data: { 
                role: user.role,
                membership_status: user.membership_status 
            }
        });

    } catch (error: any) {
        console.error("Refresh Token Error:", error);
        return NextResponse.json({ success: false, error: "Failed to refresh session" }, { status: 500 });
    }
}
