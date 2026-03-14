import { prisma } from "./db";

export async function checkAchievement(userId: string, key: string, newValue: number) {
    try {
        console.log(`[Achievement] Checking ${key} for user ${userId} with value ${newValue}`);
        
        // Use a more robust way to get models - try lowercase and PascalCase effectively
        const achievementModel = (prisma as any).achievement || (prisma as any).Achievement;
        const userAchievementModel = (prisma as any).userAchievement || (prisma as any).UserAchievement;

        if (!achievementModel || !userAchievementModel) {
            console.error(`[Achievement] Failed to access models. achievementModel: ${!!achievementModel}, userAchievementModel: ${!!userAchievementModel}`);
            return;
        }

        const achievement = await achievementModel.findUnique({
            where: { key }
        });

        if (!achievement) {
            console.warn(`[Achievement] Achievement not found with key: ${key}`);
            return;
        }

        const isUnlocked = newValue >= achievement.targetValue;
        
        const userAch = await userAchievementModel.upsert({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id
                }
            },
            update: {
                progress: newValue,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? (userAchievementModel.unlockedAt || new Date()) : null
            },
            create: {
                userId,
                achievementId: achievement.id,
                progress: newValue,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null
            }
        });

        console.log(`[Achievement] ${key} status for user ${userId}: progress=${newValue}/${achievement.targetValue}, unlocked=${isUnlocked}`);

        // If newly unlocked and has a rewardTitle, update user title
        if (isUnlocked && achievement.rewardTitle) {
            await prisma.user.update({
                where: { id: userId },
                data: { title: achievement.rewardTitle } as any
            });
            console.log(`[Achievement] Awarded title "${achievement.rewardTitle}" to user ${userId}`);
        }

        return userAch;
    } catch (error) {
        console.error(`[Achievement] Error checking achievement ${key}:`, error);
    }
}

/**
 * Increment progress for an achievement
 */
export async function incrementAchievement(userId: string, key: string, increment: number = 1) {
    try {
        console.log(`[Achievement] Incrementing ${key} for user ${userId} by ${increment}`);
        
        const achievementModel = (prisma as any).achievement || (prisma as any).Achievement;
        const userAchievementModel = (prisma as any).userAchievement || (prisma as any).UserAchievement;

        if (!achievementModel || !userAchievementModel) {
            console.error(`[Achievement] Failed to access models for increment. achievementModel: ${!!achievementModel}, userAchievementModel: ${!!userAchievementModel}`);
            return;
        }

        const achievement = await achievementModel.findUnique({
            where: { key }
        });

        if (!achievement) {
            console.warn(`[Achievement] Achievement not found for increment: ${key}`);
            return;
        }

        const userAch = await userAchievementModel.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id
                }
            }
        });

        const currentProgress = userAch?.progress || 0;
        const newProgress = currentProgress + increment;

        // If already unlocked and we don't need to track further, just return
        if (userAch?.isUnlocked && newProgress >= achievement.targetValue) {
            console.log(`[Achievement] ${key} already unlocked for user ${userId}, skipping update.`);
            return userAch;
        }

        return await checkAchievement(userId, key, newProgress);
    } catch (error) {
        console.error(`[Achievement] Error incrementing achievement ${key}:`, error);
    }
}
