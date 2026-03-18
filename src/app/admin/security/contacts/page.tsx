"use client";

import { useState, useEffect } from "react";
import { Phone, Plus, Pencil, Trash2, Loader2, Save, X, ShieldAlert } from "lucide-react";

interface Contact {
    id: string;
    name: string;
    number: string;
    description: string;
    order: number;
}

export default function ContactsManagementPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(0);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/contacts");
            const json = await res.json();
            if (json.success) setContacts(json.data);
        } catch (err) {
            console.error("Failed to fetch contacts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleSave = async () => {
        if (!name.trim() || !number.trim()) return alert("Name and Number are required.");
        setIsSaving(true);
        try {
            const url = editingId ? `/api/admin/contacts/${editingId}` : "/api/admin/contacts";
            const method = editingId ? "PUT" : "POST";
            
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, number, description, order: Number(order) })
            });
            const json = await res.json();
            if (json.success) {
                resetForm();
                fetchContacts();
            } else {
                alert(json.error || "Failed to save contact");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save contact");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this contact?")) return;
        try {
            const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                setContacts(prev => prev.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (c: Contact) => {
        setEditingId(c.id);
        setName(c.name);
        setNumber(c.number);
        setDescription(c.description || "");
        setOrder(c.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setNumber("");
        setDescription("");
        setOrder(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Phone className="text-red-500" /> Emergency Contacts
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola nomor darurat yang ditampilkan di Reality Call Dashboard.</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                    <ShieldAlert size={16} /> Super Admin Control Only
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit sticky top-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        {editingId ? <Pencil size={18} className="text-accent" /> : <Plus size={18} className="text-accent" />}
                        {editingId ? "Edit Contact" : "Add New Contact"}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Contact Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="e.g. National Hotline" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Phone Number</label>
                            <input 
                                type="text" 
                                value={number} 
                                onChange={e => setNumber(e.target.value)} 
                                placeholder="e.g. 1500-454" 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Display Order</label>
                            <input 
                                type="number" 
                                value={order} 
                                onChange={e => setOrder(Number(e.target.value))} 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Description (Tagline)</label>
                            <textarea 
                                rows={3} 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                placeholder="Deskripsi singkat..." 
                                className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none text-white"
                            ></textarea>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleSave} 
                                disabled={isSaving} 
                                className="flex-1 py-3 bg-secondary hover:bg-white hover:text-black text-accent font-bold rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {editingId ? "Update Contact" : "Save Contact"}
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

                {/* Contact List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl">
                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="py-20 text-center bg-[#0A0F1F] border border-primary/20 rounded-2xl text-foreground/50">
                            No emergency contacts added yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {contacts.map((c) => (
                                <div key={c.id} className="bg-[#0A0F1F] border border-red-500/10 rounded-2xl p-6 hover:border-red-500/40 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 flex gap-2">
                                        <button 
                                            onClick={() => startEdit(c)}
                                            className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg border border-primary/10 transition-colors"
                                        >
                                            <Pencil size={12} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(c.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-500/20 transition-colors"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-red-500 transition-colors">
                                                {c.name}
                                            </h4>
                                            <p className="text-2xl font-black text-white italic tracking-tighter mb-2">{c.number}</p>
                                            <p className="text-xs text-foreground/40 mb-3 uppercase tracking-widest font-bold">Order: {c.order}</p>
                                            <p className="text-sm text-foreground/50 leading-relaxed">
                                                {c.description}
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
