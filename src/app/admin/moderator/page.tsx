"use client";

import { Check, X, PhoneCall, Plus, FileText, Quote, AlertOctagon } from "lucide-react";

export default function ModeratorDashboard() {
    const highRiskUsers = [
        { name: "Rian H.", activity: "2 mins ago", score: 95 },
        { name: "Lina W.", activity: "1 hour ago", score: 60 },
    ];

    return (
        <div className="space-y-8">
            {/* Dashboard Alerts */}
            <div className="bg-[#110505] border border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                        <AlertOctagon size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Moderator Protocol Active</h2>
                        <p className="text-foreground/50 text-sm mt-1">Sistem deteksi risiko tinggi sedang memantau seluruh aktivitas pengguna.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Monitoring */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Risk Monitoring</h2>
                        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold flex items-center gap-2">
                            Real-Time Pulse <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        </span>
                    </div>

                    <div className="space-y-3">
                        {highRiskUsers.map((u, i) => (
                            <div key={i} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${u.score > 80 ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                    <div>
                                        <p className="font-bold text-sm">{u.name}</p>
                                        <p className="text-[10px] text-foreground/50">Last activity: {u.activity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className={`text-[10px] font-bold ${u.score > 80 ? 'text-red-500' : 'text-orange-500'}`}>Addiction Score: {u.score}</span>
                                        <div className="w-24 h-1.5 bg-foreground/10 rounded-full mt-1">
                                            <div className={`h-full rounded-full ${u.score > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${u.score}%` }}></div>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-foreground/5 hover:bg-foreground/10 text-accent rounded-lg transition-colors">
                                        <PhoneCall size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational Articles */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Educational Articles</h2>
                        <button className="text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent font-bold flex items-center gap-1 transition-colors">
                            <Plus size={12} /> New Article
                        </button>
                    </div>

                    <div className="space-y-3">
                        {[
                            { title: "Understanding Dopamine Traps", desc: "How gambling triggers neural pathways similarly to drug...", color: "bg-accent/80" },
                            { title: "First Steps to Debt Recovery", desc: "Practical guide to managing financial loss after addiction...", color: "bg-blue-500/80" },
                        ].map((article, i) => (
                            <div key={i} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-4 flex gap-4">
                                <div className={`w-16 h-16 ${article.color} rounded-xl shadow-inner opacity-90`}></div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-sm">{article.title}</h3>
                                    <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{article.desc}</p>
                                    <div className="flex gap-3 mt-2">
                                        <button className="text-[10px] font-bold text-accent uppercase tracking-wider hover:text-white transition-colors">Edit</button>
                                        <button className="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:text-white transition-colors">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Emergency Reality Calls (Testimonials)</h2>
                    <button className="text-xs px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold">
                        Review 5 New Submissions
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#110505] border border-red-500/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-red-400"></div>
                            <span className="font-bold text-sm">"Anonymous Survivor"</span>
                        </div>
                        <p className="text-sm text-foreground/80 italic leading-relaxed">"I lost everything in a single night. My house, my trust. If you're reading this, please stop now before the hole gets deeper..."</p>
                        <div className="flex gap-3 mt-6">
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">Publish to Wall</button>
                            <button className="px-4 py-2 bg-transparent border border-red-500/30 text-red-500/70 hover:text-red-500 text-xs font-bold rounded-lg transition-colors">Dismiss</button>
                        </div>
                        <Quote className="absolute -bottom-4 -right-4 text-red-900/30 rotate-180" size={80} />
                    </div>

                    <div className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-5 relative overflow-hidden opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-[10px] text-accent">A</span>
                            </div>
                            <span className="font-bold text-sm text-foreground/50">"Agus P."</span>
                        </div>
                        <p className="text-sm text-foreground/50 italic leading-relaxed">"6 months clean today. The first month was hell, but this community saved my life. Realizing it's a trap was the first step."</p>
                        <div className="flex gap-3 mt-6">
                            <span className="text-xs font-bold text-primary px-3 py-1 rounded bg-primary/10">Published</span>
                        </div>
                        <Check className="absolute bottom-4 right-4 text-primary/30" size={40} />
                    </div>

                    <div className="bg-transparent border border-dashed border-primary/30 hover:border-accent/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:text-accent transition-colors mb-3">
                            <Plus size={20} />
                        </div>
                        <span className="text-xs font-bold text-foreground/50 group-hover:text-accent transition-colors">Add New Official Survivor Story</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
