import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const gameName = searchParams.get('gameName');

        if (gameName) {
            const setting = await prisma.gameThreshold.findUnique({
                where: { gameName }
            });
            
            // Return either the DB setting or the Universal Default
            const finalSetting = setting || {
                gameName,
                ...(UNIVERSAL_DEFAULTS[gameName] || { xpReward: 10, timeLimit: 60, minScore: 0 }),
                isDefault: true
            };

            return NextResponse.json({ success: true, data: finalSetting });
        }

        // Fetch all customized settings from DB
        const dbSettings = await prisma.gameThreshold.findMany();
        
        // Construct a complete list of all 10 games
        const allSettings = Object.keys(UNIVERSAL_DEFAULTS).map(name => {
            const dbMatch = dbSettings.find(s => s.gameName === name);
            if (dbMatch) return { ...dbMatch, isDefault: false };
            
            return {
                gameName: name,
                ...UNIVERSAL_DEFAULTS[name],
                isDefault: true
            };
        });

        return NextResponse.json({ success: true, data: allSettings });
    } catch (error: any) {
        console.error("API GET Game Settings Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch game settings" }, { status: 500 });
    }
}
