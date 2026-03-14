"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function ShameMeter() {
    const [lossAmount, setLossAmount] = useState<number | "">("");
    const [saving, setSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Calculate percentage (0 to 100)
    // Let's say: 
    // 0 - 500k = Aman
    // 500k - 5jt = Mulai Bahaya (30)
    // 5jt - 50jt = Zona Kecanduan (70)
    // > 50jt = Kehancuran Finansial (100)
    useEffect(() => {
        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Shame Meter" })
        }).catch(err => console.error("Failed to track feature usage", err));
    }, []);

    const getMeterData = (amount: number) => {
        if (amount <= 0) return { percent: 0, title: "Aman", color: "bg-green-500", desc: "Anda masih di tahap aman. Jangan hancurkan hidup Anda hari ini." };
        if (amount <= 500000) return { percent: 15, title: "Peringatan Dini", color: "bg-yellow-400", desc: "Uang jajan atau makan hilang. Berhenti sebelum Anda penasaran." };
        if (amount <= 5000000) return { percent: 45, title: "Mulai Bahaya", color: "bg-orange-500", desc: "Anda sudah mengorbankan gaji/tabungan kecil. Ini bukan lagi sekadar hiburan." };
        if (amount <= 50000000) return { percent: 75, title: "Zona Kecanduan Tinggi", color: "bg-red-500", desc: "Angka ini bisa untuk DP Rumah atau modal usaha mapan. Otak Anda sedang terpanah harapan palsu." };
        return { percent: 100, title: "Kehancuran Finansial", color: "bg-red-900", desc: "Keadaan darurat. Anda telah kehilangan kekayaan besar. Segera hubungi psikolog/keluarga terdekat." };
    };

    const data = typeof lossAmount === "number" ? getMeterData(lossAmount) : getMeterData(0);

    const handleSaveEvaluation = async () => {
        setSaving(true);
        try {
            await fetch("/api/user/game-finish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameName: "Evaluasi Kerugian Final",
                    score: typeof lossAmount === "number" ? lossAmount : 0,
                    xpEarned: 15
                })
            });
            setIsSaved(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-background border border-primary/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-950/30 rounded-lg text-red-500">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Reality Financial Meter</h2>
                    <p className="text-sm text-foreground/60">Seberapa jauh slot merusak keuangan Anda?</p>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Berapa estimasi total kerugian Anda di slot selama ini?
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 font-bold">Rp</span>
                    <input
                        type="number"
                        value={lossAmount}
                        onChange={(e) => {
                            setLossAmount(Number(e.target.value));
                            setIsSaved(false);
                        }}
                        placeholder="0"
                        className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        min={0}
                    />
                </div>
            </div>

            {typeof lossAmount === "number" && lossAmount > 0 && (
                <div className="animate-in fade-in duration-500">
                    <div className="h-4 w-full bg-foreground/10 rounded-full overflow-hidden mb-4 relative">
                        <div
                            className={`h-full ${data.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${data.percent}%` }}
                        />
                        {/* Markers */}
                        <div className="absolute top-0 bottom-0 left-[30%] w-px bg-background/50" />
                        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-background/50" />
                    </div>

                    <div className="flex justify-between text-xs text-foreground/50 font-mono mb-6 px-1">
                        <span>Aman</span>
                        <span>Bahaya</span>
                        <span>Kecanduan</span>
                        <span>Hancur</span>
                    </div>

                    <div className={`p-5 rounded-xl border border-current/20 bg-background/50 ${data.color.replace('bg-', 'text-')}`}>
                        <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{data.title}</h3>
                        <p className="text-foreground/80 leading-relaxed text-sm">
                            {data.desc}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSaveEvaluation}
                            disabled={saving || isSaved}
                            className="flex items-center gap-2 px-6 py-3 bg-red-950/40 text-red-500 font-bold rounded-xl hover:bg-red-950/60 border border-red-900/50 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : (
                                isSaved ? <><CheckCircle2 size={18} /> Tersimpan (+15 XP)</> : "Catat Realita Ini"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
