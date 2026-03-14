import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const INITIAL_ACHIEVEMENTS = [
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
        key: 'resilient_spirit',
        title: 'Resilient Spirit',
        description: 'Tetap teguh meskipun menghadapi godaan.',
        mission: 'Berhasil melewati check-in harian saat merasa ingin deposit.',
        category: 'CONSISTENCY',
        targetValue: 1,
        iconName: 'Zap',
        rewardTitle: 'Resilient'
    },
    {
        key: 'habit_builder',
        title: 'Habit Builder',
        description: 'Konsistensi adalah kunci perubahan.',
        mission: 'Selesaikan absen harian selama 3 hari berturut-turut.',
        category: 'STREAK',
        targetValue: 3,
        iconName: 'Activity',
        rewardTitle: 'Steady'
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
        key: 'life_rebuilder',
        title: 'Life Rebuilder',
        description: 'Anda telah membangun fondasi hidup yang baru.',
        mission: 'Selesaikan seluruh program tantangan 14 hari.',
        category: 'STREAK',
        targetValue: 14,
        iconName: 'Flag',
        rewardTitle: 'Rebuilder'
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
        key: 'math_maestro',
        title: 'Math Maestro',
        description: 'Ketajaman logika adalah perisai terbaik.',
        mission: 'Selesaikan 30 sesi permainan Quick Math.',
        category: 'COGNITIVE',
        targetValue: 30,
        iconName: 'Trophy',
        rewardTitle: 'Maestro'
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
        key: 'knowledge_seeker',
        title: 'Knowledge Seeker',
        description: 'Mendalami ilmu untuk memperkuat benteng mental.',
        mission: 'Selesaikan membaca 10 artikel edukasi.',
        category: 'EDUCATION',
        targetValue: 10,
        iconName: 'Search',
        rewardTitle: 'Seeker'
    }
];

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");
        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // 1. Fetch all static achievements
        let allAchievements: any[] = [];
        try {
            allAchievements = await (prisma as any).achievement.findMany({ orderBy: { createdAt: 'asc' } });
        } catch (e) {
            allAchievements = await prisma.$queryRaw`SELECT * FROM Achievement ORDER BY createdAt ASC`;
        }

        // 2. Fetch User Stats for Auto-Sync
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { streak: true, longestStreak: true }
        });

        if (user) {
            const checkinCount = await (prisma as any).dailyCheckIn.count({ where: { userId } });
            const resilientCount = await (prisma as any).dailyCheckIn.count({ 
                where: { userId, feltLikeDepositing: true, didGamble: false } 
            });
            const gameCount = await (prisma as any).gameSession.count({ where: { userId } });
            const readCount = await (prisma as any).articleCompletion.count({ where: { userId } });
            const maxStreak = Math.max(user.streak, user.longestStreak);

            // Lazy-sync achievements based on stats
            for (const ach of allAchievements) {
                let progress = 0;
                if (ach.key === 'first_step') progress = checkinCount > 0 ? 1 : 0;
                else if (ach.key === 'resilient_spirit') progress = resilientCount;
                else if (ach.key === 'habit_builder') progress = maxStreak >= 3 ? maxStreak : 0;
                else if (ach.key === 'recovery_warrior') progress = maxStreak >= 7 ? maxStreak : 0;
                else if (ach.key === 'life_rebuilder') progress = maxStreak >= 14 ? maxStreak : 0;
                else if (ach.key === 'logic_ninja') progress = gameCount >= 10 ? 10 : gameCount;
                else if (ach.key === 'math_maestro') progress = gameCount;
                else if (ach.key === 'bookworm') progress = readCount >= 5 ? 5 : readCount;
                else if (ach.key === 'knowledge_seeker') progress = readCount;

                if (progress > 0 || ach.key === 'first_step') {
                    const isUnlocked = progress >= ach.targetValue;
                    try {
                        const uaModel = (prisma as any).userAchievement;
                        await uaModel.upsert({
                            where: { userId_achievementId: { userId, achievementId: ach.id } },
                            update: { progress, isUnlocked, unlockedAt: isUnlocked ? new Date() : null },
                            create: { userId, achievementId: ach.id, progress, isUnlocked, unlockedAt: isUnlocked ? new Date() : null }
                        });
                        
                        // Update title if unlocked and has reward
                        if (isUnlocked && ach.rewardTitle) {
                            await prisma.user.update({
                                where: { id: userId },
                                data: { title: ach.rewardTitle } as any
                            });
                        }
                    } catch (err) {
                        // Fallback to raw SQL for upsert if model fails
                        const existing = await prisma.$queryRaw<any[]>`SELECT id FROM UserAchievement WHERE userId = ${userId} AND achievementId = ${ach.id}`;
                        const isUnlockedNum = isUnlocked ? 1 : 0;
                        const now = new Date().toISOString();
                        
                        if (existing.length > 0) {
                            await prisma.$executeRaw`UPDATE UserAchievement SET progress = ${progress}, isUnlocked = ${isUnlockedNum}, updatedAt = ${now} WHERE userId = ${userId} AND achievementId = ${ach.id}`;
                        } else {
                            await prisma.$executeRaw`INSERT INTO UserAchievement (id, userId, achievementId, progress, isUnlocked, createdAt, updatedAt) VALUES (${crypto.randomUUID()}, ${userId}, ${ach.id}, ${progress}, ${isUnlockedNum}, ${now}, ${now})`;
                        }
                    }
                }
            }
        }

        // 3. Re-fetch user progress for definitive list
        let userProgressList: any[] = [];
        try {
            userProgressList = await (prisma as any).userAchievement.findMany({ where: { userId } });
        } catch (e) {
            userProgressList = await prisma.$queryRaw`SELECT * FROM UserAchievement WHERE userId = ${userId}`;
        }
            
        // Merge progress data
        const merged = allAchievements.map((ach: any) => {
            const up = userProgressList.find((p: any) => p.achievementId === ach.id);
            // Handle cross-driver boolean differences (0/1 vs true/false)
            const isUnlocked = up ? (up.isUnlocked === true || up.isUnlocked === 1 || up.isUnlocked === "1") : false;
            
            return {
                ...ach,
                progress: up?.progress || 0,
                isUnlocked: isUnlocked,
                unlockedAt: up?.unlockedAt || null
            };
        });

        return NextResponse.json({ success: true, data: merged });
    } catch (error: any) {
        console.error("API GET Achievements Error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to fetch achievements" }, { status: 500 });
    }
}
