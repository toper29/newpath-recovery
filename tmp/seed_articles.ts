import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'SUPERADMIN' } });
  const adminId = admin?.id || 'admin-system';

  const articles = [
    {
      title: 'Mengenal Dopamin: Mengapa Judi Terasa Candu',
      content: 'Dopamin adalah zat kimia di otak yang membuat kita merasa senang. Saat berjudi, otak melepaskan dopamin dalam jumlah besar...',
      createdBy: adminId,
    },
    {
      title: '5 Langkah Awal Berhenti Slot Online',
      content: '1. Akui masalahnya. 2. Batasi akses uang. 3. Cari hobi baru. 4. Blokir situs judi. 5. Bicara dengan orang terpercaya.',
      createdBy: adminId,
    },
    {
      title: 'Ilusi RTP: Kebohongan Bandar yang Harus Anda Tahu',
      content: 'RTP (Return to Player) sering disalahartikan. Bandar selalu memiliki keuntungan jangka panjang yang pasti.',
      createdBy: adminId,
    }
  ];

  console.log('Seeding articles...');
  for (const article of articles) {
    await prisma.article.create({
      data: article
    });
  }
  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
