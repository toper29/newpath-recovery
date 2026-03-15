import { prisma } from "./db";
import { headers } from "next/headers";
import { getCurrentUser } from "./auth";

interface AuditLogParams {
    action: string;
    target?: string;
    details?: any;
}

export async function logAdminActivity(params: AuditLogParams) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")) {
            return;
        }

        const headerList = await headers();
        const ip = headerList.get("x-forwarded-for") || "unknown";
        const userAgent = headerList.get("user-agent") || "unknown";
        const path = headerList.get("referer") || "unknown";

        await prisma.adminLog.create({
            data: {
                adminId: currentUser.userId,
                adminName: currentUser.email,
                action: params.action,
                target: params.target,
                details: params.details ? JSON.stringify(params.details) : null,
                ipAddress: ip,
                userAgent: userAgent,
                path: path
            }
        });
    } catch (error) {
        console.error("Audit Log Error:", error);
    }
}
