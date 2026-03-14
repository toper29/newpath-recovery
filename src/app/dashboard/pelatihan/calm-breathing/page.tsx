"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Square, Settings, Music, Heart, Clock, Wind, Loader2 } from "lucide-react";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "hold_empty";

export default function CalmBreathingPage() {
    const GAME_NAME = "Calm Breathing";
    const [phase, setPhase] = useState<Phase>("idle");
    const [timeLeftInPhase, setTimeLeftInPhase] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [heartRate, setHeartRate] = useState(82);
    const [xpEarned, setXpEarned] = useState(0);
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        xpReward: UNIVERSAL_DEFAULTS[GAME_NAME].xpReward, // Base XP for a full session
        timeLimit: UNIVERSAL_DEFAULTS[GAME_NAME].timeLimit,  // Seconds per phase
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

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (phase !== "idle") {
            interval = setInterval(() => {
                setTotalSeconds(prev => prev + 1);

                // Heart rate simulation
                if (totalSeconds > 0 && totalSeconds % 10 === 0 && heartRate > 60) {
                    setHeartRate(prev => Math.max(60, prev - Math.floor(Math.random() * 3 + 1)));
                }

                setTimeLeftInPhase(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        // Switch phases
                        if (phase === "inhale") {
                            setPhase("hold");
                            return settings.timeLimit;
                        } else if (phase === "hold") {
                            setPhase("exhale");
                            return settings.timeLimit;
                        } else if (phase === "exhale") {
                            setPhase("hold_empty");
                            return settings.timeLimit;
                        } else if (phase === "hold_empty") {
                            setPhase("inhale");
                            
                            // Proportional XP: every full cycle (4 phases * timeLimit) = 1/5th of total reward
                            setXpEarned(prevXp => prevXp + Math.max(1, Math.round(settings.xpReward / 5)));
                            
                            return settings.timeLimit;
                        }
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [phase, totalSeconds, heartRate, settings]);

    const startBreathing = () => {
        setPhase("inhale");
        setTimeLeftInPhase(settings.timeLimit);
        setTotalSeconds(0);
        setHeartRate(85);
        setXpAwarded(false);
        setXpEarned(0);
    };

    const [xpAwarded, setXpAwarded] = useState(false);

    const stopBreathing = async () => {
        const finalXp = xpEarned;
        setPhase("idle");
        
        if (finalXp > 0 && !xpAwarded) {
            setXpAwarded(true);
            try {
                await fetch("/api/user/game-finish", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gameName: "Calm Breathing",
                        xpEarned: finalXp,
                        score: totalSeconds
                    })
                });
            } catch (error) {
                console.error("Failed to save breathing progress:", error);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getPhaseText = () => {
        switch (phase) {
            case "idle": return "Siap Melatih Ketenangan?";
            case "inhale": return "Tarik Napas";
            case "hold": return "Tahan Napas";
            case "exhale": return "Buang Napas";
            case "hold_empty": return "Tahan (Kosong)";
        }
    };

    const getPhaseSubText = () => {
        switch (phase) {
            case "idle": return "Fokus pada lingkaran dan ikuti ritme pernapasan.";
            case "inhale": return "Perlahan melalui hidung";
            case "hold": return "Fokus pada ketenangan";
            case "exhale": return "Perlahan melalui mulut";
            case "hold_empty": return "Relikskan bahu Anda";
        }
    };

    const getCircleScale = () => {
        if (phase === "idle") return "scale-100";
        const durationClass = settings.timeLimit === 4 ? "duration-[4000ms]" : `duration-[${settings.timeLimit * 1000}ms]`;
        if (phase === "inhale") return `scale-150 transition-transform ${durationClass} ease-linear bg-accent/30`;
        if (phase === "hold") return "scale-150 transition-none bg-accent/40";
        if (phase === "exhale") return `scale-75 transition-transform ${durationClass} ease-linear bg-accent/20`;
        if (phase === "hold_empty") return "scale-75 transition-none bg-accent/20";
    };

    if (loadingSettings) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-10 min-h-[85vh] flex flex-col pt-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 w-full border-b border-primary/20 pb-6 shrink-0">
                <div>
                    <Link href="/dashboard/pelatihan" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-bold mb-4">
                        <ArrowLeft size={16} /> Kembali ke Hub
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 italic uppercase">
                        <WindIcon /> Calm <span className="text-accent">Breathing</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#0A0F1F] border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-3">
                        <div className="text-orange-500 animate-pulse"><Heart size={20} fill={phase !== 'idle' ? 'currentColor' : 'none'}/></div>
                        <div>
                            <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-wider block leading-none mb-1">Heart Rate (Sim)</span>
                            <span className="text-xl font-black text-white leading-none">{heartRate} <span className="text-xs text-foreground/40 font-bold">BPM</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breathing Area */}
            <div className="flex-1 bg-[#050812] border border-primary/20 rounded-[2.5rem] p-6 md:p-8 relative flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />

                <div className="text-center mb-12 z-10 min-h-[80px]">
                    <h2 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-3 transition-all uppercase">
                        {getPhaseText()}
                    </h2>
                    <p className="text-accent/60 font-bold tracking-widest uppercase text-xs">
                        {getPhaseSubText()}
                    </p>
                </div>

                <div className="relative w-64 h-64 flex items-center justify-center mb-16">
                    {/* Outline Rings */}
                    <div className="absolute inset-0 border border-primary/10 rounded-full scale-110"></div>
                    <div className="absolute inset-0 border border-primary/20 rounded-full scale-125"></div>
                    <div className="absolute inset-0 border border-primary/5 rounded-full scale-[1.4]"></div>
                    
                    {/* Breathing Circle */}
                    <div 
                        className={`w-36 h-36 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.2)] ${getCircleScale()} ${phase === 'idle' ? 'bg-primary/20 border border-primary/40' : 'border border-accent/50'}`}
                    >
                        {phase !== "idle" && (
                            <span className="text-white/50 font-bold text-xl">{timeLeftInPhase}</span>
                        )}
                    </div>
                </div>

                {/* Status Bar (Duration & XP) */}
                <div className="flex items-center justify-center gap-12 w-full max-w-md border-t border-primary/20 pt-8 z-10">
                    <div className="text-center">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-widest block mb-2">Durasi</span>
                        <span className="text-2xl font-black text-white">{formatTime(totalSeconds)}</span>
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] text-foreground/50 uppercase font-bold tracking-widest block mb-2">XP Didapat</span>
                        <span className="text-2xl font-black text-accent">+{xpEarned}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex justify-center gap-4 z-20">
                    <button className="w-12 h-12 rounded-full bg-foreground/5 text-foreground/50 hover:text-white hover:bg-foreground/10 flex items-center justify-center transition-all">
                        <Music size={18} />
                    </button>
                    
                    {phase === "idle" ? (
                        <button 
                            onClick={startBreathing}
                            className="bg-accent text-[#040814] hover:bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
                        >
                            <Play fill="currentColor" size={24} className="ml-1" />
                        </button>
                    ) : (
                        <button 
                            onClick={stopBreathing}
                            className="bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white w-16 h-16 rounded-full flex items-center justify-center transition-all"
                        >
                            <Square fill="currentColor" size={20} />
                        </button>
                    )}

                    <button className="w-12 h-12 rounded-full bg-foreground/5 text-foreground/50 hover:text-white hover:bg-foreground/10 flex items-center justify-center transition-all">
                        <Settings size={18} />
                    </button>
                </div>
            </div>
            
            {/* Context Tip */}
            <div className="mt-6 text-center max-w-2xl mx-auto">
                <p className="text-xs text-foreground/40 leading-relaxed italic">
                    "Fokus pada pernapasan membantu menggeser aktivitas otak dari Amigdala (pusat emosi dan impuls) ke Korteks Prefrontal (pusat logika dan kontrol diri)."
                </p>
            </div>
        </div>
    );
}

function WindIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M12.8 19.6A2 2 0 1 0 14 16H2"/>
            <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/>
            <path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>
        </svg>
    )
}
