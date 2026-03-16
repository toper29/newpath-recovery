"use client";

import { useState, useEffect } from "react";
import { Info, CheckCircle2, X, Play, HelpCircle } from "lucide-react";

interface SlotOnboardingModalProps {
    onClose: () => void;
    forceShow?: boolean;
}

export default function SlotOnboardingModal({ onClose, forceShow = false }: SlotOnboardingModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (forceShow) {
            setIsVisible(true);
        } else {
            const hidePreference = localStorage.getItem("hideSlotOnboarding");
            if (hidePreference !== "true") {
                setIsVisible(true);
            }
        }
    }, [forceShow]);

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem("hideSlotOnboarding", "true");
        }
        setIsVisible(false);
        onClose();
    };

    if (!mounted || !isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-[#0f0f12] border border-white/10 p-6 md:p-10 rounded-[2.5rem] max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-300 my-8">
                <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-2"
                >
                    <X size={24} />
                </button>

                {/* Header Section */}
                <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 border border-red-500/20">
                        <Info size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">
                            Reality Slot Simulator
                        </h2>
                        <p className="text-[10px] text-red-500/80 font-bold uppercase tracking-[0.2em]">
                            Edukasi Cara Kerja Slot
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Introduction */}
                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                            Fitur ini dibuat untuk membantu Anda memahami bagaimana permainan slot bekerja di balik layar.
                        </p>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed mt-4">
                            Banyak permainan slot menggunakan sistem matematika seperti <span className="text-white font-bold italic">RTP (Return to Player)</span> dan probabilitas untuk menentukan kapan pemain menang atau kalah.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cara Menggunakan Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                <HelpCircle size={14} className="text-red-500" />
                                Cara Menggunakan
                            </h3>
                            <div className="space-y-3">
                                {[
                                    "Atur nilai RTP untuk melihat perubahan peluang",
                                    "Jalankan simulasi spin",
                                    "Perhatikan jumlah kemenangan yang muncul",
                                    "Lihat kerugian jangka panjang yang nyata"
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <span className="text-[10px] font-mono font-bold text-red-500 bg-red-500/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-red-500/20">
                                            {idx + 1}
                                        </span>
                                        <p className="text-[13px] text-white/60 group-hover:text-white transition-colors">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Manfaat Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                Manfaat Simulator
                            </h3>
                            <div className="space-y-3">
                                {[
                                    "Pahami desain sistem slot",
                                    "Kemenangan adalah acak & sistematis",
                                    "Sadar risiko nyata permainan slot",
                                    "Perspektif realistis peluang menang"
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-[13px] text-white/60 group-hover:text-white transition-colors">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <p className="text-[11px] text-white/30 italic text-center px-4 leading-relaxed">
                        Simulator ini bukan permainan judi, melainkan alat edukasi untuk menunjukkan realita cara kerja slot.
                    </p>

                    {/* Controls */}
                    <div className="pt-6 border-t border-white/5 flex flex-col gap-5">
                        <label className="flex items-center gap-3 cursor-pointer group self-center">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-5 h-5 border-2 border-white/10 rounded-lg bg-white/5 peer-checked:bg-red-500 peer-checked:border-red-500 transition-all flex items-center justify-center">
                                    {dontShowAgain && <X size={14} className="text-white" />}
                                </div>
                            </div>
                            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Jangan tampilkan penjelasan ini lagi</span>
                        </label>

                        <button 
                            onClick={handleClose}
                            className="w-full py-5 bg-red-600 text-white font-black text-sm uppercase tracking-widest rounded-3xl hover:bg-red-500 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_rgba(239,68,68,0.2)] flex items-center justify-center gap-3"
                        >
                            Saya Mengerti & Mulai Simulasi
                            <Play size={18} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
