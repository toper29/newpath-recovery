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

    useEffect(() => {
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
                        xpEarned: 50 // 50 XP for completing the test
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
        if (score === 0) return { category: "Aman", req: "Pertahankan", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" };
        if (score <= 40) return { category: "Low Risk", req: "Waspada", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" };
        if (score <= 60) return { category: "Medium Risk", req: "Butuh Intervensi", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" };
        return { category: "High Risk", req: "Segera Berhenti total", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" };
    };

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
                            Tindakan yang disarankan: <span className="font-bold">{getResultInfo(calculateScore()).req}</span>
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
