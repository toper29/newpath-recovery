const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Initializing system settings...");
  
  await prisma.systemSetting.upsert({
    where: { key: "PREMIUM_PRICE" },
    update: {},
    create: {
      key: "PREMIUM_PRICE",
      value: "50000", // Default price
    },
  });

  console.log("System settings initialized!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
