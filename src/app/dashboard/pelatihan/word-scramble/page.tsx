"use client";

import { useState, useEffect, useCallback } from "react";
import { SpellCheck, ArrowLeft, Trophy, Zap, RefreshCw, Lightbulb, Loader2 } from "lucide-react";
import Link from "next/link";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

const WORDS = [
    "HEART", "BRAIN", "FOCUS", "PEACE", "TRUST", "GRACE", "BRAVE", "CLEAR",
    "POWER", "LIGHT", "VITAL", "SHINE", "BLOOM", "DREAM", "FORGE", "SURGE",
    "UNITY", "PRIME", "SPARK", "RENEW", "QUEST", "ARISE", "CRAFT", "VALLY",
    "STAND", "MEND", "STILL", "FRESH", "AWAKE", "CLIMB"
];

function scramble(word: string): string {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result = arr.join("");
    return result === word ? scramble(word) : result;
}

const TOTAL_ROUNDS = 8;

export default function WordScramblePage() {
    const GAME_NAME = "Word Scramble";
    const [phase, setPhase] = useState<"idle" | "playing" | "result">("idle");
    const [wordList] = useState(() => [...WORDS].sort(() => Math.random() - 0.5).slice(0, TOTAL_ROUNDS));
    const [round, setRound] = useState(0);
    const [scrambled, setScrambled] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [remaining, setRemaining] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [hint, setHint] = useState(false);
    const [timeLeft, setTimeLeft] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
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
                    setTimeLeft(json.data.timeLimit || UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
                }
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoadingSettings(false));
    }, []);

    const loadWord = useCallback((idx: number) => {
        const w = wordList[idx];
        const sc = scramble(w);
        setScrambled(sc);
        setRemaining(sc.split("").map((ch: string, i: number) => ({ ch, id: i })) as any);
        setSelected([]);
        setFeedback(null);
        setHint(false);
        setTimeLeft(settings.timeLimit);
    }, [wordList, settings.timeLimit]);

    useEffect(() => {
        if (phase === "playing") loadWord(round);
    }, [round, phase]);

    useEffect(() => {
        if (phase !== "playing" || feedback) return;
        if (timeLeft <= 0) {
            setFeedback("wrong");
            setTimeout(() => {
                if (round + 1 >= TOTAL_ROUNDS) setPhase("result");
                else { setRound(r => r + 1); }
            }, 1000);
            return;
        }
        const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft, phase, feedback, round]);

    const pickLetter = (idx: number, ch: string) => {
        if (feedback) return;
        setSelected(s => [...s, ch]);
        setRemaining(r => r.filter((_: any, i: number) => i !== idx));
        const newSelected = [...selected, ch];
        if (newSelected.length === wordList[round].length) {
            const formed = newSelected.join("");
            if (formed === wordList[round]) {
                setFeedback("correct");
                setScore(s => s + 1);
            } else {
                setFeedback("wrong");
            }
            setTimeout(() => {
                if (round + 1 >= TOTAL_ROUNDS) setPhase("result");
                else setRound(r => r + 1);
            }, 1000);
        }
    };

    const reset = () => loadWord(round);

    const startGame = () => {
        setPhase("playing");
        setRound(0);
        setScore(0);
        setXpAwarded(false);
    };

    useEffect(() => {
        const handleXP = async () => {
            if (phase === "result" && !xpAwarded) {
                setXpAwarded(true);
                const earnedXp = Math.round((score / TOTAL_ROUNDS) * settings.xpReward);
                try {
                    await fetch("/api/user/game-finish", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            gameName: "Word Scramble",
                            xpEarned: earnedXp,
                            score: score
                        })
                    });
                } catch (error) {
                    console.error("Failed to save scramble progress:", error);
                }
            }
        };
        handleXP();
    }, [phase, xpAwarded, score, settings]);

    const finalXP = Math.round((score / TOTAL_ROUNDS) * settings.xpReward);

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-green-500" size={48} />
                <span className="ml-4 text-green-500 font-bold uppercase tracking-widest animate-pulse">Menyiapkan Kata...</span>
            </div>
        );
    }

    if (phase === "idle") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                <SpellCheck size={36} className="text-green-400" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2 uppercase italic tracking-tighter">Word <span className="text-green-500">Scramble</span></h1>
            <p className="text-foreground/60 max-w-sm mb-4">Susun kembali huruf yang diacak menjadi kata yang benar. {settings.timeLimit} detik per kata!</p>
            <div className="flex gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">{TOTAL_ROUNDS} Kata</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">{settings.timeLimit} Detik/Kata</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">+{settings.xpReward} XP</span>
            </div>
            <button onClick={startGame} className="px-8 py-4 bg-green-500 text-[#040814] font-black rounded-2xl text-lg hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] uppercase">
                Mulai →
            </button>
            <Link href="/dashboard/pelatihan" className="mt-4 text-sm text-foreground/40 hover:text-foreground flex items-center gap-1"><ArrowLeft size={14}/> Kembali</Link>
        </div>
    );

    if (phase === "result") return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <Trophy size={48} className="text-green-400 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{score >= 6 ? "Verbal Master!" : "Terus Berlatih!"}</h2>
            <p className="text-foreground/60 mb-6">Benar: <span className="text-white font-bold">{score}/{TOTAL_ROUNDS}</span> kata</p>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3">
                <Zap size={20} className="text-green-400" /><span className="font-bold text-white">+{finalXP} XP</span>
            </div>
            <div className="flex gap-4">
                <button onClick={startGame} className="px-6 py-3 bg-green-500 text-[#040814] font-bold rounded-xl hover:bg-green-400 transition-all">Main Lagi</button>
                <Link href="/dashboard/pelatihan" className="px-6 py-3 bg-primary/20 border border-primary/40 text-foreground font-bold rounded-xl hover:bg-primary/40 transition-all">Kembali</Link>
            </div>
        </div>
    );

    const word = wordList[round];

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-lg">
                {/* HUD */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-foreground/50">Kata {round + 1} / {TOTAL_ROUNDS}</span>
                    <span className={`text-lg font-black px-4 py-1 rounded-full border ${timeLeft <= 10 ? "text-red-400 border-red-500/40 bg-red-500/10" : "text-accent border-accent/30 bg-accent/10"}`}>{timeLeft}s</span>
                    <span className="text-sm text-foreground/50">✓ {score}</span>
                </div>

                {/* Answer area - letters selected so far */}
                <div className="bg-[#050812] border border-primary/20 rounded-3xl p-6 mb-6 min-h-[100px] flex flex-col items-center justify-center">
                    {hint && <p className="text-xs text-accent/60 mb-2">Petunjuk: kata berhubungan dengan <span className="font-bold">"pemulihan"</span></p>}
                    {feedback === "correct" && <p className="text-2xl font-black text-green-400">✅ {word}</p>}
                    {feedback === "wrong" && <p className="text-2xl font-black text-red-400">❌ Jawaban: {word}</p>}
                    {!feedback && (
                        <div className="flex gap-2 flex-wrap justify-center">
                            {selected.map((ch, i) => (
                                <div key={i} className="w-12 h-12 bg-accent/20 border-2 border-accent/50 rounded-xl flex items-center justify-center text-2xl font-black text-white">{ch}</div>
                            ))}
                            {Array.from({ length: word.length - selected.length }).map((_, i) => (
                                <div key={i} className="w-12 h-12 border-2 border-dashed border-primary/30 rounded-xl" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Scrambled letters to tap */}
                {!feedback && (
                    <>
                        <div className="flex gap-3 flex-wrap justify-center mb-6">
                            {(remaining as any[]).map((obj: any, i: number) => (
                                <button key={i} onClick={() => pickLetter(i, obj.ch ?? obj)} className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-xl text-xl font-black hover:bg-accent/20 hover:border-accent/50 hover:text-accent transition-all active:scale-95">
                                    {obj.ch ?? obj}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary/20 transition-all">
                                <RefreshCw size={14} /> Reset
                            </button>
                            <button onClick={() => setHint(true)} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary/20 transition-all">
                                <Lightbulb size={14} /> Petunjuk
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
