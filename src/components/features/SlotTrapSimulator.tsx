"use client";

import { useState, useEffect } from "react";
import { Brain, AlertCircle, TrendingDown, Target, Zap, CheckCircle, Loader2 } from "lucide-react";

export default function SlotTrapSimulator() {
    const [activeTab, setActiveTab] = useState<"nearMiss" | "rtp" | "volatility" | "psychology">("nearMiss");
    const [isRead, setIsRead] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Track feature usage
        fetch("/api/user/feature-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureName: "Slot Trap Simulator" })
        }).catch(err => console.error("Failed to track feature usage", err));
    }, []);

    const handleMarkAsRead = async () => {
        setSaving(true);
        try {
            await fetch("/api/user/game-finish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameName: "Edukasi Psikologi Slot",
                    score: 100,
                    xpEarned: 30
                })
            });
            setIsRead(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-background border border-primary/20 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 bg-primary/10 border-b border-primary/20">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-lg text-accent">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Ilusi Desain Slot</h2>
                        <p className="text-sm text-foreground/60">Bagaimana bandar memanipulasi pikiran Anda</p>
                    </div>
                </div>
            </div>

            <div className="flex border-b border-foreground/10">
                <button
                    onClick={() => setActiveTab("nearMiss")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "nearMiss" ? "text-accent border-b-2 border-accent bg-foreground/5" : "text-foreground/60 hover:text-foreground"}`}
                >
                    Near Miss
                </button>
                <button
                    onClick={() => setActiveTab("rtp")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "rtp" ? "text-accent border-b-2 border-accent bg-foreground/5" : "text-foreground/60 hover:text-foreground"}`}
                >
                    Ilusi RTP
                </button>
                <button
                    onClick={() => setActiveTab("volatility")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "volatility" ? "text-accent border-b-2 border-accent bg-foreground/5" : "text-foreground/60 hover:text-foreground"}`}
                >
                    Volatilitas
                </button>
                <button
                    onClick={() => setActiveTab("psychology")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "psychology" ? "text-accent border-b-2 border-accent bg-foreground/5" : "text-foreground/60 hover:text-foreground"}`}
                >
                    Psikologi
                </button>
            </div>

            <div className="p-6">
                {activeTab === "nearMiss" && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-start gap-4 mb-4 text-red-400">
                            <Target size={24} className="mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold mb-2">Efek "Hampir Menang" (Near Miss)</h3>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    Mesin slot diprogram untuk sering menampilkan simbol jackpot persis di atas atau di bawah garis kemenangan. Ini bukan kebetulan, melainkan algoritma visual untuk menipu otak Anda.
                                </p>
                            </div>
                        </div>
                        <div className="bg-foreground/5 p-4 rounded-xl border border-red-900/40 text-sm italic text-foreground/80 mt-4">
                            "Otak manusia merespon 'hampir menang' sama seperti merespon 'kemenangan sesungguhnya', melepaskan dopamin yang membuat Anda ingin terus memutar."
                        </div>
                    </div>
                )}

                {activeTab === "rtp" && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-start gap-4 mb-4 text-accent">
                            <TrendingDown size={24} className="mt-1 flex-shrink-0 text-orange-400" />
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-orange-400">RTP (Return to Player) = Pasti Rugi</h3>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    Banyak orang tertipu angka RTP 96%. RTP bukan berarti Anda akan dikembalikan 96% dari deposit Anda hari ini. RTP adalah perhitungan matematis pengembalian bandar setelah <b>Jutaan Putaran</b>.
                                </p>
                            </div>
                        </div>
                        <div className="bg-foreground/5 p-4 rounded-xl border border-orange-900/40 text-sm italic text-foreground/80 mt-4">
                            "RTP 96% pada dasarnya berarti: Secara matematis, bandar DIJAMIN memenangkan 4% dari semua uang yang pernah masuk ke mesin itu selamanya."
                        </div>
                    </div>
                )}

                {activeTab === "volatility" && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-start gap-4 mb-4 text-purple-400">
                            <Zap size={24} className="mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold mb-2">Volatilitas (Sedot Saldo Cepat)</h3>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    Mesin modern dirancang dengan volatilitas ekstrim. Artinya: putaran kosong (kalah) sangat mendominasi, sementara kemenangan besar dibuat sangat langka.
                                </p>
                            </div>
                        </div>
                        <div className="bg-foreground/5 p-4 rounded-xl border border-purple-900/40 text-sm italic text-foreground/80 mt-4">
                            "Desain ini sengaja dibuat agar saldo kecil Anda terkuras lebih cepat sebelum Anda bisa mencapai probabilitas kemenangan."
                        </div>
                    </div>
                )}

                {activeTab === "psychology" && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-start gap-4 mb-4 text-blue-400">
                            <AlertCircle size={24} className="mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold mb-2">Jebakan Suara & Animasi LDK</h3>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    Setiap detil visual (warna mencolok, koin emas meledak) dan suara kemenangan dirancang oleh psikolog judi. Bahkan ketika modal Anda berkurang, mesin tetap memutar lagu jika Anda memenangkan "receh" dari taruhan Anda. Losses Disguised as Wins (Kalah tapi Terlihat Menang).
                                </p>
                            </div>
                        </div>
                        <div className="bg-foreground/5 p-4 rounded-xl border border-blue-900/40 text-sm italic text-foreground/80 mt-4">
                            "Anda bertaruh Rp1.000, menang Rp200. Mesin melakukan perayaan meriah. Secara matematis Anda rugi Rp800, tapi otak Anda merasa menang."
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-6 border-t border-primary/20 flex justify-end">
                <button 
                    onClick={handleMarkAsRead}
                    disabled={isRead || saving}
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                    {isRead ? "Telah Dipelajari (+30 XP)" : "Tandai Selesai Dibaca (Dapat XP)"}
                </button>
            </div>
        </div>
    );
}
