"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ApproveUserPage() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent ring-8 ring-accent/10">
                <ShieldCheck size={40} />
            </div>
            <div>
                <h2 className="text-2xl font-black text-foreground mb-2">Persetujuan Mandiri Aktif</h2>
                <p className="text-foreground/50 max-w-md mx-auto">
                    Kini seluruh pengguna baru terdaftar secara otomatis sebagai anggota aktif. 
                    Halaman verifikasi manual telah dipindahkan ke protokol otomatis.
                </p>
            </div>
            <Link 
                href="/admin/users" 
                className="px-6 py-3 bg-primary/20 hover:bg-primary/30 text-accent font-bold rounded-xl border border-primary/30 transition-all"
            >
                Kelola Pengguna
            </Link>
        </div>
    );
}
