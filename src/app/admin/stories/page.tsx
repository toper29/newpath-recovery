"use client";

import { MessageSquare, Plus, Pencil, Trash2 } from "lucide-react";

export default function ManageStoriesPage() {
    const stories = [
        { id: "STR-001", title: "Kehilangan 200 juta karena slot", loss: "Rp 200.000.000", duration: "2 Tahun", date: "Nov 01, 2023" },
        { id: "STR-002", title: "Hutang pinjol menumpuk hingga 50 juta", loss: "Rp 50.000.000", duration: "6 Bulan", date: "Nov 12, 2023" },
        { id: "STR-003", title: "Gadai motor demi Maxwin yang tak pernah datang", loss: "Rp 15.000.000", duration: "1 Tahun", date: "Nov 20, 2023" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="text-accent" /> Real Stories & Testimonials
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola cerita nyata pengguna yang bangkrut untuk fitur Emergency Reality Call.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Story Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Plus size={18} className="text-accent" /> Add New Story
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Story Title</label>
                            <input type="text" placeholder="e.g. Hilang tabungan nikah..." className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Total Kerugian</label>
                            <input type="text" placeholder="e.g. Rp 100.000.000" className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Durasi Kecanduan</label>
                            <input type="text" placeholder="e.g. 3 Tahun" className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Story Content</label>
                            <textarea rows={5} placeholder="Ceritakan pengalamannya secara singkat namun memukul psikologis pembaca..." className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                        </div>
                        <button type="button" className="w-full py-3 bg-accent hover:bg-accent/90 text-background font-bold rounded-xl mt-2 transition-all shadow-lg shadow-accent/20">
                            Save Story
                        </button>
                    </form>
                </div>

                {/* Stories Table */}
                <div className="lg:col-span-2 bg-[#0A0F1F] border border-primary/20 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-primary/5 text-xs uppercase text-foreground/50 border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6 font-bold">Story Title</th>
                                    <th className="py-4 px-6 font-bold">Kerugian</th>
                                    <th className="py-4 px-6 font-bold">Durasi</th>
                                    <th className="py-4 px-6 font-bold">Added Date</th>
                                    <th className="py-4 px-6 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {stories.map((story, i) => (
                                    <tr key={i} className="text-foreground hover:bg-primary/5 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-bold truncate max-w-[200px]" title={story.title}>{story.title}</p>
                                            <p className="text-[10px] text-foreground/50">{story.id}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">
                                                {story.loss}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-foreground/70">{story.duration}</td>
                                        <td className="py-4 px-6 text-foreground/50 italic text-xs">{story.date}</td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg transition-colors border border-primary/10" title="Edit Story">
                                                    <Pencil size={14} />
                                                </button>
                                                <button className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20" title="Delete Story">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
