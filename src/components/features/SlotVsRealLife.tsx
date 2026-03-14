import { Clock, Briefcase, TrendingUp, TrendingDown, Frown, Smile } from "lucide-react";

export default function SlotVsRealLife() {
    return (
        <div className="bg-background border border-primary/20 rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Slot vs Real Life</h2>
                    <p className="text-sm text-foreground/60">Perbandingan realita waktu Anda</p>
                </div>
                <Clock className="text-primary opacity-50 w-12 h-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Slot Reality */}
                <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors" />

                    <div className="flex items-center gap-2 mb-4 text-red-400 font-semibold">
                        <Clock size={18} />
                        <span>1 Jam Main Slot</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-red-900/30 pb-2">
                            <span className="text-sm text-foreground/70">Saldo</span>
                            <div className="flex items-center text-red-400 font-bold">
                                <TrendingDown size={16} className="mr-1" />
                                - Rp 500k s/d Habis
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-b border-red-900/30 pb-2">
                            <span className="text-sm text-foreground/70">Emosi</span>
                            <div className="flex items-center text-red-400 font-bold">
                                <Frown size={16} className="mr-1" />
                                Stres & Penyesalan
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground/70">Hasil Fisik</span>
                            <span className="text-red-400 font-bold text-sm text-right">0 (Nihil)</span>
                        </div>
                    </div>
                </div>

                {/* Real Life Reality */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 relative overflow-hidden group hover:border-accent/50 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />

                    <div className="flex items-center gap-2 mb-4 text-accent font-semibold">
                        <Briefcase size={18} />
                        <span>1 Jam Kerja Produktif</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                            <span className="text-sm text-foreground/70">Saldo</span>
                            <div className="flex items-center text-accent font-bold">
                                <TrendingUp size={16} className="mr-1" />
                                + Pasti Bertambah
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                            <span className="text-sm text-foreground/70">Emosi</span>
                            <div className="flex items-center text-accent font-bold">
                                <Smile size={16} className="mr-1" />
                                Puas & Bangga
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-foreground/70">Hasil Fisik</span>
                            <span className="text-accent font-bold text-sm text-right">Skill / Karya Baru</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
