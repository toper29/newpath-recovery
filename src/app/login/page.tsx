"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateForm, logSecurityAlert } from "@/lib/security";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        // Anti-Brute Force Local UI delay
        if (failedAttempts >= 3) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, failedAttempts * 1000)); // Progressive delay
            setIsLoading(false);
        }

        // 1. Input Validation & Sanitization
        const { isValid, threats } = validateForm({ email, password });
        if (!isValid) {
            // Log security threat internally
            logSecurityAlert("MALICIOUS_INPUT", threats.join(", "));
            setError("Input mengandung karakter yang tidak valid atau dilarang secara keamanan.");
            return;
        }

        if (showCaptcha && captchaToken !== "ROBOT_PASSED") {
             setError("Harap isi Captcha terlebih dahulu.");
             return;
        }

        setIsLoading(true);

        // 2. Real API Call
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const json = await res.json();
            
            setIsLoading(false);

            if (json.success) {
                // Determine redirect based on role
                if (json.data.role === "ADMIN" || json.data.role === "SUPER_ADMIN" || json.data.role === "SUPERADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            } else {
                const newFails = failedAttempts + 1;
                setFailedAttempts(newFails);
                if (newFails >= 4) {
                    setShowCaptcha(true);
                }
                setError(json.error || "Gagal masuk. Periksa kembali email dan password Anda.");
            }
        } catch (err) {
            setIsLoading(false);
            console.error("Login Error:", err);
            setError("Terjadi kesalahan server. Harap coba beberapa saat lagi.");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-background border border-primary/20 p-8 rounded-2xl shadow-xl shadow-primary/5">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-accent mb-4">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Selamat Datang Kembali</h1>
                    <p className="text-sm text-foreground/60 mt-1">Lanjutkan perjalanan pemulihan Anda.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
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
                        <label className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            className="w-full bg-foreground/5 border border-primary/30 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            required
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-primary/30 bg-foreground/5 accent-accent" />
                            <span className="text-foreground/70">Ingat saya</span>
                        </label>
                        <Link href="#" className="text-accent hover:text-accent/80 font-medium">
                            Lupa password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-primary text-foreground font-bold rounded-xl hover:bg-secondary transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                {failedAttempts >= 3 ? "Menerapkan Keamanan..." : "Memproses..."}
                            </>
                        ) : (
                            <>
                                Masuk
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-foreground/60 mt-6">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-accent hover:text-accent/80 font-bold">
                        Mulai Pemulihan
                    </Link>
                </p>

                {/* Demo Credentials Helper Removed */}
            </div>
        </div>
    );
}
