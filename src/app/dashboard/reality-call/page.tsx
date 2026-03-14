"use client";

import { PhoneCall, AlertTriangle, ShieldCheck } from "lucide-react";

export default function RealityCallPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-[#0A0F1F] border border-red-500/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <PhoneCall size={32} />
            </div>
            <h1 className="text-2xl font-black text-foreground mb-3">Emergency Reality Call</h1>
            <p className="text-foreground/60 max-w-lg mb-8">
                Halaman ini akan terintegrasi dengan database untuk menampilkan cerita nyata orang-orang yang bangkrut akibat mesin slot. Anda tidak sendirian dalam perjuangan ini.
            </p>
            <div className="flex gap-4">
                <button className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-500 font-bold rounded-xl flex items-center gap-2 hover:bg-red-500/20 transition-colors">
                    <AlertTriangle size={18} /> Call National Hotline
                </button>
                <button className="px-6 py-3 bg-primary/10 border border-primary/30 text-accent font-bold rounded-xl flex items-center gap-2 hover:bg-primary/20 transition-colors">
                    <ShieldCheck size={18} /> Baca Cerita Selamat
                </button>
            </div>
        </div>
    );
}
