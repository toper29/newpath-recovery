import { prisma } from "./db";

type NotificationType = "CHECKIN_REMINDER" | "NEW_USER_ALERT" | "PROGRAM_UPDATE" | "SYSTEM_ALERT" | "REPORT_DIBUAT";

interface CreateNotificationParams {
    userId?: string;
    role: "USER" | "ADMIN" | "SUPERADMIN";
    title: string;
    message: string;
    type: NotificationType;
    link?: string;
}

export async function createNotification(params: CreateNotificationParams) {
    try {
        // Map SUPERADMIN to ADMIN for notification targeting if needed, 
        // or just use role as provided. In current design, SUPERADMIN is ADMIN role.
        const targetRole = params.role === "SUPERADMIN" ? "ADMIN" : params.role;

        return await (prisma as any).notification.create({
            data: {
                userId: params.userId,
                role: targetRole,
                title: params.title,
                message: params.message,
                type: params.type,
                link: params.link
            }
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        return null;
    }
}
