"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Pencil, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";

interface Article {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    thumbnail?: string;
    content?: string;
}

export default function ContentManagementPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Bahaya Judi");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/content");
            const json = await res.json();
            if (json.success) setArticles(json.data);
        } catch (err) {
            console.error("Failed to fetch articles", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) return alert("Title and content are required.");
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, category, content, thumbnail })
            });
            const json = await res.json();
            if (json.success) {
                // Reset form
                setTitle("");
                setContent("");
                setThumbnail("");
                fetchArticles();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to publish");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this article?")) return;
        try {
            const res = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                setArticles(prev => prev.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <FileText className="text-accent" /> Content Management
                    </h2>
                    <p className="text-sm text-foreground/50">Kelola artikel edukasi, panduan pemulihan, dan materi psikologi.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Article Form */}
                <div className="lg:col-span-1 border border-primary/20 bg-[#0A0F1F] rounded-2xl p-6 h-fit">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Plus size={18} className="text-accent" /> Draft New Article
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Article Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Cara Mengatasi Sakaw Judi" className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors">
                                <option value="Bahaya Judi">Bahaya Judi</option>
                                <option value="Cara Berhenti Judi">Cara Berhenti Judi</option>
                                <option value="Psikologi Kecanduan">Psikologi Kecanduan</option>
                                <option value="Recovery Stories">Recovery Stories</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Thumbnail Image (Optional)</label>
                            <div className="flex flex-col gap-2">
                                <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="Enter image URL..." className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-foreground/70 uppercase mb-1.5">Content (Markdown / HTML)</label>
                            <textarea rows={5} value={content} onChange={e => setContent(e.target.value)} placeholder="Write your article content here..." className="w-full bg-foreground/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                        </div>
                        <button type="button" onClick={handlePublish} disabled={isSaving} className="w-full py-3 bg-accent hover:bg-accent/90 text-background font-bold rounded-xl mt-2 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 flex justify-center items-center gap-2">
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Publish Article"}
                        </button>
                    </form>
                </div>

                {/* Articles Table */}
                <div className="lg:col-span-2 bg-[#0A0F1F] border border-primary/20 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-primary/5 text-xs uppercase text-foreground/50 border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6 font-bold">Article Title</th>
                                    <th className="py-4 px-6 font-bold">Category</th>
                                    <th className="py-4 px-6 font-bold">Author</th>
                                    <th className="py-4 px-6 font-bold">Published</th>
                                    <th className="py-4 px-6 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                                        </td>
                                    </tr>
                                ) : articles.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-foreground/50">
                                            No articles published yet.
                                        </td>
                                    </tr>
                                ) : articles.map((article, i) => (
                                    <tr key={i} className="text-foreground hover:bg-primary/5 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-bold truncate max-w-[200px]" title={article.title}>{article.title}</p>
                                            <p className="text-[10px] text-foreground/50">{article.id}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-[10px] px-2 py-1 bg-foreground/10 rounded-full font-bold">
                                                {article.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-foreground/70">{article.author}</td>
                                        <td className="py-4 px-6 text-foreground/50 italic text-xs">{article.date}</td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-foreground/5 hover:bg-primary/20 text-accent rounded-lg transition-colors border border-primary/10" title="Edit Article">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(article.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20" title="Delete Article">
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
