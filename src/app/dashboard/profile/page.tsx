"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, Key, Loader2, CheckCircle2, AlertCircle, Crown } from "lucide-react";

export default function UserProfilePage() {
    const [userData, setUserData] = useState({ 
        username: "", 
        email: "", 
        phone: "", 
        membership_status: "FREE",
        isPremium: false,
        premium_start_date: null,
        loading: true 
    });
    
    // Profile Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ username: "", phone: "" });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState({ type: "", text: "" });

    // Password Change State
    const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [pwdMessage, setPwdMessage] = useState({ type: "", text: "" });

    // Auto-clear messages
    useEffect(() => {
        if (profileMessage.text) {
            const timer = setTimeout(() => setProfileMessage({ type: "", text: "" }), 5000);
            return () => clearTimeout(timer);
        }
    }, [profileMessage.text]);

    useEffect(() => {
        if (pwdMessage.text) {
            const timer = setTimeout(() => setPwdMessage({ type: "", text: "" }), 5000);
            return () => clearTimeout(timer);
        }
    }, [pwdMessage.text]);

    useEffect(() => {
        fetch("/api/user/me")
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    const data = {
                        username: json.data.username || "",
                        email: json.data.email || "",
                        phone: json.data.phone || "",
                        membership_status: json.data.membership_status || "FREE",
                        isPremium: json.data.isPremium || false,
                        premium_start_date: json.data.premium_start_date,
                        loading: false
                    };
                    setUserData(data);
                    setEditForm({ username: data.username, phone: data.phone });
                }
            })
            .catch(err => {
                console.error("Failed to load profile", err);
                setUserData(prev => ({ ...prev, loading: false }));
            });
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/user/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });
            const json = await res.json();

            if (json.success) {
                setUserData(prev => ({ ...prev, ...editForm }));
                setProfileMessage({ type: "success", text: "Profil berhasil diperbarui!" });
                setIsEditing(false);
            } else {
                setProfileMessage({ type: "error", text: json.error || "Gagal memperbarui profil" });
            }
        } catch (err) {
            setProfileMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwdForm.newPassword !== pwdForm.confirmPassword) {
            setPwdMessage({ type: "error", text: "Konfirmasi password tidak cocok" });
            return;
        }

        setPwdLoading(true);
        setPwdMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: pwdForm.currentPassword,
                    newPassword: pwdForm.newPassword
                })
            });
            const json = await res.json();

            if (json.success) {
                setPwdMessage({ type: "success", text: "Password berhasil diubah!" });
                setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setPwdMessage({ type: "error", text: json.error || "Gagal mengubah password" });
            }
        } catch (err) {
            setPwdMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
        } finally {
            setPwdLoading(false);
        }
    };

    const handleUpgrade = async () => {
        try {
            const res = await fetch("/api/user/checkout", { method: "POST" });
            const json = await res.json();
            if (json.success && json.data.checkoutUrl) {
                window.location.href = json.data.checkoutUrl;
            } else {
                alert(json.error || "Gagal memulai pembayaran");
            }
        } catch (err) {
            alert("Terjadi kesalahan koneksi");
        }
    };

    if (userData.loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="relative">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                    Pengaturan <span className="text-accent">Profil</span>
                </h1>
                <p className="text-white/40 text-sm mt-2">Kelola informasi akun dan keamanan Anda di sini.</p>
            </div>

            {/* Membership Status Card */}
            <div className={`relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 border transition-all duration-500 ${userData.isPremium ? 'bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-500/30' : 'bg-white/5 border-white/10'}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${userData.isPremium ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' : 'bg-white/10 text-white/40'}`}>
                            {userData.isPremium ? <Crown size={32} /> : <User size={32} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                    {userData.isPremium ? 'Premium Member' : 'Free Member'}
                                </h2>
                                {userData.isPremium && (
                                    <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Gold</span>
                                )}
                            </div>
                            <p className="text-white/40 text-sm font-medium">
                                {userData.isPremium 
                                    ? `Aktif sejak ${new Date(userData.premium_start_date!).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` 
                                    : 'Akses terbatas untuk fitur-fitur pilihan.'}
                            </p>
                        </div>
                    </div>

                    {!userData.isPremium && (
                        <button 
                            onClick={handleUpgrade}
                            className="px-8 py-4 bg-accent hover:bg-accent/80 text-black font-black rounded-2xl transition-all shadow-xl shadow-accent/20 flex items-center gap-2 uppercase tracking-tight text-sm"
                        >
                            Support & Upgrade ke Premium
                        </button>
                    )}
                    
                    {userData.isPremium && (
                        <div className="flex flex-wrap gap-2">
                            {['Semua Simulator', '14 Hari Challenge', 'Report Lengkap'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Decorative background elements */}
                <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors ${userData.isPremium ? 'bg-yellow-500/20' : 'bg-white/5'}`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Column 1: Profile Info */}
                <div className="bg-[#0A0F1F] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-accent/20 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-lg shadow-accent/5">
                            <User size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Informasi Dasar</h2>
                            <p className="text-white/30 text-xs">Data identitas platform Anda</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-accent transition-colors">
                                    <User size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    value={editForm.username}
                                    onChange={e => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                                    disabled={!isEditing}
                                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Email (Akun Utama)</label>
                            <div className="relative opacity-60">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    value={userData.email}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Nomor Telepon</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-accent transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    value={editForm.phone}
                                    onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                    disabled={!isEditing}
                                    placeholder="Belum diatur"
                                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/40 transition-all ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                />
                            </div>
                        </div>

                        {profileMessage.text && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-left-2 ${profileMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                {profileMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-medium">{profileMessage.text}</span>
                            </div>
                        )}

                        <div className="pt-4 flex gap-4">
                            {isEditing ? (
                                <>
                                    <button 
                                        type="submit"
                                        disabled={profileLoading}
                                        className="flex-1 bg-accent hover:bg-accent/80 text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 uppercase tracking-tight text-sm disabled:opacity-50"
                                    >
                                        {profileLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                        Simpan Perubahan
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditForm({ username: userData.username, phone: userData.phone });
                                            setProfileMessage({ type: "", text: "" });
                                        }}
                                        className="px-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all text-sm"
                                    >
                                        Batal
                                    </button>
                                </>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(true);
                                        setProfileMessage({ type: "", text: "" });
                                    }}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-tight text-sm"
                                >
                                    Ubah Profil
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Column 2: Security */}
                <div className="bg-[#0A0F1F] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                            <Lock size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Keamanan Akun</h2>
                            <p className="text-white/30 text-xs">Kelola proteksi dan kata sandi</p>
                        </div>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Password Saat Ini</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-primary transition-colors">
                                    <Key size={18} />
                                </div>
                                <input 
                                    type={showPasswords.current ? "text" : "password"}
                                    value={pwdForm.currentPassword}
                                    onChange={e => setPwdForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                    className="absolute inset-y-0 right-4 flex items-center text-white/20 hover:text-white transition-colors"
                                >
                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Password Baru</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type={showPasswords.new ? "text" : "password"}
                                    value={pwdForm.newPassword}
                                    onChange={e => setPwdForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                    className="absolute inset-y-0 right-4 flex items-center text-white/20 hover:text-white transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1">Konfirmasi Password Baru</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={pwdForm.confirmPassword}
                                    onChange={e => setPwdForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                    className="absolute inset-y-0 right-4 flex items-center text-white/20 hover:text-white transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {pwdMessage.text && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-left-2 ${pwdMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                {pwdMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-medium">{pwdMessage.text}</span>
                            </div>
                        )}

                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={pwdLoading}
                                className="w-full bg-[#050812] hover:bg-primary text-white hover:text-black font-black py-4 rounded-2xl border border-primary/40 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-tight text-sm disabled:opacity-50"
                            >
                                {pwdLoading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                                Perbarui Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
