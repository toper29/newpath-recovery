const { PrismaClient } = require('../../prisma/generated/client');

const prisma = new PrismaClient();

async function test() {
  try {
    const data = await prisma.landingPageContent.findMany();
    console.log("Data:", data);
  } catch(e) {
    console.error("Error:", e);
  }
}

test();
