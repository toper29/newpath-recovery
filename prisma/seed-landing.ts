import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

async function main() {
  const content = await prisma.landingPageContent.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      heroTitle: "Slot tidak membuatmu kaya. Slot membuatmu terus berharap.",
      heroSub: "Jangan biarkan hari ini terbuang lagi. Platform pemulihan kami membantu Anda memutus rantai kecanduan dengan metode psikologi yang terbukti efektif dan sepenuhnya anonim.",
      stats_users: "12,400+",
      stats_rate: "85%",
    },
  });
  console.log('Seed landing page content:', content);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
