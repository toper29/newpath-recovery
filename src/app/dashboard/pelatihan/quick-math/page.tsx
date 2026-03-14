"use client";

import { useState, useEffect, useCallback } from "react";
import { Calculator, ArrowLeft, CheckCircle2, XCircle, Trophy, Zap } from "lucide-react";
import Link from "next/link";

function generateQuestion() {
    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a: number, b: number;
    if (op === "+") { a = Math.floor(Math.random() * 50) + 5; b = Math.floor(Math.random() * 50) + 5; }
    else if (op === "-") { a = Math.floor(Math.random() * 50) + 25; b = Math.floor(Math.random() * 25) + 1; }
    else { a = Math.floor(Math.random() * 12) + 2; b = Math.floor(Math.random() * 12) + 2; }
    const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
    return { question: `${a} ${op} ${b} = ?`, answer };
}

const TOTAL_ROUNDS = 10;
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";
import { Loader2 } from "lucide-react";

export default function QuickMathPage() {
    const GAME_NAME = "Quick Math";
    const [phase, setPhase] = useState<"idle" | "playing" | "result">("idle");
    const [currentQ, setCurrentQ] = useState(generateQuestion());
    const [userAnswer, setUserAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [xpAwarded, setXpAwarded] = useState(false);
    
    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit,
        totalRounds: 10
    });
    const [loadingSettings, setLoadingSettings] = useState(true);

    useEffect(() => {
        fetch(`/api/user/game-settings?gameName=${GAME_NAME}`)
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data) {
                    setSettings({
                        xpReward: json.data.xpReward || UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
                        timeLimit: json.data.timeLimit || UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit,
                        totalRounds: 10
                    });
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoadingSettings(false));
    }, []);

    const nextQuestion = useCallback(() => {
        if (round >= settings.totalRounds) {
            setPhase("result");
            return;
        }
        setRound(r => r + 1);
        setCurrentQ(generateQuestion());
        setUserAnswer("");
        setTimeLeft(settings.timeLimit);
        setFeedback(null);
    }, [round, settings]);

    useEffect(() => {
        if (phase !== "playing" || feedback) return;
        if (timeLeft <= 0) {
            setFeedback("wrong");
            setTimeout(nextQuestion, 1000);
            return;
        }
        const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
        return () => clearTimeout(t);
    }, [phase, timeLeft, feedback, nextQuestion]);

    const submitAnswer = () => {
        if (feedback) return;
        const correct = parseInt(userAnswer) === currentQ.answer;
        setFeedback(correct ? "correct" : "wrong");
        if (correct) setScore(s => s + 1);
        setTimeout(nextQuestion, 800);
    };

    const startGame = () => {
        setPhase("playing");
        setRound(1);
        setScore(0);
        setCurrentQ(generateQuestion());
        setUserAnswer("");
        setTimeLeft(settings.timeLimit);
        setFeedback(null);
        setXpAwarded(false);
    };

    const handleXP = async () => {
        if (!xpAwarded) {
            setXpAwarded(true);
            try {
                await fetch("/api/user/game-finish", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gameName: "Quick Math",
                        xpEarned: settings.xpReward,
                        score: score
                    })
                });
            } catch (error) {
                console.error("Failed to save math progress:", error);
            }
        }
    };

    useEffect(() => { if (phase === "result") handleXP(); }, [phase]);

    const percentage = Math.round((score / settings.totalRounds) * 100);

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-yellow-500" size={48} />
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6">
                <Calculator size={36} className="text-yellow-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Quick Math</h1>
            <p className="text-foreground/60 max-w-sm mb-2">Jawab {settings.totalRounds} soal matematika dalam {settings.timeLimit} detik. Mengalihkan impuls dengan aktivasi otak kiri.</p>
            <div className="flex gap-3 mt-4 mb-8">
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">{settings.totalRounds} Soal</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">{settings.timeLimit} Detik / Soal</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-yellow-500 text-[#040814] font-black rounded-2xl text-lg hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                Mulai Challenge →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${percentage >= 70 ? "bg-accent/20 text-accent" : "bg-orange-500/20 text-orange-400"}`}>
                <Trophy size={36} />
            </div>
            <h2 className="text-3xl font-extrabold mb-2">{percentage >= 70 ? "Otak Tajam!" : "Terus Latihan!"}</h2>
            <p className="text-foreground/60 mb-6">Kamu menjawab benar <span className="text-white font-bold">{score}/{TOTAL_ROUNDS}</span> soal</p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-yellow-400" />
                <span className="font-bold text-white">+{settings.xpReward} XP</span>
                <span className="text-foreground/50 text-sm">diperoleh!</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-yellow-500 text-[#040814] font-bold rounded-xl hover:bg-yellow-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between text-sm text-foreground/50 mb-6">
                    <span>Soal {round} / {TOTAL_ROUNDS}</span>
                    <span className={`font-bold ${feedback === "correct" ? "text-green-400" : feedback === "wrong" ? "text-red-400" : "text-foreground/50"}`}>✓ {score} Benar</span>
                </div>

                {/* Timer Ring */}
                <div className="flex justify-center mb-8">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-black transition-colors ${
                        timeLeft <= 2 ? "border-red-500 text-red-400" : timeLeft <= 3 ? "border-yellow-500 text-yellow-400" : "border-accent text-accent"
                    }`}>
                        {timeLeft}
                    </div>
                </div>

                {/* Question Card */}
                <div className={`bg-[#050812] border rounded-3xl p-8 text-center mb-6 transition-all ${
                    feedback === "correct" ? "border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]" : 
                    feedback === "wrong" ? "border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]" : 
                    "border-primary/20"
                }`}>
                    {feedback ? (
                        <div className="flex flex-col items-center gap-2">
                            {feedback === "correct" ? <CheckCircle2 size={40} className="text-green-400" /> : <XCircle size={40} className="text-red-400" />}
                            <span className="text-lg font-bold">{feedback === "correct" ? "Benar!" : `Jawaban: ${currentQ.answer}`}</span>
                        </div>
                    ) : (
                        <>
                            <p className="text-foreground/50 text-sm mb-4 uppercase tracking-wider font-bold">Berapa hasilnya?</p>
                            <p className="text-4xl font-black text-white tracking-tight">{currentQ.question}</p>
                        </>
                    )}
                </div>

                {/* Input */}
                {!feedback && (
                    <>
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && submitAnswer()}
                            autoFocus
                            placeholder="Ketik jawaban..."
                            className="w-full bg-foreground/5 border border-primary/30 rounded-2xl py-4 px-5 text-foreground text-center text-xl font-bold focus:outline-none focus:border-accent transition-all mb-4"
                        />
                        <button
                            onClick={submitAnswer}
                            disabled={!userAnswer}
                            className="w-full py-4 bg-yellow-500 text-[#040814] font-black rounded-2xl hover:bg-yellow-400 transition-all disabled:opacity-40"
                        >
                            Jawab
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
