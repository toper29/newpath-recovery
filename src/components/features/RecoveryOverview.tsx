"use client";

import { Award, BookOpen, Calendar, ShieldCheck, TrendingUp, Zap, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

const LEVEL_NAMES: Record<number, string> = {
    1: "Awareness",
    2: "Awareness",
    3: "Self-Control",
    4: "Self-Control",
    5: "Recovery Building",
    6: "Recovery Building",
    7: "Stability",
    8: "Stability",
    9: "Freedom",
    10: "Freedom"
};

const getStageNumber = (level: number) => {
    return Math.ceil(level / 2);
};

export default function RecoveryOverview() {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-12 flex items-center justify-center shadow-xl">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (!user) return null;

    const nextLevel = user.level + 1;
    const currentLevelName = LEVEL_NAMES[user.level] || "Legend";
    const nextLevelName = LEVEL_NAMES[nextLevel] || "Legend";
    const xpNeeded = user.level * 500;
    const progressPercent = Math.min(100, Math.round((user.xp / xpNeeded) * 100));
    const currentStage = getStageNumber(user.level);

    return (
        <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch relative overflow-hidden shadow-xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />

            {/* Left: Level & Progress */}
            <div className="flex-1 flex flex-col justify-center relative z-10 border-b md:border-b-0 md:border-r border-primary/20 pb-8 md:pb-0 md:pr-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-0 uppercase tracking-wider w-fit">
                        <ShieldCheck size={16} /> Status Pemulihan Aktif
                    </div>
                    {user.isPremium && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider w-fit">
                            <Crown size={14} /> Premium
                        </div>
                    )}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    Stage {currentStage} <span className="text-white/40">•</span> <span className="text-accent">{currentLevelName}</span>
                </h2>
                <p className="text-sm text-white/60 mb-6 font-medium">Level {user.level} — Anda sedang membangun pola pikir baru yang lebih kuat.</p>
                
                <div className="bg-[#060A14] p-4 rounded-2xl border border-primary/10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Menuju Level {nextLevel} ({nextLevelName})</span>
                        <span className="text-xs font-black text-accent">{user.xp}/{xpNeeded} XP</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-primary/10">
                        <div className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <p className="text-[10px] text-white/50 mt-3 flex items-center gap-1">
                        <Zap size={12} className="text-orange-400" /> Dapatkan XP untuk naik ke level berikutnya.
                    </p>
                </div>
            </div>

            {/* Right: Quick Stats Grids */}
            <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                            <TrendingUp size={16} />
                        </div>
                        <span className="text-xs font-bold text-white/70">Masa Bersih</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white block">{user.cleanDays} Hari</span>
                        <span className="text-[10px] text-white/50 mt-1 block">Tanpa deposit sama sekali</span>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                            <BookOpen size={16} />
                        </div>
                        <span className="text-xs font-bold text-white/70">Edukasi</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white block">{user.educationCount} Modul</span>
                        <span className="text-[10px] text-white/50 mt-1 block">Telah diselesaikan</span>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                            <Calendar size={16} />
                        </div>
                        <span className="text-xs font-bold text-white/70">Jurnal Refleksi</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white block">{user.journalCount} Entri</span>
                        <span className="text-[10px] text-white/50 mt-1 block">Menjaga kesadaran diri</span>
                    </div>
                </div>

                <Link href="/dashboard/recovery-journey" className="bg-primary/10 hover:bg-primary/20 transition-colors p-4 rounded-2xl border border-primary/30 flex flex-col justify-between group col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                            <Award size={16} />
                        </div>
                        <span className="text-xs font-bold text-accent">Journey</span>
                    </div>
                    <div>
                        <span className="text-sm font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1">
                            Roadmap &rarr;
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
