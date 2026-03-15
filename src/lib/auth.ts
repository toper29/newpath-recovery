import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface SessionPayload {
    userId: string;
    email: string;
    role: "USER" | "ADMIN" | "SUPERADMIN";
    [key: string]: any;
}

/**
 * Gets the secret used to sign the JWT.
 */
const getSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable JWT_SECRET is not set.");
    }
    return new TextEncoder().encode(secret);
};

/**
 * Verifies the JWT token from cookies and returns the decoded payload.
 * Returns null if the token is missing, invalid, or expired.
 */
export async function verifySession(): Promise<SessionPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return null;

        const verified = await jwtVerify(token, getSecretKey());
        return verified.payload as unknown as SessionPayload;
    } catch (error) {
        // Token expired, invalid, or signature mismatch
        return null;
    }
}

/**
 * Retrieves the currently logged-in user from the session payload.
 * Useful for Server Components (e.g., Layouts, Pages).
 */
export async function getCurrentUser() {
    return await verifySession();
}
