const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const achievements = [
    {
      key: 'first_step',
      title: 'First Step',
      description: 'Langkah pertama menuju pemulihan.',
      mission: 'Lakukan absen harian (Daily Check-in) untuk pertama kali.',
      category: 'CONSISTENCY',
      targetValue: 1,
      iconName: 'Calendar',
      rewardTitle: 'Beginner'
    },
    {
      key: 'recovery_warrior',
      title: 'Recovery Warrior',
      description: 'Anda membuktikan kekuatan tekad.',
      mission: 'Capai streak bersih (tanpa judi) selama 7 hari.',
      category: 'STREAK',
      targetValue: 7,
      iconName: 'ShieldCheck',
      rewardTitle: 'Warrior'
    },
    {
      key: 'logic_ninja',
      title: 'Logic Ninja',
      description: 'Otak Anda semakin tajam dan fokus.',
      mission: 'Selesaikan 10 sesi permainan Quick Math.',
      category: 'COGNITIVE',
      targetValue: 10,
      iconName: 'BrainCircuit',
      rewardTitle: 'Ninja'
    },
    {
      key: 'bookworm',
      title: 'Bookworm',
      description: 'Pengetahuan adalah senjata melawan kecanduan.',
      mission: 'Selesaikan membaca 5 artikel edukasi.',
      category: 'EDUCATION',
      targetValue: 5,
      iconName: 'BookOpen',
      rewardTitle: 'Scholar'
    },
    {
      key: 'life_rebuilder',
      title: 'Life Rebuilder',
      description: 'Anda telah membangun fondasi hidup yang baru.',
      mission: 'Selesaikan seluruh program tantangan 14 hari.',
      category: 'STREAK',
      targetValue: 14,
      iconName: 'Zap',
      rewardTitle: 'Rebuilder'
    }
  ];

  console.log('Seeding achievements...');

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { key: ach.key },
      update: ach,
      create: ach,
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
