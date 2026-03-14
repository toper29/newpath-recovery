"use client";

import { useState, useEffect } from "react";
import { 
    Trophy, Zap, Clock, ShieldCheck, 
    Calculator, MousePointer2, Type, 
    Hash, Repeat, Binary, LayoutGrid, 
    Wind, Layers, RotateCcw, Loader2,
    CheckCircle2, AlertCircle
} from "lucide-react";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

interface GameThreshold {
    id: string;
    gameName: string;
    minScore: number;
    xpReward: number;
    timeLimit: number;
}

const GAME_METADATA: Record<string, { icon: any, color: string, desc: string }> = {
    "Quick Math": { icon: Calculator, color: "text-yellow-400", desc: "Aritmatika cepat otak kiri" },
    "Memory Card": { icon: MousePointer2, color: "text-accent", desc: "Daya ingat visual & pola" },
    "Number Memory": { icon: Hash, color: "text-purple-400", desc: "Short-term digit recall" },
    "Sequence Memory": { icon: Repeat, color: "text-blue-400", desc: "Urutan kognitif & fokus" },
    "Word Scramble": { icon: Type, color: "text-green-400", desc: "Analisa bahasa & kata" },
    "Speed Counting": { icon: Binary, color: "text-orange-400", desc: "Kecepatan pemrosesan otak" },
    "Grid Memory": { icon: LayoutGrid, color: "text-pink-400", desc: "Pemetaan posisi sel" },
    "Calm Breathing": { icon: Wind, color: "text-emerald-400", desc: "Regulasi emosi & fokus" },
    "Dual Task": { icon: Layers, color: "text-indigo-400", desc: "Multitasking & pembagian atensi" },
    "Reverse Number": { icon: RotateCcw, color: "text-cyan-400", desc: "Manipulasi data mental" },
};

export default function GameThresholdsPage() {
    const [thresholds, setThresholds] = useState<GameThreshold[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchThresholds();
    }, []);

    const fetchThresholds = async () => {
        try {
            const res = await fetch("/api/admin/thresholds");
            const json = await res.json();
            if (json.success) setThresholds(json.data);
        } catch (err) {
            console.error("Failed to load thresholds", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (gameName: string, minScore: number, xpReward: number, timeLimit: number) => {
        setSaving(gameName);
        try {
            const res = await fetch("/api/admin/thresholds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameName, minScore, xpReward, timeLimit })
            });
            const json = await res.json();
            if (json.success) {
                setSuccess(gameName);
                setTimeout(() => setSuccess(null), 3000);
                setThresholds(prev => {
                    const exists = prev.find(t => t.gameName === gameName);
                    if (exists) {
                        return prev.map(t => t.gameName === gameName ? json.data : t);
                    }
                    return [...prev, json.data].sort((a, b) => a.gameName.localeCompare(b.gameName));
                });
            }
        } catch (err) {
            console.error("Failed to save threshold", err);
        } finally {
            setSaving(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-accent">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="text-sm font-bold tracking-widest uppercase animate-pulse">Memuat Konfigurasi...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative overflow-hidden bg-primary/10 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 mb-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                            <ShieldCheck size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                            Game <span className="text-accent">Thresholds</span>
                        </h1>
                    </div>
                    <p className="text-white/50 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
                        Pusat kendali pengaturan pelatihan kognitif. Atur tingkat kesulitan, durasi sesi, dan imbalan XP untuk memotivasi pemulihan pengguna secara optimal.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(GAME_METADATA).map((gameName) => {
                    const threshold = thresholds.find(t => t.gameName === gameName) || {
                        id: 'temp-' + gameName,
                        gameName,
                        ...(UNIVERSAL_DEFAULTS[gameName] || { minScore: 0, xpReward: 15, timeLimit: 60 })
                    };
                    const Meta = GAME_METADATA[gameName];

                    return (
                        <div key={threshold.id} className="group bg-[#050812] border border-white/5 rounded-[2rem] p-6 space-y-6 hover:border-accent/30 transition-all hover:translate-y-[-4px] shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${Meta.color} group-hover:scale-110 transition-transform`}>
                                        <Meta.icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-black text-white uppercase tracking-tighter text-lg leading-none">{gameName}</h3>
                                            {thresholds.find(t => t.gameName === gameName) ? (
                                                <span className="text-[8px] bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest whitespace-nowrap">Custom</span>
                                            ) : (
                                                <span className="text-[8px] bg-white/5 text-white/30 border border-white/10 px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest whitespace-nowrap">Default</span>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">{Meta.desc}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative group/input">
                                        <label className="text-[10px] uppercase font-bold text-white/40 mb-2 block tracking-widest flex items-center gap-2">
                                            <Trophy size={10} /> Ambang Skor Min.
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="number" 
                                                defaultValue={threshold.minScore}
                                                onBlur={(e) => handleUpdate(gameName, parseInt(e.target.value), threshold.xpReward, threshold.timeLimit)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent group-hover/input:border-white/20 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group/input">
                                            <label className="text-[10px] uppercase font-bold text-white/40 mb-2 block tracking-widest flex items-center gap-2 text-accent">
                                                <Zap size={10} /> Reward XP
                                            </label>
                                            <input 
                                                type="number" 
                                                defaultValue={threshold.xpReward}
                                                onBlur={(e) => handleUpdate(gameName, threshold.minScore, parseInt(e.target.value), threshold.timeLimit)}
                                                className="w-full bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 text-sm font-bold text-accent outline-none focus:border-accent transition-all shadow-inner"
                                            />
                                        </div>
                                        <div className="relative group/input">
                                            <label className="text-[10px] uppercase font-bold text-white/40 mb-2 block tracking-widest flex items-center gap-2 text-blue-400">
                                                <Clock size={10} /> Durasi (Detik)
                                            </label>
                                            <input 
                                                type="number" 
                                                defaultValue={threshold.timeLimit}
                                                onBlur={(e) => handleUpdate(gameName, threshold.minScore, threshold.xpReward, parseInt(e.target.value))}
                                                className="w-full bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3 text-sm font-bold text-blue-400 outline-none focus:border-blue-500 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                {saving === gameName ? (
                                    <span className="text-[10px] text-accent flex items-center gap-1.5 font-bold uppercase tracking-wider">
                                        <Loader2 size={12} className="animate-spin" /> Menyimpan...
                                    </span>
                                ) : success === gameName ? (
                                    <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                                        <CheckCircle2 size={12} /> Sync Berhasil
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-white/20 italic font-medium uppercase tracking-[0.1em]">Auto-save on exit</span>
                                )}
                                
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-40" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {Object.keys(GAME_METADATA).length === 0 && (
                <div className="bg-[#050812] border border-dashed border-white/10 rounded-[2.5rem] p-20 text-center">
                    <AlertCircle size={64} className="mx-auto text-white/10 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2 italic">Data Kosong</h3>
                    <p className="text-white/30 font-medium">Belum ada modul kognitif yang terdaftar.</p>
                </div>
            )}
        </div>
    );
}

