"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "../layout/SidebarContext";
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Settings,
    Sliders,
    FileText,
    BarChart2,
    ShieldAlert,
    LogOut,
    ShieldCheck,
    Lock,
    Search,
    Trophy,
    HelpCircle,
    MessageSquare,
    Zap,
    Layout,
    X
} from "lucide-react";

export const superAdminMenus = [
    {
        section: "Overview",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Statistics", href: "/admin/stats", icon: BarChart2 },
        ]
    },
    {
        section: "Manajemen Pengguna",
        items: [
            { name: "User Management", href: "/admin/users", icon: Users },
            { name: "Data Laporan Situs", href: "/admin/reports", icon: ShieldAlert },
        ]
    },
    {
        section: "Konten & CMS",
        items: [
            { name: "Content Control", href: "/admin/content", icon: FileText },
            { name: "FAQ Management", href: "/admin/faq", icon: HelpCircle },
            { name: "Features CMS", href: "/admin/features", icon: Zap },
            { name: "Stories & Testimonials", href: "/admin/testimonials", icon: MessageSquare },
            { name: "Landing Page CMS", href: "/admin/landing-page", icon: Layout },
        ]
    },
    {
        section: "Sistem & Keamanan",
        items: [
            { name: "Admin Management", href: "/admin/admins", icon: ShieldCheck },
            { name: "System Settings", href: "/admin/settings", icon: Settings },
            { name: "Game Thresholds", href: "/admin/features/thresholds", icon: Trophy },
            { name: "Security Center", href: "/admin/security/dashboard", icon: Lock },
            { name: "Security Scanner", href: "/admin/security/scanner", icon: Search },
            { name: "Security Logs", href: "/admin/logs", icon: ShieldAlert },
        ]
    }
];

export const adminMenus = [
    {
        section: "Overview",
        items: [
            { name: "Dashboard", href: "/admin/moderator", icon: LayoutDashboard },
            { name: "Statistics", href: "/admin/stats", icon: BarChart2 },
        ]
    },
    {
        section: "Manajemen",
        items: [
            { name: "User Management", href: "/admin/users", icon: Users },
            { name: "Content Management", href: "/admin/content", icon: FileText },
            { name: "Stories / Testimoni", href: "/admin/stories", icon: FileText },
        ]
    }
];

export default function AdminSidebar({ user }: { user?: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, close } = useSidebar();

    const sections = user?.role === "ADMIN" ? adminMenus : superAdminMenus;
    
    // Derived display data
    const displayRole = user?.role === "ADMIN" ? "Admin" : "Super Admin";
    const displayName = user?.username || displayRole;
    const initial = displayName.substring(0, 2).toUpperCase();
    const displayEmail = user?.email || "admin@newpath.com";

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/");
            router.refresh(); 
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={close}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#060A14] border-r border-primary/20 flex flex-col h-screen text-foreground transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-6 flex items-center justify-between border-b border-primary/10">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="NewPath Logo" className="w-10 h-auto" />
                        <div>
                            <h1 className="font-bold text-lg leading-tight">NewPath</h1>
                            <p className="text-[10px] text-accent font-medium tracking-wider uppercase">
                                Admin Panel
                            </p>
                        </div>
                    </Link>
                    <button onClick={close} className="md:hidden text-foreground/50 hover:text-foreground">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto section-scrollbar">
                    {sections.map((section) => (
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
                                {initial}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate max-w-[120px]">{displayName}</p>
                                <p className="text-[10px] text-foreground/50 truncate max-w-[120px]">{displayEmail}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-foreground/50 hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer p-2">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
