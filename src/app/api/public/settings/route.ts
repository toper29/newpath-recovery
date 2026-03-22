import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Public endpoint to fetch non-sensitive system settings.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keysParam = searchParams.get('keys');
        const keys = keysParam ? keysParam.split(',') : [];

        // ONLY allow fetching specific safe keys publicly
        const ALLOWED_PUBLIC_KEYS = ['PREMIUM_PRICE', 'MAINTENANCE_MODE'];
        const safeKeys = keys.filter(k => ALLOWED_PUBLIC_KEYS.includes(k));

        if (safeKeys.length === 0) {
            return NextResponse.json({ success: true, data: {} });
        }

        const settings = await (prisma as any).systemSetting.findMany({
            where: {
                key: { in: safeKeys }
            }
        });

        const settingsMap: Record<string, string> = {};
        for (const s of settings) {
            settingsMap[s.key] = s.value;
        }

        return NextResponse.json({ 
            success: true, 
            data: settingsMap 
        }, {
            headers: {
                'Cache-Control': 'no-store, max-age=0, must-revalidate',
            }
        });
    } catch (error: any) {
        console.error("Public Settings API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
    }
}
