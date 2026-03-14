"use client";

import { useState, useEffect } from "react";
import { UserPlus, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

interface PendingUser {
    id: string;
    username: string;
    email: string;
    date: string;
    reason?: string;
}

export default function ApproveUserPage() {
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/users/pending");
            const json = await res.json();
            if (json.success) setPendingUsers(json.data);
        } catch (err) {
            console.error("Failed to fetch pending users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const json = await res.json();
            if (json.success) {
                // Remove the user from the list instead of full refetch
                setPendingUsers(prev => prev.filter(u => u.id !== id));
            }
        } catch (err) {
            console.error(`Failed to ${status} user`, err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <UserPlus className="text-accent" /> Approve New Users
                    </h2>
                    <p className="text-sm text-foreground/50">Tinjau dan setujui pendaftaran pengguna baru sebelum mereka dapat mengakses fitur pemulihan.</p>
                </div>
            </div>

            {/* Pending Approvals Table */}
            <div className="bg-[#0A0F1F] border border-orange-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.05)]">
                <div className="p-5 border-b border-orange-500/10 flex items-center justify-between bg-orange-500/5">
                    <div className="flex items-center gap-2">
                        <Clock className="text-orange-500" size={18} />
                        <h3 className="font-bold text-orange-500">Antrean Verifikasi ({pendingUsers.length})</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A0F1F] text-xs uppercase text-foreground/50 border-b border-primary/10">
                            <tr>
                                <th className="py-4 px-6 font-bold">Username</th>
                                <th className="py-4 px-6 font-bold">Email</th>
                                <th className="py-4 px-6 font-bold">Tanggal Daftar</th>
                                <th className="py-4 px-6 font-bold">Alasan / Catatan</th>
                                <th className="py-4 px-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                        <tbody className="divide-y divide-primary/5">
                            {pendingUsers.map((user, i) => (
                                <tr key={user.id} className="text-foreground hover:bg-primary/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-bold">@{user.username}</p>
                                        <p className="text-[10px] text-foreground/50">{user.id.split('-')[0]}...</p>
                                    </td>
                                    <td className="py-4 px-6 text-foreground/70">{user.email}</td>
                                    <td className="py-4 px-6 text-foreground/50">{user.date}</td>
                                    <td className="py-4 px-6">
                                        <div className="bg-foreground/5 px-3 py-1.5 rounded-lg border border-primary/10 text-xs truncate max-w-[200px]">
                                            {user.reason || "Pendaftaran Baru"}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleAction(user.id, "APPROVED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 hover:bg-accent text-accent hover:text-background font-bold border border-accent/30 rounded-lg transition-all text-xs">
                                                <CheckCircle size={14} /> Approve
                                            </button>
                                            <button onClick={() => handleAction(user.id, "REJECTED")} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold border border-red-500/30 rounded-lg transition-all text-xs">
                                                <XCircle size={14} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pendingUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-foreground/50">
                                        Tidak ada akun yang menunggu persetujuan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}
