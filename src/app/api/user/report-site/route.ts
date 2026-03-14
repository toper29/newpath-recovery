import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        let userId: string | null = null;

        if (token) {
            try {
                const secretStr = process.env.JWT_SECRET;
                if (secretStr) {
                    const secret = new TextEncoder().encode(secretStr);
                    const { payload } = await jwtVerify(token, secret);
                    userId = payload.userId as string;
                }
            } catch (e) {
                console.error("JWT Verification in Report API failed:", e);
                // Continue as anonymous if token is invalid but present? 
                // Or just nullify userId. The user requested "user login" so we should probably link it if possible.
            }
        }

        const body = await request.json();
        const { siteName, siteLink, hasRegistered, remarks } = body;
        
        if (!siteName || !siteLink) {
            return NextResponse.json({ success: false, error: "Nama situs dan link wajib diisi" }, { status: 400 });
        }

        const report = await prisma.gamblingReport.create({
            data: {
                siteName,
                siteLink,
                hasRegistered: hasRegistered === "Ya" || hasRegistered === true,
                remarks: remarks || "",
                userId: userId
            }
        });

        return NextResponse.json({
            success: true,
            message: "Terima kasih. Laporan Anda telah kami terima.",
            data: report
        });

    } catch (error: any) {
        console.error("Report Site Error:", error);
        return NextResponse.json({ success: false, error: "Gagal mengirim laporan: " + (error.message || "") }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secretStr = process.env.JWT_SECRET;
        if (!secretStr) throw new Error("JWT_SECRET is not configured");

        const secret = new TextEncoder().encode(secretStr);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        const reports = await prisma.gamblingReport.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({
            success: true,
            data: reports
        });

    } catch (error: any) {
        console.error("Get User Reports Error:", error);
        return NextResponse.json({ success: false, error: "Gagal mengambil riwayat laporan" }, { status: 500 });
    }
}
