import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const achievements = [
            {
                key: 'first_step',
                title: 'First Step',
                description: 'Langkah pertama menuju pemulihan.',
                mission: 'Lakukan absen harian (Daily Check-in) untuk pertama kali.',
                category: 'CONSISTENCY',
                targetValue: 1,
                iconName: 'Calendar',
                rewardTitle: 'Beginner'
            },
            {
                key: 'recovery_warrior',
                title: 'Recovery Warrior',
                description: 'Anda membuktikan kekuatan tekad.',
                mission: 'Capai streak bersih (tanpa judi) selama 7 hari.',
                category: 'STREAK',
                targetValue: 7,
                iconName: 'ShieldCheck',
                rewardTitle: 'Warrior'
            },
            {
                key: 'logic_ninja',
                title: 'Logic Ninja',
                description: 'Otak Anda semakin tajam dan fokus.',
                mission: 'Selesaikan 10 sesi permainan Quick Math.',
                category: 'COGNITIVE',
                targetValue: 10,
                iconName: 'BrainCircuit',
                rewardTitle: 'Ninja'
            },
            {
                key: 'bookworm',
                title: 'Bookworm',
                description: 'Pengetahuan adalah senjata melawan kecanduan.',
                mission: 'Selesaikan membaca 5 artikel edukasi.',
                category: 'EDUCATION',
                targetValue: 5,
                iconName: 'BookOpen',
                rewardTitle: 'Scholar'
            },
            {
                key: 'life_rebuilder',
                title: 'Life Rebuilder',
                description: 'Anda telah membangun fondasi hidup yang baru.',
                mission: 'Selesaikan seluruh program tantangan 14 hari.',
                category: 'STREAK',
                targetValue: 14,
                iconName: 'Zap',
                rewardTitle: 'Rebuilder'
            }
        ];

        console.log('Seeding achievements via API...');
        console.log('Prisma keys:', Object.keys(prisma).filter(k => !k.startsWith('$')));

        const achievementModel = (prisma as any).achievement;
        if (!achievementModel) {
            throw new Error("Achievement model not found on Prisma client");
        }

        for (const ach of achievements) {
            await achievementModel.upsert({
                where: { key: ach.key },
                update: ach,
                create: ach,
            });
        }

        return NextResponse.json({ success: true, message: "Achievements seeded successfully" });
    } catch (error: any) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
