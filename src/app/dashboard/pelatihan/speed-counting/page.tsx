"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Timer, Play, Award, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

interface Dot {
    id: number;
    top: string;
    left: string;
}

export default function SpeedCountingPage() {
    const GAME_NAME = "Speed Counting";
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
    const [dots, setDots] = useState<Dot[]>([]);
    const [phase, setPhase] = useState<"ready" | "show" | "input" | "feedback">("ready");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<{correct: boolean, diff: number} | null>(null);
    const [currentDotCount, setCurrentDotCount] = useState(0);
    const [xpEarned, setXpEarned] = useState(0);
    const [streak, setStreak] = useState(0);
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
    
    const inputRef = useRef<HTMLInputElement>(null);

    // Main Game Timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0 && !isGameOver) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && isPlaying) {
            handleGameOver();
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, isGameOver]);

    // Focus input when phase is 'input'
    useEffect(() => {
        if (phase === "input" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [phase]);

    // Generate Dots Logic
    const generateDots = () => {
        // Base max dots increases with score
        const minDots = 5;
        const maxDots = Math.min(25, 8 + Math.floor(score / 500) * 3);
        const count = Math.floor(Math.random() * (maxDots - minDots + 1)) + minDots;
        
        setCurrentDotCount(count);

        const newDots: Dot[] = [];
        for (let i = 0; i < count; i++) {
            // Keep dots within 10% - 90% to avoid edges
            newDots.push({
                id: i,
                top: `${Math.floor(Math.random() * 80) + 10}%`,
                left: `${Math.floor(Math.random() * 80) + 10}%`
            });
        }
        setDots(newDots);
        setPhase("show");

        // Show dots for 1.5 - 2.5 seconds depending on difficulty
        const showTime = Math.max(1000, 2500 - Math.floor(score / 1000) * 300);
        
        setTimeout(() => {
            if (isPlaying && !isGameOver) {
                setPhase("input");
            }
        }, showTime);
    };

    const startGame = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setScore(0);
        setTimeLeft(settings.timeLimit);
        setXpEarned(0);
        setStreak(0);
        generateDots();
    };

    const handleGameOver = async () => {
        setIsPlaying(false);
        setIsGameOver(true);
        setPhase("ready");
        // Calculate XP (Base 5 + Score bonus, max settings.xpReward)
        const bonus = Math.floor(score / 200);
        const earnedXp = Math.min(settings.xpReward, 5 + bonus);
        setXpEarned(earnedXp);

        try {
            await fetch("/api/user/game-finish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameName: "Speed Counting",
                    xpEarned: earnedXp,
                    score: score
                })
            });
        } catch (error) {
            console.error("Failed to save speed counting progress:", error);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (phase !== "input" || !answer) return;

        const guess = parseInt(answer, 10);
        const diff = Math.abs(guess - currentDotCount);
        const isCorrect = diff === 0;

        let pointsAwarded = 0;
        if (isCorrect) {
            pointsAwarded = 100 + (streak * 20); // Bonus points for streak
            setStreak(prev => prev + 1);
        } else if (diff <= 2) {
            pointsAwarded = 50; // Close answer
            setStreak(0);
        } else {
            setStreak(0);
        }

        setScore(prev => prev + pointsAwarded);
        setFeedback({ correct: isCorrect, diff });
        setPhase("feedback");
        setAnswer("");

        // Next round
        setTimeout(() => {
            if (timeLeft > 0) generateDots();
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-primary/20 pb-6">
                <div>
                    <Link href="/dashboard/pelatihan" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-bold mb-4">
                        <ArrowLeft size={16} /> Kembali ke Hub
                    </Link>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <Timer className="text-accent" /> Speed Counting
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#0A0F1F] border border-primary/20 px-4 py-2 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-wider mb-1">Score</span>
                        <span className="text-2xl font-black text-white leading-none">{score.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#0A0F1F] border border-primary/20 px-4 py-2 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-wider mb-1">Waktu</span>
                        <span className={`text-2xl font-black leading-none ${timeLeft < 15 ? 'text-orange-500 animate-pulse' : 'text-accent'}`}>{timeLeft}s</span>
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-6 md:p-8 relative min-h-[450px] flex flex-col items-center justify-center">
                
                {!isPlaying && !isGameOver && (
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-6">
                            <DotIcon size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Estimasi Visual & Reaksi</h2>
                        <p className="text-foreground/60 mb-8 leading-relaxed">
                            Hitung jumlah titik yang muncul dalam sekejap mata. Permainan ini melatih otak untuk memproses informasi visual dengan cepat, mengurangi ketergantungan pada pemikiran lambat yang sering dimanipulasi oleh desain judi.
                        </p>
                        <button 
                            onClick={startGame}
                            className="bg-accent text-[#040814] hover:bg-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] mx-auto uppercase"
                        >
                            <Play fill="currentColor" size={18} /> Mulai ({settings.timeLimit} Detik)
                        </button>
                    </div>
                )}

                {isPlaying && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        
                        {/* Dots Display Area */}
                        <div className="w-full max-w-2xl h-64 bg-[#050812] border border-primary/10 rounded-2xl relative overflow-hidden mb-8 shadow-inner">
                            {phase === "show" && dots.map(dot => (
                                <div 
                                    key={dot.id}
                                    className="absolute w-4 h-4 md:w-5 md:h-5 bg-accent rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                                    style={{ top: dot.top, left: dot.left }}
                                />
                            ))}
                            {phase === "input" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-foreground/30 text-6xl font-black">?</span>
                                </div>
                            )}
                            {phase === "feedback" && feedback && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060A14]">
                                    {feedback.correct ? (
                                        <div className="text-center text-accent animate-bounce">
                                            <CheckCircle2 size={64} className="mx-auto mb-2" />
                                            <span className="text-2xl font-bold">Sempurna!</span>
                                            {streak > 1 && <span className="block text-sm text-yellow-400 font-bold mt-1">{streak}x Streak!</span>}
                                        </div>
                                    ) : (
                                        <div className="text-center text-orange-500">
                                            <XCircle size={64} className="mx-auto mb-2" />
                                            <span className="text-xl font-bold block mb-1">Salah!</span>
                                            <span className="text-sm font-medium text-foreground/70">
                                                Jawaban: <span className="text-white font-bold">{currentDotCount}</span> (Selisih {feedback.diff})
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="w-full max-w-sm relative">
                            <input
                                ref={inputRef}
                                type="number"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                disabled={phase !== "input"}
                                placeholder={phase === "input" ? "Berapa jumlahnya?" : "Tunggu..."}
                                className="w-full bg-[#060A14] border-2 border-primary/30 rounded-xl py-4 flex px-6 text-center text-xl font-bold text-white focus:outline-none focus:border-accent disabled:opacity-50 transition-colors"
                                autoFocus
                            />
                            {phase === "input" && (
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent text-[#040814] px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
                                    Submit
                                </button>
                            )}
                        </form>
                    </div>
                )}

                {/* Game Over Modal */}
                {isGameOver && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-3xl z-20">
                        <div className="bg-[#0A0F1F] border border-primary/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Waktu Habis!</h3>
                            <p className="text-foreground/60 text-sm mb-6">
                                Anda berhasil mengumpulkan skor <span className="text-white font-bold">{score.toLocaleString()}</span>. Reaksi visual Anda semakin membaik!
                            </p>
                            
                            <div className="bg-[#060A14] border border-primary/20 w-full p-4 rounded-xl mb-6">
                                <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-widest block mb-1">XP Diperoleh</span>
                                <span className="text-3xl font-black text-accent">+{xpEarned} <span className="text-sm font-bold">XP</span></span>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <button 
                                    onClick={startGame}
                                    className="w-full bg-accent text-[#040814] hover:bg-white font-bold py-3 rounded-xl transition-all"
                                >
                                    Main Lagi
                                </button>
                                <Link 
                                    href="/dashboard/pelatihan"
                                    className="w-full bg-foreground/5 text-foreground hover:text-white hover:bg-foreground/10 font-bold py-3 rounded-xl transition-all"
                                >
                                    Kembali ke Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DotIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <circle cx="6" cy="6" r="3"/>
            <circle cx="18" cy="6" r="3"/>
            <circle cx="12" cy="18" r="3"/>
        </svg>
    )
}
