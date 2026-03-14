"use client";

import { useState, useEffect } from "react";
import { Binary, ArrowLeft, Trophy, Zap, Delete, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

function generateNumber(digits: number) {
    let str = "";
    for (let i = 0; i < digits; i++) str += Math.floor(Math.random() * 10).toString();
    return str;
}

const LEVELS = [4, 6, 8, 16];

export default function NumberMemoryPage() {
    const GAME_NAME = "Number Memory";
    const [phase, setPhase] = useState<"idle" | "memorize" | "recall" | "feedback" | "result">("idle");
    const [level, setLevel] = useState(0);
    const [number, setNumber] = useState("");
    const [userInput, setUserInput] = useState("");
    const [countdown, setCountdown] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
    const [correct, setCorrect] = useState(0);
    const [xpAwarded, setXpAwarded] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);
    
    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit, 
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

    const digits = LEVELS[level] ?? 16;

    const startLevel = () => {
        const num = generateNumber(digits);
        setNumber(num);
        setUserInput("");
        setCountdown(settings.timeLimit);
        setPhase("memorize");
    };

    useEffect(() => {
        if (phase !== "memorize") return;
        if (countdown <= 0) { setPhase("recall"); return; }
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [phase, countdown]);

    const submitAnswer = () => {
        if (userInput === number) {
            const nextCorrect = correct + 1;
            setCorrect(nextCorrect);
            if (level >= LEVELS.length - 1) {
                setPhase("result");
            } else {
                setLevel(l => l + 1);
                setPhase("feedback");
                setTimeout(startLevel, 1500);
            }
        } else {
            setPhase("result");
        }
    };

    const startGame = () => {
        setLevel(0);
        setCorrect(0);
        setXpAwarded(false);
        startLevel();
    };

    const pressKey = (k: string) => {
        if (k === "DEL") setUserInput(i => i.slice(0, -1));
        else if (userInput.length < 20) setUserInput(i => i + k);
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXp = Math.max(1, Math.round(settings.xpReward * (correct / LEVELS.length)));
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Number Memory",
                            xpEarned: earnedXp,
                            score: correct,
                            level: level + (phase === "result" && userInput === number ? 1 : 0)
                        })
                    });
                } catch (error) {
                    console.error("Failed to save memory progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, correct, level, settings]);

    const finalXP = Math.max(1, Math.round(settings.xpReward * (correct / LEVELS.length)));

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
                <Binary size={36} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Number Memory</h1>
            <p className="text-foreground/60 max-w-sm mb-4">Hafal urutan angka selama {settings.timeLimit} detik, lalu ketik ulang. Level meningkat dari 4 digit hingga 16 digit!</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">4 Level</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">4→16 Digit</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-blue-500 text-white font-black rounded-2xl text-lg hover:bg-blue-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-accent mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{correct >= 3 ? "Memori Luar Biasa!" : "Terus Berlatih!"}</h2>
            <p className="text-foreground/60 mb-2">Level tercapai: <span className="text-white font-bold">{correct}</span> dari {LEVELS.length}</p>
            <p className="text-foreground/60 mb-6">Berhasil hapal angka hingga <span className="text-white font-bold">{correct > 0 ? LEVELS[correct - 1] : 0} digit</span></p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-blue-400" />
                <span className="font-bold text-white">+{finalXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <p className="text-foreground/50 text-sm">Level {level + 1} / {LEVELS.length} — {digits} Digit</p>
                    <div className="flex gap-1 justify-center mt-2">
                        {LEVELS.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i <= level ? "bg-accent" : "bg-primary/20"}`} />
                        ))}
                    </div>
                </div>

                {/* Display Card */}
                <div className="bg-[#050812] border border-primary/20 rounded-3xl p-8 text-center mb-6 min-h-[140px] flex flex-col items-center justify-center">
                    {phase === "memorize" ? (
                        <>
                            <p className="text-foreground/40 text-xs mb-3 uppercase tracking-wider">Hafal dalam {countdown}...</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {number.split("").map((d, i) => (
                                    <span key={i} className="text-3xl font-black text-blue-400 w-10 text-center">{d}</span>
                                ))}
                            </div>
                        </>
                    ) : phase === "recall" ? (
                        <>
                            <p className="text-foreground/40 text-xs mb-3 uppercase tracking-wider">Ketik ulang angka yang kamu lihat!</p>
                            <div className="flex flex-wrap justify-center gap-2 min-h-[48px]">
                                {userInput.split("").map((d, i) => (
                                    <span key={i} className="text-2xl font-black text-white w-8 text-center border-b-2 border-accent">{d}</span>
                                ))}
                                {userInput.length === 0 && <span className="text-foreground/20 text-lg">—</span>}
                            </div>
                        </>
                    ) : (
                        <p className="text-accent font-bold animate-pulse">Bersiap...</p>
                    )}
                </div>

                {/* Numpad */}
                {phase === "recall" && (
                    <>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {["1","2","3","4","5","6","7","8","9"].map(k => (
                                <button key={k} onClick={() => pressKey(k)} className="py-4 bg-primary/10 border border-primary/20 rounded-xl text-xl font-bold hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">{k}</button>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <button onClick={() => pressKey("DEL")} className="py-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all"><Delete size={20} className="text-red-400" /></button>
                            <button onClick={() => pressKey("0")} className="py-4 bg-primary/10 border border-primary/20 rounded-xl text-xl font-bold hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all">0</button>
                            <button onClick={submitAnswer} disabled={userInput.length === 0} className="py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 disabled:opacity-40 transition-all">✓</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
