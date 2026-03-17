"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Trophy, ShieldAlert, Menu, X, BrainCircuit, Crown } from "lucide-react";
import { useSidebar } from "../layout/SidebarContext";
import NotificationBell from "../ui/NotificationBell";

export default function UserTopbar() {
    const pathname = usePathname();
    const { toggle, isOpen } = useSidebar();
    const [userData, setUserData] = useState({ xp: 0, level: 1, cleanDays: 0, isPremium: false, loading: true });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/user/me");
                const json = await res.json();
                if (json.success && json.data) {
                    setUserData({
                        xp: json.data.xp,
                        level: json.data.level,
                        cleanDays: json.data.cleanDays,
                        isPremium: json.data.isPremium,
                        loading: false
                    });
                } else {
                    setUserData(prev => ({ ...prev, loading: false }));
                    console.error("User API returned error:", json.error);
                }
            } catch (err) {
                setUserData(prev => ({ ...prev, loading: false }));
                console.error("Failed to load header data", err);
            }
        };
        fetchUserData();
    }, []);

    const getPageTitle = () => {
        if (pathname === "/dashboard") return "My Dashboard";
        if (pathname?.includes("/dashboard/emergency-wheel")) return "Emergency Wheel";
        if (pathname?.includes("/dashboard/reality-simulator")) return "Reality Slot Simulator";
        if (pathname?.includes("/dashboard/slot-trap")) return "Slot Trap Simulator";
        if (pathname?.includes("/dashboard/reality-call")) return "Emergency Reality Call";
        if (pathname?.includes("/dashboard/addiction-test")) return "Addiction Test";
        if (pathname?.includes("/dashboard/deposit-awareness")) return "Deposit Awareness";
        if (pathname?.includes("/dashboard/money-talking")) return "Your Money Talking";
        if (pathname?.includes("/dashboard/recovery-challenge")) return "14-Day Recovery Challenge";
        if (pathname?.includes("/dashboard/edukasi")) return "Edukasi & Tips";
        if (pathname?.includes("/dashboard/profile")) return "My Profile";
        if (pathname?.includes("/dashboard/recovery-journey")) return "Recovery Journey";
        return "Workspace";
    };

    return (
        <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-primary/10 bg-background/90 backdrop-blur-md sticky top-0 z-50 w-full relative">
            <div className="flex items-center gap-3">
                <button 
                    className="md:hidden text-foreground hover:text-accent transition-colors p-2"
                    onClick={toggle}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className="text-xl md:text-xl font-extrabold text-foreground tracking-tight truncate max-w-[200px] md:max-w-none">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 md:gap-3">
                    {!userData.loading && (
                        <>
                            {userData.isPremium && (
                                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                                    <Crown size={14} /> <span className="hidden xs:inline">Premium</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                <BrainCircuit size={14} /> <span className="hidden xs:inline">Lvl</span> {userData.level} <span className="hidden sm:inline text-blue-400/60 ml-1">{userData.xp}/{userData.level * 500} XP</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                                <Trophy size={14} /> <span className="hidden xs:inline">Day</span> {userData.cleanDays} <span className="hidden sm:inline text-accent/60 ml-1">Clean</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <NotificationBell />
                    <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 font-bold rounded-xl transition-all text-[10px] sm:text-xs">
                        <ShieldAlert size={16} /> <span className="hidden sm:inline">Panic Button</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
