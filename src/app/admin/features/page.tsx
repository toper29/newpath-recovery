"use client";

import { useState, useEffect } from "react";
import { Activity, MousePointerSquareDashed, Calculator, Search, ShieldAlert, Sliders, Settings, Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";

export default function FeatureControlPage() {
    const [safeProb, setSafeProb] = useState(85);
    const [failProb, setFailProb] = useState(15);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [savedSuccess, setSavedSuccess] = useState(false);

    const [featureState, setFeatureState] = useState<Record<string, boolean>>({
        "feature_emergency_wheel": true,
        "feature_reality_simulator": true,
        "feature_addiction_test": true,
        "feature_recovery_challenge": true,
        "feature_money_talking": true,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const json = await res.json();
                if (json.success && json.data) {
                    if (json.data.wheel_safe_prob !== undefined) setSafeProb(Number(json.data.wheel_safe_prob));
                    if (json.data.wheel_fail_prob !== undefined) setFailProb(Number(json.data.wheel_fail_prob));
                    
                    const newFeatState = { ...featureState };
                    Object.keys(newFeatState).forEach(k => {
                        if (json.data[k] !== undefined) {
                            newFeatState[k] = json.data[k] === "true";
                        }
                    });
                    setFeatureState(newFeatState);
                }
            } catch (err) {
                console.error("Failed to load settings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSafeChange = (val: number) => {
        const clamped = Math.max(0, Math.min(100, val));
        setSafeProb(clamped);
        setFailProb(100 - clamped);
        setSavedSuccess(false);
    };

    const handleFailChange = (val: number) => {
        const clamped = Math.max(0, Math.min(100, val));
        setFailProb(clamped);
        setSafeProb(100 - clamped);
        setSavedSuccess(false);
    };

    const handleFeatureToggle = (id: string) => {
        const key = `feature_${id.replace(/-/g, '_')}`;
        setFeatureState(prev => ({ ...prev, [key]: !prev[key] }));
        setSavedSuccess(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setSavedSuccess(false);
        try {
            await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    wheel_safe_prob: safeProb,
                    wheel_fail_prob: failProb,
                    ...featureState
                })
            });
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
        } catch (err) {
            console.error("Failed to save settings", err);
        } finally {
            setSaving(false);
        }
    };
    const features = [
        {
            id: "emergency-wheel",
            name: "Emergency Anti-Deposit Wheel",
            badge: "CRITICAL",
            desc: "Immediate intervention tool for high-risk gambling urges. Customizable probabilities below.",
            lastUpdated: "Hari ini",
            icon: ShieldAlert,
            active: true
        },
        {
            id: "reality-simulator",
            name: "Reality Simulator",
            desc: "Simulates spins to visualize true mathematical loss. Settings adjustable in Simulator Settings.",
            lastUpdated: "Kemarin",
            icon: Activity,
            active: true
        },
        {
            id: "addiction-test",
            name: "Addiction Test",
            desc: "Self-diagnostic questionnaire to evaluate severity of gambling habits.",
            lastUpdated: "3 hari lalu",
            icon: Search,
            active: true
        },
        {
            id: "recovery-challenge",
            name: "14-Day Challenge",
            badge: "CORE",
            desc: "Gamified recovery roadmap with daily tasks and psychological milestones.",
            lastUpdated: "Hari ini",
            icon: MousePointerSquareDashed,
            active: true
        },
        {
            id: "money-talking",
            name: "Your Money Talking",
            desc: "Expense visualizer that converts gambling losses into real-world items to highlight opportunity cost.",
            lastUpdated: "2 minggu lalu",
            icon: Calculator,
            active: true
        },
    ];

    const wheelItems = [
        "Bukan hari keberuntunganmu",
        "Simpan uangmu hari ini",
        "Coba lagi besok",
        "Uangmu lebih berharga",
        "Slot menang, kamu kalah",
    ];

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Sliders className="text-accent" /> Feature & Logic Settings
                    </h2>
                    <p className="text-sm text-foreground/50">Atur logika fitur interaktif dan kontrol ketersediaannya secara global.</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={loading || saving}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : (
                        savedSuccess ? <CheckCircle2 size={18} className="text-green-400" /> : <Settings size={18} />
                    )}
                    {savedSuccess ? "Tersimpan" : "Save All Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Global Toggles */}
                <div className="space-y-4">
                    <h3 className="font-bold text-foreground/80 uppercase tracking-wider text-xs mb-2">Global Feature Toggles</h3>
                    {features.map((feature) => (
                        <div key={feature.id} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-4 flex items-start gap-4 hover:bg-primary/5 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                                <feature.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-foreground">{feature.name}</h4>
                                    {feature.badge && (
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider ${feature.badge === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-accent'}`}>
                                            {feature.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-foreground/50 text-xs leading-relaxed">{feature.desc}</p>
                            </div>
                            <div className="flex-shrink-0 flex self-center ml-2" onClick={() => handleFeatureToggle(feature.id)}>
                                <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${featureState[`feature_${feature.id.replace(/-/g, '_')}`] ? 'bg-primary' : 'bg-foreground/10'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${featureState[`feature_${feature.id.replace(/-/g, '_')}`] ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Specific Feature Logistics: Emergency Wheel */}
                <div className="space-y-4">
                    <h3 className="font-bold text-foreground/80 uppercase tracking-wider text-xs mb-2">Emergency Wheel Configuration</h3>

                    <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6">
                        <h4 className="font-bold text-sm mb-4">Probabilitas Hasil Putaran</h4>
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-accent">Tidak Deposit (Aman)</span>
                                    <input 
                                        type="number" 
                                        value={safeProb} 
                                        onChange={(e) => handleSafeChange(Number(e.target.value))}
                                        className="w-16 bg-foreground/5 border border-primary/30 rounded py-1 text-center text-xs font-bold text-accent outline-none" 
                                        disabled={loading}
                                    />
                                    <span className="text-xs text-foreground/50">%</span>
                                </div>
                                <div className="w-full bg-foreground/10 rounded-full h-2">
                                    <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${safeProb}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-red-500">Silakan Deposit (Gagal)</span>
                                    <input 
                                        type="number" 
                                        value={failProb} 
                                        onChange={(e) => handleFailChange(Number(e.target.value))}
                                        className="w-16 bg-foreground/5 border border-red-500/30 rounded py-1 text-center text-xs font-bold text-red-500 outline-none" 
                                        disabled={loading}
                                    />
                                    <span className="text-xs text-foreground/50">%</span>
                                </div>
                                <div className="w-full bg-foreground/10 rounded-full h-2">
                                    <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${failProb}%` }}></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-foreground/40 italic">Note: Total harus 100%. Algoritma wheel akan ditarik ke probabilitas ini.</p>
                        </div>

                        <div className="my-6 border-t border-primary/10"></div>

                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-sm">Pesan pada Wheel (Sektor Aman)</h4>
                            <button className="text-[10px] font-bold bg-primary/20 text-accent px-2 py-1 rounded hover:bg-primary transition-colors flex items-center gap-1">
                                <Plus size={12} /> Tambah
                            </button>
                        </div>

                        <div className="space-y-2">
                            {wheelItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-foreground/5 border border-primary/10 rounded-lg p-2 group">
                                    <input type="text" defaultValue={item} className="flex-1 bg-transparent text-xs text-foreground outline-none px-2" />
                                    <button className="text-foreground/30 hover:text-red-500 transition-colors px-2 opacity-0 group-hover:opacity-100">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {/* The "Silakan deposit" is hardcoded visually or mapped from DB for the failing wedge */}
                            <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/20 rounded-lg p-2 mt-2">
                                <span className="text-[10px] font-bold text-red-500 px-2 uppercase tracking-wider w-16">Wedge Gagal</span>
                                <input type="text" defaultValue="Silakan deposit" className="flex-1 bg-transparent text-xs text-red-500 font-bold outline-none px-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
