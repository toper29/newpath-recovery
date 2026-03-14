import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keysParam = searchParams.get('keys');
        const keys = keysParam ? keysParam.split(',') : [];

        let settings = [];
        if (keys.length > 0) {
            settings = await (prisma as any).systemSetting.findMany({
                where: {
                    key: { in: keys }
                }
            });
        } else {
            settings = await (prisma as any).systemSetting.findMany();
        }

        // Convert array to object mapping
        const settingsMap: Record<string, string> = {};
        for (const s of settings) {
            settingsMap[s.key] = s.value;
        }

        return NextResponse.json({ success: true, data: settingsMap });
    } catch (error: any) {
        console.error("API GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Body is expected to be an object: { "wheel_safe_prob": "80", "wheel_fail_prob": "20" }
        const promises = Object.entries(body).map(([key, value]) => {
            return (prisma as any).systemSetting.upsert({
                where: { key: key },
                update: { value: String(value) },
                create: { key: key, value: String(value) }
            });
        });

        await Promise.all(promises);

        return NextResponse.json({ success: true, message: "Settings saved successfully" });
    } catch (error: any) {
        console.error("API POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
    }
}
