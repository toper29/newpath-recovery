import { NextResponse } from "next/server";
import { execSync } from "child_process";

// One-time setup endpoint to run database migration and seeding
// Call this ONCE after deployment: GET /api/setup?secret=YOUR_SETUP_SECRET
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Protection so random users can't trigger this
    if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results: string[] = [];

    try {
        // Step 1: Push schema to database
        results.push("Running prisma db push...");
        try {
            const pushOutput = execSync("npx prisma db push --accept-data-loss", {
                encoding: "utf8",
                timeout: 60000,
                env: { ...process.env }
            });
            results.push("✅ DB push success: " + pushOutput.slice(0, 200));
        } catch (e: any) {
            results.push("⚠️ DB push output: " + (e.stdout || e.message || "").slice(0, 500));
        }

        // Step 2: Seed admin user
        results.push("Seeding admin user...");
        const { PrismaClient } = await import("@prisma/client");
        const bcrypt = await import("bcryptjs");
        const prisma = new PrismaClient();

        try {
            const adminPassword = await bcrypt.default.hash("admin123", 10);
            const userPassword = await bcrypt.default.hash("user123", 10);

            await prisma.user.upsert({
                where: { email: "admin@newpath.com" },
                update: {},
                create: {
                    username: "AdminSuper",
                    email: "admin@newpath.com",
                    password: adminPassword,
                    role: "SUPERADMIN",
                },
            });
            results.push("✅ Admin seeded");

            await prisma.user.upsert({
                where: { email: "user@newpath.com" },
                update: {},
                create: {
                    username: "UserDemo",
                    email: "user@newpath.com",
                    password: userPassword,
                    role: "USER",
                    xp: 1250,
                    level: 3,
                },
            });
            results.push("✅ Demo user seeded");

            await prisma.$disconnect();
        } catch (seedError: any) {
            results.push("❌ Seed error: " + seedError.message);
            await prisma.$disconnect();
        }

        return NextResponse.json({
            success: true,
            message: "Setup completed",
            results,
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            results,
        }, { status: 500 });
    }
}
