import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Deleting all users...');
  
  try {
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        role: 'USER', // Only delete regular users, keep admins
      },
    });
    
    console.log(`Successfully deleted ${deletedUsers.count} users.`);
  } catch (error) {
    console.error('Error deleting users:', error);
  } finally {
    await prisma.$disconnect()
  }
}

main()
