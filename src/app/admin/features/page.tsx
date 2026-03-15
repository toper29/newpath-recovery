"use client";

import { useState, useEffect } from "react";
import { Zap, Plus, Pencil, Trash2, Loader2, Save, X, Star } from "lucide-react";

interface Feature {
    id: string;
    title: string;
    description: string;
    iconName: string;
    order: number;
}

export default function FeaturesManagementPage() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [iconName, setIconName] = useState("Target");
    const [order, setOrder] = useState(0);

    const fetchFeatures = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/features");
            const json = await res.json();
            if (json.success) setFeatures(json.data);
        } catch (err) {
            console.error("Failed to fetch features", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) return alert("Title and description are required.");
        setIsSaving(true);
        try {
            const url = editingId ? `/api/admin/features/${editingId}` : "/api/admin/features";
            const method = editingId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, iconName, order: Number(order) })
            });
            const json = await res.json();
            if (json.success) {
                resetForm();
                fetchFeatures();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save feature");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this feature?")) return;
        try {
            const res = await fetch(`/api/admin/features/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                setFeatures(prev => prev.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (feature: Feature) => {
        setEditingId(feature.id);
        setTitle(feature.title);
        setDescription(feature.description);
        setIconName(feature.iconName || "Target");
        setOrder(feature.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setIconName("Target");
        setOrder(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Zap className="text-accent" /> Features Management
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola fitur-fitur utama yang ditampilkan di Landing Page.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feature Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit sticky top-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        {editingId ? <Pencil size={18} className="text-accent" /> : <Plus size={18} className="text-accent" />}
                        {editingId ? "Edit Feature" : "Add New Feature"}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Feature Title</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                placeholder="e.g. Emergency Anti-Deposit" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Icon Name (Lucide)</label>
                            <select 
                                value={iconName} 
                                onChange={e => setIconName(e.target.value)} 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                            >
                                <option value="Target">Target</option>
                                <option value="BrainCircuit">BrainCircuit</option>
                                <option value="Zap">Zap</option>
                                <option value="ShieldCheck">ShieldCheck</option>
                                <option value="Heart">Heart</option>
                                <option value="AlertTriangle">AlertTriangle</option>
                            </select>
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
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Description</label>
                            <textarea 
                                rows={5} 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                placeholder="Jelaskan kegunaan fitur ini..." 
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
                                {editingId ? "Update Feature" : "Save Feature"}
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

                {/* Feature List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl">
                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                        </div>
                    ) : features.length === 0 ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl text-foreground/50">
                            No features added yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="bg-[#0A0F1F] border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 flex gap-2">
                                        <button 
                                            onClick={() => startEdit(feature)}
                                            className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg border border-primary/10 transition-colors"
                                        >
                                            <Pencil size={12} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(feature.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-500/20 transition-colors"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-accent">
                                            <Star size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                                                {feature.title}
                                            </h4>
                                            <p className="text-xs text-foreground/40 mb-3">Order: {feature.order}</p>
                                            <p className="text-sm text-foreground/60 leading-relaxed italic">
                                                "{feature.description}"
                                            </p>
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
