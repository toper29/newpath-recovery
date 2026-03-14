"use client";

import { useState, useEffect } from "react";
import { Coins, PiggyBank, BriefcaseBusiness, Utensils, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";

export default function YourMoneyTalking() {
    const [amount, setAmount] = useState<number | "">("");
    const [showSim, setShowSim] = useState(false);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Your Money Talking" })
        }).catch(err => console.error("Failed to track feature usage", err));
    }, []);
    const [isSaved, setIsSaved] = useState(false);

    const handleSimulate = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof amount === "number" && amount > 0) {
            setShowSim(true);
        }
    };

    const getAlternativeValue = (amt: number) => {
        if (amt < 50000) return { icon: Utensils, text: "makan siang enak", color: "text-orange-400" };
        if (amt < 200000) return { icon: Utensils, text: "makan enak selama beberapa hari", color: "text-orange-400" };
        if (amt < 1000000) return { icon: PiggyBank, text: "tabungan dana darurat", color: "text-accent" };
        if (amt < 5000000) return { icon: BriefcaseBusiness, text: "modal usaha kecil", color: "text-blue-400" };
        return { icon: PiggyBank, text: "investasi masa depan", color: "text-accent" };
    };

    const alt = typeof amount === "number" ? getAlternativeValue(amount) : null;
    const AltIcon = alt?.icon || Coins;

    const handleSaveMoney = async () => {
        setSaving(true);
        try {
            await fetch("/api/user/game-finish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameName: "Simulasi Uang Bicara",
                    score: typeof amount === "number" ? amount : 0,
                    xpEarned: 20
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
                <div className="p-3 bg-primary/20 rounded-lg text-accent">
                    <Coins size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Your Money Talking</h2>
                    <p className="text-sm text-foreground/60">Dengarkan apa kata uang Anda sebelum deposit.</p>
                </div>
            </div>

            {!showSim ? (
                <form onSubmit={handleSimulate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Berapa jumlah yang ingin Anda depositkan?
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 font-bold">Rp</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                placeholder="500000"
                                className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                required
                                min={10000}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!amount}
                        className="w-full py-3 bg-primary text-foreground font-bold rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Mulai Simulasi
                    </button>
                </form>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center mb-6 relative">
                        <AltIcon size={40} className={alt?.color} />
                        <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                            <AlertTriangle size={16} className="text-white" />
                        </div>
                    </div>

                    <div className="bg-foreground/5 p-6 rounded-xl border border-foreground/10 relative">
                        {/* Chat bubble tail */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-foreground/5" />

                        <p className="text-lg text-foreground font-medium italic mb-4 leading-relaxed">
                            "Aku Rp {typeof amount === 'number' ? amount.toLocaleString('id-ID') : ''} milikmu. <br />
                            Aku bisa menjadi <span className={`font-bold ${alt?.color}`}>{alt?.text}</span> yang berguna."
                        </p>
                        <p className="text-red-400 font-bold">
                            "Namun jika kamu memaksakan deposit, aku mungkin akan lenyap selamanya hanya dalam 3 menit."
                        </p>
                    </div>

                    <div className="flex gap-4 w-full mt-6">
                        <button
                            onClick={() => { setShowSim(false); setIsSaved(false); }}
                            className="flex-1 py-3 bg-foreground/10 text-foreground font-medium rounded-xl hover:bg-foreground/20 transition-colors disabled:opacity-50"
                            disabled={saving}
                        >
                            Coba Angka Lain
                        </button>
                        <button
                            onClick={handleSaveMoney}
                            disabled={saving || isSaved}
                            className="flex-1 py-3 flex items-center justify-center gap-2 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : (
                                isSaved ? <><CheckCircle2 size={18} /> Berhasil (+20 XP)</> : "Simpan Uang Ini"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
