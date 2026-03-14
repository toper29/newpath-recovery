"use client";

import { useState, useEffect } from "react";
import { Flame, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "daily_reminder_shown";

export default function DailyReminderBanner() {
    const [visible, setVisible] = useState(false);
    const [streak, setStreak] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Only show once per browser session
        if (sessionStorage.getItem(SESSION_KEY)) return;

        const checkStatus = async () => {
            try {
                const res = await fetch("/api/user/me");
                const json = await res.json();
                if (json.success && !json.data.hasCheckedInToday) {
                    setStreak(json.data.streak ?? 0);
                    setVisible(true);
                    sessionStorage.setItem(SESSION_KEY, "1");
                }
            } catch {
                // Silently fail
            }
        };

        checkStatus();
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-full max-w-lg px-4 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
                <div className="p-2.5 bg-orange-500/20 rounded-xl text-orange-400 shrink-0">
                    <Flame size={22} className="animate-pulse" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">
                        Belum check-in hari ini!
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                        {streak > 0 
                            ? `🔥 Streak ${streak} hari bebas judi-mu menunggu. Jangan terputus!`
                            : "Lakukan absen harian sekarang untuk bangun streakmu."}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setVisible(false);
                        router.push("/dashboard/recovery-challenge");
                    }}
                    className="shrink-0 flex items-center gap-1. px-3 py-2 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap"
                >
                    Check-In <ArrowRight size={13} />
                </button>

                <button
                    onClick={() => setVisible(false)}
                    className="shrink-0 text-white/30 hover:text-white/70 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
