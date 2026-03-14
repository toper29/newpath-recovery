"use client";

import { useState, useEffect } from "react";
import { AlignJustify, ArrowLeft, Trophy, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

const SYMBOLS = ["🔴", "🔵", "🟢", "🟡", "🟠", "🟣"];

function generateSequence(length: number) {
    return Array.from({ length }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
}

export default function SequenceMemoryPage() {
    const GAME_NAME = "Sequence Memory";
    const [phase, setPhase] = useState<"idle" | "show" | "recall" | "feedback" | "result">("idle");
    const [sequence, setSequence] = useState<string[]>([]);
    const [userSequence, setUserSequence] = useState<string[]>([]);
    const [level, setLevel] = useState(1);
    const [showIdx, setShowIdx] = useState(0);
    const [maxLevel, setMaxLevel] = useState(0);
    const [xpAwarded, setXpAwarded] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: 700, // Display speed in ms (derived or hardcoded if not in defaults)
    });

    useEffect(() => {
        fetch(`/api/user/game-settings?gameName=${GAME_NAME}`)
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data) {
                    setSettings({
                        xpReward: json.data.xpReward || UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
                        timeLimit: 700 // Base speed is 700ms, not controlled by threshold right now
                    });
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoadingSettings(false));
    }, []);

    const startLevel = (lvl: number) => {
        const seq = generateSequence(lvl + 2);
        setSequence(seq);
        setUserSequence([]);
        setShowIdx(0);
        setPhase("show");
    };

    useEffect(() => {
        if (phase !== "show") return;
        if (showIdx >= sequence.length) {
            setTimeout(() => setPhase("recall"), 600);
            return;
        }
        const t = setTimeout(() => setShowIdx(i => i + 1), settings.timeLimit);
        return () => clearTimeout(t);
    }, [phase, showIdx, sequence, settings.timeLimit]);

    const pick = (sym: string) => {
        if (phase !== "recall") return;
        const next = [...userSequence, sym];
        setUserSequence(next);

        if (next[next.length - 1] !== sequence[next.length - 1]) {
            setFeedbackMsg("❌ Salah!");
            setPhase("feedback");
            setTimeout(() => setPhase("result"), 1200);
            return;
        }

        if (next.length === sequence.length) {
            setFeedbackMsg("✅ Benar!");
            setPhase("feedback");
            setMaxLevel(level);
            if (level >= 8) {
                setTimeout(() => setPhase("result"), 1000);
            } else {
                setTimeout(() => {
                    setLevel(l => l + 1);
                    startLevel(level);
                }, 1200);
            }
        }
    };

    const startGame = () => {
        setLevel(1);
        setMaxLevel(0);
        setXpAwarded(false);
        startLevel(1);
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXP = Math.min(settings.xpReward, Math.round((maxLevel / 8) * settings.xpReward) + 2);
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Sequence Memory",
                            xpEarned: earnedXP,
                            score: maxLevel,
                            level: level
                        })
                    });
                } catch (error) {
                    console.error("Failed to save sequence progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, maxLevel, level, settings]);

    const earnedXP = Math.min(settings.xpReward, Math.round((maxLevel / 8) * settings.xpReward) + 2);

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={48} />
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
                <AlignJustify size={36} className="text-purple-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Sequence Memory</h1>
            <p className="text-foreground/60 max-w-sm mb-4">Tonton urutan simbol yang muncul, lalu ulangi dengan urutan yang tepat. Semakin lama semakin panjang!</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">Max 10 Level</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">Visual Memory</span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-purple-500 text-white font-black rounded-2xl text-lg hover:bg-purple-400 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-purple-400 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{maxLevel >= 5 ? "Memori Visual Kuat!" : "Terus Berlatih!"}</h2>
            <p className="text-foreground/60 mb-6">Level tertinggi yang dicapai: <span className="text-white font-bold">{maxLevel}</span></p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-purple-400" /><span className="font-bold text-white">+{earnedXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <p className="text-foreground/50 text-sm">Level {level} — Urutan {sequence.length} Simbol</p>
                </div>

                {/* Display Area */}
                <div className="bg-[#050812] border border-primary/20 rounded-3xl p-8 min-h-[120px] flex items-center justify-center text-center mb-6">
                    {phase === "show" ? (
                        <div className="flex gap-4 items-center justify-center">
                            {sequence.map((s, i) => (
                                <span key={i} className={`text-4xl transition-all duration-150 ${i < showIdx ? "opacity-100 scale-110" : "opacity-20 scale-75"}`}>{s}</span>
                            ))}
                        </div>
                    ) : phase === "feedback" ? (
                        <p className="text-2xl font-bold">{feedbackMsg}</p>
                    ) : (
                        <div>
                            <p className="text-foreground/40 text-sm mb-3">Ulangi urutan!</p>
                            <div className="flex gap-2 justify-center flex-wrap">
                                {Array.from({ length: sequence.length }, (_, i) => (
                                    <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${i < userSequence.length ? "bg-primary/20" : "border border-primary/20"}`}>
                                        {userSequence[i] ?? ""}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Symbol Buttons */}
                {phase === "recall" && (
                    <div className="grid grid-cols-3 gap-3">
                        {SYMBOLS.map(sym => (
                            <button key={sym} onClick={() => pick(sym)} className="py-5 bg-primary/10 border border-primary/20 rounded-2xl text-3xl hover:bg-primary/30 hover:scale-105 transition-all active:scale-95">
                                {sym}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
