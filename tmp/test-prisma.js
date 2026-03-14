const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing Prisma models...');
        console.log('User model:', !!prisma.user);
        console.log('Achievement model:', !!prisma.achievement);
        console.log('UserAchievement model:', !!prisma.userAchievement);
        
        const userCount = await prisma.user.count();
        console.log('User count:', userCount);
        
        // Check keys of prisma object
        console.log('Prisma keys:', Object.keys(prisma).filter(k => !k.startsWith('_')));
    } catch (e) {
        console.error('Test failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
