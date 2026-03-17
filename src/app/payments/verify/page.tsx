'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, Crown } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const order_id = searchParams.get('order_id');
    const [status, setStatus] = useState<'checking' | 'success' | 'pending' | 'error'>('checking');
    const [message, setMessage] = useState('Memverifikasi pembayaran Anda...');

    const checkPaymentStatus = useCallback(async () => {
        if (!order_id) {
            setStatus('error');
            setMessage('Order ID tidak ditemukan.');
            return;
        }

        try {
            const res = await fetch('/api/pakasir/check-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id })
            });
            const data = await res.json();

            if (data.success && data.status === 'completed') {
                setStatus('success');
                setMessage(data.message || 'Pembayaran berhasil diverifikasi!');
                // Redirect to dashboard after 3 seconds to refresh JWT-based session
                setTimeout(() => router.push('/dashboard/membership'), 3000);
            } else {
                setStatus('pending');
                setMessage('Pembayaran belum dikonfirmasi. Pakasir mungkin sedang memproses. Silakan coba lagi dalam beberapa detik.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Gagal menghubungi server verifikasi. Silakan coba lagi.');
        }
    }, [order_id, router]);

    useEffect(() => {
        // Wait 2 seconds before checking to give Pakasir time to update status
        const timer = setTimeout(() => {
            checkPaymentStatus();
        }, 2000);
        return () => clearTimeout(timer);
    }, [checkPaymentStatus]);

    return (
        <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#111114] border border-white/10 rounded-2xl p-8 text-center space-y-6">

                {status === 'checking' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <h1 className="text-xl font-semibold text-white">Memverifikasi...</h1>
                        <p className="text-gray-400">Sedang memeriksa status pembayaran Anda</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                        <div className="relative">
                            <Crown className="w-16 h-16 text-yellow-400" />
                            <CheckCircle2 className="w-6 h-6 text-green-500 absolute -bottom-1 -right-1 bg-[#111114] rounded-full" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Premium Aktif!</h1>
                        <p className="text-gray-400">{message}</p>
                        <p className="text-sm text-gray-500">Anda akan diarahkan ke halaman membership...</p>
                        <Link 
                            href="/dashboard/membership"
                            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium transition-all"
                        >
                            Lihat Status Premium →
                        </Link>
                    </div>
                )}

                {status === 'pending' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                        <h1 className="text-xl font-bold text-white">Menunggu Konfirmasi</h1>
                        <p className="text-sm text-gray-400">{message}</p>
                        <p className="text-xs text-gray-500 font-mono">Order: {order_id}</p>
                        <button 
                            onClick={checkPaymentStatus}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                            Cek Lagi
                        </button>
                        <Link 
                            href="/dashboard/membership"
                            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            Buka Halaman Membership
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center gap-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h1 className="text-xl font-bold text-white">Terjadi Kesalahan</h1>
                        <p className="text-gray-400">{message}</p>
                        <button 
                            onClick={checkPaymentStatus}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                            Coba Lagi
                        </button>
                        <Link 
                            href="/dashboard"
                            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#070708] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
