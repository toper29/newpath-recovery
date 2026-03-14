"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    ShieldAlert
} from "lucide-react";

export const userMenus = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Recovery Journey", href: "/dashboard/recovery-journey", icon: Award },
    
    // Group: Daily Activity
    { name: "Recovery Challenge", href: "/dashboard/recovery-challenge", icon: Calendar },
    { name: "Pelatihan Kognitif", href: "/dashboard/pelatihan", icon: BrainCircuit },
    { name: "Edukasi & Tips", href: "/dashboard/edukasi", icon: BookOpen },

    // Group: Self-Assessment
    { name: "Addiction Test", href: "/dashboard/addiction-test", icon: ClipboardCheck },
    { name: "Shame Meter", href: "/dashboard/shame-meter", icon: Gauge },

    // Group: Awareness & Simulators
    { name: "Reality Slot Simulator", href: "/dashboard/reality-simulator", icon: Target },
    { name: "Slot Trap Simulator", href: "/dashboard/slot-trap", icon: Cpu },
    { name: "Deposit Awareness", href: "/dashboard/deposit-awareness", icon: PiggyBank },
    { name: "Your Money Talking", href: "/dashboard/money-talking", icon: MessageCircle },

    // Group: Crisis & Reporting (Urgent)
    { name: "Emergency Wheel", href: "/dashboard/emergency-wheel", icon: AlertTriangle },
    { name: "Emergency Reality Call", href: "/dashboard/reality-call", icon: PhoneCall },
    { name: "Laporkan Situs Judi", href: "/dashboard/report-site", icon: ShieldAlert },
    
    { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function UserSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-[#0A0F1F] border-r border-primary/20 flex flex-col h-screen text-foreground relative z-20 hidden md:flex">
            <div className="p-6 flex items-center gap-3 border-b border-primary/10">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="NewPath Logo" className="w-10 h-auto" />
                    <div>
                        <h1 className="font-bold text-lg leading-tight">NewPath</h1>
                        <p className="text-[10px] text-accent font-medium tracking-wider uppercase">
                            User Workspace
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto section-scrollbar">
                {userMenus.map((menu) => {
                    const isActive = pathname === menu.href;
                    return (
                        <Link
                            key={menu.name}
                            href={menu.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                ? "bg-primary/30 text-accent border border-primary/50 shadow-[0_0_15px_rgba(56,189,248,0.05)]"
                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                }`}
                        >
                            <menu.icon size={18} className={isActive ? "text-accent" : "text-foreground/50"} />
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-primary/20 bg-background/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-sm">
                            AN
                        </div>
                        <div>
                            <p className="text-sm font-bold">Anonymous</p>
                            <p className="text-[10px] text-foreground/50">User</p>
                        </div>
                    </div>
                    <Link href="/" className="text-foreground/50 hover:text-red-400 transition-colors">
                        <LogOut size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
