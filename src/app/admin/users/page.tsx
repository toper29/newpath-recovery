"use client";

import { useState, useEffect } from "react";
import { Search, Filter, AlertTriangle, Users, MoreVertical, Eye, Ban, Trash2, KeyRound, Loader2, CheckCircle } from "lucide-react";

interface UserData {
    id: string;
    username: string;
    email: string;
    phone: string;
    status: string;
    level: number;
    xp: number;
    score?: number;
    createdAt: string;
    lastActivity: string;
    latestScore: number;
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("ALL");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/users?status=${filterStatus}`);
                const json = await res.json();
                if (json.success) setUsers(json.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [filterStatus]);

    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleAction = async (userId: string, action: string) => {
        let confirmText = `Apakah Anda yakin ingin melakukan aksi ${action} pada pengguna ini?`;
        if (action === "suspend") confirmText = "Apakah Anda yakin ingin MENANGGUHKAN (suspend) pengguna ini? Mereka tidak akan bisa login.";
        if (action === "unsuspend") confirmText = "Apakah Anda yakin ingin MENGAKTIPKAN KEMBALI pengguna ini? Mereka akan bisa login dan menggunakan fitur kembali.";
        if (action === "delete") confirmText = "PERINGATAN: Apakah Anda yakin ingin MENGHAPUS PERMANEN pengguna ini beserta seluruh datanya? Aksi ini tidak bisa dibatalkan.";
        if (action === "reset") confirmText = "Apakah Anda yakin ingin RESET PASSWORD pengguna ini ke default?";

        if (!confirm(confirmText)) return;
        setLoading(true);
        try {
            if (action === "suspend") {
                await fetch(`/api/admin/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "SUSPENDED" })
                });
            } else if (action === "unsuspend") {
                await fetch(`/api/admin/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "APPROVED" })
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
            const res = await fetch(`/api/admin/users?status=${filterStatus}`);
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
                    <button className="flex items-center gap-2 px-4 py-3 bg-[#0A0F1F] border border-primary/20 rounded-xl text-sm font-medium hover:bg-primary/20 transition-all text-foreground/80">
                        <Filter size={16} /> Status: All
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary border border-secondary text-foreground font-bold rounded-xl hover:bg-secondary transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <Users size={16} /> Add New User
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-foreground/40 mr-2 uppercase tracking-wider">Quick Filter:</span>
                <button onClick={() => setFilterStatus('ALL')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterStatus === 'ALL' ? 'bg-primary text-accent' : 'bg-foreground/5 text-foreground/60 hover:text-foreground'}`}>All Users</button>
                <button onClick={() => setFilterStatus('PENDING')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterStatus === 'PENDING' ? 'bg-primary text-accent' : 'bg-foreground/5 text-foreground/60 hover:text-foreground'}`}>Pending</button>
                <button onClick={() => setFilterStatus('APPROVED')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterStatus === 'APPROVED' ? 'bg-primary text-accent' : 'bg-foreground/5 text-foreground/60 hover:text-foreground'}`}>Active</button>
                <button onClick={() => setFilterStatus('SUSPENDED')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterStatus === 'SUSPENDED' ? 'bg-primary text-accent' : 'bg-foreground/5 text-foreground/60 hover:text-foreground'}`}>Suspended</button>
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
                                <th className="py-4 px-6 font-bold">Status</th>
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
                                        <div className="flex flex-col">
                                            <span className="font-bold text-accent text-sm">Lv {user.level}</span>
                                            <span className="text-[10px] text-foreground/50">{user.xp} XP</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit font-bold ${user.status === 'APPROVED' ? 'border-accent/30 text-accent bg-accent/5' :
                                                user.status === 'PENDING' ? 'border-orange-500/30 text-orange-500 bg-orange-500/5' :
                                                    'border-red-500/30 text-red-500 bg-red-500/5'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'APPROVED' ? 'bg-accent' : user.status === 'PENDING' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-foreground/70 text-sm">{user.lastActivity || "-"}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="relative group inline-block text-left">
                                            <button className="text-accent hover:text-white p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-[#112422] border border-primary/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                                <div className="py-1 flex flex-col">
                                                    <button onClick={() => setSelectedUser(user)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20 transition-colors text-foreground">
                                                        <Eye size={14} className="text-accent" /> View Details
                                                    </button>
                                                    
                                                    {user.status === 'SUSPENDED' ? (
                                                        <button onClick={() => handleAction(user.id, "unsuspend")} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-accent/10 text-accent transition-colors">
                                                            <CheckCircle size={14} /> Un-Suspend User
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleAction(user.id, "suspend")} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-orange-500/10 text-orange-500 transition-colors">
                                                            <Ban size={14} /> Suspend User
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
                                <span className="font-bold text-foreground/50">Status</span>
                                <span className="font-bold text-accent">{selectedUser.status}</span>
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
