import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("user123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  // Upsert User
  await prisma.user.upsert({
    where: { email: "user@newpath.com" },
    update: {},
    create: {
      username: "UserDemo",
      email: "user@newpath.com",
      password: hashedPassword,
      role: "USER",
      status: "APPROVED",
      xp: 1250,
      level: 3,
    },
  });

  // Upsert Admin
  await prisma.user.upsert({
    where: { email: "admin@newpath.com" },
    update: {},
    create: {
      username: "AdminSuper",
      email: "admin@newpath.com",
      password: adminPassword,
      role: "SUPERADMIN",
      status: "APPROVED",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
