"use client";

import Link from "next/link";
import { ShieldAlert, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateForm, logSecurityAlert } from "@/lib/security";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (failedAttempts >= 2) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, failedAttempts * 1000));
            setIsLoading(false);
        }

        const { isValid, threats } = validateForm({ name, email, phone, password });
        if (!isValid) {
            logSecurityAlert("MALICIOUS_INPUT_REGISTER", threats.join(", "));
            setError("Input mengandung karakter yang tidak valid atau dilarang.");
            return;
        }

        if (showCaptcha && captchaToken !== "ROBOT_PASSED") {
             setError("Harap isi Captcha terlebih dahulu.");
             return;
        }

        setIsLoading(true);

        // 2. Real API Call
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: name, 
                    email, 
                    password, 
                    phone 
                })
            });
            const json = await res.json();

            setIsLoading(false);

            if (json.success) {
                setIsSuccess(true);
            } else {
                const newFails = failedAttempts + 1;
                setFailedAttempts(newFails);
                if (newFails >= 3) setShowCaptcha(true);
                setError(json.error || "Gagal melakukan pendaftaran.");
            }
        } catch (err) {
            setIsLoading(false);
            console.error("Register Error:", err);
            setError("Terjadi kesalahan sistem. Harap coba lagi.");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-background border border-primary/20 p-8 rounded-2xl shadow-xl shadow-primary/5 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-4">
                        <ShieldAlert size={14} />
                        Privasi 100% Terjamin
                    </div>
                    <h1 className="text-2xl font-bold text-foreground text-center">Langkah Pertama Kebebasan</h1>
                    <p className="text-sm text-foreground/60 mt-2 text-center">
                        Ambil kembali kendali atas hidup dan keuangan Anda hari ini.
                    </p>
                </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-start gap-2">
                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {isSuccess ? (
                        <div className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-4">
                            <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                <ShieldCheck size={24} className="text-green-500" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Pendaftaran Berhasil!</h3>
                            <p className="text-sm text-foreground/80">
                                Data Anda telah kami terima. Akun Anda sedang dalam proses verifikasi. 
                                Nanti akan dihubungi oleh tim pendaftaran akun kami melalui WhatsApp.
                            </p>
                            <Link 
                                href="/login" 
                                className="inline-block mt-4 px-6 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all"
                            >
                                Kembali ke Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">Nama Panggilan (Anonim)</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=""
                                    className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    required
                                />
                                <p className="text-[10px] text-foreground/40 mt-1">Gunakan nama samaran agar Anda merasa aman.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=""
                                    className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">No WhatsApp Aktif</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder=""
                                    className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    required
                                />
                                <p className="text-[10px] text-foreground/40 mt-1">Digunakan untuk notifikasi emergency call dan progress pemulihan.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=""
                                    className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    required
                                    minLength={8}
                                />
                            </div>

                            {showCaptcha && (
                                <div className="p-4 bg-foreground/5 border border-primary/30 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 rounded border-primary/50 accent-accent cursor-pointer"
                                            onChange={(e) => setCaptchaToken(e.target.checked ? "ROBOT_PASSED" : "")}
                                            checked={captchaToken === "ROBOT_PASSED"}
                                        />
                                        <span className="text-sm font-medium">Saya bukan robot</span>
                                    </div>
                                    <ShieldCheck size={24} className="text-accent/50" />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        {failedAttempts >= 2 ? "Menerapkan Keamanan..." : "Memproses..."}
                                    </>
                                ) : (
                                    <>
                                        Daftar & Mulai 30 Hari Challenge
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                <p className="text-center text-sm text-foreground/60 mt-6 relative z-10">
                    Sudah memiliki akun?{" "}
                    <Link href="/login" className="text-accent hover:text-accent/80 font-bold">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}
