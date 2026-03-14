"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Fitur Utama", href: "#fitur" },
        { name: "Edukasi", href: "#edukasi" },
        { name: "Program 14 Hari", href: "#program" },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md z-[100]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                                    <img src="/logo.png" alt="NewPath Logo" className="h-8 w-8 object-contain" />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                                    NewPath
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href} 
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-accent transition-all animate-in fade-in slide-in-from-top-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-3 rounded-xl bg-secondary text-accent font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                            >
                                Mulai Pemulihan
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-white/70 hover:text-white transition-colors"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-20 bg-background z-[90] overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex flex-col p-8 gap-6 items-center justify-center min-h-[calc(100vh-5rem)] pb-20">
                        <div className="flex flex-col gap-8 items-center w-full">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-xl font-black uppercase tracking-[0.2em] text-white/50 hover:text-accent transition-all hover:scale-105"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="w-full h-px bg-white/5 my-6" />
                        <div className="flex flex-col gap-6 items-center w-full">
                            <Link 
                                href="/login" 
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full max-w-xs text-center py-4 rounded-xl bg-secondary text-accent font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:bg-white transition-all"
                            >
                                Mulai Pemulihan
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
