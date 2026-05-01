"use client";

import { useState, useMemo } from "react";
import { 
    CheckCircle2, 
    Lock, 
    PlayCircle, 
    Trophy, 
    Loader2, 
    Award,
    Sparkles, 
    Activity,
    Zap,
    Scale,
    Eye,
    Lightbulb,
    Flame,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";
import AchievementPopup from "../ui/AchievementPopup";
import { useUser } from "@/hooks/use-user";
import { useProgress } from "@/hooks/use-progress";

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

const CHECK_IN_QUESTIONS = [
    { key: "didGamble", question: "Hari ini apakah kamu berjudi?", advice: "Jangan menyerah. Setiap hari baru adalah kesempatan untuk memulai kembali." },
    { key: "feltLikeDepositing", question: "Apakah kamu merasa ingin deposit?", advice: "Jika kamu merasakan dorongan ini, cobalah alihkan ke aktivitas positif lain." },
    { key: "openedGamblingSite", question: "Apakah kamu membuka situs judi?", advice: "Membuka situs judi memicu rasa penasaran. Blokir situs tersebut." },
];

export default function RecoveryChallenge14() {
    const { user, isLoading: userLoading, mutate: mutateUser } = useUser();
    const { progress, isLoading: progressLoading, mutate: mutateProgress } = useProgress();

    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
    const [showAchievement, setShowAchievement] = useState<{ title: string; description?: string } | null>(null);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [checkInAnswers, setCheckInAnswers] = useState<Record<string, boolean | null>>({
        didGamble: null, feltLikeDepositing: null, openedGamblingSite: null,
    });
    const [checkInSaving, setCheckInSaving] = useState(false);

    const isLoading = userLoading || progressLoading;

    const nextDay = useMemo(() => {
        if (!user) return 1;
        return Math.min(user.cleanDays + 1, 14);
    }, [user]);

    const challengePhase = useMemo(() => {
        if (!user) return { lv: 0, name: "Beginner" };
        const days = user.cleanDays;
        if (days >= 14) return { lv: 14, name: "New Path Mastery" };
        if (days >= 13) return { lv: 13, name: "Personal Insight" };
        if (days >= 11) return { lv: 12, name: "Decision Logic" };
        if (days >= 9) return { lv: 10, name: "Behavior Analysis" };
        if (days >= 7) return { lv: 8, name: "Trigger Detection" };
        if (days >= 5) return { lv: 6, name: "Cognitive Skill" };
        if (days >= 4) return { lv: 4, name: "Pattern Detection" };
        if (days >= 3) return { lv: 3, name: "Exploration" };
        if (days >= 2) return { lv: 2, name: "Memory" };
        return { lv: 1, name: "Awareness" };
    }, [user]);

    const handleSubmitCheckIn = async () => {
        const allAnswered = CHECK_IN_QUESTIONS.every(q => checkInAnswers[q.key] !== null);
        if (!allAnswered) return alert("Jawab semua pertanyaan.");

        setCheckInSaving(true);
        try {
            const res = await fetch("/api/user/daily-checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(checkInAnswers)
            });
            const json = await res.json();
            if (json.success) {
                mutateUser();
                mutateProgress();
                if (json.data.milestoneAchieved) {
                    const milestoneLabels: Record<number, string> = { 3: "🔥 Bertahan Sepekan Awal", 7: "⭐ Satu Minggu Bersih", 14: "💎 Program Selesai!" };
                    setShowAchievement({
                        title: milestoneLabels[json.data.milestoneAchieved] ?? `${json.data.milestoneAchieved} Hari Bebas Judi`,
                        description: `Streak kamu sekarang ${json.data.streak} hari!`
                    });
                }
                setShowCheckIn(false);
                setSelectedDayIdx(nextDay - 1);
                setShowModal(true);
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
                setShowModal(false);
                setShowAchievement({
                    title: CHALLENGE_CONTENT[nextDay-1].achievement.title,
                    description: `Selamat! Kamu telah menyelesaikan Challenge Day ${nextDay}`
                });
                mutateUser();
                mutateProgress();
            } else {
                alert(json.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 size={40} className="text-accent animate-spin" />
                <p className="text-white/50 font-medium uppercase tracking-widest text-sm animate-pulse">Syncing Recovery Data...</p>
            </div>
        );
    }

    if (!user || !progress) return null;

    const currentCompleted = user.cleanDays;
    const canDoNext = user.canDoNextTask;

    return (
        <div className="space-y-6">
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-[2rem] bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-accent">
                            <span className="text-4xl font-black">{currentCompleted}</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Day</div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-black text-white italic uppercase mb-2">14 Day Recovery Challenge</h1>
                        <p className="text-white/50 text-sm max-w-xl">Ubah pola pikirmu dalam 14 hari melalui refleksi mendalam dan tantangan kognitif.</p>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] font-black text-accent uppercase">Completed: {currentCompleted} / 14</span>
                                <span className="text-sm font-mono font-bold text-white">{progress.completionRate}%</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000" style={{ width: `${progress.completionRate}%` }} />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            if (nextDay > 3 && !user.isPremium) {
                                alert("Day 4+ khusus Premium.");
                                return;
                            }
                            if (!user.hasCheckedInToday) setShowCheckIn(true);
                            else { setSelectedDayIdx(nextDay - 1); setShowModal(true); }
                        }}
                        disabled={!canDoNext || saving || currentCompleted >= 14}
                        className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${!canDoNext || currentCompleted >= 14 ? 'bg-white/5 text-white/20' : 'bg-accent text-black hover:bg-white active:scale-95'}`}
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : currentCompleted >= 14 ? "Complete" : (!canDoNext ? "Locked" : `Mulai Day ${nextDay}`)}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                        {CHALLENGE_CONTENT.map((item, idx) => {
                            const isDone = item.day <= currentCompleted;
                            const isCurrent = item.day === nextDay && canDoNext;
                            return (
                                <button key={idx} onClick={() => { setSelectedDayIdx(idx); setShowModal(true); }} className={`aspect-square rounded-2xl border transition-all flex flex-col items-center justify-center ${isDone ? 'bg-accent/10 border-accent/20 text-accent' : isCurrent ? 'bg-white/10 border-accent text-white' : 'bg-black/20 border-white/5 text-white/20'}`}>
                                    <span className="text-[10px] font-black uppercase">Day</span>
                                    <span className="text-xl font-black">{item.day}</span>
                                    <div className="mt-1">{isDone ? <CheckCircle2 size={14} /> : item.day > nextDay ? <Lock size={12} /> : <PlayCircle size={14} />}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 shadow-xl">
                        <h3 className="text-lg font-black uppercase text-white mb-6 flex items-center gap-2"><Award className="text-amber-400" size={20} /> Achievements</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {CHALLENGE_CONTENT.map((item, idx) => (
                                <div key={idx} className={`aspect-square rounded-2xl flex items-center justify-center ${item.day <= currentCompleted ? 'bg-amber-400/10 border border-amber-400/30 text-amber-400' : 'bg-white/5 text-white/10'}`}>
                                    <Award size={16} />
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>

            <div className="bg-[#0A0F1F] border border-orange-500/20 rounded-3xl p-6">
                <h3 className="text-lg font-black uppercase text-white mb-5 flex items-center gap-2"><Flame className="text-orange-400" size={20} /> Streak: {user.streak} Hari</h3>
                <div className={`p-4 rounded-2xl flex items-center justify-between border ${progress.avgRisk > 60 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                    <span className="text-xs font-bold uppercase">Relapse Risk: {progress.avgRisk}%</span>
                </div>
            </div>

            {showCheckIn && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-[#0D1117] border border-orange-500/30 w-full max-w-lg rounded-[2rem] p-8 space-y-6">
                        <h2 className="text-xl font-black uppercase text-white">Daily Check-In</h2>
                        {CHECK_IN_QUESTIONS.map(q => (
                            <div key={q.key} className="space-y-2">
                                <p className="text-sm font-bold text-white">{q.question}</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setCheckInAnswers(a => ({ ...a, [q.key]: true }))} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${checkInAnswers[q.key] === true ? 'bg-red-500/20 border-red-500' : 'bg-white/5 border-white/10 text-white/40'}`}>Ya</button>
                                    <button onClick={() => setCheckInAnswers(a => ({ ...a, [q.key]: false }))} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${checkInAnswers[q.key] === false ? 'bg-green-500/20 border-green-500' : 'bg-white/5 border-white/10 text-white/40'}`}>Tidak</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleSubmitCheckIn} disabled={checkInSaving || Object.values(checkInAnswers).some(v => v === null)} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase active:scale-95 transition-all">
                            {checkInSaving ? <Loader2 className="animate-spin mx-auto" /> : "Konfirmasi"}
                        </button>
                    </div>
                </div>
            )}

            {showModal && selectedDayIdx !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-[#15151a] border border-white/10 w-full max-w-xl rounded-[3rem] p-8 space-y-6">
                        <h2 className="text-2xl font-black uppercase text-white">{CHALLENGE_CONTENT[selectedDayIdx].title}</h2>
                        <p className="text-white/70 italic border-l-2 border-accent/30 pl-4">{CHALLENGE_CONTENT[selectedDayIdx].description}</p>
                        <div className="p-6 bg-white/5 rounded-3xl"><p className="text-white font-bold">{CHALLENGE_CONTENT[selectedDayIdx].task}</p></div>
                        <div className="flex gap-4">
                            <button onClick={() => setShowModal(false)} className="flex-1 text-white/30 font-black uppercase">Tutup</button>
                            {CHALLENGE_CONTENT[selectedDayIdx].day === nextDay && canDoNext && (
                                <button onClick={handleCompleteTask} disabled={saving} className="flex-[2] bg-accent text-black py-4 rounded-2xl font-black uppercase">{saving ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Selesai"}</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showAchievement && <AchievementPopup achievement={showAchievement} onClose={() => setShowAchievement(null)} />}
        </div>
    );
}
