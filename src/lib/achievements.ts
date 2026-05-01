import { prisma } from "./db";
import { serverCache } from "./cache";

/**
 * Get achievement metadata with caching
 */
async function getAchievementMetadata(key: string) {
    const cacheKey = `achievement_meta_${key}`;
    const cached = serverCache.get<any>(cacheKey);
    if (cached) return cached;

    const achievement = await prisma.achievement.findUnique({
        where: { key }
    });

    if (achievement) {
        serverCache.set(cacheKey, achievement, 3600); // Cache for 1 hour
    }
    return achievement;
}

/**
 * Check if an achievement is unlocked and update progress
 */
export async function checkAchievement(userId: string, key: string, newValue: number, tx?: any) {
    try {
        const client = tx || prisma;
        const achievement = await getAchievementMetadata(key);

        if (!achievement) {
            console.warn(`[Achievement] Achievement not found with key: ${key}`);
            return;
        }

        const isUnlocked = newValue >= achievement.targetValue;
        
        // Use a single upsert call
        const userAch = await client.userAchievement.upsert({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id
                }
            },
            update: {
                progress: newValue,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? new Date() : undefined // In real logic we might want to preserve first unlock date
            },
            create: {
                userId,
                achievementId: achievement.id,
                progress: newValue,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null
            }
        });

        // If newly unlocked and has a rewardTitle, update user title
        if (isUnlocked && achievement.rewardTitle) {
            await client.user.update({
                where: { id: userId },
                data: { title: achievement.rewardTitle }
            });
        }

        return userAch;
    } catch (error) {
        console.error(`[Achievement] Error checking achievement ${key}:`, error);
    }
}

/**
 * Increment progress for an achievement with optimized DB hits
 */
export async function incrementAchievement(userId: string, key: string, increment: number = 1, tx?: any) {
    try {
        const client = tx || prisma;
        const achievement = await getAchievementMetadata(key);

        if (!achievement) {
            console.warn(`[Achievement] Achievement not found for increment: ${key}`);
            return;
        }

        // Get current progress
        const userAch = await client.userAchievement.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id
                }
            }
        });

        const currentProgress = userAch?.progress || 0;
        const newProgress = currentProgress + increment;

        // Efficiency: If already unlocked and no need to track further, skip
        if (userAch?.isUnlocked && newProgress >= achievement.targetValue) {
            return userAch;
        }

        return await checkAchievement(userId, key, newProgress, client);
    } catch (error) {
        console.error(`[Achievement] Error incrementing achievement ${key}:`, error);
    }
}
