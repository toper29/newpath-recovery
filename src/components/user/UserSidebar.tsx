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
    X
} from "lucide-react";

export const userMenus = [
    { 
        section: "Main",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: Home },
            { name: "Recovery Journey", href: "/dashboard/recovery-journey", icon: Award },
            { name: "Profile", href: "/dashboard/profile", icon: User },
        ]
    },
    {
        section: "Aktivitas Pemulihan",
        items: [
            { name: "Recovery Challenge", href: "/dashboard/recovery-challenge", icon: Calendar },
            { name: "Pelatihan Kognitif", href: "/dashboard/pelatihan", icon: BrainCircuit },
            { name: "Edukasi & Tips", href: "/dashboard/edukasi", icon: BookOpen },
            { name: "Addiction Test", href: "/dashboard/addiction-test", icon: ClipboardCheck },
        ]
    },
    {
        section: "Simulator & Pelatihan",
        items: [
            { name: "Reality Slot Simulator", href: "/dashboard/reality-simulator", icon: Target },
            { name: "Slot Trap Simulator", href: "/dashboard/slot-trap", icon: Cpu },
            { name: "Deposit Awareness", href: "/dashboard/deposit-awareness", icon: PiggyBank },
            { name: "Your Money Talking", href: "/dashboard/money-talking", icon: MessageCircle },
        ]
    },
    {
        section: "Bantuan & Krisis",
        items: [
            { name: "Emergency Wheel", href: "/dashboard/emergency-wheel", icon: AlertTriangle },
            { name: "Emergency Reality Call", href: "/dashboard/reality-call", icon: PhoneCall },
            { name: "Laporkan Situs Judi", href: "/dashboard/report-site", icon: ShieldAlert },
        ]
    }
];

export default function UserSidebar() {
    const pathname = usePathname();
    const { isOpen, close } = useSidebar();

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
                                    return (
                                        <Link
                                            key={menu.name}
                                            href={menu.href}
                                            onClick={close}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                                                ? "bg-primary/20 text-accent border border-primary/30 shadow-[0_0_15px_rgba(56,189,248,0.05)]"
                                                : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                                                }`}
                                        >
                                            <menu.icon size={16} className={isActive ? "text-accent" : "text-foreground/30"} />
                                            {menu.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
        </>
    );
}
