"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Award, Play, Loader2 } from "lucide-react";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

// Icons for the cards
const icons = ["🍎", "🚀", "💎", "🎸", "🏆", "🍕", "🌟", "🔥"];

export default function MemoryCardGame() {
    const GAME_NAME = "Memory Card";
    const [cards, setCards] = useState<{id: number, icon: string, isFlipped: boolean, isMatched: boolean}[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [pairsMatched, setPairsMatched] = useState(0);
    const [timeLeft, setTimeLeft] = useState(UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
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

    const initializeGame = () => {
        const shuffled = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((icon, id) => ({ id, icon, isFlipped: false, isMatched: false }));
        
        setCards(shuffled);
        setFlippedIndices([]);
        setPairsMatched(0);
        setTimeLeft(settings.timeLimit);
        setIsGameOver(false);
        setXpEarned(0);
        setIsPlaying(true);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0 && !isGameOver) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && isPlaying) {
            handleGameOver(false);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, isGameOver]);

    const handleCardClick = (index: number) => {
        if (!isPlaying || isGameOver || cards[index].isMatched || cards[index].isFlipped || flippedIndices.length === 2) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        if (newFlippedIndices.length === 2) {
            const [firstIndex, secondIndex] = newFlippedIndices;
            if (cards[firstIndex].icon === cards[secondIndex].icon) {
                // Match
                setTimeout(() => {
                    const matchedCards = [...newCards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;
                    setCards(matchedCards);
                    setFlippedIndices([]);
                    const newPairs = pairsMatched + 1;
                    setPairsMatched(newPairs);
                    
                    if (newPairs === 8) {
                        handleGameOver(true);
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...newCards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;
                    setCards(resetCards);
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const handleGameOver = async (success: boolean) => {
        setIsPlaying(false);
        setIsGameOver(true);
        let earnedXp = 0;
        if (success) {
            // Calculate XP (Base setting.xpReward + Time bonus proportional)
            const timeBonus = Math.floor((timeLeft / settings.timeLimit) * (settings.xpReward * 0.5));
            earnedXp = settings.xpReward + timeBonus;
        } else {
            earnedXp = Math.max(2, Math.floor(settings.xpReward * 0.2)); // 20% pity XP
        }
        setXpEarned(earnedXp);

        // Send to API
        try {
            await fetch("/api/user/game-finish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameName: "Memory Card",
                    xpEarned: earnedXp,
                    score: pairsMatched,
                    level: 1
                })
            });
        } catch (error) {
            console.error("Failed to save game progress:", error);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={48} />
                <span className="ml-4 text-accent font-bold tracking-widest uppercase animate-pulse">Memuat Konfigurasi...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-primary/20 pb-6">
                <div>
                    <Link href="/dashboard/pelatihan" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-bold mb-4">
                        <ArrowLeft size={16} /> Kembali ke Hub
                    </Link>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight italic uppercase">Memory <span className="text-accent">Card Game</span></h1>
                    <p className="text-foreground/60 mt-1">Cari pasangan gambar yang sama. Fokus dan latih daya ingat visual Anda.</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#0A0F1F] border border-primary/20 px-4 py-2 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-wider">Pasangan</span>
                        <span className="text-2xl font-black text-white">{pairsMatched} <span className="text-sm text-foreground/40 font-bold">/ 8</span></span>
                    </div>
                    <div className="bg-[#0A0F1F] border border-primary/20 px-4 py-2 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-wider">Waktu</span>
                        <span className={`text-2xl font-black ${timeLeft < 30 ? 'text-orange-500' : 'text-accent'}`}>{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-[2.5rem] p-6 md:p-8 relative min-h-[500px] flex flex-col shadow-2xl">
                
                {!isPlaying && !isGameOver && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
                        <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                            <LayoutGridIcon size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Siap Melatih Fokus?</h2>
                        <p className="text-foreground/60 mb-8">Temukan 8 pasangan kartu secepat mungkin sebelum waktu {formatTime(settings.timeLimit)} habis. Semakin cepat, semakin banyak XP yang didapat.</p>
                        <button 
                            onClick={initializeGame}
                            className="bg-accent text-[#040814] hover:bg-white font-black py-4 px-10 rounded-2xl flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)] uppercase"
                        >
                            <Play fill="currentColor" size={18} /> Mulai Tantangan
                        </button>
                    </div>
                )}

                {isPlaying && !isGameOver && (
                    <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
                        {cards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                disabled={card.isMatched || isGameOver}
                                className={`aspect-square rounded-2xl flex items-center justify-center text-3xl md:text-5xl transition-all duration-300 transform perspective-1000 ${
                                    card.isFlipped || card.isMatched 
                                        ? 'bg-accent/10 border-2 border-accent text-white rotate-y-180 shadow-[0_0_20px_rgba(56,189,248,0.15)]' 
                                        : 'bg-[#060A14] border-2 border-primary/20 hover:border-accent/40 hover:bg-primary/10 text-transparent'
                                }`}
                            >
                                <span className={card.isFlipped || card.isMatched ? 'opacity-100 scale-100' : 'opacity-0 scale-50 transition-all'}>
                                    {(card.isFlipped || card.isMatched) ? card.icon : "?"}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Game Over Modal overlay */}
                {isGameOver && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center rounded-[2.5rem] z-20 animate-in fade-in duration-300">
                        <div className="bg-[#050812] border border-white/10 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 ${pairsMatched === 8 ? 'bg-accent shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]'}`}>
                                {pairsMatched === 8 ? <Award size={36} /> : <Clock size={36} />}
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{pairsMatched === 8 ? "Tantangan Selesai!" : "Waktu Habis!"}</h3>
                            <p className="text-white/50 text-sm mb-8 leading-relaxed">
                                {pairsMatched === 8 
                                    ? `Luar biasa. Fokus visual Anda sangat tajam. Waktu tersisa: ${formatTime(timeLeft)}.` 
                                    : `Anda berhasil menemukan ${pairsMatched} pasangan. Terus latih fokus Anda.`}
                            </p>
                            
                            <div className="bg-white/5 border border-white/10 w-full p-6 rounded-3xl mb-8">
                                <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] block mb-2">XP Diperoleh</span>
                                <span className="text-4xl font-black text-accent">+{xpEarned} <span className="text-sm font-bold opacity-50">XP</span></span>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <button 
                                    onClick={initializeGame}
                                    className="w-full bg-accent text-[#040814] hover:bg-white font-black py-4 rounded-2xl transition-all uppercase shadow-lg shadow-accent/20"
                                >
                                    Main Lagi
                                </button>
                                <Link 
                                    href="/dashboard/pelatihan"
                                    className="w-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 font-bold py-4 rounded-2xl transition-all uppercase"
                                >
                                    Kembali ke Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Tip */}
            <div className="mt-6 bg-primary/5 border-l-4 border-accent p-4 rounded-r-xl flex items-start gap-4">
                <div className="text-accent mt-0.5">
                    <Award size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm mb-1">Fokus pada proses</h4>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                        Permainan ingatan membantu otak Anda melemahkan jalur saraf impulsif. Tetap tenang dan nikmati proses pemulihan Anda. Kecepatan akan meningkat seiring waktu.
                    </p>
                </div>
            </div>
        </div>
    );
}

function LayoutGridIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    )
}
