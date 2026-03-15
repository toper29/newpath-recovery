"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Settings, Menu, X } from "lucide-react";
import { useSidebar } from "../layout/SidebarContext";
import NotificationBell from "../ui/NotificationBell";

export default function AdminTopbar() {
    const pathname = usePathname();
    const { toggle, isOpen } = useSidebar();

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
                    className="md:hidden text-foreground hover:text-accent transition-colors p-2"
                    onClick={toggle}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                    <NotificationBell />
                    <button className="text-foreground/60 hover:text-foreground transition-colors hidden sm:block">
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
