import { prisma } from "@/lib/db";
import { LandingHeroClient, AnimatedSection, FeatureCard } from "@/components/landing/LandingComponents";
import { ShieldCheck, Target, BrainCircuit, Zap, ArrowRight, Heart, Info, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";

// ISR: Revalidate every 60 seconds (or on-demand via revalidatePath)
export const revalidate = 60;

export default async function LandingPage() {
    // Fetch data from DB
    const content = await prisma.landingPageContent.findUnique({
        where: { id: "singleton" }
    });

    const features = await prisma.feature.findMany({
        orderBy: { order: "asc" }
    });

    const testimonials = await prisma.testimonial.findMany({
        where: { isFeatured: true },
        take: 6
    });

    const data = content || {
        heroTitle: "Hentikan Siklusnya, Rebut Kembali Kendali Hidup Anda.",
        heroSub: "Platform pemulihan kecanduan judi pertama di Indonesia yang menggunakan pendekatan neurosains dan psikologi perilaku.",
        stats_users: "12,400+",
        stats_rate: "85%"
    };

    return (
        <div className="flex flex-col items-center bg-background text-foreground overflow-x-hidden pt-16">
            {/* Hero Section */}
            <section className="w-full relative px-4 flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] opacity-20" />
                </div>

                <LandingHeroClient title={data.heroTitle} sub={data.heroSub} />

                {/* Trust Stats */}
                <div className="grid grid-cols-2 gap-16 mt-20 pt-10 border-t border-foreground/5 w-full max-w-2xl relative z-10">
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl md:text-5xl font-black text-foreground group-hover:text-accent transition-colors">{data.stats_users}</span>
                        <span className="text-xs text-foreground/40 uppercase font-black tracking-[0.2em] mt-2 group-hover:text-foreground/60 transition-colors">Pengguna Aktif</span>
                    </div>
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl md:text-5xl font-black text-foreground group-hover:text-accent transition-colors">{data.stats_rate}</span>
                        <span className="text-xs text-foreground/40 uppercase font-black tracking-[0.2em] mt-2 group-hover:text-foreground/60 transition-colors">Tingkat Keberhasilan</span>
                    </div>
                </div>
            </section>

            {/* Problem Awareness Section */}
            <AnimatedSection className="w-full py-32 px-4 bg-[#050811] relative overflow-hidden" id="masalah">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest">
                            <AlertTriangle size={14} /> The Silent Epidemic
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic">
                            Judi Bukan Masalah Keuangan. <br />
                            <span className="text-red-500">Ini Adalah Masalah Otak.</span>
                        </h2>
                        <p className="text-lg text-foreground/60 leading-relaxed font-medium">
                            Kecanduan slot online membajak sistem dopamin Anda, menciptakan siklus harapan palsu yang tidak pernah berakhir. Ini adalah perang biokimia di dalam pikiran Anda, dan kami di sini untuk membantu Anda memenanginya.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Bukan kurang disiplin, tapi disregulasi dopamin.",
                                "Ilusi kemenangan (Near Miss) dirancang secara algoritma.",
                                "Keterasingan sosial dan kehancuran finansial secara progresif.",
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-foreground/80 font-bold italic uppercase text-sm tracking-wide">
                                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                                        <ArrowRight size={12} />
                                    </div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-primary/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-[#0A0F1F] border border-red-500/20 p-8 md:p-12 rounded-[40px] shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <BrainCircuit size={120} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black italic">Statistik Realitas</h3>
                                <div className="space-y-4">
                                    <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-1">RTP Manipulation</p>
                                        <p className="text-xl font-bold italic">"Return To Provider" — Uang Anda dirancang untuk hilang.</p>
                                    </div>
                                    <div className="bg-foreground/5 p-4 rounded-2xl border border-foreground/10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-1">Psychological Trap</p>
                                        <p className="text-xl font-bold italic">Intermittent Reinforcement membuat Anda sulit berhenti.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Features Grid */}
            <section id="fitur" className="w-full py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="flex flex-col items-center text-center mb-24">
                        <div className="h-1 w-16 bg-accent/40 rounded-full mb-8" />
                        <h2 className="text-secondary text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-4 px-4 font-mono">Comprehensive Recovery System</h2>
                        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground tracking-tight max-w-4xl px-4 italic uppercase">
                            14 Fitur Eksklusif <br />
                            <span className="text-accent underline decoration-primary/30 underline-offset-8">Rebut Kembali Hidupmu</span>
                        </h3>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <FeatureCard key={feature.id} feature={feature} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <AnimatedSection className="w-full py-32 px-4 bg-gradient-to-b from-transparent to-primary/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter">Cara Kerja Pemulihan</h2>
                        <p className="text-foreground/50 mt-4 font-medium italic">4 Tahap Menuju Kebebasan Finansial & Mental</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { title: "Neuro-Assessment", desc: "Tes diagnosis klinis untuk memahami tingkat kecanduan Anda." },
                            { title: "Impulse Breaking", desc: "Gunakan intervensi Emergency saat keinginan berjudi muncul." },
                            { title: "Dopamine Reset", desc: "Program 14 hari terstruktur untuk memulihkan kimiawi otak." },
                            { title: "Long-term Freedom", desc: "Membangun kembali hidup, hubungan, dan keuangan Anda." }
                        ].map((step, i) => (
                            <div key={i} className="bg-[#0A0F1F] border border-primary/20 p-8 rounded-[40px] relative group hover:border-accent transition-colors">
                                <div className="text-4xl font-black text-accent/10 mb-4 group-hover:text-accent/20 transition-colors">0{i + 1}</div>
                                <h4 className="text-xl font-bold mb-3 italic">{step.title}</h4>
                                <p className="text-sm text-foreground/50 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="w-full py-32 px-4">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection className="flex flex-col items-center justify-center text-center mb-20">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 px-4 tracking-tighter uppercase italic">Kisah Sukses Survivor</h2>
                            <p className="text-white/40 max-w-2xl text-base sm:text-lg px-6 italic">Bagian dari ribuan orang yang telah berhasil memutus rantai kecanduan bersama NewPath.</p>
                        </AnimatedSection>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((item, idx) => (
                                <div key={item.id} className="bg-[#0A0F1F] border border-primary/20 p-8 rounded-3xl hover:border-primary/40 transition-colors shadow-xl flex flex-col justify-between group">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-accent text-xl overflow-hidden group-hover:bg-primary/30 transition-colors">
                                                {item.avatarUrl ? (
                                                    <img src={item.avatarUrl} alt={item.author} className="w-full h-full object-cover" />
                                                ) : item.author.substring(0, 1)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors">{item.author}</h4>
                                                <span className="text-xs text-foreground/40 font-black uppercase tracking-widest">{item.role || "Survivor"}</span>
                                            </div>
                                        </div>
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-6 italic flex-grow">
                                            "{item.content}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="w-full py-32 px-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-primary/5" />
                <AnimatedSection className="max-w-5xl mx-auto relative z-10 bg-gradient-to-br from-[#0D1225] to-[#0A0F1F] p-8 sm:p-12 md:p-24 rounded-[40px] sm:rounded-[48px] border border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden">
                    <ShieldCheck size={64} className="text-accent mb-8 animate-pulse" />
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase italic">Privasi Anda Adalah Kedaulatan Kami</h2>
                    <p className="text-base sm:text-xl text-white/50 max-w-2xl mb-12 font-medium px-4 leading-relaxed">
                        Mulai pemulihan tanpa rasa malu. Platform kami 100% anonim dan dienkripsi untuk keamanan total informasi Anda. Tidak ada data yang dibagikan kepada pihak ketiga.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/register"
                            className="px-12 py-6 rounded-2xl bg-secondary text-accent font-black text-xl shadow-xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
                        >
                            Gabung Sekarang - Gratis
                        </Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}

export const metadata = {
    title: "NewPath Recovery | Platform Pemulihan Kecanduan Judi Slot #1",
    description: "Hentikan kecanduan slot online dengan neurosains. Platform anonim, aman, dan terbukti efektif untuk memutus rantai judi online di Indonesia.",
    keywords: ["pemulihan judi slot", "berhenti judi online", "kecanduan slot", "rehab judi", "stop slot", "newpath recovery"],
};
