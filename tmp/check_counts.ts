import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();
const logFile = 'tmp/db_report.txt';

function log(message: string, data?: any) {
  const line = data ? `${message} ${data}\n` : `${message}\n`;
  fs.appendFileSync(logFile, line);
  console.log(message, data || '');
}

async function main() {
  if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
  
  const userCount = await prisma.user.count();
  const articleCount = await prisma.article.count();
  const challengeProgressCount = await prisma.challengeProgress.count();
  const featureUsageCount = await prisma.featureUsage.count();
  const gameSessionCount = await prisma.gameSession.count();

  log('--- DATABASE COUNTS ---');
  log('Users:', userCount);
  log('Articles:', articleCount);
  log('ChallengeProgress:', challengeProgressCount);
  log('FeatureUsage:', featureUsageCount);
  log('GameSession:', gameSessionCount);
  log('-----------------------');

  const users = await prisma.user.findMany({
    select: { id: true, username: true, xp: true, level: true, role: true }
  });
  log('Users:', JSON.stringify(users, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
