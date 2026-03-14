"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Globe, UserCheck, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Calendar, Link as LinkIcon } from "lucide-react";

export default function ReportSitePage() {
    const [form, setForm] = useState({
        siteName: "",
        siteLink: "",
        hasRegistered: "Tidak",
        remarks: ""
    });
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [reports, setReports] = useState<any[]>([]);
    const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
        type: "",
        message: ""
    });

    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const res = await fetch("/api/user/report-site");
            const json = await res.json();
            if (json.success) {
                setReports(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch history", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await fetch("/api/user/report-site", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const json = await res.json();

            if (json.success) {
                setStatus({
                    type: "success",
                    message: "Terima kasih. Laporan Anda telah kami terima."
                });
                setForm({
                    siteName: "",
                    siteLink: "",
                    hasRegistered: "Tidak",
                    remarks: ""
                });
                fetchHistory(); // Refresh history
            } else {
                setStatus({
                    type: "error",
                    message: json.error || "Gagal mengirim laporan"
                });
            }
        } catch (err) {
            setStatus({
                type: "error",
                message: "Terjadi kesalahan koneksi"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500/10 to-transparent p-8 rounded-[2rem] border border-red-500/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-500/20 rounded-2xl text-red-500">
                        <ShieldAlert size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">
                        Laporkan <span className="text-red-500">Situs Judi</span>
                    </h1>
                </div>
                <p className="text-white/60 text-sm max-w-2xl leading-relaxed">
                    Jika Anda menemukan situs atau platform yang mengarah ke perjudian online, silakan laporkan melalui form ini. 
                    Bantu kami membangun lingkungan yang lebih aman bagi semua.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Left: Input Form (3/5) */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-[#0A0F1F] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-red-500/10 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                        
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                {/* Site Name */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">
                                        Nama Situs / Platform Judi
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within/input:text-red-500 transition-colors">
                                            <ShieldAlert size={18} />
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="Contoh: SlotXYZ"
                                            value={form.siteName}
                                            onChange={e => setForm(prev => ({ ...prev, siteName: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/40 transition-all placeholder:text-white/10"
                                        />
                                    </div>
                                </div>

                                {/* Site Link */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">
                                        Link Situs Judi
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within/input:text-red-500 transition-colors">
                                            <Globe size={18} />
                                        </div>
                                        <input 
                                            type="url" 
                                            required
                                            placeholder="https://slotxyz.com"
                                            value={form.siteLink}
                                            onChange={e => setForm(prev => ({ ...prev, siteLink: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/40 transition-all placeholder:text-white/10"
                                        />
                                    </div>
                                </div>

                                {/* Has Registered */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">
                                        Pernah Mendaftar?
                                    </label>
                                    <div className="flex gap-4">
                                        {["Ya", "Tidak"].map(option => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setForm(prev => ({ ...prev, hasRegistered: option }))}
                                                className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-tighter transition-all border ${
                                                    form.hasRegistered === option 
                                                        ? "bg-red-500 text-black border-red-500 shadow-lg shadow-red-500/20" 
                                                        : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                                                }`}
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    {form.hasRegistered === option && <UserCheck size={16} />}
                                                    {option}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-1">
                                        Keterangan (Opsional)
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute top-4 left-4 text-white/20 group-focus-within/input:text-red-500 transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea 
                                            placeholder="Info tambahan..."
                                            value={form.remarks}
                                            onChange={e => setForm(prev => ({ ...prev, remarks: e.target.value }))}
                                            rows={2}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/40 transition-all placeholder:text-white/10 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {status.message && (
                                <div className={`p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2 duration-300 ${
                                    status.type === 'success' 
                                        ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}>
                                    {status.type === 'success' ? <CheckCircle2 className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
                                    <p className="font-bold text-xs tracking-tight">{status.message}</p>
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-500 hover:bg-red-400 text-black font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-500/10 flex items-center justify-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50 group/btn"
                                >
                                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    Kirim Laporan
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Disclaimer Box */}
                    <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center gap-4 opacity-40">
                        <div className="p-3 bg-white/10 rounded-xl shrink-0">
                            <ShieldAlert className="text-white/40" size={20} />
                        </div>
                        <p className="text-white/30 text-[9px] leading-relaxed uppercase font-black tracking-tight">
                            Data dikumpulkan untuk tujuan pemantauan dan pencegahan dampak negatif perjudian online. Privasi Anda terjaga.
                        </p>
                    </div>
                </div>

                {/* Right: History (2/5) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-accent" /> Laporan <span className="text-accent">Saya</span>
                        </h2>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">
                            {reports.length} Laporan
                        </span>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto section-scrollbar pr-2">
                        {historyLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center bg-white/5 rounded-[2rem] border border-white/5">
                                <Loader2 size={32} className="text-accent animate-spin mb-4" />
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Memuat Riwayat...</p>
                            </div>
                        ) : reports.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center bg-white/5 rounded-[2rem] border border-white/5 text-center px-8 opacity-40">
                                <ShieldAlert size={40} className="mb-4 text-white/20" />
                                <p className="text-xs font-black text-white/40 uppercase tracking-widest leading-relaxed">Belum ada laporan yang Anda buat.</p>
                            </div>
                        ) : (
                            reports.map((report, i) => (
                                <div key={report.id} className="bg-[#050812] border border-white/5 rounded-2xl p-5 hover:border-accent/30 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                            <Globe size={16} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest flex items-center gap-1">
                                                <Calendar size={10} /> {new Date(report.createdAt).toLocaleDateString('id-ID')}
                                            </span>
                                            <span className="text-[8px] font-mono text-white/10 mt-1">#{report.id.substring(0, 8)}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-accent transition-colors mb-1">{report.siteName}</h4>
                                    <p className="text-[10px] text-white/30 truncate flex items-center gap-1">
                                        <LinkIcon size={10} /> {report.siteLink}
                                    </p>
                                    
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${
                                            report.hasRegistered ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-green-500/20 text-green-500 bg-green-500/5'
                                        }`}>
                                            {report.hasRegistered ? 'Terdaftar' : 'Cek Saja'}
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
