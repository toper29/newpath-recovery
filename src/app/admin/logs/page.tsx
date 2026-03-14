"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, AlertTriangle, MonitorX, PowerOff, Loader2 } from "lucide-react";

interface LogData {
    id: string;
    type: string;
    ip: string;
    user: string;
    date: string;
    status: string;
    details: string;
}

export default function SecurityLogsPage() {
    const [logs, setLogs] = useState<LogData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/admin/logs");
                const json = await res.json();
                if (json.success) setLogs(json.data);
            } catch (err) {
                console.error("Failed to fetch logs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <ShieldAlert className="text-red-500" /> Security & Access Logs
                    </h2>
                    <p className="text-sm text-foreground/50">Pantau aktivitas login dan cegah akses mencurigakan ke sistem.</p>
                </div>
                <button className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
                    <PowerOff size={18} /> Logout All Sessions
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><AlertTriangle size={20} /></div>
                    <div>
                        <p className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Brute Force Alerts</p>
                        <p className="text-sm font-medium">IP <span className="text-red-500 font-bold">45.221.12.89</span> mencoba login 5 kali dalam 1 jam.</p>
                        <button className="text-xs text-red-500 font-bold mt-2 hover:underline">Block IP Address</button>
                    </div>
                </div>
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
                    <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><MonitorX size={20} /></div>
                    <div>
                        <p className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Suspicious Devices</p>
                        <p className="text-sm font-medium">1 login dari perangkat tidak dikenal (Windows 10 - Firefox) di Bangkok, TH.</p>
                    </div>
                </div>
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-4xl font-black text-accent mb-1">2</p>
                        <p className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Active Admin Sessions</p>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-primary/10 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Recent Login Activity</h3>
                    <input type="text" placeholder="Filter by IP or Username..." className="bg-foreground/5 border border-primary/20 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-primary/5 text-xs uppercase text-foreground/50 border-b border-primary/10">
                            <tr>
                                <th className="py-4 px-6 font-bold">Log ID / Time</th>
                                <th className="py-4 px-6 font-bold">Username</th>
                                <th className="py-4 px-6 font-bold">IP Address</th>
                                <th className="py-4 px-6 font-bold">Type</th>
                                <th className="py-4 px-6 font-bold">Status</th>
                                <th className="py-4 px-6 font-bold">Details</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                        <tbody className="divide-y divide-primary/5">
                            {logs.map((log) => (
                                <tr key={log.id} className="text-foreground hover:bg-primary/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="text-[10px] text-foreground/40 font-mono mb-0.5">{log.id.split('-')[0]}...</p>
                                        <p className="font-medium text-xs text-foreground/60">{log.date}</p>
                                    </td>
                                    <td className="py-4 px-6 font-bold">{log.user}</td>
                                    <td className="py-4 px-6 text-foreground/70 font-mono text-xs">{log.ip}</td>
                                    <td className="py-4 px-6 text-foreground/60 text-xs font-bold">{log.type}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider ${
                                            log.status === 'Success' ? 'bg-accent/20 text-accent' : 
                                            log.status.includes('Investigating') ? 'bg-orange-500/20 text-orange-500' :
                                            'bg-red-500/20 text-red-500'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-foreground/60 text-xs font-mono">{log.details}</td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-foreground/50 text-sm italic">
                                        Tidak ada catatan log keamanan saat ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}
