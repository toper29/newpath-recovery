const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
    try {
        console.log('--- Achievements ---');
        const achievements = await prisma.achievement.findMany();
        console.log(JSON.stringify(achievements, null, 2));

        console.log('\n--- Users ---');
        const users = await prisma.user.findMany({
            select: { id: true, username: true, streak: true, xp: true, title: true }
        });
        console.log(JSON.stringify(users, null, 2));

        if (users.length > 0) {
            const userId = users[0].id;
            console.log(`\n--- User Achievements for ${users[0].username} ---`);
            // Use property access instead of 'as any' casting for JS
            const userAch = await prisma.userAchievement.findMany({
                where: { userId }
            });
            console.log(JSON.stringify(userAch, null, 2));
            
            console.log(`\n--- Daily Checkins for ${users[0].username} ---`);
            const checkins = await prisma.dailyCheckIn.findMany({
                where: { userId }
            });
            console.log(JSON.stringify(checkins, null, 2));
        }

    } catch (e) {
        console.error('Debug failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

debug();
