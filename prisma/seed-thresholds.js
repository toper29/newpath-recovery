const { PrismaClient } = require('./generated/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Game Thresholds...');
  
  const games = [
    { gameName: 'Emergency Wheel', minScore: 50, xpReward: 10 },
    { gameName: 'Reality Simulator', minScore: 80, xpReward: 25 },
    { gameName: 'Relapse Prevention', minScore: 70, xpReward: 15 }
  ];

  for (const game of games) {
    await prisma.gameThreshold.upsert({
      where: { gameName: game.gameName },
      update: game,
      create: game
    });
    console.log(`Seeded: ${game.gameName}`);
  }

  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
