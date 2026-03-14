"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Settings, Menu, X } from "lucide-react";
import { superAdminMenus } from "./AdminSidebar";

export default function AdminTopbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getPageTitle = () => {
        if (pathname === "/admin") return "Global Analytics";
        if (pathname?.includes("/admin/users")) return "User Management";
        if (pathname?.includes("/admin/features")) return "Feature Control Center";
        if (pathname?.includes("/admin/moderator")) return "Pending Approvals";
        if (pathname?.includes("/admin/admins")) return "Admin Management";
        if (pathname?.includes("/admin/settings")) return "System Settings";
        if (pathname?.includes("/admin/content")) return "Content Control";
        if (pathname?.includes("/admin/stats")) return "Statistics";
        if (pathname?.includes("/admin/logs")) return "Security Logs";
        if (pathname?.includes("/admin/approve")) return "Approve User";
        if (pathname?.includes("/admin/stories")) return "Manage Stories";
        return "Admin Dashboard";
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
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={16} />
                    <input
                        type="text"
                        placeholder="Search system logs..."
                        className="bg-foreground/5 border border-primary/20 rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-accent w-64 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    <button className="relative text-foreground/60 hover:text-foreground transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
                    </button>
                    <button className="text-foreground/60 hover:text-foreground transition-colors hidden sm:block">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-20 bg-[#060A14]/95 backdrop-blur-xl z-[90] md:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
                    <div className="p-6 pb-20">
                        <div className="mb-6 px-4">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Navigasi Super Admin</p>
                            <div className="h-px bg-white/5 w-full" />
                        </div>
                        <nav className="flex flex-col gap-2">
                            {superAdminMenus.map((menu) => {
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
                                <X size={16} /> Keluar Panel Admin
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
