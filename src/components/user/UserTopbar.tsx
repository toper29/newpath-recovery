"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Trophy, ShieldAlert, Menu, X, BrainCircuit } from "lucide-react";
import { userMenus } from "./UserSidebar";

export default function UserTopbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState({ xp: 0, level: 1, cleanDays: 0, loading: true });

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
        if (pathname?.includes("/dashboard/shame-meter")) return "Shame Meter";
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
                    className="md:hidden text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className="text-xl md:text-xl font-extrabold text-foreground tracking-tight truncate max-w-[200px] md:max-w-none">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 md:gap-3">
                    {!userData.loading && (
                        <>
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
                    <button className="relative text-foreground/60 hover:text-foreground transition-colors hidden sm:block">
                        <Bell size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 font-bold rounded-xl transition-all text-[10px] sm:text-xs">
                        <ShieldAlert size={16} /> <span className="hidden sm:inline">Panic Button</span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-[90] md:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
                    <div className="p-6 pb-20">
                        <div className="mb-6 px-4">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Navigasi Dashboard</p>
                            <div className="h-px bg-white/5 w-full" />
                        </div>
                        <nav className="flex flex-col gap-2">
                            {userMenus.map((menu) => {
                                const isActive = pathname === menu.href;
                                return (
                                    <Link
                                        key={menu.name}
                                        href={menu.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all uppercase tracking-tight ${isActive
                                            ? "bg-primary/30 text-accent border border-primary/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                                            : "text-white/40 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <menu.icon size={20} className={isActive ? "text-accent" : "text-white/20"} />
                                        {menu.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        
                        <div className="mt-8 px-4">
                            <Link 
                                href="/" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-white/30 text-xs font-bold hover:text-red-400 transition-colors"
                            >
                                <X size={16} /> Keluar Aplikasi
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
