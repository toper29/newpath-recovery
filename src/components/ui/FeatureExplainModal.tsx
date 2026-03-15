"use client";

import { useState, useEffect } from "react";
import { Info, CheckCircle2, X } from "lucide-react";

interface FeatureExplainModalProps {
    featureSlug: string;
    title: string;
    description: string;
    benefits: string[];
    onClose?: () => void;
}

export default function FeatureExplainModal({ 
    featureSlug, 
    title, 
    description, 
    benefits,
    onClose 
}: FeatureExplainModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPreference = async () => {
            try {
                const res = await fetch("/api/user/preferences");
                const data = await res.json();
                if (data.success && !data.hideExplanations.includes(featureSlug)) {
                    setIsVisible(true);
                }
            } catch (error) {
                console.error("Error checking preferences:", error);
            } finally {
                setLoading(false);
            }
        };
        checkPreference();
    }, [featureSlug]);

    const handleClose = async () => {
        if (dontShowAgain) {
            try {
                await fetch("/api/user/preferences", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ featureSlug, hide: true })
                });
            } catch (error) {
                console.error("Error saving preference:", error);
            }
        }
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (loading || !isVisible) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-[#0a1120] border border-white/10 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-secondary/20 rounded-2xl text-secondary">
                        <Info size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic">
                            {title}
                        </h2>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                            Panduan Fitur & Manfaat
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-sm text-white/70 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">
                            Manfaat Utama:
                        </h3>
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-secondary/30 transition-colors">
                                <CheckCircle2 size={18} className="text-secondary shrink-0" />
                                <span className="text-[13px] text-white/80 leading-snug">{benefit}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                                className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-secondary focus:ring-secondary focus:ring-offset-0"
                            />
                            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Jangan tampilkan penjelasan ini lagi</span>
                        </label>

                        <button 
                            onClick={handleClose}
                            className="w-full py-4 bg-secondary text-accent font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        >
                            Saya Mengerti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
