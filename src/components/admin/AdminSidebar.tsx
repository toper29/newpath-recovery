"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
    Trophy
} from "lucide-react";

export const superAdminMenus = [
    // Group: Overview
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Statistics", href: "/admin/stats", icon: BarChart2 },

    // Group: User Management
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Approve User", href: "/admin/approve", icon: UserPlus },

    // Group: Site Monitoring
    { name: "Data Laporan Situs", href: "/admin/reports", icon: ShieldAlert },

    // Group: Content & CMS
    { name: "Content Control", href: "/admin/content", icon: FileText },
    { name: "Stories / Testimoni", href: "/admin/stories", icon: FileText },
    { name: "Landing Page CMS", href: "/admin/landing-page", icon: LayoutDashboard },

    // Group: System Settings
    { name: "Admin Management", href: "/admin/admins", icon: ShieldCheck },
    { name: "Feature Control", href: "/admin/features", icon: Sliders },
    { name: "Game Thresholds", href: "/admin/features/thresholds", icon: Trophy },

    // Group: Security
    { name: "Security Center", href: "/admin/security/dashboard", icon: Lock },
    { name: "Security Scanner", href: "/admin/security/scanner", icon: Search },
    { name: "Security Logs", href: "/admin/logs", icon: ShieldAlert },
];

export const adminMenus = [
    { name: "Dashboard", href: "/admin/moderator", icon: LayoutDashboard },
    { name: "Statistics", href: "/admin/stats", icon: BarChart2 },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Approve User", href: "/admin/approve", icon: UserPlus },
    { name: "Content Management", href: "/admin/content", icon: FileText },
    { name: "Stories / Testimoni", href: "/admin/stories", icon: FileText },
];

export default function AdminSidebar({ user }: { user?: any }) {
    const pathname = usePathname();
    const router = useRouter();

    const menus = user?.role === "ADMIN" ? adminMenus : superAdminMenus;
    
    // Derived display data
    const displayRole = user?.role === "ADMIN" ? "Admin" : "Super Admin";
    const displayName = user?.username || displayRole;
    const initial = displayName.substring(0, 2).toUpperCase();
    const displayEmail = user?.email || "admin@newpath.com";

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/");
            router.refresh(); // forces Next.js to re-evaluate auth middleware
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-64 bg-[#060A14] border-r border-primary/20 flex flex-col h-screen text-foreground relative z-20 hidden md:flex">
            <div className="p-6 flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="NewPath Logo" className="w-10 h-auto" />
                    <div>
                        <h1 className="font-bold text-lg leading-tight">NewPath</h1>
                        <p className="text-[10px] text-accent font-medium tracking-wider uppercase">
                            Super Admin Panel
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                {menus.map((menu) => {
                    const isActive = pathname === menu.href;
                    return (
                        <Link
                            key={menu.name}
                            href={menu.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                ? "bg-primary/30 text-accent border border-primary/50 shadow-[0_0_15px_rgba(56,189,248,0.05)]"
                                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                }`}
                        >
                            <menu.icon size={18} className={isActive ? "text-accent" : "text-foreground/50"} />
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-primary/20">
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
    );
}
