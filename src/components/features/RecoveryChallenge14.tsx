"use client";

import { useState, useEffect, useMemo } from "react";
import ProgressBar from "../ui/ProgressBar";
import { 
    CheckCircle2, 
    Lock, 
    PlayCircle, 
    Trophy, 
    Loader2, 
    Star, 
    Award,
    Sparkles, 
    Brain,
    Target,
    Activity,
    Search,
    BrainCircuit,
    Zap,
    Scale,
    Eye,
    MessageCircle,
    Lightbulb,
    Flame,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";
import AchievementPopup from "../ui/AchievementPopup";

const CHALLENGE_CONTENT = [
    { 
        day: 1, 
        title: "Friction Awareness", 
        description: "Meningkatkan kesadaran terhadap transaksi impulsif dengan mengenali aplikasi yang membuat uang keluar terlalu cepat.",
        task: "Identifikasi aplikasi e-wallet atau m-banking yang sering kamu gunakan untuk deposit. Jika memungkinkan, logout sementara atau pindahkan dari layar utama.",
        achievement: { title: "First Barrier", icon: "shield" },
        stageName: "Awareness"
    },
    { 
        day: 2, 
        title: "Financial Memory", 
        description: "Memicu refleksi pengalaman pribadi mengenai total uang yang pernah digunakan dan sejarah kemenangan.",
        task: "Tuliskan perkiraan total uang yang pernah kamu gunakan untuk main. Apakah kemenangan besar pernah membuatmu benar-benar berhenti?",
        achievement: { title: "Reality Check", icon: "search" },
        stageName: "Memory"
    },
    { 
        day: 3, 
        title: "Slot Simulator Exploration", 
        description: "Memberi pengalaman eksplorasi sistem permainan melalui simulator tanpa risiko finansial.",
        task: "Gunakan Reality Slot Simulator di menu sidebar. Lakukan minimal 10 spin dan perhatikan statistik RTP-nya.",
        achievement: { title: "Machine Explorer", icon: "target" },
        stageName: "Exploration"
    },
    { 
        day: 4, 
        title: "Pattern Illusion", 
        description: "Memahami bahwa otak manusia sering melihat pola dalam sesuatu yang sebenarnya acak.",
        task: "Lihat hasil spin simulator sebelumnya. Coba tebak hasil berikutnya. Apakah kamu merasa ada pola? Pahami bahwa itu hanya ilusi.",
        achievement: { title: "Pattern Breaker", icon: "zap" },
        stageName: "Pattern Detection"
    },
    { 
        day: 5, 
        title: "Brain Challenge: Memory", 
        description: "Merasakan kepuasan kemenangan yang didapat dari skill (kemampuan otak), bukan keberuntungan.",
        task: "Mainkan Game Pelatihan 'Memory Card' di menu Pelatihan Kognitif. Selesaikan minimal 1 sesi.",
        achievement: { title: "Brain Player", icon: "brain" },
        stageName: "Cognitive Skill I"
    },
    { 
        day: 6, 
        title: "Brain Challenge: Logic", 
        description: "Terus melatih sirkuit penghargaan otak dengan aktivitas yang membangun kompetensi.",
        task: "Mainkan Game Pelatihan 'Quick Math' atau 'Logic' lainnya. Fokus pada peningkatan skor pribadimu.",
        achievement: { title: "Skill Player", icon: "brain-circuit" },
        stageName: "Cognitive Skill II"
    },
    { 
        day: 7, 
        title: "Trigger Awareness", 
        description: "Mendeteksi pemicu emosional atau situasional yang paling sering membuatmu ingin bermain.",
        task: "Pilih pemicu utamamu hari ini: Bosan? Stres? Ingin balik modal? Sensasi menang? Sadari pemicu tersebut tanpa bertindak.",
        achievement: { title: "Trigger Detector", icon: "activity" },
        stageName: "Trigger Detection I"
    },
    { 
        day: 8, 
        title: "Reflection: Simulator Insight", 
        description: "Mengevaluasi temuan dari simulator untuk merubah perspektif terhadap mesin slot.",
        task: "Apa hal paling mengejutkan yang kamu lihat dari simulator sejauh ini? Tuliskan refleksimu.",
        achievement: { title: "Self Reflection", icon: "eye" },
        stageName: "Trigger Detection II"
    },
    { 
        day: 9, 
        title: "Behavior Awareness", 
        description: "Menganalisis perilaku tetap bermain walaupun sudah kalah berkali-kali.",
        task: "Refleksi: Kenapa menurutmu orang tetap bermain walaupun sudah kalah? Pahami konsep 'Sunk Cost Fallacy'.",
        achievement: { title: "Behavior Analyst", icon: "search" },
        stageName: "Behavior Analysis I"
    },
    { 
        day: 10, 
        title: "Win Illusion", 
        description: "Membongkar ilusi kemenangan kecil yang sebenarnya adalah kekalahan terselubung.",
        task: "Cari contoh kemenangan di simulator yang nilainya lebih kecil dari taruhan. Apakah itu benar-benar 'menang'?",
        achievement: { title: "Profit Illusion Detector", icon: "zap" },
        stageName: "Behavior Analysis II"
    },
    { 
        day: 11, 
        title: "Strategic Thinking", 
        description: "Meningkatkan kemampuan pengambilan keputusan yang logis.",
        task: "Selesaikan 1 sesi permainan pelatihan kognitif apa saja dengan fokus penuh tanpa terburu-buru.",
        achievement: { title: "Decision Thinker", icon: "scale" },
        stageName: "Decision Logic I"
    },
    { 
        day: 12, 
        title: "Perspective Shift", 
        description: "Mempertanyakan kembali fundamental 'keberuntungan' dalam sistem yang diatur algoritma.",
        task: "Jika sistem permainan bisa diatur oleh bandar (seperti di simulator), apakah slot benar-benar hanya keberuntungan?",
        achievement: { title: "Perspective Master", icon: "eye" },
        stageName: "Decision Logic II"
    },
    { 
        day: 13, 
        title: "Personal Insight", 
        description: "Menyatukan semua pelajaran menjadi satu pemahaman pribadi yang kuat.",
        task: "Tuliskan 1 hal paling penting yang paling membuka pikiranmu selama 13 hari terakhir ini.",
        achievement: { title: "Insight Finder", icon: "lightbulb" },
        stageName: "Personal Insight"
    },
    { 
        day: 14, 
        title: "New Path", 
        description: "Hari terakhir. Mengukuhkan identitas baru sebagai pribadi yang memiliki kontrol.",
        task: "Baca kembali semua refleksimu. Kamu telah melihat bagaimana sistem bekerja. Hari ini adalah awal jalur barumu.",
        achievement: { title: "New Path Initiate", icon: "trophy" },
        stageName: "New Path Mastery"
    }
];

// Anti-relapse check-in questions
const CHECK_IN_QUESTIONS = [
    {
        key: "didGamble",
        question: "Hari ini apakah kamu berjudi?",
        advice: "Jangan menyerah. Setiap hari baru adalah kesempatan untuk memulai kembali.",
        yesColor: "text-red-400",
        noColor: "text-green-400"
    },
    {
        key: "feltLikeDepositing",
        question: "Apakah kamu merasa ingin deposit?",
        advice: "Jika kamu merasakan dorongan ini, cobalah alihkan ke olahraga atau aktivitas positif lain.",
        yesColor: "text-orange-400",
        noColor: "text-green-400"
    },
    {
        key: "openedGamblingSite",
        question: "Apakah kamu membuka situs judi?",
        advice: "Membuka situs judi memicu rasa penasaran. Blokir situs tersebut di pengaturan ponselmu.",
        yesColor: "text-orange-400",
        noColor: "text-green-400"
    },
];

export default function RecoveryChallenge14() {
    const [saving, setSaving] = useState(false);
    const [taskDone, setTaskDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
    const [showAchievement, setShowAchievement] = useState<{ title: string; description?: string } | null>(null);
    const [userProgress, setUserProgress] = useState<{
        cleanDays: number;
        canDoNextTask: boolean;
        streak: number;
        longestStreak: number;
        hasCheckedInToday: boolean;
        xp: number;
        currentDay: number;
        completionRate: number;
        avgRisk: number;
    }>({ 
        cleanDays: 0, 
        canDoNextTask: true, 
        streak: 0, 
        longestStreak: 0, 
        hasCheckedInToday: false, 
        xp: 0,
        currentDay: 1,
        completionRate: 0,
        avgRisk: 0
    });

    // Anti-relapse check-in state
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [checkInAnswers, setCheckInAnswers] = useState<Record<string, boolean | null>>({
        didGamble: null,
        feltLikeDepositing: null,
        openedGamblingSite: null,
    });
    const [checkInSaving, setCheckInSaving] = useState(false);
    const [checkInDone, setCheckInDone] = useState(false);
    const [checkInResult, setCheckInResult] = useState<{ streak: number; milestoneAchieved: number | null; streakBroken: boolean } | null>(null);

    const fetchProgress = async () => {
        try {
            const [meRes, progRes] = await Promise.all([
                fetch("/api/user/me"),
                fetch("/api/user/progress")
            ]);
            
            const meJson = await meRes.json();
            const progJson = await progRes.json();

            if (meJson.success && meJson.data && progJson.success) {
                setUserProgress({
                    cleanDays: meJson.data.cleanDays,
                    canDoNextTask: meJson.data.canDoNextTask,
                    streak: meJson.data.streak ?? 0,
                    longestStreak: meJson.data.longestStreak ?? 0,
                    hasCheckedInToday: meJson.data.hasCheckedInToday ?? false,
                    xp: meJson.data.xp ?? 0,
                    currentDay: progJson.data.currentDay,
                    completionRate: progJson.data.completionRate,
                    avgRisk: progJson.data.avgRisk
                });
                setCheckInDone(meJson.data.hasCheckedInToday ?? false);
            }
        } catch (err) {
            console.error("Failed to load progress", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const currentCompleted = userProgress.cleanDays + (taskDone ? 1 : 0);
    const canDoNext = taskDone ? false : userProgress.canDoNextTask;
    const nextDay = Math.min(userProgress.cleanDays + 1, 14);
    const progressPercent = userProgress.completionRate;

    // Logic for 10 Stages over 14 Days
    const getRecoveryStage = (days: number) => {
        if (days >= 14) return { lv: 10, name: "New Path Mastery" };
        if (days >= 13) return { lv: 9, name: "Personal Insight" };
        if (days >= 11) return { lv: 8, name: "Decision Logic" };
        if (days >= 9) return { lv: 7, name: "Behavior Analysis" };
        if (days >= 7) return { lv: 6, name: "Trigger Detection" };
        if (days >= 5) return { lv: 5, name: "Cognitive Skill" };
        if (days >= 4) return { lv: 4, name: "Pattern Detection" };
        if (days >= 3) return { lv: 3, name: "Exploration" };
        if (days >= 2) return { lv: 2, name: "Memory" };
        if (days >= 1) return { lv: 1, name: "Awareness" };
        return { lv: 0, name: "Beginner" };
    };

    const recoveryStage = getRecoveryStage(currentCompleted);

    const handleSubmitCheckIn = async () => {
        const allAnswered = CHECK_IN_QUESTIONS.every(q => checkInAnswers[q.key] !== null);
        if (!allAnswered) {
            alert("Jawab semua pertanyaan terlebih dahulu.");
            return;
        }

        setCheckInSaving(true);
        try {
            const res = await fetch("/api/user/daily-checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    didGamble: checkInAnswers.didGamble,
                    feltLikeDepositing: checkInAnswers.feltLikeDepositing,
                    openedGamblingSite: checkInAnswers.openedGamblingSite,
                })
            });
            const json = await res.json();
            if (json.success) {
                setCheckInDone(true);
                setCheckInResult(json.data);
                // Refresh user progress to update XP and streak
                await fetchProgress();
                // If milestone achieved, show achievement popup
                if (json.data.milestoneAchieved) {
                    const milestoneLabels: Record<number, string> = { 3: "🔥 Bertahan Sepekan Awal", 7: "⭐ Satu Minggu Bersih", 14: "💎 Program Selesai!" };
                    setShowAchievement({
                        title: milestoneLabels[json.data.milestoneAchieved] ?? `${json.data.milestoneAchieved} Hari Bebas Judi`,
                        description: `Streak kamu sekarang ${json.data.streak} hari! Luar biasa, terus pertahankan!`
                    });
                }
            } else {
                // Already checked in
                setCheckInDone(true);
            }
        } catch(err) {
            console.error(err);
        } finally {
            setCheckInSaving(false);
        }
    };

    const handleCompleteTask = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/user/challenge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ day: nextDay })
            });
            const json = await res.json();
            if (json.success) {
                setTaskDone(true);
                setShowModal(false);
                setShowAchievement({
                    title: CHALLENGE_CONTENT[nextDay-1].achievement.title,
                    description: `Selamat! Kamu telah mencapai Stage ${getRecoveryStage(nextDay).lv}: ${getRecoveryStage(nextDay).name}`
                });
                // Refresh to update XP display
                await fetchProgress();
            } else {
                alert(json.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const getIcon = (type: string) => {
        switch(type) {
            case 'shield': return <CheckCircle2 size={16} />;
            case 'search': return <Search size={16} />;
            case 'target': return <Target size={16} />;
            case 'zap': return <Zap size={16} />;
            case 'brain': return <Brain size={16} />;
            case 'brain-circuit': return <BrainCircuit size={16} />;
            case 'activity': return <Activity size={16} />;
            case 'eye': return <Eye size={16} />;
            case 'scale': return <Scale size={16} />;
            case 'lightbulb': return <Lightbulb size={16} />;
            case 'trophy': return <Trophy size={16} />;
            default: return <Award size={16} />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Level Info */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Trophy size={120} />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-[2rem] bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                            <span className="text-4xl font-black">{recoveryStage.lv}</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-[#040814] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                            Stage
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2">14 Day Recovery Challenge</h1>
                        <p className="text-white/50 text-sm md:text-base font-medium max-w-xl">
                            Ubah pola pikirmu dalam 14 hari melalui refleksi mendalam, eksperimen simulator, dan tantangan kognitif.
                        </p>
                        
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Completed Tasks: {currentCompleted} / 14</span>
                                <span className="text-sm font-mono font-bold text-white">{progressPercent}%</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                <div 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-center gap-3">
                        <button 
                            onClick={() => {
                                if (!checkInDone) {
                                    setShowCheckIn(true);
                                } else {
                                    setSelectedDayIdx(nextDay - 1);
                                    setShowModal(true);
                                }
                            }}
                            disabled={!canDoNext || saving || currentCompleted >= 14}
                            className={`group relative px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${!canDoNext || currentCompleted >= 14 ? 'bg-white/5 text-white/20 border border-white/10' : 'bg-accent text-[#040814] hover:bg-white shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-105 active:scale-95'}`}
                        >
                           <div className="flex items-center gap-2">
                                {saving ? <Loader2 size={18} className="animate-spin" /> : 
                                 currentCompleted >= 14 ? <Trophy size={18} /> : 
                                 !canDoNext ? <Lock size={18} /> : <PlayCircle size={18} />}
                                {currentCompleted >= 14 ? "Challenge Complete" : (!canDoNext ? "Locked Until 12 AM" : `Mulai Day ${nextDay}`)}
                           </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Tabs / Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Roadmap List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
                            <Activity className="text-accent" size={20} /> Recovery Roadmap
                        </h3>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Klik kartu untuk detail misi</span>
                    </div>
                    
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                        {CHALLENGE_CONTENT.map((item, idx) => {
                            const isCompleted = item.day <= currentCompleted;
                            const isCurrent = item.day === nextDay && canDoNext;
                            const isLocked = item.day > nextDay || (item.day === nextDay && !canDoNext);

                            return (
                                <button 
                                    key={idx}
                                    onClick={() => {
                                        setSelectedDayIdx(idx);
                                        setShowModal(true);
                                    }}
                                    className={`group relative aspect-square rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                                        isCompleted ? 'bg-accent/10 border-accent/20 text-accent' : 
                                        isCurrent ? 'bg-white/10 border-accent shadow-[0_0_20px_rgba(56,189,248,0.1)] text-white' : 
                                        'bg-black/20 border-white/5 text-white/20'
                                    }`}
                                >
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${isCurrent ? 'text-accent' : ''}`}>Day</span>
                                    <span className="text-xl font-black italic">{item.day}</span>
                                    <div className="mt-1">
                                        {isCompleted ? <CheckCircle2 size={14} /> : isLocked ? <Lock size={12} /> : <PlayCircle size={14} className="text-accent animate-pulse" />}
                                    </div>
                                    
                                    {/* Small indicator for current */}
                                    {isCurrent && (
                                        <div className="absolute -top-1 -right-1">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                            </span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Achievement Gallery Side */}
                <div className="space-y-6">
                     <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 shadow-xl">
                        <h3 className="text-lg font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-2">
                             <Award className="text-amber-400" size={20} /> Achievement Gallery
                        </h3>
                        
                        <div className="grid grid-cols-4 gap-3">
                            {CHALLENGE_CONTENT.map((item, idx) => {
                                const isUnlocked = item.day <= currentCompleted;
                                return (
                                    <div 
                                        key={idx}
                                        title={isUnlocked ? item.achievement.title : "Locked"}
                                        className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${isUnlocked ? 'bg-amber-400/10 border border-amber-400/30 text-amber-400' : 'bg-white/5 border border-white/5 text-white/10'}`}
                                    >
                                        {getIcon(item.achievement.icon)}
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest text-[9px]">Recovery Status</span>
                                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{recoveryStage.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-accent transition-all duration-500" style={{ width: `${(recoveryStage.lv / 10) * 100}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-white/60">{recoveryStage.lv}/10</span>
                            </div>
                        </div>
                     </div>

                     {/* Recovery Guide Card */}
                     <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                            <Sparkles size={40} />
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3">Pesan Recovery</h4>
                        <p className="text-[11px] text-white/60 leading-relaxed italic">
                            "Pemulihan bukan tentang menjadi sempurna, tapi tentang membuat kemajuan setiap hari. Kamu sudah membuktikan bahwa kamu lebih kuat dari dorongan sesaat."
                        </p>
                     </div>
                </div>
            </div>

            {/* === STREAK SECTION === */}
            <div className="bg-[#0A0F1F] border border-orange-500/20 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white mb-5 flex items-center gap-2">
                    <Flame className="text-orange-400" size={20} /> Streak Bebas Judi
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Current streak */}
                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-400/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 text-center">
                        <Flame className="text-orange-400" size={28} />
                        <span className="text-4xl font-black text-white">{userProgress.streak}</span>
                        <span className="text-[10px] font-bold text-orange-400/70 uppercase tracking-widest">Hari Streak</span>
                    </div>
                    {/* Milestones */}
                    {([
                        { days: 3, label: "3 Hari", title: "Bertahan!", emoji: "🔥" },
                        { days: 7, label: "7 Hari", title: "Seminggu!", emoji: "⭐" },
                        { days: 14, label: "14 Hari", title: "Selesai!", emoji: "💎" },
                    ] as const).map(m => {
                        const reached = userProgress.streak >= m.days;
                        return (
                            <div key={m.days} className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-1 text-center border transition-all ${reached ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-white/5 border-white/5 text-white/20'}`}>
                                <span className="text-2xl">{m.emoji}</span>
                                <span className="text-lg font-black">{m.label}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">{m.title}</span>
                                {reached && <span className="text-[9px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">UNLOCKED</span>}
                            </div>
                        );
                    })}
                </div>
                
                {/* Risk Indicator */}
                <div className={`mt-4 p-4 rounded-2xl flex items-center justify-between border ${userProgress.avgRisk > 60 ? 'bg-red-500/10 border-red-500/30 text-red-400' : userProgress.avgRisk > 30 ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                    <div className="flex items-center gap-3">
                        <Activity size={18} />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider">Average Relapse Risk</p>
                            <p className="text-[10px] opacity-70">Berdasarkan check-in {userProgress.cleanDays} hari terakhir</p>
                        </div>
                    </div>
                    <div className="text-xl font-black">{userProgress.avgRisk}%</div>
                </div>

                {/* Check-in status */}
                <div className={`mt-3 p-3 rounded-xl flex items-center gap-3 border text-sm font-semibold ${checkInDone ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
                    {checkInDone ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
                    {checkInDone
                        ? `Check-in hari ini selesai! Streak: ${userProgress.streak} hari`
                        : "Belum check-in hari ini. Klik 'Mulai Day' untuk absen harian."}
                </div>
            </div>

             {/* Anti-Relapse Check-In Modal */}
            {showCheckIn && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-[#0D1117] border border-orange-500/30 w-full max-w-lg rounded-[2rem] shadow-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 bg-gradient-to-r from-orange-500/10 to-transparent">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-orange-500/20 text-orange-400 rounded-2xl">
                                    <Flame size={28} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Anti-Relapse Daily Check</h2>
                                    <p className="text-[10px] font-bold text-orange-400/70 uppercase tracking-widest">Absen Harian • Jujur Pada Diri Sendiri</p>
                                </div>
                            </div>
                            <p className="text-xs text-white/50 mt-2">Jawab jujur setiap pertanyaan. Ini adalah langkah pertama kontrolmu hari ini.</p>
                        </div>

                        {/* Questions */}
                        <div className="p-6 md:p-8 space-y-5">
                            {CHECK_IN_QUESTIONS.map((q, i) => (
                                <div key={q.key} className="space-y-2">
                                    <p className="text-sm font-bold text-white">
                                        <span className="text-orange-400/60 mr-2">{i + 1}.</span>{q.question}
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setCheckInAnswers(a => ({ ...a, [q.key]: true }))}
                                            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${checkInAnswers[q.key] === true ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}
                                        >
                                            Ya
                                        </button>
                                        <button
                                            onClick={() => setCheckInAnswers(a => ({ ...a, [q.key]: false }))}
                                            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${checkInAnswers[q.key] === false ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}
                                        >
                                            Tidak
                                        </button>
                                    </div>
                                    {/* Advice shown when answered */}
                                    {checkInAnswers[q.key] !== null && (
                                        <p className={`text-[11px] italic leading-relaxed pl-2 border-l-2 ${checkInAnswers[q.key] ? 'text-orange-400/70 border-orange-500/30' : 'text-green-400/70 border-green-500/30'}`}>
                                            {q.advice}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/5 flex gap-4">
                            <button onClick={() => setShowCheckIn(false)} className="flex-1 py-4 text-xs font-black text-white/30 hover:text-white uppercase tracking-widest transition-colors">
                                Tutup
                            </button>
                            <button
                                onClick={async () => {
                                    await handleSubmitCheckIn();
                                    setShowCheckIn(false);
                                    // After check-in done, open the task modal
                                    setSelectedDayIdx(nextDay - 1);
                                    setShowModal(true);
                                }}
                                disabled={checkInSaving || CHECK_IN_QUESTIONS.some(q => checkInAnswers[q.key] === null)}
                                className="flex-[2] bg-orange-500 hover:bg-orange-400 disabled:bg-white/10 disabled:text-white/20 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 text-sm"
                            >
                                {checkInSaving ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                                Konfirmasi Check-In
                            </button>
                        </div>
                    </div>
                </div>
            )}

             {/* Challenge Modal */}
            {showModal && selectedDayIdx !== null && CHALLENGE_CONTENT[selectedDayIdx] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-[#15151a] border border-white/10 w-full max-w-xl rounded-[3rem] shadow-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                         {/* Modal Header */}
                         <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-accent/10 ${CHALLENGE_CONTENT[selectedDayIdx].day <= currentCompleted ? 'bg-accent text-[#040814]' : 'bg-white/5 text-white/40'}`}>
                                    {CHALLENGE_CONTENT[selectedDayIdx].day}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{CHALLENGE_CONTENT[selectedDayIdx].title}</h2>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Day {CHALLENGE_CONTENT[selectedDayIdx].day} / 14 Challenge</p>
                                </div>
                            </div>
                         </div>
                         
                         {/* Modal Body */}
                         <div className="p-8 space-y-8">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={14} /> Background & Goal
                                </h4>
                                <p className="text-white/70 leading-relaxed text-sm italic border-l-2 border-accent/30 pl-4">
                                    {CHALLENGE_CONTENT[selectedDayIdx].description}
                                </p>
                            </div>
                            
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3 relative group">
                                <div className="absolute top-0 right-0 p-4 opacity-20 text-accent">
                                    <Zap size={24} />
                                </div>
                                <h4 className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                                    <Trophy size={14} /> TUGAS HARI INI
                                </h4>
                                <p className="text-white font-bold text-base leading-relaxed">
                                    {CHALLENGE_CONTENT[selectedDayIdx].task}
                                </p>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-amber-400/5 border border-amber-400/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-400/10 text-amber-400 rounded-lg">
                                        {getIcon(CHALLENGE_CONTENT[selectedDayIdx].achievement.icon)}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-amber-400/50 uppercase tracking-widest">Potential Achievement</p>
                                        <p className="text-xs font-black text-white italic">{CHALLENGE_CONTENT[selectedDayIdx].achievement.title}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    +50 XP
                                </div>
                            </div>
                         </div>

                         {/* Modal Footer */}
                         <div className="p-8 bg-white/[0.02] border-t border-white/5 flex gap-4">
                             <button 
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedDayIdx(null);
                                }}
                                className="flex-1 py-4 text-xs font-black text-white/30 hover:text-white uppercase tracking-widest transition-colors"
                             >
                                Tutup
                             </button>
                             {CHALLENGE_CONTENT[selectedDayIdx].day <= currentCompleted ? (
                                <div className="flex-[2] bg-green-500/20 border border-green-500/50 text-green-400 py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                                    <CheckCircle2 size={20} />
                                    Tugas Selesai
                                </div>
                             ) : selectedDayIdx === nextDay - 1 && canDoNext && (
                                <button 
                                    onClick={handleCompleteTask}
                                    disabled={saving}
                                    className="flex-[2] bg-accent hover:bg-white text-[#040814] py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95"
                                >
                                    {saving ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
                                    Konfirmasi Selesai
                                </button>
                             )}
                         </div>
                    </div>
                </div>
            )}

            {/* Achievement Toast Overlay */}
            {showAchievement && (
                <AchievementPopup 
                    achievement={{
                        title: showAchievement.title,
                        description: showAchievement.description
                    }} 
                    onClose={() => setShowAchievement(null)} 
                />
            )}
        </div>
    );
}
