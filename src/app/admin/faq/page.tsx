"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Plus, Pencil, Trash2, Loader2, Save, X } from "lucide-react";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

export default function FAQManagementPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("General");
    const [order, setOrder] = useState(0);

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/faq");
            const json = await res.json();
            if (json.success) setFaqs(json.data);
        } catch (err) {
            console.error("Failed to fetch FAQs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleSave = async () => {
        if (!question.trim() || !answer.trim()) return alert("Question and answer are required.");
        setIsSaving(true);
        try {
            const url = editingId ? `/api/admin/faq/${editingId}` : "/api/admin/faq";
            const method = editingId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, answer, category, order: Number(order) })
            });
            const json = await res.json();
            if (json.success) {
                resetForm();
                fetchFaqs();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save FAQ");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this FAQ?")) return;
        try {
            const res = await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                setFaqs(prev => prev.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (faq: FAQ) => {
        setEditingId(faq.id);
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setCategory(faq.category || "General");
        setOrder(faq.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingId(null);
        setQuestion("");
        setAnswer("");
        setCategory("General");
        setOrder(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <HelpCircle className="text-accent" /> FAQ Management
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola pertanyaan yang sering diajukan oleh pengguna.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* FAQ Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit sticky top-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        {editingId ? <Pencil size={18} className="text-accent" /> : <Plus size={18} className="text-accent" />}
                        {editingId ? "Edit FAQ" : "Add New FAQ"}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Question</label>
                            <input 
                                type="text" 
                                value={question} 
                                onChange={e => setQuestion(e.target.value)} 
                                placeholder="e.g. Apakah data saya aman?" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Category</label>
                            <input 
                                type="text" 
                                value={category} 
                                onChange={e => setCategory(e.target.value)} 
                                placeholder="e.g. Keamanan, Teknis" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Display Order</label>
                            <input 
                                type="number" 
                                value={order} 
                                onChange={e => setOrder(Number(e.target.value))} 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Answer</label>
                            <textarea 
                                rows={5} 
                                value={answer} 
                                onChange={e => setAnswer(e.target.value)} 
                                placeholder="Jawaban lengkap..." 
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
                                {editingId ? "Update FAQ" : "Save FAQ"}
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

                {/* FAQ List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl">
                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                        </div>
                    ) : faqs.length === 0 ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl text-foreground/50">
                            No FAQs added yet.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all group">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent rounded-full font-bold uppercase tracking-wider">
                                                    {faq.category || "General"}
                                                </span>
                                                <span className="text-[10px] text-foreground/30 font-bold">
                                                    Order: {faq.order}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                                                {faq.question}
                                            </h4>
                                            <p className="text-sm text-foreground/60 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button 
                                                onClick={() => startEdit(faq)}
                                                className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg border border-primary/10 transition-colors"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(faq.id)}
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
