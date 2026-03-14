"use client";

import { ShieldCheck, ServerCrash, Activity, Lock, AlertTriangle, SwitchCamera, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function SecurityDashboardPage() {
    // Mock States for demonstration purposes
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    
    // Overall Risk Score calculation (Mocked)
    const securityScore = 92;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <ShieldCheck className="text-accent" /> Security Overview
                    </h2>
                    <p className="text-sm text-foreground/50">Pantau status perlindungan sistem secara real-time.</p>
                </div>
            </div>

            {/* Score & Maintenance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Security Score */}
                <div className="md:col-span-2 bg-[#040814] border border-primary/20 rounded-2xl p-6 relative overflow-hidden flex items-center gap-8">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px]" />
                    
                    <div className="relative z-10 w-32 h-32 rounded-full border-8 border-accent/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-4xl font-black text-accent">{securityScore}</span>
                        <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mt-1">Score</span>
                    </div>

                    <div className="relative z-10 w-full pl-4 md:pl-0 border-l border-primary/10 md:border-l-0">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            Status: <span className="text-accent">Sangat Aman</span>
                        </h3>
                        <p className="text-xs text-foreground/60 mb-4 leading-relaxed max-w-md">
                            Semua layer keamanan protektif berjalan dengan baik. Tidak terdeteksi adanya serangan kritis dalam 24 jam terakhir.
                        </p>
                        
                        <div className="flex gap-4">
                            <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                                <span className="block text-[10px] text-foreground/50 uppercase font-bold mb-1">Threats Blocked</span>
                                <span className="font-mono font-bold text-foreground">142</span>
                            </div>
                            <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                                <span className="block text-[10px] text-foreground/50 uppercase font-bold mb-1">Active Blocks</span>
                                <span className="font-mono font-bold text-red-400">3 IPs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maintenance Mode Toggle */}
                <div className={`border rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${
                    maintenanceMode 
                        ? "bg-red-500/10 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]" 
                        : "bg-[#040814] border-primary/20"
                }`}>
                    <div className={`p-4 rounded-full mb-3 ${maintenanceMode ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-accent"}`}>
                        <ServerCrash size={32} />
                    </div>
                    <h3 className="font-bold mb-1">Maintenance Mode</h3>
                    <p className="text-xs text-foreground/50 mb-6">Membatasi seluruh akses publik ke website.</p>
                    
                    <button 
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                            maintenanceMode 
                                ? "bg-red-500 text-white hover:bg-red-600" 
                                : "bg-primary/20 border border-primary/50 text-foreground hover:bg-primary/40"
                        }`}
                    >
                        <SwitchCamera size={18} />
                        {maintenanceMode ? "Nonaktifkan Mode" : "Aktifkan Mode"}
                    </button>
                </div>
            </div>

            {/* Layer Statuses */}
            <h3 className="font-bold text-foreground mt-8 mb-4 flex items-center gap-2">
                <Activity size={18} /> Active Protection Layers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusCard 
                    title="DDoS & Rate Limiter" 
                    icon={<Activity />} 
                    status="Active" 
                    desc="Membatasi 100 req/menit per IP." 
                />
                <StatusCard 
                    title="Brute Force Protection" 
                    icon={<Lock />} 
                    status="Active" 
                    desc="Trigger captcha setelah 5 kali gagal login." 
                />
                <StatusCard 
                    title="XSS & SQLi Sanitizer" 
                    icon={<ShieldCheck />} 
                    status="Active" 
                    desc="Filter input global nyala." 
                />
                <StatusCard 
                    title="Vulnerability Scanner" 
                    icon={<PlayCircle />} 
                    status="Idle" 
                    desc="Menunggu perintah scan mingguan." 
                />
            </div>
        </div>
    );
}

function StatusCard({ title, icon, status, desc }: { title: string, icon: React.ReactNode, status: string, desc: string }) {
    const isActive = status === "Active";
    return (
        <div className="bg-[#040814] border border-primary/20 rounded-2xl p-5 hover:border-accent/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${isActive ? "bg-accent/10 text-accent" : "bg-foreground/5 text-foreground/60"}`}>
                    {icon}
                </div>
                <div className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${isActive ? "bg-green-500/20 text-green-500" : "bg-foreground/10 text-foreground/60"}`}>
                    {status}
                </div>
            </div>
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-xs text-foreground/50">{desc}</p>
        </div>
    );
}
