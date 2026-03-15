"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Plus, Pencil, Trash2, KeyRound, Loader2, X, History, User } from "lucide-react";

interface AdminData {
    id: string;
    username: string;
    email: string;
    date: string;
}

interface AdminLog {
    id: string;
    adminName: string;
    action: string;
    target: string;
    details: string;
    date: string;
}

export default function AdminManagementPage() {
    const [admins, setAdmins] = useState<AdminData[]>([]);
    const [logs, setLogs] = useState<AdminLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [logsLoading, setLogsLoading] = useState(true);
    
    // Form states for Create
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Modal states
    const [editingAdmin, setEditingAdmin] = useState<AdminData | null>(null);
    const [resettingAdmin, setResettingAdmin] = useState<AdminData | null>(null);
    const [deletingAdmin, setDeletingAdmin] = useState<AdminData | null>(null);
    const [editFormData, setEditFormData] = useState({ username: "", email: "" });
    const [newPass, setNewPass] = useState("");
    const [modalActionLoading, setModalActionLoading] = useState(false);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/admins");
            const json = await res.json();
            if (json.success) setAdmins(json.data);
        } catch (err) {
            console.error("Failed to fetch admins", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        setLogsLoading(true);
        try {
            const res = await fetch("/api/admin/admins/logs");
            const json = await res.json();
            if (json.success) setLogs(json.data);
        } catch (err) {
            console.error("Failed to fetch logs", err);
        } finally {
            setLogsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
        fetchLogs();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMsg("Semua field wajib diisi.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/admins", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const json = await res.json();
            if (json.success) {
                setAdmins([json.data, ...admins]);
                setFormData({ username: "", email: "", password: "" });
                fetchLogs();
            } else {
                setErrorMsg(json.error || "Gagal membuat admin");
            }
        } catch (err) {
            setErrorMsg("Terjadi kesalahan sistem");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        if (!editingAdmin) return;
        setModalActionLoading(true);
        try {
            const res = await fetch(`/api/admin/admins/${editingAdmin.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFormData)
            });
            const json = await res.json();
            if (json.success) {
                setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...a, ...editFormData } : a));
                setEditingAdmin(null);
                fetchLogs();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setModalActionLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!resettingAdmin || !newPass) return;
        setModalActionLoading(true);
        try {
            const res = await fetch(`/api/admin/admins/${resettingAdmin.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPass })
            });
            const json = await res.json();
            if (json.success) {
                setNewPass("");
                setResettingAdmin(null);
                fetchLogs();
                alert("Password berhasil direset!");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setModalActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingAdmin) return;
        setModalActionLoading(true);
        try {
            const res = await fetch(`/api/admin/admins/${deletingAdmin.id}`, {
                method: "DELETE"
            });
            const json = await res.json();
            if (json.success) {
                setAdmins(admins.filter(a => a.id !== deletingAdmin.id));
                setDeletingAdmin(null);
                fetchLogs();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setModalActionLoading(false);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                    <ShieldCheck className="text-accent" size={28} /> Admin Management
                </h2>
                <p className="text-foreground/50">Kelola akses Super Admin sistem NewPath.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Admin Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-3xl p-8 h-fit shadow-2xl">
                    <h3 className="font-black text-xl mb-6 flex items-center gap-3">
                        <Plus size={20} className="text-accent" /> Create New Admin
                    </h3>
                    <form onSubmit={handleCreate} className="space-y-6">
                        {errorMsg && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold">
                                {errorMsg}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-foreground/70 uppercase px-1">Username</label>
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                placeholder="e.g. joko_admin" 
                                className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-all" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-foreground/70 uppercase px-1">Email</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="joko@newpath.com" 
                                className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-all" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-foreground/70 uppercase px-1">Password</label>
                            <input 
                                type="password" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                placeholder="••••••••" 
                                className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-all" 
                            />
                        </div>
                        <div className="bg-accent/5 border border-accent/20 rounded-2xl px-5 py-4 flex items-center gap-4">
                            <ShieldCheck size={24} className="text-accent shrink-0" />
                            <div>
                                <p className="text-sm font-black text-accent">Super Admin Access</p>
                                <p className="text-xs text-foreground/40 font-medium">Full system permissions.</p>
                            </div>
                        </div>
                        <button disabled={submitting} type="submit" className="w-full h-14 flex justify-center items-center bg-accent hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-background font-black rounded-2xl mt-4 transition-all shadow-xl shadow-accent/20">
                            {submitting ? <Loader2 className="animate-spin" size={24} /> : "Create Account"}
                        </button>
                    </form>
                </div>

                {/* Admins Table */}
                <div className="lg:col-span-2 bg-[#0A0F1F] border border-primary/20 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-primary/5 text-[10px] uppercase text-foreground/40 border-b border-primary/5">
                                <tr>
                                    <th className="py-6 px-8 font-black">Admin Details</th>
                                    <th className="py-6 px-8 font-black">Role</th>
                                    <th className="py-6 px-8 font-black">Created Date</th>
                                    <th className="py-6 px-8 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-24 text-center">
                                            <Loader2 className="w-10 h-10 animate-spin text-accent mx-auto" />
                                        </td>
                                    </tr>
                                ) : (
                                    admins.map((admin) => (
                                        <tr key={admin.id} className="text-foreground border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black">{admin.username}</p>
                                                        <p className="text-xs text-foreground/40 font-medium">{admin.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-8">
                                                <span className="text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
                                                    SUPER ADMIN
                                                </span>
                                            </td>
                                            <td className="py-5 px-8 text-foreground/40 font-medium">{admin.date}</td>
                                            <td className="py-5 px-8 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => {
                                                            setEditingAdmin(admin);
                                                            setEditFormData({ username: admin.username, email: admin.email });
                                                        }}
                                                        className="p-2.5 bg-foreground/5 hover:bg-accent hover:text-background rounded-xl transition-all border border-primary/10 group" 
                                                        title="Edit Admin"
                                                    >
                                                        <Pencil size={16} className="group-hover:scale-110 transition-transform" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setResettingAdmin(admin)}
                                                        className="p-2.5 bg-foreground/5 hover:bg-secondary hover:text-accent rounded-xl transition-all border border-primary/10 group" 
                                                        title="Reset Password"
                                                    >
                                                        <KeyRound size={16} className="group-hover:scale-110 transition-transform" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setDeletingAdmin(admin)}
                                                        className="p-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 group" 
                                                        title="Delete Admin"
                                                    >
                                                        <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Logs Section */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-foreground flex items-center gap-3">
                            <History className="text-secondary" size={24} /> Admin Activity Log
                        </h3>
                        <p className="text-sm text-foreground/40 mt-1">Jejak aktivitas terakhir para administrator sistem.</p>
                    </div>
                    <button 
                        onClick={fetchLogs}
                        className="text-xs font-black text-accent hover:underline"
                    >
                        REFRESH LOGS
                    </button>
                </div>

                <div className="space-y-3">
                    {logsLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="animate-spin text-secondary" size={32} />
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="text-center py-12 text-foreground/30 font-bold italic">
                            Belum ada aktivitas yang tercatat.
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 p-5 bg-foreground/5 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
                                <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                                    log.action.includes('DELETE') ? 'bg-red-500/10 text-red-400' :
                                    log.action.includes('RESET') ? 'bg-secondary/10 text-accent' :
                                    'bg-green-500/10 text-green-400'
                                }`}>
                                    <ShieldCheck size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                        <p className="text-sm font-black text-foreground uppercase tracking-tight">
                                            {log.action.replace('_', ' ')}
                                        </p>
                                        <p className="text-[10px] font-black text-foreground/30 uppercase">
                                            {log.date}
                                        </p>
                                    </div>
                                    <p className="text-sm text-foreground/60 font-medium">
                                        <span className="text-accent font-bold">{log.adminName}</span> {log.details}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setEditingAdmin(null)} className="absolute top-6 right-6 text-foreground/30 hover:text-foreground">
                            <X size={24} />
                        </button>
                        <h3 className="text-xl font-black mb-6">Edit Admin Details</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-foreground/70 uppercase">Username</label>
                                <input 
                                    type="text"
                                    value={editFormData.username}
                                    onChange={e => setEditFormData({...editFormData, username: e.target.value})}
                                    className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-foreground/70 uppercase">Email</label>
                                <input 
                                    type="email"
                                    value={editFormData.email}
                                    onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                                    className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent"
                                />
                            </div>
                            <button 
                                onClick={handleUpdate}
                                disabled={modalActionLoading}
                                className="w-full h-14 bg-accent text-background font-black rounded-2xl shadow-xl shadow-accent/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {modalActionLoading ? <Loader2 className="animate-spin" size={24} /> : "Update Details"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resettingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-[#0A0F1F] border border-primary/20 rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setResettingAdmin(null)} className="absolute top-6 right-6 text-foreground/30 hover:text-foreground">
                            <X size={24} />
                        </button>
                        <h3 className="text-xl font-black mb-2">Reset Password</h3>
                        <p className="text-sm text-foreground/50 mb-6">Ganti password untuk <span className="text-accent font-bold">{resettingAdmin.username}</span></p>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-foreground/70 uppercase">New Password</label>
                                <input 
                                    type="password"
                                    value={newPass}
                                    onChange={e => setNewPass(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-foreground/5 border border-primary/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent"
                                />
                            </div>
                            <button 
                                onClick={handleResetPassword}
                                disabled={modalActionLoading || !newPass}
                                className="w-full h-14 bg-secondary text-accent font-black rounded-2xl shadow-xl shadow-secondary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {modalActionLoading ? <Loader2 className="animate-spin" size={24} /> : "Reset Account Password"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-[#0A0F1F] border border-red-500/20 rounded-3xl p-10 w-full max-w-md shadow-2xl text-center relative animate-in fade-in zoom-in duration-200">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                            <Trash2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-foreground">Hapus Admin?</h3>
                        <p className="text-foreground/50 mb-10 leading-relaxed font-medium">
                            Tindakan ini permanen. <br />Akun <span className="text-red-400 font-black tracking-tight">{deletingAdmin.username}</span> akan dihapus dari sistem.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setDeletingAdmin(null)}
                                className="h-14 bg-foreground/5 hover:bg-foreground/10 text-foreground font-black rounded-2xl transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleDelete}
                                disabled={modalActionLoading}
                                className="h-14 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                            >
                                {modalActionLoading ? <Loader2 className="animate-spin" size={24} /> : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
