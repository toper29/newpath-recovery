"use client";

import { useState, useEffect } from "react";
import { Award, BrainCircuit, Calendar, CheckCircle2, ChevronRight, Clock, Gamepad2, GraduationCap, Leaf, Milestone, ShieldCheck, Target, TrendingUp, Sparkles, BookOpen, Loader2, Info, Lock, Zap, Trophy, Activity, Flag } from "lucide-react";

const LEVEL_NAMES: Record<number, string> = {
    1: "Awakening",
    2: "Awareness",
    3: "Control Attempt",
    4: "Mind Builder",
    5: "Discipline Mode",
    6: "Habit Former",
    7: "Life Rebuilder",
    8: "Strong Mind",
    9: "Control Master",
    10: "New Path",
};

const CATEGORY_ICONS: Record<string, any> = {
    'CONSISTENCY': <Calendar size={24} className="text-orange-400" />,
    'STREAK': <ShieldCheck size={24} className="text-blue-400" />,
    'COGNITIVE': <BrainCircuit size={24} className="text-accent" />,
    'EDUCATION': <BookOpen size={24} className="text-green-400" />,
};

const CATEGORY_COLORS: Record<string, string> = {
    'CONSISTENCY': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    'STREAK': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    'COGNITIVE': 'bg-accent/10 border-accent/20 text-accent',
    'EDUCATION': 'bg-green-500/10 border-green-500/20 text-green-400',
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
    'CONSISTENCY': 'bg-orange-600',
    'STREAK': 'bg-blue-600',
    'COGNITIVE': 'bg-accent',
    'EDUCATION': 'bg-green-600',
};

const ICON_COMPONENTS: Record<string, any> = {
    'Calendar': Calendar,
    'ShieldCheck': ShieldCheck,
    'BrainCircuit': BrainCircuit,
    'BookOpen': BookOpen,
    'Zap': Zap,
    'Trophy': Trophy,
    'Activity': TrendingUp,
    'Flag': Flag,
    'Milestone': Milestone,
    'Search': GraduationCap,
};

export default function RecoveryJourneyPage() {
    const [userData, setUserData] = useState({ 
        xp: 0, 
        level: 1, 
        cleanDays: 0, 
        educationCount: 0,
        journalCount: 0,
        title: "", 
        loading: true 
    });
    const [achievements, setAchievements] = useState<any[]>([]);
    const [selectedAch, setSelectedAch] = useState<any>(null);

    useEffect(() => {
        // Track feature usage
        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Recovery Journey" })
        }).catch(err => console.error("Failed to track feature usage", err));

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
                        journalCount: meJson.data.journalCount || 0,
                        title: meJson.data.title,
                        loading: false
                    });
                }
                if (achJson.success) {
                    setAchievements(achJson.data);
                }
            } catch (err) {
                console.error("Failed to load journey data", err);
                setUserData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchData();
    }, []);

    const currentLevelName = LEVEL_NAMES[userData.level] || "Legend";
    const nextLevel = userData.level + 1;
    const xpNeeded = userData.level * 500;
    const progressPercent = Math.min(100, Math.round((userData.xp / xpNeeded) * 100));

    if (userData.loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    const categories = Array.from(new Set(achievements.map(a => a.category)));

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Hero */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Sparkles size={14} /> Status Pemulihan Saat Ini
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                            <span>Level {userData.level}</span>
                            <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-white/20" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-primary uppercase italic">{currentLevelName}</span>
                        </h1>
                        
                        <div className="mt-10 max-w-xl">
                            <div className="flex justify-between items-end mb-3 px-1">
                                <span className="text-xs font-black text-white/40 uppercase tracking-widest">Target ke Level {nextLevel}</span>
                                <span className="text-sm font-black text-accent tracking-tighter">{userData.xp} <span className="text-white/20">/</span> {xpNeeded} <span className="text-xs ml-1">XP</span></span>
                            </div>
                            <div className="w-full h-4 bg-white/5 rounded-2xl overflow-hidden border border-white/10 p-1">
                                <div className="h-full bg-gradient-to-r from-accent to-primary rounded-xl relative transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(56,189,248,0.4)]" style={{ width: `${progressPercent}%` }}>
                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-sweep"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-center gap-4">
                        <div className="w-48 h-48 rounded-[3rem] border-2 border-accent/20 bg-accent/5 flex items-center justify-center relative group shadow-[0_0_60px_rgba(56,189,248,0.1)]">
                            <div className="absolute inset-4 border border-accent/40 rounded-[2.5rem] animate-pulse-slow" />
                            <BrainCircuit size={80} className="text-accent group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 text-center mb-1">Gelar Saat Ini</p>
                            <p className="text-sm font-black text-white uppercase italic tracking-tighter">"{userData.title || 'The Awakening'}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievement Sections by Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map(category => (
                    <div key={category} className="bg-[#050812] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-3 italic">
                                {CATEGORY_ICONS[category as string] || <Award className="text-accent" />}
                                {category === 'CONSISTENCY' ? 'Konsistensi' : 
                                 category === 'STREAK' ? 'Ketahanan Streak' : 
                                 category === 'COGNITIVE' ? 'Kekuatan Mental' : 
                                 category === 'EDUCATION' ? 'Wawasan Edukasi' : category}
                            </h3>
                            <div className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${CATEGORY_COLORS[category as string]}`}>
                                Category
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {achievements.filter(ach => ach.category === category).map((ach, i) => {
                                const isUnlocked = ach.isUnlocked;
                                const progress = ach.progress;
                                const target = ach.targetValue;
                                const progressPct = Math.min(100, Math.round((progress / target) * 100));
                                const IconComp = ICON_COMPONENTS[ach.iconName] || Award;

                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => setSelectedAch(ach)}
                                        className={`flex flex-col items-center text-center gap-3 transition-all relative group ${isUnlocked ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
                                    >
                                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-300 ${
                                            isUnlocked 
                                                ? CATEGORY_BADGE_COLORS[category as string] + " text-white scale-100 rotate-0 shadow-accent/20" 
                                                : "bg-[#0A0F1F] border border-white/10 text-white/30 scale-95 group-hover:scale-100"
                                        }`}>
                                            {!isUnlocked && <Lock size={16} className="absolute top-2 right-2 opacity-50" />}
                                            <div className="relative z-10">
                                                <IconComp size={28} />
                                            </div>
                                            {isUnlocked && (
                                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                            )}
                                        </div>
                                        
                                        <div className="min-w-0 w-full px-1">
                                            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 leading-none">{isUnlocked ? 'Terbuka' : 'Terkunci'}</p>
                                            <p className="text-[11px] font-black text-white leading-tight uppercase tracking-tighter truncate">{ach.title}</p>
                                            
                                            {/* Minimalist Progress Bar */}
                                            {!isUnlocked && (
                                                <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full ${CATEGORY_BADGE_COLORS[category as string]} transition-all duration-500`} style={{ width: `${progressPct}%` }} />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Achievement Mission Details (Overlay) */}
            {selectedAch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#0A0F1F] border border-accent/20 w-full max-w-md rounded-[3rem] p-10 relative overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.2)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl ${
                                selectedAch.isUnlocked 
                                    ? CATEGORY_BADGE_COLORS[selectedAch.category] + " text-white" 
                                    : "bg-white/5 border border-white/10 text-white/40"
                            }`}>
                                {(() => {
                                    const IconComp = ICON_COMPONENTS[selectedAch.iconName] || Award;
                                    return <IconComp size={44} />;
                                })()}
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">
                                {selectedAch.category}
                            </div>
                            
                            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">{selectedAch.title}</h2>
                            <p className="text-foreground/50 text-sm mb-10 font-medium px-4">{selectedAch.description}</p>

                            <div className="w-full bg-[#050812] border border-white/5 rounded-[2rem] p-6 mb-8 text-left">
                                <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Target size={14} /> Misi Pencapaian
                                </h4>
                                <p className="text-sm font-bold text-white mb-4 italic leading-relaxed">"{selectedAch.mission}"</p>
                                
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <span className="text-[10px] font-black text-white/30 uppercase">Progress Lapangan</span>
                                    <span className="text-xs font-black text-white italic">{selectedAch.progress} <span className="text-white/20">/</span> {selectedAch.targetValue}</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                    <div className={`h-full ${CATEGORY_BADGE_COLORS[selectedAch.category]} rounded-full transition-all duration-700`} 
                                         style={{ width: `${Math.min(100, Math.round((selectedAch.progress / selectedAch.targetValue) * 100))}%` }} />
                                </div>
                            </div>

                            {selectedAch.rewardTitle && (
                                <div className="mb-8 flex flex-col items-center">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Hadiah Gelar</p>
                                    <div className="px-4 py-2 bg-accent/20 border border-accent/40 rounded-xl">
                                        <p className="text-accent text-sm font-black italic uppercase tracking-tighter">"{selectedAch.rewardTitle}"</p>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => setSelectedAch(null)}
                                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-[1.5rem] border border-white/10 transition-all uppercase tracking-widest text-xs"
                            >
                                Tutup Berkas
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary Stats Grid (Premium View) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                <div className="bg-[#050812] p-8 rounded-[2.5rem] text-center border border-white/5 relative group hover:border-accent/40 transition-all shadow-lg hover:shadow-accent/5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                        <Calendar className="text-orange-400" size={24} />
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Total Hari Bersih</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">{userData.cleanDays} <span className="text-lg text-white/20 ml-1 font-normal">Hari</span></p>
                </div>

                <div className="bg-[#050812] p-8 rounded-[2.5rem] text-center border border-white/5 relative group hover:border-accent/40 transition-all shadow-lg hover:shadow-accent/5">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                        <GraduationCap className="text-green-400" size={24} />
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Materi Dipelajari</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">{userData.educationCount} <span className="text-lg text-white/20 ml-1 font-normal">Modul</span></p>
                </div>

                <div className="bg-[#050812] p-8 rounded-[2.5rem] text-center border border-white/5 relative group hover:border-accent/40 transition-all shadow-lg hover:shadow-accent/5">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 border border-accent/20">
                        <Award className="text-accent" size={24} />
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Pencapaian Diraih</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">
                        {achievements.filter(a => a.isUnlocked).length} 
                        <span className="text-lg text-white/20 ml-1 font-normal">/ {achievements.length} Badge</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
