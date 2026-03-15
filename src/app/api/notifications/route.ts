import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "20");

        // Fetch notifications for the user or general notifications for their role
        // For Admins, we fetch all notifications with role="ADMIN"
        // For Users, we fetch notifications where userId matches or role="USER" with null userId
        const notifications = await prisma.notification.findMany({
            where: {
                OR: [
                    { userId: currentUser.userId },
                    { 
                        userId: null, 
                        role: currentUser.role 
                    }
                ]
            },
            orderBy: { createdAt: "desc" },
            take: limit
        });

        return NextResponse.json({ success: true, notifications });
    } catch (error: any) {
        console.error("Fetch Notifications Error:", error);
        return NextResponse.json({ success: false, error: "Gagal mengambil notifikasi" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { ids } = await request.json();

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ success: false, error: "Invalid notification IDs" }, { status: 400 });
        }

        await prisma.notification.updateMany({
            where: {
                id: { in: ids },
                OR: [
                    { userId: currentUser.userId },
                    { userId: null, role: currentUser.role }
                ]
            },
            data: { isRead: true }
        });

        return NextResponse.json({ success: true, message: "Notifikasi diperbarui" });
    } catch (error: any) {
        console.error("Update Notifications Error:", error);
        return NextResponse.json({ success: false, error: "Gagal memperbarui notifikasi" }, { status: 500 });
    }
}
