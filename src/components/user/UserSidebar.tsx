"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../layout/SidebarContext";
import {
    Home,
    AlertTriangle,
    Target,
    Cpu,
    PhoneCall,
    ClipboardCheck,
    Gauge,
    PiggyBank,
    MessageCircle,
    Calendar,
    BookOpen,
    User,
    LogOut,
    Award,
    BrainCircuit,
    ShieldAlert,
    X,
    Lock,
    Crown
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export const userMenus = [
    { 
        section: "Main",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: Home, isPremium: false },
            { name: "Recovery Journey", href: "/dashboard/recovery-journey", icon: Award, isPremium: false },
            { name: "Membership", href: "/dashboard/membership", icon: Crown, isPremium: false },
            { name: "Profile", href: "/dashboard/profile", icon: User, isPremium: false },
        ]
    },
    {
        section: "Aktivitas Pemulihan",
        items: [
            { name: "Recovery Challenge", href: "/dashboard/recovery-challenge", icon: Calendar, isPremium: true },
            { name: "Pelatihan Kognitif", href: "/dashboard/pelatihan", icon: BrainCircuit, isPremium: false },
            { name: "Edukasi & Tips", href: "/dashboard/edukasi", icon: BookOpen, isPremium: false },
            { name: "Addiction Test", href: "/dashboard/addiction-test", icon: ClipboardCheck, isPremium: false },
        ]
    },
    {
        section: "Simulator & Pelatihan",
        items: [
            { name: "Reality Slot Simulator", href: "/dashboard/reality-simulator", icon: Target, isPremium: true },
            { name: "Slot Trap Simulator", href: "/dashboard/slot-trap", icon: Cpu, isPremium: true },
            { name: "Deposit Awareness", href: "/dashboard/deposit-awareness", icon: PiggyBank, isPremium: true },
            { name: "Your Money Talking", href: "/dashboard/money-talking", icon: MessageCircle, isPremium: true },
        ]
    },
    {
        section: "Bantuan & Krisis",
        items: [
            { name: "Emergency Wheel", href: "/dashboard/emergency-wheel", icon: AlertTriangle, isPremium: false },
            { name: "Emergency Reality Call", href: "/dashboard/reality-call", icon: PhoneCall, isPremium: false },
            { name: "Laporkan Situs Judi", href: "/dashboard/report-site", icon: ShieldAlert, isPremium: false },
        ]
    }
];

export default function UserSidebar() {
    const pathname = usePathname();
    const { isOpen, close } = useSidebar();
    const { user: userData, loading } = useUser();

    const isPremiumUser = userData?.isPremium || false;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={close}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0F1F] border-r border-primary/20 flex flex-col h-screen text-foreground transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-6 flex items-center justify-between border-b border-primary/10">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="NewPath Logo" className="w-10 h-auto" />
                        <div>
                            <h1 className="font-bold text-lg leading-tight">NewPath</h1>
                            <p className="text-[10px] text-accent font-medium tracking-wider uppercase">
                                User Workspace
                            </p>
                        </div>
                    </Link>
                    <button onClick={close} className="md:hidden text-foreground/50 hover:text-foreground">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto section-scrollbar">
                    {userMenus.map((section) => (
                        <div key={section.section} className="space-y-2">
                            <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/50">
                                {section.section}
                            </h2>
                            <div className="space-y-1">
                                {section.items.map((menu) => {
                                    const isActive = pathname === menu.href;
                                    const isLocked = menu.isPremium && !isPremiumUser;

                                    return (
                                        <Link
                                            key={menu.name}
                                            href={isLocked ? "#" : menu.href}
                                            onClick={isLocked ? undefined : close}
                                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                                                ? "bg-primary/20 text-accent border border-primary/30 shadow-[0_0_15px_rgba(56,189,248,0.05)]"
                                                : isLocked 
                                                    ? "text-foreground/30 cursor-not-allowed"
                                                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <menu.icon size={16} className={isActive ? "text-accent" : (isLocked ? "text-foreground/20" : "text-foreground/30")} />
                                                {menu.name}
                                            </div>
                                            {isLocked && <Lock size={12} className="text-foreground/20" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-6 border-t border-primary/20 bg-background/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${isPremiumUser ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' : 'bg-primary'}`}>
                                {userData?.username?.[0].toUpperCase() || "U"}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate max-w-[100px]">{userData?.username || "Loading..."}</p>
                                <div className="flex items-center gap-1.5">
                                    {isPremiumUser ? (
                                        <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter text-yellow-500">
                                            <Crown size={8} /> Premium
                                        </span>
                                    ) : (
                                        <span className="text-[8px] font-black uppercase tracking-tighter text-foreground/40">
                                            Free Member
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Link href="/" className="text-foreground/50 hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                        </Link>
                    </div>
                    
                    {!isPremiumUser && (
                        <Link 
                            href="/dashboard/membership"
                            className="flex items-center justify-center gap-2 w-full py-2 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-black text-accent uppercase tracking-widest hover:bg-accent/20 transition-all"
                        >
                            Upgrade Account
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
