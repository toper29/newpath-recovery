/*
  Warnings:

  - You are about to drop the column `published` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ChallengeProgress` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - Added the required column `details` to the `SecurityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `SecurityLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "iconName" TEXT NOT NULL,
    "rewardTitle" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "isUnlocked" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "level" INTEGER,
    "score" INTEGER,
    "playedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyCheckIn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "didGamble" BOOLEAN NOT NULL,
    "feltLikeDepositing" BOOLEAN NOT NULL,
    "openedGamblingSite" BOOLEAN NOT NULL,
    "riskScore" REAL,
    "note" TEXT,
    CONSTRAINT "DailyCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArticleCompletion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArticleCompletion_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ArticleCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameThreshold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameName" TEXT NOT NULL,
    "minScore" INTEGER NOT NULL DEFAULT 0,
    "xpReward" INTEGER NOT NULL DEFAULT 10,
    "timeLimit" INTEGER NOT NULL DEFAULT 60,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LandingPageContent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "heroTitle" TEXT NOT NULL,
    "heroSub" TEXT NOT NULL,
    "stats_users" TEXT NOT NULL,
    "stats_rate" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GamblingReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "siteName" TEXT NOT NULL,
    "siteLink" TEXT NOT NULL,
    "hasRegistered" BOOLEAN NOT NULL DEFAULT false,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GamblingReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "iconName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "content" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "role" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hideExplanations" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "path" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payment_method" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "thumbnail" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Article" ("content", "createdAt", "createdBy", "id", "title") SELECT "content", "createdAt", "createdBy", "id", "title" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE TABLE "new_SecurityLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SecurityLog" ("id", "type") SELECT "id", "type" FROM "SecurityLog";
DROP TABLE "SecurityLog";
ALTER TABLE "new_SecurityLog" RENAME TO "SecurityLog";
CREATE TABLE "new_ChallengeProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dayCompleted" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in-progress',
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChallengeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChallengeProgress" ("dayCompleted", "id", "status", "userId") SELECT "dayCompleted", "id", "status", "userId" FROM "ChallengeProgress";
DROP TABLE "ChallengeProgress";
ALTER TABLE "new_ChallengeProgress" RENAME TO "ChallengeProgress";
CREATE INDEX "ChallengeProgress_userId_idx" ON "ChallengeProgress"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "membership_status" TEXT NOT NULL DEFAULT 'free',
    "premium_type" TEXT DEFAULT 'lifetime',
    "premium_activated_at" DATETIME,
    "donation_status" TEXT DEFAULT 'NONE',
    "is_admin_override" BOOLEAN NOT NULL DEFAULT false,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" DATETIME,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "programStartedAt" DATETIME,
    "lastActivity" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "lastActivity", "level", "password", "phone", "role", "updatedAt", "username", "xp") SELECT "createdAt", "email", "id", "lastActivity", "level", "password", "phone", "role", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_key_key" ON "Achievement"("key");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE INDEX "GameSession_userId_idx" ON "GameSession"("userId");

-- CreateIndex
CREATE INDEX "DailyCheckIn_userId_idx" ON "DailyCheckIn"("userId");

-- CreateIndex
CREATE INDEX "ArticleCompletion_userId_idx" ON "ArticleCompletion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleCompletion_userId_articleId_key" ON "ArticleCompletion"("userId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "GameThreshold_gameName_key" ON "GameThreshold"("gameName");

-- CreateIndex
CREATE INDEX "GamblingReport_userId_idx" ON "GamblingReport"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_role_idx" ON "Notification"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_order_id_key" ON "Transaction"("order_id");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "AddictionTest_userId_idx" ON "AddictionTest"("userId");

-- CreateIndex
CREATE INDEX "FeatureUsage_userId_idx" ON "FeatureUsage"("userId");
