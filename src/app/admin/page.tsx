"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, Activity, Target, ShieldPlus, BarChart3, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
    mainStats: {
        totalUsers: number;
        activeUsersToday: number;
        pendingApproval: number;
        avgAddictionScore: number;
    };
    featureStats: { name: string; count: number }[];
    challengeStats: { started: number; completed: number };
    distribution?: { high: number; medium: number; low: number; };
    funnel?: { day1: number; day7: number; day14: number; day30: number; };
}

export default function GlobalAnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const json = await res.json();
                if (json.success) setData(json.data);
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-accent">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    const mainStats = [
        { label: "Total User", value: data.mainStats.totalUsers.toString(), trend: "" },
        { label: "Active User (Today)", value: data.mainStats.activeUsersToday.toString(), trend: "" },
        { label: "Pending Approval", value: data.mainStats.pendingApproval.toString(), trend: "" },
        { label: "Avg Addiction Score", value: `${data.mainStats.avgAddictionScore}%`, trend: "" },
    ];

    const featureStats = data.featureStats;

    const challengeStats = [
        { label: "Memulai Challenge", value: data.challengeStats.started, icon: Target },
        { label: "Menyelesaikan Challenge", value: data.challengeStats.completed, icon: ShieldPlus },
    ];

    const chartData = [
        { name: 'Day 1', users: data.funnel?.day1 || 0 },
        { name: 'Day 7', users: data.funnel?.day7 || 0 },
        { name: 'Day 14', users: data.funnel?.day14 || 0 },
        { name: 'Day 30', users: data.funnel?.day30 || 0 }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-foreground">Global Overview</h2>
                <p className="text-sm text-foreground/50">Ringkasan seluruh aktivitas sistem dan metrik pemulihan pengguna.</p>
            </div>

            {/* Statistik Utama */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {mainStats.map((stat, i) => (
                    <div key={i} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5 flex flex-col justify-between hover:bg-primary/5 transition-colors">
                        <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">{stat.label}</span>
                        <div className="mt-4 flex items-end justify-between">
                            <span className="text-3xl font-black text-foreground">{stat.value}</span>
                            <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-accent' : 'text-red-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Statistik Fitur */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-accent" size={20} />
                        <h3 className="font-bold text-lg">Statistik Penggunaan Fitur</h3>
                    </div>
                    <div className="space-y-4">
                        {featureStats.map((feat, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-foreground/5 border border-primary/10">
                                <span className="text-sm font-medium text-foreground/80">{feat.name}</span>
                                <span className="text-sm font-bold text-accent">{feat.count} kali digunakan</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistik Challenge */}
                <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Target className="text-accent" size={20} />
                        <h3 className="font-bold text-lg">Program 30 Hari (Challenge)</h3>
                    </div>
                    <div className="grid gap-4">
                        {challengeStats.map((cs, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-primary/10">
                                <div className="p-3 bg-primary/20 rounded-lg text-accent">
                                    <cs.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-foreground/50 uppercase font-bold tracking-wider">{cs.label}</p>
                                    <p className="text-2xl font-black mt-1 text-foreground">{cs.value} <span className="text-sm font-normal text-foreground/50">User</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grafik Aktivitas (Active Chart) */}
            <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6 h-80 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="text-accent" size={20} />
                        <h3 className="font-bold text-lg">Retensi Challenge 30 Hari</h3>
                    </div>
                </div>

                <div className="flex-1 w-full h-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0A0F1F', borderColor: '#38BDF840', borderRadius: '12px' }}
                                itemStyle={{ color: '#38BDF8', fontWeight: 'bold' }}
                                cursor={{ fill: '#38BDF810' }}
                            />
                            <Bar dataKey="users" fill="#38BDF8" radius={[6, 6, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
