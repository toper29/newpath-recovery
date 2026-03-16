import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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
        
        if (payload.role !== "SUPERADMIN" && payload.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "ALL";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = (page - 1) * limit;
        
        const whereClause: any = { role: "USER" };
        if (status !== "ALL") {
            whereClause.status = status;
        }

        // Fetch users with pagination and total count
        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
                include: {
                    addictionTests: {
                        orderBy: { createdAt: "desc" },
                        take: 1
                    }
                }
            }),
            prisma.user.count({ where: whereClause })
        ]);

        // Format data for the UI
        const formattedUsers = users.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone || "-",
            status: user.status,
            level: user.level,
            xp: user.xp,
            createdAt: user.createdAt,
            lastActivity: user.lastActivity || "Belum ada aktivitas",
            latestScore: user.addictionTests.length > 0 ? user.addictionTests[0].score : 0,
        }));

        return NextResponse.json({ 
            success: true, 
            data: formattedUsers,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    } catch (error: any) {
        console.error("User Management API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
    }
}
