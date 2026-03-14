"use client";
import SpinWheelModal from "@/components/features/SpinWheelModal";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function EmergencyWheelPage() {
    const [isOpen, setIsOpen] = useState(false);

    // Auto open on page load for immediate crisis
    useEffect(() => {
        setIsOpen(true);
        // Track feature usage
        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Emergency Wheel" })
        }).catch(err => console.error("Failed to track feature usage", err));
    }, []);

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12">
                {/* Left Side: Illustration & CTA */}
                <div className="flex-1 text-center md:text-left space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-black uppercase tracking-widest animate-bounce">
                        <AlertTriangle size={14} /> Urgent Intervention
                    </div>
                    
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-tight mb-4">
                            Emergency <span className="text-red-500">Wheel</span> of Reality
                        </h1>
                        <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
                            Berhenti sejenak. Sebelum emosi menguasai logikamu, biarkan roda ini mengingatkanmu tentang realita di balik sistem yang dirancang untuk membuatmu kalah.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group relative px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-[2rem] shadow-[0_20px_50px_rgba(220,38,38,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                        >
                            LUNCURKAN WHEEL <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-4 text-white/40">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white">85%</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest">Safe Landing</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white">0%</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest">Financial Risk</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white">100%</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest">Reality Check</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Informational Cards */}
                <div className="w-full md:w-80 space-y-4">
                    <div className="bg-[#0A0F1F] border border-white/5 p-6 rounded-[2rem] shadow-xl hover:border-red-500/30 transition-colors group">
                        <Shield className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-white font-black uppercase tracking-tighter mb-2">Sistem 'Near-Miss'</h3>
                        <p className="text-white/40 text-xs leading-relaxed">
                            Tahukah kamu? Mesin dirancang untuk sering menampilkan hasil "hampir menang" agar kamu merasa kemenangan sudah dekat. Padahal itu hanya algoritma.
                        </p>
                    </div>

                    <div className="bg-[#0A0F1F] border border-white/5 p-6 rounded-[2rem] shadow-xl hover:border-accent/30 transition-colors group">
                        <Zap className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-white font-black uppercase tracking-tighter mb-2">Intervensi Cepat</h3>
                        <p className="text-white/40 text-xs leading-relaxed">
                            Waktu 5 detik saat roda berputar adalah waktu krusial bagi otak untuk kembali ke mode logis (Prefrontal Cortex) dari mode emosional.
                        </p>
                    </div>

                    <div className="bg-[#0A0F1F] border border-white/5 p-6 rounded-[2rem] shadow-xl hover:border-white/20 transition-colors group">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black text-white">TIP</span>
                            <h3 className="text-white font-black uppercase tracking-tighter">Emergency Tips</h3>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed">
                            Tarik napas dalam 4 detik, tahan 4 detik, buang 4 detik. Lakukan ini sambil menunggu roda berhenti.
                        </p>
                    </div>
                </div>
            </div>

            <SpinWheelModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

import { ArrowRight, Shield, Zap } from "lucide-react";
