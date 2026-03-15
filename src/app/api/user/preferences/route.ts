import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const preferences = await prisma.userPreference.findUnique({
            where: { userId: currentUser.userId }
        });

        return NextResponse.json({ 
            success: true, 
            hideExplanations: preferences?.hideExplanations || [] 
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

        const prefs = await prisma.userPreference.findUnique({
            where: { userId: currentUser.userId }
        });

        let newHideExplanations = prefs?.hideExplanations || [];

        if (hide) {
            if (!newHideExplanations.includes(featureSlug)) {
                newHideExplanations.push(featureSlug);
            }
        } else {
            newHideExplanations = newHideExplanations.filter(s => s !== featureSlug);
        }

        await prisma.userPreference.upsert({
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
