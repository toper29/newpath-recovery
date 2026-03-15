"use client";

import { useState, useEffect } from "react";
import { ClipboardCheck, ArrowRight, RefreshCcw } from "lucide-react";

const QUESTIONS = [
    "Apakah Anda pernah menggunakan uang simpanan / tabungan untuk bermain slot?",
    "Apakah Anda terus bermain untuk 'menang kembali' (chasing losses) uang yang kalah?",
    "Apakah Anda pernah berbohong kepada keluarga/teman tentang aktivitas bermain Anda?",
    "Apakah judi slot membuat Anda tidak produktif bekerja/belajar?",
    "Apakah Anda pernah merencanakan pinjol (pinjaman online) untuk modal main?"
];

export default function AddictionTest() {
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const [showResult, setShowResult] = useState(false);
    const [saving, setSaving] = useState(false);
    const [lastTestDate, setLastTestDate] = useState<Date | null>(null);
    const [canTest, setCanTest] = useState(true);

    useEffect(() => {
        const checkLastTest = async () => {
            try {
                const res = await fetch("/api/user/me");
                const json = await res.json();
                if (json.success && json.data.addictionTests?.length > 0) {
                    const lastDate = new Date(json.data.addictionTests[0].createdAt);
                    setLastTestDate(lastDate);
                    
                    const now = new Date();
                    const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
                    
                    if (diffDays < 14) {
                        setCanTest(false);
                    }
                }
            } catch (err) {
                console.error("Failed to check last test", err);
            }
        };
        checkLastTest();

        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Addiction Test" })
        }).catch(err => console.error("Failed to track feature usage", err));
    }, []);

    const handleAnswer = (index: number, answer: boolean) => {
        setAnswers({ ...answers, [index]: answer });
    };

    const calculateScore = () => {
        const yesCount = Object.values(answers).filter((val) => val === true).length;
        return (yesCount / QUESTIONS.length) * 100;
    };

    const submitTest = async () => {
        if (Object.keys(answers).length === QUESTIONS.length) {
            setSaving(true);
            try {
                await fetch("/api/user/game-finish", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gameName: "Addiction Test",
                        score: calculateScore(),
                        xpEarned: 50
                    })
                });
            } catch (err) {
                console.error("Failed to save test result", err);
            } finally {
                setSaving(false);
                setShowResult(true);
            }
        }
    };

    const getResultInfo = (score: number) => {
        if (score === 0) return { category: "Sangat Aman", req: "Pertahankan gaya hidup sehat Anda", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" };
        if (score <= 30) return { category: "Low Risk", req: "Mulai batasi akses ke konten judi", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" };
        if (score <= 70) return { category: "Moderate Risk", req: "Anda butuh intervensi dan pendampingan", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" };
        return { category: "High Risk", req: "Segera berhenti total dan cari bantuan profesional", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" };
    };

    if (!canTest && !showResult) {
        return (
            <div className="bg-[#0a1120] border border-white/10 rounded-2xl p-8 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ClipboardCheck size={32} />
                </div>
                <h2 className="text-xl font-black text-white uppercase italic mb-2">Evaluasi Belum Tersedia</h2>
                <p className="text-sm text-white/50 mb-6 max-w-sm mx-auto">
                    Anda baru saja melakukan evaluasi pada <span className="text-white font-bold">{lastTestDate?.toLocaleDateString()}</span>. 
                    Evaluasi ulang dapat dilakukan setiap 14 hari untuk melihat perkembangan pemulihan Anda.
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-6 text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Mengapa harus menunggu 14 hari?</h4>
                    <ul className="text-[11px] text-white/40 space-y-2">
                        <li>• Memberikan waktu bagi otak untuk melakukan reset dopamin.</li>
                        <li>• Agar perubahan perilaku benar-benar terukur secara psikologis.</li>
                        <li>• Menghindari bias jawaban "keinginan sesaat".</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background border border-primary/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg text-accent">
                    <ClipboardCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Self-Assessment Test</h2>
                    <p className="text-sm text-foreground/60">Ukur tingkat risiko kecanduan Anda</p>
                </div>
            </div>

            {!showResult ? (
                <div className="space-y-6">
                    {QUESTIONS.map((q, idx) => (
                        <div key={idx} className="bg-foreground/5 border border-foreground/10 rounded-xl p-4">
                            <p className="text-sm md:text-base font-medium text-foreground mb-4">{idx + 1}. {q}</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer(idx, true)}
                                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border ${answers[idx] === true ? "bg-red-500/20 text-red-500 border-red-500/50" : "bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground/40"}`}
                                >
                                    Ya
                                </button>
                                <button
                                    onClick={() => handleAnswer(idx, false)}
                                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all border ${answers[idx] === false ? "bg-green-500/20 text-green-500 border-green-500/50" : "bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground/40"}`}
                                >
                                    Tidak
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={submitTest}
                        disabled={Object.keys(answers).length !== QUESTIONS.length || saving}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-foreground font-bold rounded-xl hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? "Menyimpan..." : (
                            <>Lihat Hasil <ArrowRight size={18} /></>
                        )}
                    </button>
                </div>
            ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" className="stroke-foreground/10" strokeWidth="12" fill="none" />
                            <circle cx="64" cy="64" r="56" className={`stroke-current ${getResultInfo(calculateScore()).color}`} strokeWidth="12" fill="none" strokeDasharray="351.858" strokeDashoffset={351.858 - (351.858 * calculateScore()) / 100} style={{ transition: "stroke-dashoffset 1s ease-in-out" }} strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-black text-foreground">{calculateScore()}%</span>
                        </div>
                    </div>

                    <div className={`w-full text-center p-6 rounded-xl border ${getResultInfo(calculateScore()).bg} ${getResultInfo(calculateScore()).border}`}>
                        <h3 className={`text-2xl font-black uppercase tracking-wider mb-2 ${getResultInfo(calculateScore()).color}`}>
                            {getResultInfo(calculateScore()).category}
                        </h3>
                        <p className="text-foreground/80 font-medium mb-4">
                            Hasil test menunjukkan tingkat ketergantungan: <span className="font-bold">{getResultInfo(calculateScore()).req}</span>
                        </p>
                    </div>

                    <button
                        onClick={() => { setAnswers({}); setShowResult(false); }}
                        className="mt-6 flex items-center justify-center gap-2 py-3 px-6 bg-foreground/10 text-foreground font-medium rounded-xl hover:bg-foreground/20 transition-colors"
                    >
                        <RefreshCcw size={18} />
                        Ulangi Tes
                    </button>
                </div>
            )}
        </div>
    );
}
