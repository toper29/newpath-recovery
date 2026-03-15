import { prisma } from '../src/lib/prisma';

async function check() {
  const content = await prisma.landingPageContent.findMany();
  console.log('LandingPageContent records:', JSON.stringify(content, null, 2));
  process.exit(0);
}

check();
