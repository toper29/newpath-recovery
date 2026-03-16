"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, BrainCircuit, PenLine, Target, Heart } from "lucide-react";
import Link from "next/link";

interface RelapseRiskData {
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    reasons: string[];
    suggestedActions: {
        label: string;
        link: string;
    }[];
}

export default function RelapseIntervention() {
    const [riskData, setRiskData] = useState<RelapseRiskData | null>(null);
    const [dismissed, setDismissed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchRisk = async () => {
            try {
                const res = await fetch("/api/user/relapse-risk");
                const json = await res.json();
                if (json.success && json.data) {
                    setRiskData(json.data);
                    // Show popup for HIGH risk, notification for MEDIUM
                    if (json.data.riskLevel === "HIGH") {
                        setShowPopup(true);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch relapse risk", err);
            }
        };

        fetchRisk();
    }, []);

    if (!riskData || dismissed) return null;

    const getIcon = (label: string) => {
        if (label.includes("Kognitif")) return <BrainCircuit size={18} />;
        if (label.includes("Jurnal")) return <PenLine size={18} />;
        if (label.includes("Challenge")) return <Target size={18} />;
        return <Heart size={18} />;
    };

    return (
        <>
            {/* Soft Notification for MEDIUM Risk */}
            {riskData.riskLevel === "MEDIUM" && !showPopup && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-lg"
                >
                    <div className="bg-[#0A0F1F]/95 backdrop-blur-xl border border-accent/20 rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Heart size={20} className="animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white/90 text-sm font-medium leading-relaxed">
                                "Kami menyadari akhir-akhir ini kamu kurang aktif. Ingatlah alasan mengapa kamu memulai perjalanan pemulihan ini."
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {riskData.suggestedActions.map((action, i) => (
                                    <Link 
                                        key={i} 
                                        href={action.link}
                                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase text-white/60 tracking-widest transition-all"
                                    >
                                        {action.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => setDismissed(true)}
                            className="shrink-0 p-1 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Gentle Pop-up for HIGH Risk */}
            <AnimatePresence>
                {showPopup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#0A0F1F] border border-accent/20 w-full max-w-md rounded-[3rem] p-10 relative overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.2)]"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                            
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-[2rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                                    <Heart size={40} className="text-accent animate-pulse" />
                                </div>
                                
                                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Pemulihan butuh kesabaran</h2>
                                
                                <p className="text-white/60 text-sm mb-8 font-medium leading-relaxed">
                                    "Pemulihan terkadang memang sulit. Apakah kamu ingin mencoba latihan kognitif singkat atau tantangan harian hari ini?"
                                </p>

                                <div className="w-full space-y-3">
                                    {riskData.suggestedActions.map((action, i) => (
                                        <Link 
                                            key={i} 
                                            href={action.link}
                                            className="w-full py-4 px-6 flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.5rem] transition-all group"
                                            onClick={() => setShowPopup(false)}
                                        >
                                            <span className="text-xs font-black text-white/80 uppercase tracking-widest flex items-center gap-3">
                                                {getIcon(action.label)}
                                                {action.label}
                                            </span>
                                            <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Target size={14} className="text-accent" />
                                            </div>
                                        </Link>
                                    ))}
                                    
                                    <button 
                                        onClick={() => setShowPopup(false)}
                                        className="w-full py-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white/40 transition-colors"
                                    >
                                        Mungkin Nanti
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
