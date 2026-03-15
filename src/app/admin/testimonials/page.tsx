"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Plus, Pencil, Trash2, Loader2, Save, X, User } from "lucide-react";

interface Testimonial {
    id: string;
    author: string;
    role: string;
    content: string;
    avatarUrl: string;
    isFeatured: boolean;
}

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [author, setAuthor] = useState("");
    const [role, setRole] = useState("");
    const [content, setContent] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/testimonials");
            const json = await res.json();
            if (json.success) setTestimonials(json.data);
        } catch (err) {
            console.error("Failed to fetch testimonials", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSave = async () => {
        if (!author.trim() || !content.trim()) return alert("Author and content are required.");
        setIsSaving(true);
        try {
            const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials";
            const method = editingId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, content, role, avatarUrl, isFeatured })
            });
            const json = await res.json();
            if (json.success) {
                resetForm();
                fetchTestimonials();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save testimonial");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                setTestimonials(prev => prev.filter(t => t.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (t: Testimonial) => {
        setEditingId(t.id);
        setAuthor(t.author);
        setRole(t.role || "");
        setContent(t.content);
        setAvatarUrl(t.avatarUrl || "");
        setIsFeatured(t.isFeatured);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingId(null);
        setAuthor("");
        setRole("");
        setContent("");
        setAvatarUrl("");
        setIsFeatured(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="text-accent" /> Testimonials & Recovery Stories
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola testimoni dan cerita pemulihan yang ditampilkan di website.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Testimonial Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit sticky top-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        {editingId ? <Pencil size={18} className="text-accent" /> : <Plus size={18} className="text-accent" />}
                        {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Author Name</label>
                            <input 
                                type="text" 
                                value={author} 
                                onChange={e => setAuthor(e.target.value)} 
                                placeholder="e.g. Budi Santoso" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Role / Status</label>
                            <input 
                                type="text" 
                                value={role} 
                                onChange={e => setRole(e.target.value)} 
                                placeholder="e.g. Mantan Pemain, Konselor" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Avatar URL (Optional)</label>
                            <input 
                                type="text" 
                                value={avatarUrl} 
                                onChange={e => setAvatarUrl(e.target.value)} 
                                placeholder="https://example.com/avatar.png" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                checked={isFeatured} 
                                onChange={e => setIsFeatured(e.target.checked)} 
                                id="isFeatured"
                                className="w-4 h-4 rounded border-primary/20 bg-foreground/5 text-accent focus:ring-accent"
                            />
                            <label htmlFor="isFeatured" className="text-sm font-bold text-foreground/70">Tampilkan di Landing Page</label>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Testimonial Content</label>
                            <textarea 
                                rows={5} 
                                value={content} 
                                onChange={e => setContent(e.target.value)} 
                                placeholder="Tulis cerita atau testimoni..." 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                            ></textarea>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleSave} 
                                disabled={isSaving} 
                                className="flex-1 py-3 bg-accent hover:bg-accent/90 text-background font-bold rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {editingId ? "Update Testimonial" : "Save Testimonial"}
                            </button>
                            {editingId && (
                                <button 
                                    onClick={resetForm} 
                                    className="px-4 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-xl transition-all"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Testimonials List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl">
                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl text-foreground/50">
                            No testimonials added yet.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {testimonials.map((t) => (
                                <div key={t.id} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all group">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-accent shrink-0">
                                                {t.avatarUrl ? (
                                                    <img src={t.avatarUrl} alt={t.author} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <User size={24} />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                                                        {t.author}
                                                    </h4>
                                                    {t.isFeatured && (
                                                        <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full font-bold uppercase tracking-wider">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{t.role}</p>
                                                <p className="text-sm text-foreground/60 leading-relaxed italic mt-2">
                                                    "{t.content}"
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button 
                                                onClick={() => startEdit(t)}
                                                className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg border border-primary/10 transition-colors"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(t.id)}
                                                className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-500/20 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
