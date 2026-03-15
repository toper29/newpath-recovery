"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface Notification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications?limit=10");
            const data = await res.json();
            if (data.success) {
                setNotifications(data.notifications);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Simple polling every 2 minutes
        const interval = setInterval(fetchNotifications, 120000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (ids: string[]) => {
        try {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids })
            });
            const data = await res.json();
            if (data.success) {
                setNotifications(prev => prev.map(n => 
                    ids.includes(n.id) ? { ...n, isRead: true } : n
                ));
            }
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white/60 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/10"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0a1120] border border-white/10 rounded-2xl shadow-2xl z-[200] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notifikasi</h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={() => markAsRead(notifications.filter(n => !n.isRead).map(n => n.id))}
                                className="text-[10px] text-secondary hover:text-white transition-colors uppercase font-bold"
                            >
                                Tandai Semua Dibaca
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-10 text-center">
                                <Bell className="mx-auto mb-3 text-white/10" size={32} />
                                <p className="text-xs text-white/30 italic">Belum ada notifikasi</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {notifications.map(notification => (
                                    <div 
                                        key={notification.id}
                                        className={`p-4 hover:bg-white/5 transition-colors relative group ${!notification.isRead ? 'bg-secondary/5' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-xs font-bold ${!notification.isRead ? 'text-secondary' : 'text-white/80'}`}>
                                                {notification.title}
                                            </h4>
                                            {!notification.isRead && (
                                                <button 
                                                    onClick={() => markAsRead([notification.id])}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-secondary transition-all"
                                                >
                                                    <Check size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-white/50 leading-relaxed mb-2">
                                            {notification.message}
                                        </p>
                                        <div className="flex justify-between items-center text-[9px] text-white/20">
                                            <span>{new Date(notification.createdAt).toLocaleString()}</span>
                                            {notification.link && (
                                                <Link 
                                                    href={notification.link}
                                                    onClick={() => {
                                                        markAsRead([notification.id]);
                                                        setIsOpen(false);
                                                    }}
                                                    className="flex items-center gap-1 text-secondary font-bold hover:underline"
                                                >
                                                    LIHAT <ExternalLink size={8} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
