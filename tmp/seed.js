const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function main() {
    try {
        console.log('Seeding achievements...');
        for (const ach of INITIAL_ACHIEVEMENTS) {
            await prisma.achievement.upsert({
                where: { key: ach.key },
                update: ach,
                create: ach
            });
            console.log(`Seeded: ${ach.key}`);
        }
        console.log('Seed completed successfully.');
    } catch (e) {
        console.error('Seed failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
