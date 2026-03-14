const { PrismaClient } = require('./generated/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const now = new Date();

    try {
        await prisma.user.upsert({
            where: { email: 'admin@newpath.com' },
            update: { status: 'APPROVED', role: 'SUPERADMIN' },
            create: {
                username: 'AdminSuper',
                email: 'admin@newpath.com',
                password: adminPassword,
                role: 'SUPERADMIN',
                status: 'APPROVED',
            },
        });
        console.log('✅ Admin account created/restored: admin@newpath.com / admin123');
    } catch (e) {
        // Try raw SQL as fallback
        const { v4: uuidv4 } = require('uuid');
        const id = uuidv4();
        await prisma.$executeRaw`
            INSERT OR IGNORE INTO "User" (id, username, email, password, role, status, xp, level, createdAt, updatedAt, failedLoginAttempts)
            VALUES (${id}, 'AdminSuper', 'admin@newpath.com', ${adminPassword}, 'SUPERADMIN', 'APPROVED', 0, 1, ${now.toISOString()}, ${now.toISOString()}, 0)
        `;
        console.log('✅ Admin account created via raw SQL');
    }

    try {
        await prisma.user.upsert({
            where: { email: 'user@newpath.com' },
            update: { status: 'APPROVED' },
            create: {
                username: 'UserDemo',
                email: 'user@newpath.com',
                password: userPassword,
                role: 'USER',
                status: 'APPROVED',
                xp: 1250,
                level: 3,
            },
        });
        console.log('✅ Demo user created: user@newpath.com / user123');
    } catch (e) {
        const { v4: uuidv4 } = require('uuid');
        const id = uuidv4();
        await prisma.$executeRaw`
            INSERT OR IGNORE INTO "User" (id, username, email, password, role, status, xp, level, createdAt, updatedAt, failedLoginAttempts)
            VALUES (${id}, 'UserDemo', 'user@newpath.com', ${userPassword}, 'USER', 'APPROVED', 1250, 3, ${now.toISOString()}, ${now.toISOString()}, 0)
        `;
        console.log('✅ Demo user created via raw SQL');
    }
}

main()
    .catch(e => { console.error('❌ Error:', e); process.exit(1); })
    .finally(() => prisma.$disconnect());
