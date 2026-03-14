import { PrismaClient } from './client-v100';
const prisma = new PrismaClient();

async function main() {
    const games = [
        { name: "Memory Card", threshold: 4, xp: 5 },
        { name: "Calm Breathing", threshold: 60, xp: 3 }, // threshold in seconds
        { name: "Quick Math", threshold: 5, xp: 4 },
        { name: "Number Memory", threshold: 5, xp: 5 },
        { name: "Sequence Memory", threshold: 4, xp: 5 },
        { name: "Word Scramble", threshold: 4, xp: 4 },
        { name: "Speed Counting", threshold: 500, xp: 8 }, // threshold in score
        { name: "Grid Memory", threshold: 4, xp: 5 },
        { name: "Dual Task", threshold: 10, xp: 6 },
        { name: "Reverse Number", threshold: 4, xp: 4 },
    ];

    console.log("Seeding game thresholds...");

    for (const g of games) {
        await prisma.gameThreshold.upsert({
            where: { gameName: g.name },
            update: { minScore: g.threshold, xpReward: g.xp },
            create: { gameName: g.name, minScore: g.threshold, xpReward: g.xp },
        });
    }

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
