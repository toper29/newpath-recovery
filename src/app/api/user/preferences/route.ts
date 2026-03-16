import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const preferences = await (prisma as any).userPreference.findUnique({
            where: { userId: currentUser.userId }
        });

        // Convert comma-separated string back to array
        const hideExplanationsArray = preferences?.hideExplanations 
            ? preferences.hideExplanations.split(',').filter(Boolean) 
            : [];

        return NextResponse.json({ 
            success: true, 
            hideExplanations: hideExplanationsArray
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Gagal mengambil preferensi" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { featureSlug, hide } = await request.json();

        if (!featureSlug) {
            return NextResponse.json({ success: false, error: "Feature slug required" }, { status: 400 });
        }

        const prefs = await (prisma as any).userPreference.findUnique({
            where: { userId: currentUser.userId }
        });

        // Convert string to array for easier manipulation
        let currentArray = prefs?.hideExplanations 
            ? prefs.hideExplanations.split(',').filter(Boolean) 
            : [];

        if (hide) {
            if (!currentArray.includes(featureSlug)) {
                currentArray.push(featureSlug);
            }
        } else {
            currentArray = currentArray.filter((s: string) => s !== featureSlug);
        }

        // Convert array back to comma-separated string
        const newHideExplanations = currentArray.join(',');

        await (prisma as any).userPreference.upsert({
            where: { userId: currentUser.userId },
            update: { hideExplanations: newHideExplanations },
            create: { 
                userId: currentUser.userId,
                hideExplanations: newHideExplanations
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update Preference Error:", error);
        return NextResponse.json({ success: false, error: "Gagal memperbarui preferensi" }, { status: 500 });
    }
}
