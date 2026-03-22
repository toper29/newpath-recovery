"use client";
import { useState, useEffect } from "react";
import { BarChart2, Users, Activity, Target, PieChart, Loader2 } from "lucide-react";

export default function WebsiteAnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(json => {
                if (json.success) setStats(json.data);
            })
            .catch(err => console.error("Failed to fetch analytics", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    const featureStats = stats?.featureStats || [];
    const maxFeatCount = Math.max(...featureStats.map((f: any) => f.count), 1);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <BarChart2 className="text-accent" /> Website Analytics
                    </h2>
                    <p className="text-sm text-foreground/50">Laporan mendalam tren perilaku pengguna dan performa fitur pemulihan.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg text-accent"><Users size={18} /></div>
                        <span className="text-sm font-bold text-foreground/70">Total Users</span>
                    </div>
                    <p className="text-3xl font-black">{stats.mainStats?.totalUsers?.toLocaleString() ?? "0"}</p>
                </div>
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-accent/20 rounded-lg text-accent"><Activity size={18} /></div>
                        <span className="text-sm font-bold text-foreground/70">Active Users</span>
                    </div>
                    <p className="text-3xl font-black text-accent">{stats.mainStats?.activeUsersToday ?? "0"}</p>
                </div>
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Users size={18} /></div>
                        <span className="text-sm font-bold text-foreground/70">New Users (Minggu Ini)</span>
                    </div>
                    <p className="text-3xl font-black text-blue-500">+{stats.mainStats?.newUsersWeekly ?? "0"}</p>
                </div>
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500"><Target size={18} /></div>
                        <span className="text-sm font-bold text-foreground/70">Avg Addiction Score</span>
                    </div>
                    <p className="text-3xl font-black text-orange-500">{stats.mainStats?.avgAddictionScore ?? "0"}<span className="text-sm font-normal text-foreground/50">%</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Feature Usage */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Activity className="text-accent" size={18} /> Top Features Used
                    </h3>
                    <div className="space-y-6">
                        {featureStats.map((feat: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-bold">{feat.name}</span>
                                    <span className="text-sm font-bold text-foreground/70">{feat.count}</span>
                                </div>
                                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                                    <div className={`h-full bg-accent`} style={{ width: `${(feat.count / maxFeatCount) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                        {featureStats.length === 0 && <p className="text-sm text-foreground/40 text-center py-4">Belum ada data penggunaan.</p>}
                    </div>
                </div>

                {/* Score Distribution */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <PieChart className="text-accent" size={18} /> Addiction Score Distribution
                    </h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="text-sm font-bold text-red-500">High Risk (71-100%)</span>
                            </div>
                            <span className="font-bold text-red-500">{stats.distribution?.high ?? 0}% Users</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-orange-500/20 bg-orange-500/5">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                                <span className="text-sm font-bold text-orange-500">Medium Risk (40-70%)</span>
                            </div>
                            <span className="font-bold text-orange-500">{stats.distribution?.medium ?? 0}% Users</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-accent/20 bg-accent/5">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-accent"></span>
                                <span className="text-sm font-bold text-accent">Low Risk (&lt;40%)</span>
                            </div>
                            <span className="font-bold text-accent">{stats.distribution?.low ?? 0}% Users</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Challenge Stats Funnel */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6 h-64 flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="text-accent" size={18} /> 14-Day Recovery Funnel
                </h3>
                <div className="flex-1 border border-primary/10 rounded-xl bg-background/50 flex flex-col items-center justify-center relative overflow-hidden">
                    <p className="text-foreground/40 font-medium text-sm z-10 mb-2">User completion per day checkpoint</p>
                    <div className="flex items-end gap-2 h-24 z-10 opacity-60">
                        <div className="w-16 bg-accent h-full rounded-t flex items-end justify-center pb-2 text-[9px] font-bold text-background" style={{ height: '100%' }}>D1: {stats.funnel?.day1 ?? 0}</div>
                        <div className="w-16 bg-accent/80 rounded-t flex items-end justify-center pb-2 text-[9px] font-bold text-background" style={{ height: `${((stats.funnel?.day7 || 0) / Math.max(stats.funnel?.day1 || 0, 1)) * 100}%` }}>D7: {stats.funnel?.day7 ?? 0}</div>
                        <div className="w-16 bg-blue-500 rounded-t flex items-end justify-center pb-2 text-[9px] font-bold text-white" style={{ height: `${((stats.funnel?.day11 || 0) / Math.max(stats.funnel?.day1 || 0, 1)) * 100}%` }}>D11: {stats.funnel?.day11 ?? 0}</div>
                        <div className="w-16 bg-red-500 rounded-t flex items-end justify-center pb-2 text-[9px] font-bold text-white" style={{ height: `${((stats.funnel?.day14 || 0) / Math.max(stats.funnel?.day1 || 0, 1)) * 100}%` }}>D14: {stats.funnel?.day14 ?? 0}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
