"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, ChevronLeft, Loader2, Sparkles, BookCheck, Shield, Target } from "lucide-react";

interface Article {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    category?: string;
    isCompleted?: boolean;
}

export default function EdukasiPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch("/api/articles")
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setArticles(json.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch articles", err);
                setLoading(false);
            });
    }, []);

    const handleCompleteTask = async () => {
        if (!selectedArticle || saving || selectedArticle.isCompleted) return;

        setSaving(true);
        try {
            const res = await fetch("/api/articles/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ articleId: selectedArticle.id })
            });

            const json = await res.json();
            if (json.success) {
                // Update local state
                setArticles(prev => prev.map(art => 
                    art.id === selectedArticle.id ? { ...art, isCompleted: true } : art
                ));
                setSelectedArticle(prev => prev ? { ...prev, isCompleted: true } : null);
                
                // Track feature usage for analytics
                fetch("/api/user/feature-usage", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ featureName: "Education Module Completed" })
                }).catch(e => console.error("Failed to track edu completion", e));
            } else {
                alert(json.error || "Gagal menyelesaikan materi");
            }
        } catch (err) {
            console.error("Failed to complete article", err);
            alert("Terjadi kesalahan sistem");
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Memuat Materi...</p>
            </div>
        );
    }

    if (selectedArticle) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                    onClick={() => setSelectedArticle(null)}
                    className="group flex items-center gap-2 text-white/40 hover:text-accent transition-colors font-bold uppercase text-[10px] tracking-[0.2em]"
                >
                    <ChevronLeft size={16} /> Kembali ke List
                </button>

                <div className="bg-[#0A1020] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="h-64 bg-gradient-to-br from-accent/20 to-primary/20 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
                        <BookOpen size={80} className="text-accent/40 relative z-10" />
                    </div>

                    <div className="p-8 md:p-12 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-accent">
                                <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">Mental Health</span>
                                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(selectedArticle.createdAt)}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                                {selectedArticle.title}
                            </h1>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">
                                {selectedArticle.content}
                            </p>
                        </div>

                        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                                    <BookCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Materi Selesai?</p>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                        {selectedArticle.isCompleted ? "XP telah diklaim" : "Dapatkan +20 XP untuk setiap materi"}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={handleCompleteTask}
                                disabled={saving || selectedArticle.isCompleted}
                                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-3 ${
                                    selectedArticle.isCompleted 
                                        ? "bg-green-500/10 border border-green-500/20 text-green-500 cursor-default" 
                                        : "bg-accent hover:bg-white text-[#040814] shadow-accent/20 hover:scale-105 active:scale-95"
                                }`}
                            >
                                {saving ? <Loader2 className="animate-spin" /> : 
                                 selectedArticle.isCompleted ? <BookCheck size={20} /> : <BookCheck size={20} />}
                                {selectedArticle.isCompleted ? "Sudah Selesai" : "Tandai Selesai"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-[#0A1020] border border-white/5 rounded-[3rem] p-10 md:p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32" />
                
                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                        <Sparkles size={14} /> Knowledge Hub
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                        Edukasi & <br /><span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Pemulihan</span>
                    </h1>
                    <p className="text-lg text-white/50 font-medium leading-relaxed">
                        Pelajari mekanisme psikologis di balik kecanduan, bongkar trik bandar, dan temukan strategi sains untuk membangun habit baru.
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <BookOpen size={24} className="text-accent" /> Modul Tersedia
                    </h2>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{articles.length} Materi Ditemukan</span>
                </div>

                {articles.length === 0 ? (
                    <div className="bg-white/5 border border-dashed border-white/10 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center">
                        <Shield size={48} className="text-white/10 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2">Materi Belum Tersedia</h3>
                        <p className="text-white/40 max-w-xs">Admin sedang menyiapkan konten edukasi berkualitas untuk Anda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <button
                                key={article.id}
                                onClick={() => setSelectedArticle(article)}
                                className="group bg-[#0A1020] border border-white/5 rounded-[2rem] p-8 text-left transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.02] flex flex-col justify-between hover:translate-y-[-4px]"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors duration-300 ${
                                            article.isCompleted 
                                                ? "bg-green-500/20 border-green-500/40 text-green-500" 
                                                : "bg-accent/10 border-accent/20 text-accent group-hover:bg-accent group-hover:text-[#040814]"
                                        }`}>
                                            {article.isCompleted ? <BookCheck size={24} /> : <Target size={24} />}
                                        </div>
                                        <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-accent transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-white/40 text-sm line-clamp-3 leading-relaxed">
                                            {article.content}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="pt-8 flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
                                    Baca Selengkapnya <ArrowRight size={14} />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
