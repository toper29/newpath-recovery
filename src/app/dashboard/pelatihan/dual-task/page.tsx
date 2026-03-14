"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, ArrowLeft, Trophy, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

interface Bubble {
    id: number;
    x: number;
    y: number;
    visible: boolean;
}

export default function DualTaskPage() {
    const GAME_NAME = "Dual Task";
    const [phase, setPhase] = useState<"idle" | "playing" | "result">("idle");
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [numbers, setNumbers] = useState<number[]>([]);
    const [currentNum, setCurrentNum] = useState<number | null>(null);
    const [userCount, setUserCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
    const [numsSeen, setNumsSeen] = useState(0);
    const [xpAwarded, setXpAwarded] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);
    const nextId = useRef(0);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward,
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit, // Seconds
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
                    setTimeLeft(json.data.timeLimit || UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoadingSettings(false));
    }, []);

    // Bubble toggle logic
    useEffect(() => {
        if (phase !== "playing") return;
        const interval = setInterval(() => {
            setBubbles(prev => {
                // Randomly toggle visibility of up to 3 bubbles
                return prev.map(b => ({
                    ...b,
                    visible: Math.random() > 0.4
                }));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    // Number flash logic
    useEffect(() => {
        if (phase !== "playing") return;
        const interval = setInterval(() => {
            const n = Math.floor(Math.random() * 9) + 1;
            setCurrentNum(n);
            setNumsSeen(x => x + 1);
            setTimeout(() => setCurrentNum(null), 700);
        }, 1800);
        return () => clearInterval(interval);
    }, [phase]);

    // Countdown
    useEffect(() => {
        if (phase !== "playing") return;
        if (timeLeft <= 0) { setPhase("result"); return; }
        const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
        return () => clearTimeout(t);
    }, [phase, timeLeft]);

    const startGame = () => {
        // Create initial bubbles
        const initialBubbles: Bubble[] = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 75,
            y: 10 + Math.random() * 75,
            visible: true,
        }));
        setBubbles(initialBubbles);
        nextId.current = 5;
        setNumbers([]);
        setUserCount(0);
        setCorrectCount(0);
        setClicks(0);
        setTimeLeft(settings.timeLimit || 30);
        setNumsSeen(0);
        setCurrentNum(null);
        setXpAwarded(false);
        setPhase("playing");
    };

    const clickBubble = (id: number) => {
        setClicks(c => c + 1);
        setBubbles(prev => prev.map(b => b.id === id ? { ...b, visible: !b.visible } : b));
    };

    const submitCount = (n: number) => {
        setUserCount(n);
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXP = clicks >= 15 ? settings.xpReward : Math.max(1, Math.round(settings.xpReward * (clicks / 15)));
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Dual Task",
                            xpEarned: earnedXP,
                            score: clicks,
                            level: 1
                        })
                    });
                } catch (error) {
                    console.error("Failed to save dual task progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, clicks, settings]);

    const finalXP = clicks >= 10 ? settings.xpReward : Math.max(1, Math.round(settings.xpReward * (clicks / 15)));

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-pink-500" size={48} />
                <span className="ml-4 text-pink-500 font-bold uppercase tracking-widest animate-pulse">Menyiapkan Fokus...</span>
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-6">
                <Layers size={36} className="text-pink-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Dual Task Challenge</h1>
            <p className="text-foreground/60 max-w-md mb-4">Klik lingkaran biru yang muncul dan hilang, <span className="text-white font-bold">sekaligus</span> hitung angka yang tiba-tiba muncul. Melatih multitasking otak!</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20">{settings.timeLimit} Detik</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">2 Tugas Sekaligus</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-pink-500 text-white font-black rounded-2xl text-lg hover:bg-pink-400 transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-pink-400 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{clicks >= 15 ? "Multi-Tasker Sejati!" : "Terus Berlatih!"}</h2>
            <div className="flex gap-6 mb-6">
                <div className="text-center">
                    <span className="block text-3xl font-black text-pink-400">{clicks}</span>
                    <span className="text-xs text-foreground/50 uppercase">Klik Bubble</span>
                </div>
                <div className="text-center">
                    <span className="block text-3xl font-black text-accent">{numsSeen}</span>
                    <span className="text-xs text-foreground/50 uppercase">Angka Muncul</span>
                </div>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-pink-400" /><span className="font-bold text-white">+{finalXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col items-center px-4 pt-4">
            <div className="w-full max-w-lg">
                {/* HUD */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <span className="text-2xl font-black text-pink-400">{clicks}</span>
                        <p className="text-xs text-foreground/40">Klik</p>
                    </div>
                    <div className={`text-2xl font-black px-4 py-1 rounded-full border ${timeLeft <= 10 ? "text-red-400 border-red-500/40 bg-red-500/10" : "text-accent border-accent/30 bg-accent/10"}`}>
                        {timeLeft}s
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-black text-accent">{numsSeen}</span>
                        <p className="text-xs text-foreground/40">Angka</p>
                    </div>
                </div>

                {/* Instructions */}
                <p className="text-xs text-center text-foreground/50 mb-3">
                    👆 Klik lingkaran yang <span className="text-accent font-bold">muncul</span> → dan hitung angka yang muncul di tengah!
                </p>

                {/* Flash Number */}
                <div className="h-16 flex items-center justify-center mb-2">
                    {currentNum !== null && (
                        <span className="text-6xl font-black text-yellow-400 animate-bounce">{currentNum}</span>
                    )}
                </div>

                {/* Bubble Arena */}
                <div className="relative bg-[#050812] border border-primary/20 rounded-3xl overflow-hidden" style={{ height: "300px" }}>
                    {bubbles.map(b => b.visible && (
                        <button
                            key={b.id}
                            onClick={() => clickBubble(b.id)}
                            style={{ left: `${b.x}%`, top: `${b.y}%` }}
                            className="absolute w-12 h-12 rounded-full bg-accent/70 border-2 border-accent shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 active:scale-90 transition-all -translate-x-1/2 -translate-y-1/2"
                        />
                    ))}
                    {bubbles.every(b => !b.visible) && (
                        <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-sm">Tunggu lingkaran muncul...</div>
                    )}
                </div>
                <p className="text-center text-xs text-foreground/40 mt-3">Lingkaran muncul dan hilang secara acak — klik semua yang kelihatan!</p>
            </div>
        </div>
    );
}
