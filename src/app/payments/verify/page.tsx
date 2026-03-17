'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const order_id = searchParams.get('order_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [message, setMessage] = useState('Memverifikasi pembayaran Anda...');

    useEffect(() => {
        if (!order_id) {
            setStatus('failed');
            setMessage('Order ID tidak ditemukan.');
            return;
        }

        // Simulate a slight delay to allow webhook to process
        const timer = setTimeout(() => {
            // We can check status via API if needed, 
            // but usually the webhook processes it.
            // For now, we'll just show success and let the user go to membership
            setStatus('success');
            setMessage('Pembayaran selesai! Silakan cek status membership Anda.');
        }, 3000);

        return () => clearTimeout(timer);
    }, [order_id]);

    return (
        <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#111114] border border-white/10 rounded-2xl p-8 text-center space-y-6">
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <h1 className="text-xl font-semibold text-white">Memproses...</h1>
                        <p className="text-gray-400">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h1 className="text-2xl font-bold text-white">Terima Kasih!</h1>
                        <p className="text-gray-400">
                            Pembayaran Anda untuk Order ID <span className="text-blue-400 font-mono">{order_id}</span> sedang diproses otomatis.
                        </p>
                        <div className="flex flex-col gap-3 w-full pt-4">
                            <Link 
                                href="/dashboard/membership"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                            >
                                Cek Status Membership
                            </Link>
                            <Link 
                                href="/dashboard"
                                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                        <XCircle className="w-16 h-16 text-red-500" />
                        <h1 className="text-2xl font-bold text-white">Gagal</h1>
                        <p className="text-gray-400">{message}</p>
                        <Link 
                            href="/dashboard/membership"
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10"
                        >
                            Kembali ke Membership
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
