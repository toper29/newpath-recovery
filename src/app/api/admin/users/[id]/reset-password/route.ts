import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        
        const newPassword = "rehab" + Math.floor(1000 + Math.random() * 9000);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ 
            success: true, 
            message: "Password reset successful",
            data: { newPassword }
        });
    } catch (error: any) {
        console.error("User Password Reset Error:", error);
        return NextResponse.json({ success: false, error: "Failed to reset password" }, { status: 500 });
    }
}
