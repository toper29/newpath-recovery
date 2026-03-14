"use client";

import { useState, useEffect } from "react";
import { Grip, ArrowLeft, Trophy, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

const GRID_SIZE = 4;

function generatePattern(count: number) {
    const cells = new Set<number>();
    while (cells.size < count) cells.add(Math.floor(Math.random() * GRID_SIZE * GRID_SIZE));
    return cells;
}

export default function GridMemoryPage() {
    const GAME_NAME = "Grid Memory";
    const [phase, setPhase] = useState<"idle" | "show" | "recall" | "feedback" | "result">("idle");
    const [level, setLevel] = useState(1);
    const [pattern, setPattern] = useState<Set<number>>(new Set());
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [maxLevel, setMaxLevel] = useState(0);
    const [xpAwarded, setXpAwarded] = useState(false);
    const [feedbackOk, setFeedbackOk] = useState(true);
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit, // Show time in seconds
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

    const cellCount = Math.min(3 + level, 10);

    const showLevel = (lvl: number) => {
        const p = generatePattern(Math.min(3 + lvl, 10));
        setPattern(p);
        setSelected(new Set());
        setPhase("show");
    };

    useEffect(() => {
        if (phase !== "show") return;
        const t = setTimeout(() => setPhase("recall"), settings.timeLimit * 1000);
        return () => clearTimeout(t);
    }, [phase, level, settings.timeLimit]);

    const toggle = (idx: number) => {
        if (phase !== "recall") return;
        setSelected(s => {
            const n = new Set(s);
            n.has(idx) ? n.delete(idx) : n.add(idx);
            return n;
        });
    };

    const checkAnswer = () => {
        const correct = [...pattern].every(i => selected.has(i)) && selected.size === pattern.size;
        setFeedbackOk(correct);
        setPhase("feedback");
        if (correct) {
            setMaxLevel(level);
            setTimeout(() => {
                if (level >= 8) { setPhase("result"); }
                else { showLevel(level + 1); setLevel(l => l + 1); }
            }, 1000);
        } else {
            setTimeout(() => setPhase("result"), 1200);
        }
    };

    const startGame = () => {
        setLevel(1);
        setMaxLevel(0);
        setXpAwarded(false);
        showLevel(1);
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXP = Math.min(settings.xpReward, Math.max(1, Math.round((maxLevel / 8) * settings.xpReward)));
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Grid Memory",
                            xpEarned: earnedXP,
                            score: maxLevel,
                            level: level
                        })
                    });
                } catch (error) {
                    console.error("Failed to save grid progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, maxLevel, level, settings]);

    const earnedXP = Math.min(settings.xpReward, Math.max(1, Math.round((maxLevel / 8) * settings.xpReward)));

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} />
                <span className="text-cyan-500 font-black tracking-widest animate-pulse">MEMINDAI DATABASE...</span>
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
                <Grip size={36} className="text-cyan-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Grid Memory</h1>
            <p className="text-foreground/60 max-w-sm mb-4">Perhatikan posisi kotak berwarna selama {settings.timeLimit} detik lalu ingat posisinya. Melatih memori spasial!</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">Grid 4×4</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">Max 8 Level</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-cyan-500 text-[#040814] font-black rounded-2xl text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-cyan-400 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{maxLevel >= 4 ? "Spatial Master!" : "Terus Berlatih!"}</h2>
            <p className="text-foreground/60 mb-6">Level tertinggi: <span className="text-white font-bold">{maxLevel}</span> dengan {Math.min(3 + maxLevel, 10)} kotak dihafal</p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-cyan-400" /><span className="font-bold text-white">+{earnedXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-cyan-500 text-[#040814] font-bold rounded-xl hover:bg-cyan-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <p className="text-foreground/50 text-sm">Level {level} — Hafal {cellCount} kotak</p>
                    {phase === "show" && <p className="text-accent text-sm font-bold animate-pulse mt-1">Perhatikan...</p>}
                    {phase === "recall" && <p className="text-yellow-400 text-sm font-bold mt-1">Klik kotak yang tadi menyala!</p>}
                    {phase === "feedback" && <p className={`text-sm font-bold mt-1 ${feedbackOk ? "text-green-400" : "text-red-400"}`}>{feedbackOk ? "✅ Benar!" : "❌ Salah!"}</p>}
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
                        const isPattern = pattern.has(i);
                        const isSelected = selected.has(i);
                        return (
                            <button
                                key={i}
                                onClick={() => toggle(i)}
                                disabled={phase !== "recall"}
                                className={`w-full aspect-square rounded-xl transition-all duration-200 ${
                                    phase === "show" && isPattern
                                        ? "bg-accent shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-105"
                                        : phase === "feedback" && isPattern
                                        ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                                        : phase === "feedback" && isSelected && !isPattern
                                        ? "bg-red-500/50"
                                        : isSelected
                                        ? "bg-cyan-400/50 border-2 border-cyan-400"
                                        : "bg-primary/10 border border-primary/20 hover:bg-primary/20"
                                }`}
                            />
                        );
                    })}
                </div>

                {phase === "recall" && (
                    <button onClick={checkAnswer} className="w-full py-4 bg-cyan-500 text-[#040814] font-black rounded-2xl hover:bg-cyan-400 transition-all">
                        Konfirmasi Jawaban
                    </button>
                )}
            </div>
        </div>
    );
}
