"use client";

import { useState, useEffect } from "react";
import { Search, Filter, AlertTriangle, Users, MoreVertical, Eye, Ban, Trash2, KeyRound, Loader2, CheckCircle, FileText, Download, Crown } from "lucide-react";

interface UserData {
    id: string;
    username: string;
    email: string;
    phone: string;
    level: number;
    xp: number;
    score?: number;
    createdAt: string;
    lastActivity: string;
    latestScore: number;
    membership_status: string;
    isPremium: boolean;
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/users`);
                const json = await res.json();
                if (json.success) setUsers(json.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleDownloadReport = async (userId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users/${userId}/report`);
            const json = await res.json();
            if (json.success) {
                // Open report in new window for printing
                const reportData = json.data;
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                    const latestTest = reportData.history.tests[0];
                    const initialTest = reportData.history.tests[reportData.history.tests.length - 1];
                    const progressDelta = initialTest ? (initialTest.score - (latestTest?.score || 0)) : 0;

                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>Official Recovery Report - ${reportData.user.username}</title>
                                <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                                    body { font-family: 'Inter', sans-serif; padding: 50px; color: #1f2937; line-height: 1.5; }
                                    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 4px solid #06b6d4; padding-bottom: 25px; margin-bottom: 40px; }
                                    .logo-container { display: flex; align-items: center; gap: 15px; }
                                    .logo-img { height: 60px; width: auto; }
                                    .logo-text { font-size: 28px; font-weight: 950; letter-spacing: -1.5px; color: #06b6d4; text-transform: uppercase; }
                                    .report-meta { text-align: right; }
                                    .report-title { font-size: 24px; font-weight: 900; text-transform: uppercase; color: #111; margin-bottom: 2px; }
                                    .section { margin-bottom: 40px; page-break-inside: avoid; }
                                    .section-title { font-size: 14px; font-weight: 900; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; color: #06b6d4; }
                                    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
                                    .stat-card { background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; display: flex; flex-direction: column; justify-content: center; }
                                    .stat-value { font-size: 32px; font-weight: 900; color: #06b6d4; line-height: 1; }
                                    .stat-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 5px; }
                                    .progress-box { background: #06b6d4; color: white; padding: 25px; border-radius: 20px; grid-column: span 2; display: flex; justify-content: space-between; align-items: center; }
                                    .progress-text { font-size: 14px; font-weight: 700; }
                                    .progress-percent { font-size: 40px; font-weight: 900; }
                                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                                    th { background: #f1f5f9; text-align: left; padding: 12px; font-weight: 800; text-transform: uppercase; font-size: 10px; color: #475569; }
                                    td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
                                    .badge { padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
                                    .badge-clean { background: #dcfce7; color: #166534; }
                                    .badge-relapse { background: #fee2e2; color: #991b1b; }
                                    .achievement-badge { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; padding: 6px 12px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; font-weight: 800; font-size: 11px; margin-right: 10px; margin-bottom: 10px; }
                                    .note { font-style: italic; color: #64748b; font-size: 11px; margin-top: 4px; }
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
                                        <div class="report-title">Program Performance Analysis</div>
                                        <div style="font-weight: 700; font-size: 12px; color: #64748b;">Generated: ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                                    </div>
                                </div>

                                <div class="section">
                                    <div class="section-title">Verified User Profile</div>
                                    <div class="grid">
                                        <div class="stat-card">
                                            <div style="font-size: 18px; font-weight: 800;">@${reportData.user.username}</div>
                                            <div class="stat-label">System Username</div>
                                        </div>
                                        <div class="stat-card">
                                            <div style="font-size: 18px; font-weight: 800;">${new Date(reportData.user.joinDate).toLocaleDateString()}</div>
                                            <div class="stat-label">Enrollment Date</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="section">
                                    <div class="section-title">Behavioral Recovery Metrics</div>
                                    <div class="grid">
                                        <div class="progress-box">
                                            <div>
                                                <div class="progress-text">Assessment Score Improvement</div>
                                                <div style="font-size: 11px; opacity: 0.8; margin-top: 5px;">Comparison between initial and latest addiction assessment.</div>
                                            </div>
                                            <div class="progress-percent">${progressDelta > 0 ? '+' : ''}${progressDelta}%</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">${reportData.user.streak} Hari</div>
                                            <div class="stat-label">Consecutive Clean Days</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">${reportData.statistics.checkInCount}</div>
                                            <div class="stat-label">Completed Daily Check-ins</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="section">
                                    <div class="section-title">Verified Recovery Achievements</div>
                                    <div style="display: flex; flex-wrap: wrap;">
                                        ${reportData.history.achievements.length === 0 
                                            ? '<div style="color: #64748b; font-style: italic;">No achievements unlocked yet. Continuing participation is encouraged.</div>' 
                                            : reportData.history.achievements.map((ach: any) => `
                                                <div class="achievement-badge">
                                                    <span style="font-size: 16px;">🏆</span>
                                                    <div>
                                                        <div>${ach.title}</div>
                                                        <div style="font-size: 8px; font-weight: 600; text-transform: none; opacity: 0.7;">${ach.description}</div>
                                                    </div>
                                                </div>
                                            `).join('')}
                                    </div>
                                </div>

                                <div class="section">
                                    <div class="section-title">Daily Reflection & Analysis Log</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style="width: 15%;">Date</th>
                                                <th style="width: 15%;">Status</th>
                                                <th style="width: 15%;">Risk Level</th>
                                                <th>User Reflection & Observations</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${reportData.history.checkIns.length === 0 ? '<tr><td colspan="4" style="text-align:center; padding: 40px; color: #94a3b8;">No check-in data available for the selected period.</td></tr>' : 
                                              reportData.history.checkIns.map((ci: any) => `
                                                <tr>
                                                    <td><strong>${new Date(ci.checkedAt).toLocaleDateString('id-ID')}</strong></td>
                                                    <td><span class="badge ${ci.didGamble ? 'badge-relapse' : 'badge-clean'}">${ci.didGamble ? 'RELAPSE' : 'CLEAN'}</span></td>
                                                    <td style="font-weight: 800; color: ${ci.riskScore > 0.6 ? '#ef4444' : ci.riskScore > 0.3 ? '#f97316' : '#10b981'};">
                                                        ${Math.round((ci.riskScore || 0) * 100)}%
                                                    </td>
                                                    <td>
                                                        <div style="font-weight: 600;">${ci.didGamble ? 'Gambled' : 'Did not gamble'} • ${ci.feltLikeDepositing ? 'Felt Uges' : 'Stable'}</div>
                                                        <div class="note">${ci.note || 'No specific notes recorded for this period.'}</div>
                                                    </td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>

                                <div class="footer">
                                    <p>DOC-ID: RECOVERY-AUTO-${reportData.user.username.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                                    <p>Authorized by NewPath Recovery Behavioral Analytics Group. Strictly Confidential.</p>
                                    <p>&copy; ${new Date().getFullYear()} NewPath Recovery Platform. All rights reserved.</p>
                                </div>
                                <button class="no-print" onclick="window.print()" style="position: fixed; bottom: 30px; right: 30px; background: #06b6d4; color: white; border: none; padding: 15px 30px; border-radius: 99px; font-weight: 900; cursor: pointer; box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4); text-transform: uppercase; letter-spacing: 1px;">Confirm Print / Download PDF</button>
                            </body>
                        </html>
                    `);
                    printWindow.document.close();
                }
            }
        } catch (err) {
            console.error("Failed to generate report", err);
        } finally {
            setLoading(false);
        }
    };
    const handleAction = async (userId: string, action: string) => {
        let confirmText = `Apakah Anda yakin ingin melakukan aksi ${action} pada pengguna ini?`;
        if (action === "delete") confirmText = "PERINGATAN: Apakah Anda yakin ingin MENGHAPUS PERMANEN pengguna ini beserta seluruh datanya? Aksi ini tidak bisa dibatalkan.";
        if (action === "reset") confirmText = "Apakah Anda yakin ingin RESET PASSWORD pengguna ini ke default?";
        if (action === "grant-premium") confirmText = "Apakah Anda yakin ingin MEMBERIKAN AKSES PREMIUM LIFETIME secara manual kepada pengguna ini?";

        if (!confirm(confirmText)) return;
        setLoading(true);
        try {
            if (action === "grant-premium") {
                await fetch(`/api/admin/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ membership_status: "premium", admin_override: true })
                });
            } else if (action === "delete") {
                await fetch(`/api/admin/users/${userId}`, {
                    method: "DELETE",
                });
            } else if (action === "reset") {
                const res = await fetch(`/api/admin/users/${userId}/reset-password`, { method: "POST" });
                const json = await res.json();
                if (json.success) {
                    alert(`BERHASIL! Password pengguna direset menjadi: ${json.data.newPassword}`);
                } else {
                    alert("Gagal mereset password.");
                }
            }
            
            // Refresh users
            const res = await fetch(`/api/admin/users`);
            const json = await res.json();
            if (json.success) setUsers(json.data);
        } catch (err) {
            console.error("Action failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search & Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search by username, email, or user ID..."
                        className="w-full bg-[#0A0F1F] border border-primary/20 rounded-xl py-3 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-accent transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary border border-secondary text-foreground font-bold rounded-xl hover:bg-secondary transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <Users size={16} /> Add New User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl overflow-hidden min-h-[400px] flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-primary/5 text-xs uppercase text-foreground/50 border-b border-primary/10">
                            <tr>
                                <th className="py-4 px-6 font-bold">User</th>
                                <th className="py-4 px-6 font-bold">Kontak</th>
                                <th className="py-4 px-6 font-bold">Addiction Score</th>
                                <th className="py-4 px-6 font-bold">Daftar</th>
                                <th className="py-4 px-6 font-bold">Level / XP</th>
                                <th className="py-4 px-6 font-bold">Last Activity</th>
                                <th className="py-4 px-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                        <tbody className="divide-y divide-primary/5">
                            {users.map((user, i) => (
                                <tr key={i} className="text-foreground border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 text-accent flex items-center justify-center font-bold text-xs mt-1">
                                                {user.username.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold flex items-center gap-2">
                                                    @{user.username}
                                                </p>
                                                <span className="text-[10px] font-normal text-foreground/50">{user.id.split('-')[0]}...</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-xs text-foreground/60">
                                        <p>{user.email}</p>
                                        <p className="mt-0.5 text-accent">{user.phone}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-full h-1.5 bg-foreground/10 rounded-full w-[80px]">
                                                <div
                                                    className={`h-full rounded-full ${user.latestScore > 70 ? 'bg-red-500' : user.latestScore > 40 ? 'bg-orange-500' : 'bg-accent'}`}
                                                    style={{ width: `${user.latestScore}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-xs">{user.latestScore}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-foreground/50 text-xs italic">
                                        {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                             <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit font-black mb-1 ${user.membership_status === 'premium' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 'border-white/10 text-white/30 bg-white/5'}`}>
                                                {user.membership_status.toUpperCase()}
                                            </span>
                                            <span className="font-bold text-accent text-sm">Lv {user.level}</span>
                                            <span className="text-[10px] text-foreground/50">{user.xp} XP</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-foreground/70 text-sm">{user.lastActivity || "-"}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="relative group inline-block text-left">
                                            <button className="text-accent hover:text-white p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-[#112422] border border-primary/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                                <div className="py-1 flex flex-col">
                                                    <button onClick={() => handleDownloadReport(user.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20 transition-colors text-foreground">
                                                        <Download size={14} className="text-accent" /> Download Report
                                                    </button>
                                                    <button onClick={() => setSelectedUser(user)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20 transition-colors text-foreground">
                                                        <Eye size={14} className="text-accent" /> View Details
                                                    </button>
                                                    
                                                    {!user.isPremium && (
                                                        <button onClick={() => handleAction(user.id, "grant-premium")} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-yellow-500/10 text-yellow-500 transition-colors">
                                                            <Crown size={14} /> Grant Premium
                                                        </button>
                                                    )}

                                                    <button onClick={() => handleAction(user.id, "reset")} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-foreground/10 transition-colors text-foreground/60">
                                                        <KeyRound size={14} /> Reset Password
                                                    </button>
                                                    <button onClick={() => handleAction(user.id, "delete")} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-red-500/10 text-red-500 transition-colors border-t border-primary/10 mt-1">
                                                        <Trash2 size={14} /> Delete User
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        )}
                    </table>
                </div>
                <div className="p-4 border-t border-primary/10 flex justify-between items-center text-xs text-foreground/50">
                    <span>Showing <strong>{users.length}</strong> users</span>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded bg-foreground/5 hover:bg-foreground/10">&lt;</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded bg-primary text-accent font-bold">1</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded bg-foreground/5 hover:bg-foreground/10">2</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded bg-foreground/5 hover:bg-foreground/10">&gt;</button>
                    </div>
                </div>
            </div>
            {/* View Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                                <Users className="text-accent" /> User Details
                            </h3>
                            <button onClick={() => setSelectedUser(null)} className="text-foreground/50 hover:text-red-500 transition-colors">
                                <Ban size={20} className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 text-sm text-foreground/80">
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">User ID</span>
                                <span>{selectedUser.id}</span>
                            </div>
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">Username</span>
                                <span>@{selectedUser.username}</span>
                            </div>
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">Email</span>
                                <span>{selectedUser.email}</span>
                            </div>
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">Phone</span>
                                <span>{selectedUser.phone}</span>
                            </div>
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">Level / XP</span>
                                <span>Lv {selectedUser.level} - {selectedUser.xp} XP</span>
                            </div>
                            <div className="flex justify-between border-b border-primary/5 pb-2">
                                <span className="font-bold text-foreground/50">Addiction Score</span>
                                <span>{selectedUser.latestScore}%</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="font-bold text-foreground/50">Registered</span>
                                <span>{new Date(selectedUser.createdAt).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-primary/5 flex justify-end">
                            <button onClick={() => setSelectedUser(null)} className="px-6 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground font-bold rounded-xl transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
