const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function syncAchievements() {
    try {
        console.log('--- Achievement Synchronization Utility ---');
        
        const users = await prisma.user.findMany();
        const achievements = await prisma.achievement.findMany();
        
        const achievementMap = {};
        achievements.forEach(a => achievementMap[a.key] = a);

        for (const user of users) {
            console.log(`\nProcessing user: ${user.username} (${user.id})`);
            
            // 1. First Step (Consistency)
            // Note: Prisma client property name is usually camelCase version of model name
            const checkinCount = await prisma.dailyCheckIn.count({ where: { userId: user.id } });
            if (checkinCount > 0) {
                await awardAchievement(user.id, achievementMap['first_step'], 1);
            }

            // 2. Resilient Spirit (feltLikeDepositing=true, didGamble=false)
            const resilientCount = await prisma.dailyCheckIn.count({ 
                where: { userId: user.id, feltLikeDepositing: true, didGamble: false } 
            });
            if (resilientCount > 0) {
                await awardAchievement(user.id, achievementMap['resilient_spirit'], resilientCount);
            }

            // 3. Habit Builder (Streak >= 3)
            const maxStreak = Math.max(user.streak, user.longestStreak);
            if (maxStreak >= 3) {
                await awardAchievement(user.id, achievementMap['habit_builder'], maxStreak);
            }

            // 4. Recovery Warrior (Streak >= 7)
            if (maxStreak >= 7) {
                await awardAchievement(user.id, achievementMap['recovery_warrior'], maxStreak);
            }

            // 5. Life Rebuilder (Streak >= 14)
            if (maxStreak >= 14) {
                await awardAchievement(user.id, achievementMap['life_rebuilder'], maxStreak);
            }

            // 6. Education (Bookworm / Knowledge Seeker)
            const readCount = await prisma.articleCompletion.count({ where: { userId: user.id } });
            if (readCount > 0) {
                await awardAchievement(user.id, achievementMap['bookworm'], readCount);
                await awardAchievement(user.id, achievementMap['knowledge_seeker'], readCount);
            }

            // 7. Cognitive (Logic Ninja / Math Maestro)
            const gameCount = await prisma.gameSession.count({ where: { userId: user.id } });
            if (gameCount > 0) {
                await awardAchievement(user.id, achievementMap['logic_ninja'], gameCount);
                await awardAchievement(user.id, achievementMap['math_maestro'], gameCount);
            }
        }

        console.log('\n--- Synchronization Completed ---');

    } catch (e) {
        console.error('Sync failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

async function awardAchievement(userId, achievement, progress) {
    if (!achievement) return;
    
    const isUnlocked = progress >= achievement.targetValue;
    
    console.log(`  - ${achievement.key}: progress ${progress}/${achievement.targetValue} ${isUnlocked ? '[UNLOCKED]' : ''}`);
    
    // Using property access for compatibility
    await prisma.userAchievement.upsert({
        where: {
            userId_achievementId: {
                userId,
                achievementId: achievement.id
            }
        },
        update: {
            progress,
            isUnlocked,
            unlockedAt: isUnlocked ? new Date() : null
        },
        create: {
            userId,
            achievementId: achievement.id,
            progress,
            isUnlocked,
            unlockedAt: isUnlocked ? new Date() : null
        }
    });

    if (isUnlocked && achievement.rewardTitle) {
        await prisma.user.update({
            where: { id: userId },
            data: { title: achievement.rewardTitle }
        });
    }
}

syncAchievements();
