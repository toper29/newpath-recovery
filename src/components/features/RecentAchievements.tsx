"use client";

import { Award, ExternalLink, ShieldCheck, Target, Loader2, Sparkles, Calendar, Zap, BrainCircuit, BookOpen, Trophy, TrendingUp, Milestone, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useAchievements } from "@/hooks/use-achievements";
import { useMemo } from "react";

const ICON_COMPONENTS: Record<string, any> = {
    'Calendar': Calendar,
    'ShieldCheck': ShieldCheck,
    'BrainCircuit': BrainCircuit,
    'BookOpen': BookOpen,
    'Zap': Zap,
    'Trophy': Trophy,
    'Activity': TrendingUp,
    'Flag': Milestone,
    'Search': GraduationCap,
};

export default function RecentAchievements() {
    const { achievements, isLoading } = useAchievements();

    const recentAchievements = useMemo(() => {
        return achievements
            .filter((a: any) => a.isUnlocked)
            .sort((a: any, b: any) => {
                const dateA = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
                const dateB = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 3);
    }, [achievements]);

    if (isLoading) {
        return (
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-12 flex items-center justify-center">
                <Loader2 size={32} className="text-accent animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-2">
                        <Sparkles size={20} className="text-accent" /> Pencapaian Terbaru
                    </h3>
                    <p className="text-sm text-white/40 mt-1 uppercase tracking-widest text-[10px] font-black">Kemenangan kecil yang membangun mental yang kuat.</p>
                </div>
                <Link href="/dashboard/recovery-journey" className="hidden sm:flex items-center gap-2 text-sm font-black text-accent hover:text-accent/80 transition-all uppercase tracking-tight">
                    Lihat Penuh <ExternalLink size={16} />
                </Link>
            </div>

            {recentAchievements.length === 0 ? (
                <div className="py-10 text-center relative z-10 bg-[#060A14] border border-white/5 rounded-2xl">
                    <Award size={40} className="mx-auto mb-4 text-white/10" />
                    <p className="text-white/30 text-xs font-black uppercase tracking-widest">Belum ada pencapaian yang diraih.</p>
                    <p className="text-[10px] text-white/20 mt-1">Terus melangkah, setiap hari adalah kemenangan!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {recentAchievements.map((ach, i) => {
                        const IconComp = ICON_COMPONENTS[ach.achievement.iconName] || Award;
                        return (
                            <div key={i} className="bg-[#060A14] border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-accent/10 transition-colors" />
                                
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl bg-accent/20 text-accent border border-accent/20 group-hover:scale-110 transition-transform`}>
                                        <IconComp size={28} />
                                    </div>
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] bg-white/5 px-2.5 py-1 rounded-lg">
                                        Baru Ini
                                    </span>
                                </div>
                                
                                <span className="text-[10px] font-black text-accent/60 uppercase tracking-widest mb-1 block relative z-10">
                                    {ach.achievement.category}
                                </span>
                                <h4 className="text-lg font-black text-white mb-2 group-hover:text-accent transition-colors uppercase tracking-tighter italic relative z-10">
                                    {ach.achievement.title}
                                </h4>
                                <p className="text-xs text-white/40 leading-relaxed font-medium relative z-10">
                                    {ach.achievement.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            <Link href="/dashboard/recovery-journey" className="sm:hidden mt-6 flex items-center justify-center w-full py-4 bg-white/5 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest border border-white/5">
                Lihat Semua Pencapaian
            </Link>
        </div>
    );
}
