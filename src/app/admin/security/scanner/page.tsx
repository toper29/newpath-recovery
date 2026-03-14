"use client";

import { useState } from "react";
import { ShieldCheck, Search, PlayCircle, ShieldAlert, Code, AlertTriangle, CheckCircle2, Loader2, Key } from "lucide-react";

export default function SecurityScannerPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanResults, setScanResults] = useState<any>(null);

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        setScanResults(null);

        // Simulate Scan Progress
        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    // Mock Results
                    setScanResults({
                        sqli: { status: "Pass", issues: 0, detail: "0 Injection vectors found on /login & /register." },
                        xss: { status: "Pass", issues: 0, detail: "Input sanitization active on 14 endpoints." },
                        endpoints: { status: "Warning", issues: 1, detail: "Open debug endpoint found: /api/test-db" },
                        fileUpload: { status: "Pass", issues: 0, detail: "File upload components restricted to images." },
                        dependencies: { status: "Warning", issues: 2, detail: "NPM audit required: 2 moderate vulnerabilities." }
                    });
                    return 100;
                }
                return prev + 5;
            });
        }, 150);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Search className="text-accent" /> Vulnerability Scanner
                    </h2>
                    <p className="text-sm text-foreground/50">Jalankan simulasi pemindaian keamanan pada arsitektur sistem.</p>
                </div>
            </div>

            <div className="bg-[#040814] border border-primary/20 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="max-w-xl">
                    <h3 className="font-bold text-lg mb-2">Full System Security Scan</h3>
                    <p className="text-sm text-foreground/60 mb-6">
                        Memindai ratusan vektor serangan termasuk SQL Injection, XSS Payload, konfigurasi server yang salah, dan open endpoints pada API. Disarankan dijalankan 1x per minggu.
                    </p>
                    
                    <button 
                        onClick={startScan}
                        disabled={isScanning}
                        className="px-6 py-3 bg-accent text-[#040814] font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:opacity-50 flex items-center gap-2"
                    >
                        {isScanning ? (
                            <><Loader2 size={18} className="animate-spin" /> Scanning Application... {scanProgress}%</>
                        ) : (
                            <><PlayCircle size={18} /> Start Vulnerability Scan</>
                        )}
                    </button>
                </div>

                {isScanning && (
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
                            <div 
                                className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" 
                            />
                            <ShieldCheck size={32} className="text-accent animate-pulse" />
                        </div>
                        <p className="text-xs font-mono text-accent mt-4 bg-accent/10 px-3 py-1 rounded">
                            Target: api.newpath.com/*
                        </p>
                    </div>
                )}
            </div>

            {scanResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                    <h3 className="md:col-span-2 font-bold text-lg border-b border-primary/20 pb-2 mt-4">
                        Scan Report Summary
                    </h3>

                    <ResultCard 
                        title="SQL Injection Prevention" 
                        icon={<Key />} 
                        {...scanResults.sqli} 
                    />
                    <ResultCard 
                        title="Cross-Site Scripting (XSS)" 
                        icon={<Code />} 
                        {...scanResults.xss} 
                    />
                    <ResultCard 
                        title="Endpoint Authorization" 
                        icon={<ShieldAlert />} 
                        {...scanResults.endpoints} 
                    />
                    <ResultCard 
                        title="Dependencies Audit" 
                        icon={<AlertTriangle />} 
                        {...scanResults.dependencies} 
                    />
                </div>
            )}
        </div>
    );
}

function ResultCard({ title, icon, status, issues, detail }: any) {
    const isPass = status === "Pass";
    return (
        <div className={`bg-[#040814] border rounded-2xl p-5 flex items-start gap-4 transition-all ${isPass ? 'border-primary/20' : 'border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]'}`}>
            <div className={`p-3 rounded-xl ${isPass ? "bg-accent/10 text-accent" : "bg-orange-500/10 text-orange-500"}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-foreground">{title}</h4>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${isPass ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
                        {isPass ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                        {status}
                    </span>
                </div>
                <p className="text-xs text-foreground/60 mb-3">{detail}</p>
                
                {!isPass && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded p-2 text-[10px] text-orange-400 flex items-center justify-between">
                        <span>{issues} Issues Detected</span>
                        <button className="font-bold hover:underline">View Mitigation</button>
                    </div>
                )}
            </div>
        </div>
    );
}
