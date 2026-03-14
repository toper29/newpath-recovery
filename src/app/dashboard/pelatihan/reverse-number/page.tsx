"use client";

import { useState, useEffect } from "react";
import { RefreshCcw, ArrowLeft, Trophy, Zap, Delete, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

const LEVELS = [3, 4, 5, 6, 7, 8];
const SHOW_MS = 3000;

function generateReverseNumber(digits: number) {
    let str = "";
    for (let i = 0; i < digits; i++) str += Math.floor(Math.random() * 10).toString();
    return str;
}

export default function ReverseNumberPage() {
    const GAME_NAME = "Reverse Number";
    const [phase, setPhase] = useState<"idle" | "memorize" | "recall" | "feedback" | "result">("idle");
    const [level, setLevel] = useState(0);
    const [number, setNumber] = useState("");
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(0);
    const [feedbackOk, setFeedbackOk] = useState(true);
    const [xpAwarded, setXpAwarded] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit, // Seconds per sequence
    });

    useEffect(() => {
        fetch(`/api/user/game-settings?gameName=${GAME_NAME}`)
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data) {
                    setSettings({
                        xpReward: json.data.xpReward || UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
                        timeLimit: json.data.timeLimit || UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit
                    });
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoadingSettings(false));
    }, []);

    const digits = LEVELS[level] ?? 8;

    const startLevel = () => {
        const num = generateReverseNumber(digits);
        setNumber(num);
        setUserInput("");
        setPhase("memorize");
    };

    useEffect(() => {
        if (phase !== "memorize") return;
        const t = setTimeout(() => setPhase("recall"), settings.timeLimit * 1000);
        return () => clearTimeout(t);
    }, [phase, level, settings.timeLimit]);

    const check = () => {
        const reversed = number.split("").reverse().join("");
        const ok = userInput === reversed;
        setFeedbackOk(ok);
        setPhase("feedback");
        if (ok) setCorrect(c => c + 1);
        setTimeout(() => {
            if (!ok || level >= LEVELS.length - 1) { setPhase("result"); }
            else { setLevel(l => l + 1); startLevel(); }
        }, 1200);
    };

    const pressKey = (k: string) => {
        if (k === "DEL") setUserInput(i => i.slice(0, -1));
        else if (userInput.length < 12) setUserInput(i => i + k);
    };

    const startGame = () => {
        setLevel(0);
        setCorrect(0);
        setXpAwarded(false);
        setUserInput("");
        startLevel();
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXP = Math.max(1, Math.round((correct / LEVELS.length) * settings.xpReward));
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Reverse Number",
                            xpEarned: earnedXP,
                            score: correct,
                            level: level + 1
                        })
                    });
                } catch (error) {
                    console.error("Failed to save reverse number progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, correct, level, settings]);

    const earnedXP = Math.max(1, Math.round((correct / LEVELS.length) * settings.xpReward));

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-orange-500" size={48} />
                <span className="ml-4 text-orange-500 font-bold uppercase tracking-widest animate-pulse">Menyiapkan Level...</span>
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6">
                <RefreshCcw size={36} className="text-orange-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Reverse Number</h1>
            <p className="text-foreground/60 max-w-sm mb-4">Lihat angka selama {settings.timeLimit} detik, lalu ketik terbalik! Melatih working memory dan fleksibilitas mental.</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">{LEVELS.length} Level</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">3-8 Digit</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl text-lg hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-orange-400 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{correct >= 4 ? "Working Memory Kuat!" : "Terus Berlatih!"}</h2>
            <p className="text-foreground/60 mb-6">Berhasil: <span className="text-white font-bold">{correct}/{LEVELS.length}</span> level</p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-orange-400" /><span className="font-bold text-white">+{earnedXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <p className="text-foreground/50 text-sm">Level {level + 1} / {LEVELS.length} — {digits} Digit</p>
                    <div className="flex gap-1 justify-center mt-2">
                        {LEVELS.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < correct ? "bg-accent" : i === level ? "bg-accent/40" : "bg-primary/20"}`} />)}
                    </div>
                </div>

                <div className={`bg-[#050812] border rounded-3xl p-8 text-center mb-6 min-h-[140px] flex flex-col items-center justify-center transition-all ${
                    phase === "feedback" ? (feedbackOk ? "border-green-500/50" : "border-red-500/50") : "border-primary/20"
                }`}>
                    {phase === "memorize" && (
                        <>
                            <p className="text-foreground/40 text-xs mb-3 uppercase tracking-wider">Hafal angka ini...</p>
                            <div className="flex gap-3 justify-center flex-wrap">
                                {number.split("").map((d, i) => (
                                    <span key={i} className="text-4xl font-black text-orange-400">{d}</span>
                                ))}
                            </div>
                        </>
                    )}
                    {phase === "recall" && (
                        <>
                            <p className="text-foreground/40 text-xs mb-3 uppercase tracking-wider">Ketik angka <span className="text-accent">TERBALIK</span>!</p>
                            <div className="flex gap-2 justify-center min-h-[48px] flex-wrap">
                                {userInput.split("").map((d, i) => (
                                    <span key={i} className="text-2xl font-black text-white border-b-2 border-accent w-8 text-center">{d}</span>
                                ))}
                                {userInput.length === 0 && <span className="text-foreground/20 text-lg">—</span>}
                            </div>
                        </>
                    )}
                    {phase === "feedback" && (
                        <div>
                            <p className={`text-2xl font-black mb-2 ${feedbackOk ? "text-green-400" : "text-red-400"}`}>{feedbackOk ? "✅ Benar!" : "❌ Salah!"}</p>
                            {!feedbackOk && <p className="text-sm text-foreground/60">Jawaban: <span className="text-white font-bold">{number.split("").reverse().join("")}</span></p>}
                        </div>
                    )}
                </div>

                {phase === "recall" && (
                    <>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {["1","2","3","4","5","6","7","8","9"].map(k => (
                                <button key={k} onClick={() => pressKey(k)} className="py-4 bg-primary/10 border border-primary/20 rounded-xl text-xl font-bold hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">{k}</button>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => pressKey("DEL")} className="py-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all"><Delete size={20} className="text-red-400" /></button>
                            <button onClick={() => pressKey("0")} className="py-4 bg-primary/10 border border-primary/20 rounded-xl text-xl font-bold hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">0</button>
                            <button onClick={check} disabled={userInput.length === 0} className="py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-400 disabled:opacity-40 transition-all">✓</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
