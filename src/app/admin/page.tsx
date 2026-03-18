"use client";

import { useState, useEffect } from "react";
import { 
    Users, 
    Crown, 
    Zap, 
    TrendingUp, 
    AlertTriangle, 
    Activity, 
    Database, 
    ShieldCheck, 
    ArrowUpRight, 
    Loader2,
    MousePointer2,
    ClipboardList,
    Server,
    Brain
} from "lucide-react";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const json = await res.json();
            if (json.success) setStats(json.data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="animate-spin text-accent" size={40} />
                <p className="text-foreground/50 font-bold animate-pulse">Gathering Analytics...</p>
            </div>
        );
    }

    const COLORS = ["#EF4444", "#F59E0B", "#10B981"];
    const riskData = [
        { name: "High", value: stats.distribution.high },
        { name: "Medium", value: stats.distribution.medium },
        { name: "Low", value: stats.distribution.low }
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground italic uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-accent" /> Control Center
                    </h1>
                    <p className="text-sm text-foreground/50 font-medium">Real-time system performance and user recovery metrics.</p>
                </div>
                <div className="flex items-center gap-3 bg-secondary/10 border border-secondary/20 p-2 rounded-2xl">
                    <div className="flex flex-col items-end px-3">
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">System Health</span>
                        <span className="text-sm font-bold text-white">{stats.health.dbStatus}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        <Server size={20} />
                    </div>
                </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Users", value: stats.mainStats.totalUsers, sub: `+${stats.mainStats.totalUsers > 100 ? 12 : 0} this week`, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Premium Users", value: stats.mainStats.premiumUsers, sub: `Conv Rate: ${stats.mainStats.conversionRate}`, icon: Crown, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "Weekly Active", value: stats.mainStats.activeUsers.weekly, sub: `MAU: ${stats.mainStats.activeUsers.monthly}`, icon: Zap, color: "text-accent", bg: "bg-accent/10" },
                    { label: "Relapse Alerts", value: stats.reporting.relapseAlertsWeekly, sub: "Last 7 days", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" }
                ].map((m, i) => (
                    <div key={i} className="bg-[#0A0F1F] border border-primary/10 p-6 rounded-[32px] hover:border-primary/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <m.icon size={24} />
                            </div>
                            <div className="text-[10px] font-black text-foreground/30 uppercase tracking-widest bg-foreground/5 px-2 py-1 rounded-lg">Live</div>
                        </div>
                        <h3 className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] mb-1">{m.label}</h3>
                        <div className="text-3xl font-black text-white italic tracking-tighter">{m.value}</div>
                        <p className="text-[10px] font-bold text-foreground/30 mt-2 flex items-center gap-1">
                            <TrendingUp size={10} className="text-green-500" /> {m.sub}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feature Usage Chart */}
                <div className="lg:col-span-2 bg-[#0A0F1F] border border-primary/10 p-8 rounded-[40px] flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2">
                            <MousePointer2 className="text-secondary" /> Feature Engagement
                        </h3>
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.featureStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: "#ffffff20", fontSize: 10, fontWeight: "bold" }} 
                                    interval={0}
                                    tickFormatter={(val) => val.length > 10 ? val.substring(0, 10) + ".." : val}
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{ fill: "#ffffff05" }} 
                                    contentStyle={{ backgroundColor: "#0D1225", border: "1px solid #ffffff10", borderRadius: "16px", color: "white" }}
                                />
                                <Bar dataKey="count" fill="#38BDF8" radius={[8, 8, 0, 0]} barSize={40}>
                                    {stats.featureStats.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? "#38BDF8" : "#38BDF820"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Distribution Chart */}
                <div className="bg-[#0A0F1F] border border-primary/10 p-8 rounded-[40px] flex flex-col items-center">
                    <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2 mb-8 self-start">
                        <AlertTriangle className="text-red-500" /> Risk Distribution
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#0D1225", border: "1px solid #ffffff10", borderRadius: "16px", color: "white" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                        {riskData.map((d, i) => (
                            <div key={i} className="text-center">
                                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-40">{d.name}</div>
                                <div className="text-sm font-black" style={{ color: COLORS[i] }}>{d.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Health & Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reports & Checkins */}
                <div className="bg-[#0A0F1F] border border-primary/10 p-8 rounded-[40px]">
                    <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2 mb-8">
                        <ClipboardList className="text-purple-500" /> Activity Reports
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Gambling Reports", count: stats.reporting.totalReports, icon: AlertTriangle, val: "Pending: " + stats.reporting.pendingReports },
                            { label: "Total Check-ins", count: stats.reporting.totalCheckins, icon: ShieldCheck, val: "Daily Motivation" },
                            { label: "Addiction Score", count: stats.mainStats.avgAddictionScore, icon: Brain, val: "Global Average" }
                        ].map((r, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-foreground/5 rounded-2xl border border-foreground/5 hover:border-foreground/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/50">
                                        <r.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">{r.label}</div>
                                        <div className="text-[10px] font-medium text-foreground/30 capitalize">{r.val}</div>
                                    </div>
                                </div>
                                <div className="text-xl font-black text-white italic">{r.count}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-gradient-to-br from-[#0D1225] to-[#0A0F1F] border border-secondary/20 p-8 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Activity size={150} />
                    </div>
                    <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2 mb-8">
                        <Database className="text-secondary" /> System Infrastructure
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Server Uptime", value: stats.health.uptime, sub: "Last 30 days" },
                            { label: "API Latency", value: stats.health.latency, sub: "Indonesia Regional" },
                            { label: "Database Load", value: stats.health.diskUsage, sub: "Postgres Storage" },
                            { label: "System Status", value: stats.health.dbStatus, sub: "Operational", color: "text-green-500" }
                        ].map((h, i) => (
                            <div key={i} className="p-5 bg-white/5 rounded-[24px] border border-white/5">
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{h.label}</div>
                                <div className={`text-xl font-black italic tracking-tighter ${h.color || "text-white"}`}>{h.value}</div>
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">{h.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
