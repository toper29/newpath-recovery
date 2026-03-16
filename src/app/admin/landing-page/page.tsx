"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Layout, Type, BarChart, CheckCircle2, AlertCircle } from "lucide-react";

interface LandingContent {
    heroTitle: string;
    heroSub: string;
    stats_users: string;
    stats_rate: string;
}

export default function LandingPageCMS() {
    const [content, setContent] = useState<LandingContent>({
        heroTitle: "",
        heroSub: "",
        stats_users: "",
        stats_rate: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch("/api/landing-page", { cache: 'no-store' })
            .then((res) => res.json())
            .then((json) => {
                if (json.success && json.data) {
                    setContent(json.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/landing-page", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            const json = await res.json();
            if (json.success) {
                setMessage({ type: 'success', text: "Konten landing page berhasil diperbarui!" });
            } else {
                setMessage({ type: 'error', text: "Gagal memperbarui konten." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Terjadi kesalahan saat menyimpan." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-accent">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h2 className="text-2xl font-black text-foreground">Landing Page CMS</h2>
                <p className="text-foreground/50">Kelola konten yang ditampilkan di halaman depan website.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                    message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{message.text}</span>
                </div>
            )}

            <div className="grid gap-6">
                {/* Hero Section */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                        <Layout className="text-secondary" size={24} />
                        <h3 className="text-xl font-bold italic">Hero Section</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70 flex items-center gap-2">
                                <Type size={16} /> Judul Utama (Hero Title)
                            </label>
                            <textarea
                                value={content.heroTitle}
                                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                                className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground focus:border-accent outline-none transition-all min-h-[100px]"
                                placeholder="Contoh: Slot tidak membuatmu kaya. Slot membuatmu terus berharap."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70">Sub-judul (Hero Subtitle)</label>
                            <textarea
                                value={content.heroSub}
                                onChange={(e) => setContent({ ...content, heroSub: e.target.value })}
                                className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground focus:border-accent outline-none transition-all min-h-[120px]"
                                placeholder="Deskripsi singkat platform..."
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                        <BarChart className="text-accent" size={24} />
                        <h3 className="text-xl font-bold italic">Statistik & Trust</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70">Jumlah Pengguna Aktif</label>
                            <input
                                type="text"
                                value={content.stats_users}
                                onChange={(e) => setContent({ ...content, stats_users: e.target.value })}
                                className="w-full bg-background border border-primary/20 rounded-xl px-4 py-2 text-foreground focus:border-accent outline-none transition-all"
                                placeholder="Contoh: 12,400+"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70">Tingkat Keberhasilan (%)</label>
                            <input
                                type="text"
                                value={content.stats_rate}
                                onChange={(e) => setContent({ ...content, stats_rate: e.target.value })}
                                className="w-full bg-background border border-primary/20 rounded-xl px-4 py-2 text-foreground focus:border-accent outline-none transition-all"
                                placeholder="Contoh: 85%"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-secondary text-accent font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
}
