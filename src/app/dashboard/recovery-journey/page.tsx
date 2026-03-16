"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Award, BrainCircuit, Calendar, CheckCircle2, ChevronRight, 
    Lock, Sparkles, Trophy, Star, Shield, Map as MapIcon,
    Compass, Zap, Flag, Milestone, BookOpen, Loader2
} from "lucide-react";

const STAGES = [
    {
        id: "admission",
        title: "Stage 1: Admission",
        subtitle: "Mengakui adalah langkah pertama menuju perubahan.",
        label: "Admission",
        color: "from-blue-600 to-cyan-500",
        shadow: "shadow-blue-500/20",
        icon: Compass,
        milestones: ["Login pertama", "Mulai perjalanan"]
    },
    {
        id: "awareness",
        title: "Stage 2: Awareness",
        subtitle: "Memahami pola dan pemicu adiksi.",
        label: "Awareness",
        color: "from-cyan-500 to-blue-500",
        shadow: "shadow-cyan-500/20",
        icon: MapIcon,
        milestones: ["Selesaikan tes adiksi", "Baca 1 edukasi"]
    },
    {
        id: "self-control",
        title: "Stage 3: Self-Control",
        subtitle: "Mulai mengambil kendali atas dorongan.",
        label: "Self-Control",
        color: "from-indigo-500 to-purple-500",
        shadow: "shadow-indigo-500/20",
        icon: Shield,
        milestones: ["3 hari streak", "5 latihan kognitif"]
    },
    {
        id: "recovery-building",
        title: "Stage 4: Building",
        subtitle: "Membangun kebiasaan baru yang lebih sehat.",
        label: "Building",
        color: "from-purple-500 to-pink-500",
        shadow: "shadow-purple-500/20",
        icon: Zap,
        milestones: ["7 hari streak", "10 latihan kognitif"]
    },
    {
        id: "stability",
        title: "Stage 5: Stability",
        subtitle: "Konsistensi adalah kunci kekuatan.",
        label: "Stability",
        color: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/20",
        icon: Star,
        milestones: ["14 hari streak", "20 latihan kognitif"]
    },
    {
        id: "growth",
        title: "Stage 6: Growth",
        subtitle: "Bertumbuh melebihi batas yang lama.",
        label: "Growth",
        color: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/20",
        icon: Milestone,
        milestones: ["21 hari streak", "3 edukasi selesai"]
    },
    {
        id: "freedom",
        title: "Stage 7: Freedom",
        subtitle: "Merdeka dari belenggu masa lalu.",
        label: "Freedom",
        color: "from-yellow-400 to-orange-400",
        shadow: "shadow-yellow-500/20",
        icon: Flag,
        milestones: ["30 hari streak", "Bantu yang lain"]
    },
];

export default function RecoveryJourneyPage() {
    const [userData, setUserData] = useState({ 
        xp: 0, 
        level: 1, 
        cleanDays: 0, 
        educationCount: 0,
        isPremium: false,
        loading: true 
    });
    const [achievements, setAchievements] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [meRes, achRes] = await Promise.all([
                    fetch("/api/user/me"),
                    fetch("/api/user/achievements")
                ]);
                const meJson = await meRes.json();
                const achJson = await achRes.json();

                if (meJson.success) {
                    setUserData({
                        xp: meJson.data.xp,
                        level: meJson.data.level,
                        cleanDays: meJson.data.cleanDays,
                        educationCount: meJson.data.educationCount || 0,
                        isPremium: meJson.data.isPremium || false,
                        loading: false
                    });
                }
                if (achJson.success) setAchievements(achJson.data);
            } catch (err) {
                console.error("Failed to load journey data", err);
                setUserData(prev => ({ ...prev, loading: false }));
            }
        };
        fetchData();
    }, []);

    if (userData.loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    // Logic to determine current stage based on level/cleanDays (heuristic)
    const currentStageIndex = Math.min(STAGES.length - 1, Math.floor((userData.level - 1) / 2));

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                    <MapIcon size={14} /> Journey Map
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Peta Pemulihan</h1>
                <p className="text-white/40 max-w-lg mx-auto text-sm font-medium">Lacak perjalananmu dari kegelapan menuju cahaya. Satu langkah kecil setiap harinya.</p>
            </div>

            {/* Visual Map Section */}
            <div className="relative max-w-3xl mx-auto px-4">
                {/* Connecting Line */}
                <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-white/5 via-white/10 to-transparent -translate-x-1/2 z-0 hidden sm:block" />

                <div className="space-y-16 relative z-10">
                    {STAGES.map((stage, index) => {
                        const isUnlocked = index <= currentStageIndex;
                        const isPremiumStage = index >= 2; // Stage 3 is index 2
                        const isLockedByPlan = isPremiumStage && !userData.isPremium;
                        const effectiveUnlocked = isUnlocked && !isLockedByPlan;
                        const isCurrent = index === currentStageIndex;
                        const Icon = stage.icon;

                        return (
                            <motion.div 
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex items-start gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Level Icon / Node */}
                                <div className="shrink-0 relative">
                                    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${
                                        isLockedByPlan
                                            ? "bg-black/40 border border-white/5 text-white/10"
                                            : effectiveUnlocked 
                                                ? `bg-gradient-to-br ${stage.color} ${stage.shadow} text-white scale-110 shadow-xl` 
                                                : "bg-[#0A0F1F] border border-white/10 text-white/20"
                                    }`}>
                                        <Icon size={32} />
                                    </div>
                                    {isCurrent && (
                                        <div className="absolute -inset-2 border-2 border-dashed border-accent rounded-[2rem] animate-spin-slow" />
                                    )}
                                    {isUnlocked && !isCurrent && index < currentStageIndex && (
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white p-1 rounded-full border-2 border-[#040814]">
                                            <CheckCircle2 size={12} />
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 group`}>
                                    <div className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-300 relative overflow-hidden ${
                                        isCurrent 
                                            ? "bg-[#0A0F1F] border-accent/50 shadow-[0_0_40px_rgba(56,189,248,0.1)]" 
                                            : isUnlocked 
                                                ? "bg-[#0A0F1F] border-white/10 hover:border-white/20" 
                                                : "bg-[#0A0F1F]/40 border-white/5 opacity-50 grayscale"
                                    }`}>
                                        {isCurrent && <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -mr-16 -mt-16" />}
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                                                    effectiveUnlocked ? "bg-white/10 text-white" : "bg-white/5 text-white/20"
                                                }`}>
                                                    {stage.label}
                                                </span>
                                                {(isLockedByPlan || !isUnlocked) && <Lock size={14} className="text-white/20" />}
                                            </div>
                                            
                                            {isLockedByPlan ? (
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-black text-white/30 uppercase italic tracking-tighter mb-2">{stage.title}</h3>
                                                    <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Premium Feature</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">{stage.title}</h3>
                                                    <p className="text-white/40 text-sm font-medium mb-6">{stage.subtitle}</p>
                                                </>
                                            )}

                                            {/* Milestone Checklist */}
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Misi Stage</p>
                                                {stage.milestones.map((m, mi) => (
                                                    <div key={mi} className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                                                            isUnlocked ? "border-accent/40 bg-accent/10" : "border-white/5"
                                                        }`}>
                                                            {isUnlocked && <CheckCircle2 size={10} className="text-accent" />}
                                                        </div>
                                                        <span className={`text-xs ${isUnlocked ? "text-white/60" : "text-white/20"}`}>{m}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Info Section */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#050812] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-white to-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
                        <div className="text-center md:text-left">
                            <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Teruslah Melangkah</h4>
                            <p className="text-sm text-white/40 font-medium">Buka stage berikutnya dengan terus aktif belajar dan jaga diri hari ini.</p>
                        </div>
                        <div className="shrink-0 flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Total XP</p>
                                <p className="text-2xl font-black text-white italic tracking-tighter">{userData.xp}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <Trophy size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
