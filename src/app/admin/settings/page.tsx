"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";

export default function SystemSettingsPage() {
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(json => {
                if (json.success) setSettings(json.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const json = await res.json();
            if (json.success) {
                setMessage({ type: 'success', text: "Pengaturan berhasil diperbarui!" });
            } else {
                setMessage({ type: 'error', text: "Gagal menyimpan pengaturan." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Terjadi kesalahan saat menyimpan." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-accent" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                    <Settings className="text-secondary" /> System Settings
                </h2>
                <p className="text-foreground/50">Konfigurasi parameter global sistem dan harga layanan.</p>
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
                {/* Pricing Section */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                        <DollarSign className="text-accent" size={24} />
                        <h3 className="text-xl font-bold italic">Pricing & Membership</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70">Premium Price (IDR)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 font-bold">Rp</span>
                                <input
                                    type="number"
                                    value={settings.PREMIUM_PRICE || ""}
                                    onChange={(e) => setSettings({ ...settings, PREMIUM_PRICE: e.target.value })}
                                    className="w-full bg-background border border-primary/20 rounded-xl pl-12 pr-4 py-3 text-foreground focus:border-accent outline-none transition-all font-mono"
                                    placeholder="50000"
                                />
                            </div>
                            <p className="text-[10px] text-foreground/30 italic">Harga ini akan digunakan untuk checkout premium (Pakasir).</p>
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
