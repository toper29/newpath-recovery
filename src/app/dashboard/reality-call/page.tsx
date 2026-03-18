"use client";

import { useState, useEffect } from "react";
import { PhoneCall, AlertTriangle, ShieldCheck, Heart, ArrowRight, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";

export default function RealityCallPage() {
    const [hotlines, setHotlines] = useState<any[]>([]);
    const [loadingHotlines, setLoadingHotlines] = useState(true);
    const [articles, setArticles] = useState<any[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(true);

    useEffect(() => {
        // Fetch CMS hotlines
        fetch("/api/admin/contacts")
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data && json.data.length > 0) {
                    setHotlines(json.data);
                } else {
                    // Fallback to defaults if none in DB
                    setHotlines([
                        { name: "National Hotline", number: "1500-454", description: "Layanan Konseling Kemensos" },
                        { name: "Suicide Prevention", number: "119", description: "Bantuan Psikologis Darurat" },
                    ]);
                }
            })
            .catch(err => {
                console.error(err);
                // Fallback
                setHotlines([
                    { name: "National Hotline", number: "1500-454", description: "Layanan Konseling Kemensos" },
                    { name: "Suicide Prevention", number: "119", description: "Bantuan Psikologis Darurat" },
                ]);
            })
            .finally(() => setLoadingHotlines(false));
    }, []);

    useEffect(() => {
        // Fetch stories
        fetch("/api/articles")
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    // Filter for stories or just take latest
                    setArticles(json.data.slice(0, 3));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingArticles(false));
    }, []);

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-[#0A0F1F] border border-red-500/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-[100px]" />
                
                <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)] animate-pulse">
                    <PhoneCall size={40} />
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">Emergency Reality Call</h1>
                <p className="text-white/60 max-w-2xl mb-10 text-lg font-medium">
                    Anda tidak sendirian. Saat keinginan mendesak muncul, ingatlah alasan Anda memulai. Gunakan jalur bantuan di bawah ini atau baca kisah mereka yang telah berhasil keluar.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {loadingHotlines ? (
                        <div className="col-span-2 flex justify-center py-4">
                            <Loader2 className="animate-spin text-red-500" size={24} />
                        </div>
                    ) : (hotlines.map((h, i) => (
                        <a 
                            key={i}
                            href={`tel:${h.number.replace(/-/g, '')}`}
                            className="bg-white/5 border border-red-500/30 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-red-500 hover:border-red-500 transition-all duration-300"
                        >
                            <div className="text-left">
                                <p className="text-[10px] font-black text-red-400 group-hover:text-white/80 uppercase tracking-widest mb-1">{h.name}</p>
                                <p className="text-2xl font-black text-white tracking-tighter italic">{h.number}</p>
                                <p className="text-[10px] text-white/40 group-hover:text-white/60 mt-1">{h.description || h.desc}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-red-500/20 group-hover:bg-white/20 flex items-center justify-center text-red-500 group-hover:text-white transition-colors">
                                <PhoneCall size={24} />
                            </div>
                        </a>
                    )))}
                </div>
            </div>

            {/* Stories Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                        <Heart className="text-red-500" size={24} /> Kisah Perjuangan
                    </h2>
                    <Link href="/dashboard/edukasi" className="text-xs font-bold text-accent hover:underline uppercase tracking-widest">
                        Lihat Semua &rarr;
                    </Link>
                </div>

                {loadingArticles ? (
                    <div className="flex justify-center p-20">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((art: any) => (
                            <Link 
                                key={art.id} 
                                href={`/dashboard/edukasi?id=${art.id}`}
                                className="bg-[#0A0F1F] border border-white/5 rounded-[2rem] p-6 hover:border-accent/50 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-white leading-tight mb-2 group-hover:text-accent transition-colors">{art.title}</h3>
                                    <p className="text-white/40 text-xs line-clamp-3 mb-6">{art.content.replace(/<[^>]*>?/gm, '')}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest">
                                    Baca Selengkapnya <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
