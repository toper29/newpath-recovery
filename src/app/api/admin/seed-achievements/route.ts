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
                key: 'login_3',
                title: '3 Days Resilience',
                description: 'Tiga hari berkomitmen pada diri sendiri.',
                mission: 'Lakukan absen harian selama 3 hari (total).',
                category: 'CONSISTENCY',
                targetValue: 3,
                iconName: 'Calendar',
                rewardTitle: 'Steady'
            },
            {
                key: 'login_7',
                title: 'Week 1 Survivor',
                description: 'Satu minggu penuh kesadaran.',
                mission: 'Lakukan absen harian selama 7 hari (total).',
                category: 'CONSISTENCY',
                targetValue: 7,
                iconName: 'Calendar',
                rewardTitle: 'Survivor'
            },
            {
                key: 'login_14',
                title: 'Fortnight Focus',
                description: 'Dua minggu membangun fondasi baru.',
                mission: 'Lakukan absen harian selama 14 hari (total).',
                category: 'CONSISTENCY',
                targetValue: 14,
                iconName: 'Calendar',
                rewardTitle: 'Reliable'
            },
            {
                key: 'login_30',
                title: 'Monthly Milestone',
                description: 'Satu bulan penuh transformasi.',
                mission: 'Lakukan absen harian selama 30 hari (total).',
                category: 'CONSISTENCY',
                targetValue: 30,
                iconName: 'Calendar',
                rewardTitle: 'Determined'
            },
            {
                key: 'recovery_warrior',
                title: 'Recovery Warrior',
                description: 'Anda membuktikan kekuatan tekad.',
                mission: 'Capai streak bersih (tanpa judi) selama 7 hari berturut-turut.',
                category: 'STREAK',
                targetValue: 7,
                iconName: 'ShieldCheck',
                rewardTitle: 'Warrior'
            },
            {
                key: 'streak_30',
                title: 'Immunity Master',
                description: '30 hari tanpa gangguan judi.',
                mission: 'Capai streak bersih (tanpa judi) selama 30 hari berturut-turut.',
                category: 'STREAK',
                targetValue: 30,
                iconName: 'ShieldCheck',
                rewardTitle: 'Immune'
            },
            {
                key: 'logic_ninja',
                title: 'Logic Ninja',
                description: 'Otak Anda semakin tajam dan fokus.',
                mission: 'Selesaikan 10 sesi permainan kognitif.',
                category: 'COGNITIVE',
                targetValue: 10,
                iconName: 'BrainCircuit',
                rewardTitle: 'Ninja'
            },
            {
                key: 'cog_25',
                title: 'Thinker',
                description: 'Kesehatan mental adalah prioritas Anda.',
                mission: 'Selesaikan 25 sesi permainan kognitif.',
                category: 'COGNITIVE',
                targetValue: 25,
                iconName: 'BrainCircuit',
                rewardTitle: 'Thinker'
            },
            {
                key: 'cog_50',
                title: 'Strategist',
                description: 'Anda menguasai kontrol diri melalui logika.',
                mission: 'Selesaikan 50 sesi permainan kognitif.',
                category: 'COGNITIVE',
                targetValue: 50,
                iconName: 'BrainCircuit',
                rewardTitle: 'Strategist'
            },
            {
                key: 'cog_100',
                title: 'Mental Giant',
                description: 'Kapasitas kognitif Anda luar biasa.',
                mission: 'Selesaikan 100 sesi permainan kognitif.',
                category: 'COGNITIVE',
                targetValue: 100,
                iconName: 'BrainCircuit',
                rewardTitle: 'Giant'
            },
            {
                key: 'edu_2',
                title: 'Knowledge Starter',
                description: 'Memulai perjalanan edukasi.',
                mission: 'Selesaikan 2 artikel edukasi.',
                category: 'EDUCATION',
                targetValue: 2,
                iconName: 'BookOpen',
                rewardTitle: 'Learner'
            },
            {
                key: 'bookworm',
                title: 'Bookworm',
                description: 'Pengetahuan adalah senjata melawan kecanduan.',
                mission: 'Selesaikan 5 artikel edukasi.',
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
