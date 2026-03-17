"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const order_id = searchParams.get("order_id");
    
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [message, setMessage] = useState("Menunggu verifikasi pembayaran...");

    useEffect(() => {
        if (!order_id) {
            setStatus("failed");
            setMessage("Order ID tidak ditemukan.");
            return;
        }

        let attempts = 0;
        const maxAttempts = 20; // 2 minutes with 6s interval

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payments/status?order_id=${order_id}`);
                const json = await res.json();

                if (json.success) {
                    if (json.status === "completed") {
                        setStatus("success");
                        setMessage("Pembayaran Berhasil! Status Premium Anda telah aktif.");
                        // Refresh user data or just wait for redirect
                        return true;
                    } else if (json.status === "failed") {
                        setStatus("failed");
                        setMessage("Pembayaran gagal atau dibatalkan.");
                        return true;
                    }
                }
            } catch (error) {
                console.error("Poll error:", error);
            }
            return false;
        };

        const interval = setInterval(async () => {
            attempts++;
            const done = await checkStatus();
            if (done || attempts >= maxAttempts) {
                clearInterval(interval);
                if (!done) {
                    setStatus("failed");
                    setMessage("Verifikasi terlalu lama. Silakan cek profil Anda secara manual dalam beberapa menit.");
                }
            }
        }, 6000);

        // Initial check
        checkStatus();

        return () => clearInterval(interval);
    }, [order_id]);

    return (
        <div className="min-h-screen bg-[#040814] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center animate-in zoom-in duration-500">
                {status === "loading" && (
                    <>
                        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <Loader2 className="text-secondary animate-spin" size={40} />
                            <div className="absolute inset-0 bg-secondary/10 rounded-full animate-ping opacity-50"></div>
                        </div>
                        <h1 className="text-2xl font-black text-white mb-2 italic">Verifikasi Pembayaran</h1>
                        <p className="text-white/60 text-sm leading-relaxed">{message}</p>
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Mohon jangan tutup halaman ini</p>
                        </div>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="text-green-500" size={40} />
                        </div>
                        <h1 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">Selamat Datang!</h1>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Crown size={12} /> Premium Member
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-8">{message}</p>
                        
                        <Link 
                            href="/dashboard"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                        >
                            Mulai Gunakan Fitur Premium <ArrowRight size={18} />
                        </Link>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="text-red-500" size={40} />
                        </div>
                        <h1 className="text-2xl font-black text-white mb-2 italic">Verifikasi Gagal</h1>
                        <p className="text-white/60 text-sm leading-relaxed mb-8">{message}</p>
                        
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/dashboard/membership"
                                className="w-full py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
                            >
                                Coba Lagi
                            </Link>
                            <Link 
                                href="/dashboard"
                                className="w-full py-4 text-white/40 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PaymentVerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#040814] flex items-center justify-center">
                <Loader2 className="text-accent animate-spin" size={48} />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
