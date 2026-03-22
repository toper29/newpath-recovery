"use client";

import { useState, useEffect } from "react";
import { Crown, Check, Zap, Target, Cpu, MessageCircle, Calendar, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function MembershipPage() {
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(50000);
    const { user, refreshUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin/settings?keys=PREMIUM_PRICE")
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data.PREMIUM_PRICE) {
                    setPrice(parseInt(json.data.PREMIUM_PRICE));
                }
            })
            .catch(err => console.error("Failed to fetch price", err));
    }, []);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const json = await res.json();
            if (json.success && json.data.checkoutUrl) {
                window.location.href = json.data.checkoutUrl;
            } else {
                alert(json.error || "Gagal memproses checkout");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan sistem");
            setLoading(false);
        }
    };

    const features = [
        { icon: Target, name: "Reality Slot Simulator", desc: "Akses penuh ke simulator peluang realistis" },
        { icon: Cpu, name: "Slot Trap Simulator", desc: "Bongkar rahasia algoritma jebakan mesin slot" },
        { icon: Calendar, name: "14-Day Recovery Challenge", desc: "Program intensif pemulihan terstruktur" },
        { icon: MessageCircle, name: "Your Money Talking", desc: "Visualisasi dampak finansial yang jujur" },
        { icon: ShieldCheck, name: "Priority Support", desc: "Dukungan komunitas & admin lebih cepat" }
    ];

    if (user?.isPremium) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#040814]">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(234,179,8,0.3)] border-4 border-yellow-400/50">
                    <Crown size={48} className="text-black" />
                </div>
                <h1 className="text-4xl font-black mb-2 text-white italic tracking-tighter">PREMIUM LIFETIME</h1>
                <p className="text-yellow-500 font-bold mb-8 tracking-widest uppercase text-sm">Status: Aktif Selamanya</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md w-full">
                    <p className="text-white/60 text-sm leading-relaxed">
                        Terima kasih telah menjadi bagian dari komunitas Premium NewPath. Anda memiliki akses penuh ke seluruh fitur bantuan dan simulator pemulihan tanpa batas.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 animate-in fade-in duration-700">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest mb-4">
                    <Crown size={14} /> Upgrade Membership
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
                    BEBAS JUDI <span className="text-secondary">SELAMANYA</span>
                </h1>
                <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    Dapatkan akses lifetime ke fitur-fitur spesial yang dirancang untuk membongkar ilusi judi dan mempercepat proses pemulihan Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Benefits */}
                <div className="space-y-4">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <f.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">{f.name}</h3>
                                <p className="text-xs text-white/50">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pricing Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-[#0A0F1F] border border-white/10 rounded-3xl p-8 overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Crown size={120} className="text-white" />
                        </div>
                        
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-white mb-2">Lifetime Premium</h2>
                            <p className="text-sm text-white/40">Bayar sekali, akses selamanya. Tanpa biaya bulanan.</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white italic tracking-tighter">Rp {price.toLocaleString('id-ID')}</span>
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Sekali Bayar</span>
                            </div>
                            <div className="mt-2 text-xs text-accent font-bold">Teruji & Aman via QRIS</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                "Akses seluruh simulator realistis",
                                "Program pemulihan 14 hari",
                                "Bypass iklan & pembatasan fitur",
                                "Badge khusus Premium Member",
                                "Mendukung pengembangan NewPath"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-medium text-white/70">
                                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <Check size={10} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all ${
                                loading 
                                ? "bg-white/10 text-white/40 cursor-not-allowed" 
                                : "bg-gradient-to-r from-secondary to-accent text-white hover:scale-[1.02] shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                            }`}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    Upgrade Sekarang <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        
                        <p className="mt-4 text-[10px] text-center text-white/30 uppercase font-bold tracking-tighter">
                            Aman. Terenkripsi. Aktivasi Instan via Pakasir QRIS.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
