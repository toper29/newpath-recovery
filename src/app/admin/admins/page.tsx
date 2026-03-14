"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Plus, Pencil, Trash2, KeyRound, Loader2 } from "lucide-react";

interface AdminData {
    id: string;
    username: string;
    email: string;
    date: string;
}

export default function AdminManagementPage() {
    const [admins, setAdmins] = useState<AdminData[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Form states
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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

    useEffect(() => {
        fetchAdmins();
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
            } else {
                setErrorMsg(json.error || "Gagal membuat admin");
            }
        } catch (err) {
            setErrorMsg("Terjadi kesalahan sistem");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <ShieldCheck className="text-accent" /> Admin Management
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola akses Super Admin sistem NewPath.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Admin Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Plus size={18} className="text-accent" /> Create New Admin
                    </h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        {errorMsg && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-bold">
                                {errorMsg}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Username</label>
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                placeholder="e.g. joko_admin" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Email</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="joko@newpath.com" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Password</label>
                            <input 
                                type="password" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                placeholder="••••••••" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 flex items-center gap-3">
                            <ShieldCheck size={18} className="text-accent shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-accent">Super Admin</p>
                                <p className="text-[10px] text-foreground/40">Akses penuh ke seluruh sistem.</p>
                            </div>
                        </div>
                        <button disabled={submitting} type="submit" className="w-full h-12 flex justify-center items-center bg-accent hover:bg-accent/90 disabled:opacity-50 text-background font-bold rounded-xl mt-2 transition-all shadow-lg shadow-accent/20">
                            {submitting ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                        </button>
                    </form>
                </div>

                {/* Admins Table */}
                <div className="lg:col-span-2 bg-[#0A0F1F] border border-primary/20 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-primary/5 text-xs uppercase text-foreground/50 border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6 font-bold">Admin Details</th>
                                    <th className="py-4 px-6 font-bold">Role</th>
                                    <th className="py-4 px-6 font-bold">Created Date</th>
                                    <th className="py-4 px-6 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                            <tbody className="divide-y divide-primary/5">
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="text-foreground hover:bg-primary/5 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-bold">{admin.username}</p>
                                            <p className="text-xs text-foreground/50">{admin.email}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider bg-red-500/20 text-red-400">
                                                Super Admin
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-foreground/50">{admin.date}</td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg transition-colors border border-primary/10" title="Edit">
                                                    <Pencil size={14} />
                                                </button>
                                                <button className="p-2 bg-foreground/5 hover:bg-foreground/20 text-foreground rounded-lg transition-colors border border-primary/10" title="Reset Password">
                                                    <KeyRound size={14} />
                                                </button>
                                                <button className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20" title="Delete Admin">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
