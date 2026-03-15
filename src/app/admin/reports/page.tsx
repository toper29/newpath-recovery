"use client";

import { useState, useEffect } from "react";
import { Search, ShieldAlert, Globe, Trash2, Loader2, AlertTriangle, ExternalLink, Calendar, Users, BarChart3, Filter, Download } from "lucide-react";

interface Report {
    id: string;
    siteName: string;
    siteLink: string;
    hasRegistered: boolean;
    remarks: string | null;
    createdAt: string;
    user?: {
        username: string;
    } | null;
}

interface AggregatedReport {
    siteName: string;
    siteLink: string;
    count: number;
}

interface Stats {
    totalReports: number;
    uniqueSites: number;
}

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [aggregated, setAggregated] = useState<AggregatedReport[]>([]);
    const [stats, setStats] = useState<Stats>({ totalReports: 0, uniqueSites: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"DEATILS" | "AGGREGATED">("DEATILS");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/reports?query=${encodeURIComponent(searchQuery)}`);
            const json = await res.json();
            if (json.success) {
                setReports(json.data.reports);
                setAggregated(json.data.aggregated);
                setStats(json.data.stats);
            }
        } catch (err) {
            console.error("Failed to fetch reports", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus laporan ini?")) return;
        
        try {
            const res = await fetch(`/api/admin/reports/${id}`, {
                method: "DELETE"
            });
            const json = await res.json();
            if (json.success) {
                fetchData();
            } else {
                alert(json.error || "Gagal menghapus laporan");
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                        <ShieldAlert className="text-red-500" /> Data Laporan <span className="text-red-500">Situs Judi</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px] font-black">Pantau dan kelola laporan situs dari pengguna.</p>
                </div>
                <button 
                    onClick={async () => {
                        const res = await fetch("/api/admin/gambling-sites/report");
                        const json = await res.json();
                        if (json.success) {
                            const data = json.data;
                            const printWindow = window.open('', '_blank');
                            if (printWindow) {
                                printWindow.document.write(`
                                                            <html>
                                                                <head>
                                                                    <title>Official Gambling Site Report - NewPath Recovery</title>
                                                                    <style>
                                                                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                                                                        body { font-family: 'Inter', sans-serif; padding: 50px; color: #1f2937; line-height: 1.5; }
                                                                        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 4px solid #ef4444; padding-bottom: 25px; margin-bottom: 40px; }
                                                                        .logo-container { display: flex; align-items: center; gap: 15px; }
                                                                        .logo-img { height: 60px; width: auto; }
                                                                        .logo-text { font-size: 28px; font-weight: 950; letter-spacing: -1.5px; color: #ef4444; text-transform: uppercase; }
                                                                        .report-meta { text-align: right; }
                                                                        .report-title { font-size: 24px; font-weight: 900; text-transform: uppercase; color: #111; margin-bottom: 2px; }
                                                                        .section { margin-bottom: 40px; page-break-inside: avoid; }
                                                                        .section-title { font-size: 14px; font-weight: 900; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; color: #ef4444; }
                                                                        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                                                                        .stat-card { background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; }
                                                                        .stat-value { font-size: 32px; font-weight: 900; color: #111; line-height: 1; }
                                                                        .stat-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 5px; }
                                                                        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                                                                        th { background: #f1f5f9; text-align: left; padding: 12px; font-weight: 800; text-transform: uppercase; font-size: 10px; color: #475569; }
                                                                        td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
                                                                        .domain-pill { font-family: 'JetBrains Mono', monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #e2e8f0; }
                                                                        .footer { margin-top: 80px; padding-top: 30px; border-top: 2px solid #f1f5f9; text-align: center; font-size: 10px; color: #94a3b8; }
                                                                        @media print { .no-print { display: none; } }
                                                                    </style>
                                                                </head>
                                                                <body>
                                                                    <div class="header">
                                                                        <div class="logo-container">
                                                                            <img src="/logo.png" alt="NewPath Logo" class="logo-img" onerror="this.style.display='none'; document.getElementById('logoFallback').style.display='block'">
                                                                            <div id="logoFallback" class="logo-text" style="display:none">NEWPATH RECOVERY</div>
                                                                        </div>
                                                                        <div class="report-meta">
                                                                            <div class="report-title">Gambling Site Exposure Monitoring</div>
                                                                            <div style="font-weight: 700; font-size: 12px; color: #64748b;">DOC-ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()} | ${new Date().toLocaleDateString()}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="section">
                                                                        <div class="section-title">Critical Insight Summary</div>
                                                                        <div class="grid">
                                                                            <div class="stat-card">
                                                                                <div class="stat-value">${data.summary.totalReports}</div>
                                                                                <div class="stat-label">Total Submissions Received</div>
                                                                            </div>
                                                                            <div class="stat-card">
                                                                                <div class="stat-value">${data.reports.length}</div>
                                                                                <div class="stat-label">Unique Domains Monitored</div>
                                                                            </div>
                                                                            <div class="stat-card">
                                                                                <div class="stat-value" style="color: #ef4444;">${Math.round((data.summary.totalReports / 14) * 100)}%</div>
                                                                                <div class="stat-label">System Saturation Index</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="section">
                                                                        <div class="section-title">Verified High-Risk Domains</div>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style="width: 40%">Target Domain</th>
                                                                                    <th style="width: 30%">Incident Frequency</th>
                                                                                    <th style="width: 30%">Risk Classification</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                ${data.summary.topDomains.map(([domain, count]: any) => `
                                                                                    <tr>
                                                                                        <td><span class="domain-pill">${domain}</span></td>
                                                                                        <td><strong>${count}</strong> documented incidents</td>
                                                                                        <td><span style="color: #ef4444; font-weight: 800; border: 1px solid #fee2e2; padding: 4px 10px; border-radius: 6px; background: #fee2e2;">CRITICAL EXPOSURE</span></td>
                                                                                    </tr>
                                                                                `).join('')}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    <div class="section">
                                                                        <div class="section-title">Comprehensive Audit Trail (Latest 20)</div>
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Date</th>
                                                                                    <th>Platform Alias</th>
                                                                                    <th>Source URL</th>
                                                                                    <th>Source ID</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                ${data.reports.slice(0, 20).map((r: any) => `
                                                                                    <tr>
                                                                                        <td><strong>${new Date(r.createdAt).toLocaleDateString()}</strong></td>
                                                                                        <td><strong>${r.siteName}</strong></td>
                                                                                        <td style="color: #64748b; font-size: 10px;">${r.siteLink}</td>
                                                                                        <td><span style="font-family: monospace;">@${r.user?.username || 'ANONYMOUS'}</span></td>
                                                                                    </tr>
                                                                                `).join('')}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    <div class="footer">
                                                                        <p>&copy; ${new Date().getFullYear()} NewPath Recovery Behavioral Analytics Group. Strictly Confidential.</p>
                                                                        <p>This document is automatically generated for regulatory compliance and behavioral monitoring.</p>
                                                                        <p>CLASSIFIED: INTERNAL GOVERNMENT/MEDICAL USE ONLY</p>
                                                                    </div>
                                                                    <button class="no-print" onclick="window.print()" style="position: fixed; bottom: 30px; right: 30px; background: #ef4444; color: white; border: none; padding: 15px 30px; border-radius: 99px; font-weight: 900; cursor: pointer; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4); text-transform: uppercase; letter-spacing: 1px;">Confirm Print / Download PDF</button>
                                                                </body>
                                                            </html>
                                                        `);
                                                        printWindow.document.close();
                                                    }
                                                }
                                            }}
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-500 transition-all shadow-xl group"
                >
                    <Download size={16} className="group-hover:animate-bounce" /> Download Official Site Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0F1F] border border-red-500/20 rounded-[2rem] p-8 flex items-center justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Total Laporan</p>
                        <h2 className="text-5xl font-black text-white">{stats.totalReports}</h2>
                        <p className="text-red-500/60 text-[10px] font-bold mt-2 uppercase">Laporan Aktif</p>
                    </div>
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <BarChart3 size={32} />
                    </div>
                </div>

                <div className="bg-[#0A0F1F] border border-primary/20 rounded-[2rem] p-8 flex items-center justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Total Situs Unik</p>
                        <h2 className="text-5xl font-black text-white">{stats.uniqueSites}</h2>
                        <p className="text-primary/60 text-[10px] font-bold mt-2 uppercase">Situs Berbeda Dilaporkan</p>
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Globe size={32} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-2 bg-[#0A0F1F] p-1 rounded-2xl border border-white/5">
                    <button 
                        onClick={() => setActiveTab("DEATILS")}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'DEATILS' ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
                    >
                        Detail Laporan
                    </button>
                    <button 
                        onClick={() => setActiveTab("AGGREGATED")}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'AGGREGATED' ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
                    >
                        Rekap per Situs
                    </button>
                </div>

                <div className="relative w-full md:w-[400px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                        type="text" 
                        placeholder="Cari nama atau link situs..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0A0F1F] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary transition-all"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#0A0F1F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {activeTab === "DEATILS" ? (
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-white/30 border-b border-white/5">
                                    <tr>
                                        <th className="py-6 px-8">ID / Tanggal</th>
                                        <th className="py-6 px-8">Situs / Platform</th>
                                        <th className="py-6 px-8">Terdaftar?</th>
                                        <th className="py-6 px-8">Keterangan</th>
                                        <th className="py-6 px-8 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {reports.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-white/20 uppercase font-black tracking-widest">
                                                Tidak ada laporan ditemukan
                                            </td>
                                        </tr>
                                    ) : (
                                        reports.map((report) => (
                                            <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="py-6 px-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-mono text-white/40 mb-1">#{report.id.split('-')[0]}</span>
                                                        <span className="text-white/60 font-medium flex items-center gap-2">
                                                            <Calendar size={12} />
                                                            {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-black uppercase italic tracking-tight">{report.siteName}</span>
                                                        <a href={report.siteLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1 mt-1">
                                                            {report.siteLink} <ExternalLink size={10} />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                                        report.hasRegistered 
                                                            ? 'border-red-500/30 text-red-500 bg-red-500/5' 
                                                            : 'border-green-500/30 text-green-500 bg-green-500/5'
                                                    }`}>
                                                        {report.hasRegistered ? 'YA' : 'TIDAK'}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-8 max-w-[200px] truncate">
                                                    <span className="text-white/40 text-xs italic">{report.remarks || "-"}</span>
                                                    {report.user && (
                                                        <div className="flex items-center gap-1.5 mt-2 opacity-60">
                                                            <Users size={10} className="text-accent" />
                                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">{report.user.username}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <button 
                                                        onClick={() => handleDelete(report.id)}
                                                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-white/30 border-b border-white/5">
                                    <tr>
                                        <th className="py-6 px-8">Nama Situs</th>
                                        <th className="py-6 px-8">Link Situs</th>
                                        <th className="py-6 px-8 text-right">Jumlah Laporan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {aggregated.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="py-20 text-center text-white/20 uppercase font-black tracking-widest">
                                                Belum ada rekapitulasi data
                                            </td>
                                        </tr>
                                    ) : (
                                        aggregated.map((item, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="py-6 px-8">
                                                    <span className="text-white font-black uppercase italic tracking-tight">{item.siteName}</span>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <a href={item.siteLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1">
                                                        {item.siteLink} <ExternalLink size={10} />
                                                    </a>
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <span className="px-4 py-1.5 bg-red-500/20 text-red-500 rounded-full font-black text-[11px] tracking-widest uppercase">
                                                        {item.count} Laporan
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
