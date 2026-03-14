"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, Wind, Calculator, Binary, AlignJustify, SpellCheck, Timer, Grip, RefreshCcw, Layers, Loader2 } from "lucide-react";
import { UNIVERSAL_DEFAULTS } from "@/lib/game-defaults";

export default function PelatihanHubPage() {
    const [gameSettings, setGameSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/user/game-settings")
            .then(res => res.json())
            .then(json => {
                if (json.success) setGameSettings(json.data);
            })
            .catch(err => console.error("Failed to fetch game settings:", err))
            .finally(() => setLoading(false));
    }, []);

    const gameDefinitions = [
        {
            name: "Memory Card",
            title: "Memory Card",
            description: "Melatih daya ingat visual dan pengenalan pola.",
            icon: <LayoutGrid size={40} className="text-accent/60 mb-6 group-hover:text-accent transition-colors" />,
            href: "/dashboard/pelatihan/memory-card",
            difficulty: "Medium",
            color: "from-accent/5 to-transparent"
        },
        {
            name: "Calm Breathing",
            title: "Calm Breathing",
            description: "Menurunkan stress & kecemasan secara instan.",
            icon: <Wind size={40} className="text-blue-400/60 mb-6 group-hover:text-blue-400 transition-colors" />,
            href: "/dashboard/pelatihan/calm-breathing",
            difficulty: "Easy",
            color: "from-blue-500/5 to-transparent"
        },
        {
            name: "Quick Math",
            title: "Quick Math",
            description: "Meningkatkan fokus angka dan logika cepat.",
            icon: <Calculator size={40} className="text-yellow-400/60 mb-6 group-hover:text-yellow-400 transition-colors" />,
            href: "/dashboard/pelatihan/quick-math",
            difficulty: "Medium",
            color: "from-yellow-500/5 to-transparent"
        },
        {
            name: "Number Memory",
            title: "Number Memory",
            description: "Melatih memori jangka pendek melalui digit.",
            icon: <Binary size={40} className="text-blue-400/60 mb-6 group-hover:text-blue-400 transition-colors" />,
            href: "/dashboard/pelatihan/number-memory",
            difficulty: "Medium",
            color: "from-blue-500/5 to-transparent"
        },
        {
            name: "Sequence Memory",
            title: "Sequence Memory",
            description: "Melatih urutan kognitif dan ketelitian.",
            icon: <AlignJustify size={40} className="text-purple-400/60 mb-6 group-hover:text-purple-400 transition-colors" />,
            href: "/dashboard/pelatihan/sequence-memory",
            difficulty: "Medium",
            color: "from-purple-500/5 to-transparent"
        },
        {
            name: "Word Scramble",
            title: "Word Scramble",
            description: "Meningkatkan fokus bahasa dan analisa kata.",
            icon: <SpellCheck size={40} className="text-green-400/60 mb-6 group-hover:text-green-400 transition-colors" />,
            href: "/dashboard/pelatihan/word-scramble",
            difficulty: "Easy",
            color: "from-green-500/5 to-transparent"
        },
        {
            name: "Speed Counting",
            title: "Speed Counting",
            description: "Kecepatan pemrosesan otak dan reaksi visual.",
            icon: <Timer size={40} className="text-orange-400/60 mb-6 group-hover:text-orange-400 transition-colors" />,
            href: "/dashboard/pelatihan/speed-counting",
            difficulty: "Easy",
            color: "from-orange-500/5 to-transparent"
        },
        {
            name: "Grid Memory",
            title: "Grid Memory",
            description: "Memori spasial dan pemetaan posisi sel.",
            icon: <Grip size={40} className="text-cyan-400/60 mb-6 group-hover:text-cyan-400 transition-colors" />,
            href: "/dashboard/pelatihan/grid-memory",
            difficulty: "Hard",
            color: "from-cyan-500/5 to-transparent"
        },
        {
            name: "Reverse Number",
            title: "Reverse Number",
            description: "Melatih kelenturan mental dan memori kerja.",
            icon: <RefreshCcw size={40} className="text-orange-400/60 mb-6 group-hover:text-orange-400 transition-colors" />,
            href: "/dashboard/pelatihan/reverse-number",
            difficulty: "Hard",
            color: "from-orange-500/5 to-transparent"
        },
        {
            name: "Dual Task",
            title: "Dual Task Challenge",
            description: "Koordinasi dan multi-fokus kognitif tingkat lanjut.",
            icon: <Layers size={40} className="text-pink-400/60 mb-6 group-hover:text-pink-400 transition-colors" />,
            href: "/dashboard/pelatihan/dual-task",
            difficulty: "Hard",
            color: "from-pink-500/5 to-transparent"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 size={48} className="text-accent animate-spin" />
                <p className="text-accent font-black uppercase tracking-widest animate-pulse">Menghubungkan Saraf...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-3 uppercase tracking-wider">
                        Dark Recovery Mode Aktif
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase italic">
                        Pelatihan <span className="text-accent">Kognitif</span>
                    </h1>
                    <p className="text-foreground/60 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
                        Latih otak Anda untuk mendapatkan kembali kendali penuh. Fokus pada ketenangan dan pemulihan melalui latihan mental terarah.
                    </p>
                </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                {gameDefinitions.map((game, i) => {
                    const setting = gameSettings.find(s => s.gameName === game.name) || {
                        ...(UNIVERSAL_DEFAULTS[game.name] || { xpReward: 15 })
                    };
                    return (
                        <div key={i} className="bg-[#050812] border border-primary/20 hover:border-accent/40 rounded-[2rem] p-6 transition-all group flex flex-col h-full shadow-2xl hover:translate-y-[-4px] relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                            
                            <div className="flex-1 relative z-10">
                                <div className="h-28 mb-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                                    {game.icon}
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                                        game.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                        game.difficulty === "Hard" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                    }`}>{game.difficulty}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20">+{setting.xpReward} XP</span>
                                </div>

                                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tighter italic">{game.title}</h3>
                                <p className="text-xs text-foreground/50 leading-relaxed mb-6 font-medium">{game.description}</p>
                            </div>
                            
                            <Link 
                                href={game.href} 
                                className="bg-white/5 hover:bg-accent hover:text-[#040814] text-white font-black py-4 px-4 rounded-2xl text-center text-xs transition-all flex items-center justify-center gap-2 w-full mt-auto relative z-10 border border-white/10 hover:border-accent uppercase tracking-widest group-hover:scale-[1.02]"
                            >
                                Main Sekarang <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

