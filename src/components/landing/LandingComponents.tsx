"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingHeroClient({ title, sub }: { title: string, sub: string }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8"
        >
            <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-accent text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-sm cursor-default font-mono"
            >
                <Sparkles size={16} className="text-secondary" />
                #1 BRAIN-BASED RECOVERY PLATFORM
            </motion.div>

            <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 py-2 text-center"
            >
                {title}
            </motion.h1>

            <motion.p 
                variants={itemVariants}
                className="text-lg md:text-2xl text-foreground/60 max-w-3xl leading-relaxed font-medium px-4 text-center"
            >
                {sub}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto px-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Link
                        href="/register"
                        className="group relative flex items-center justify-center gap-3 w-full px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-secondary text-accent font-black text-base sm:text-lg shadow-[0_0_30px_rgba(56,189,248,0.2)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        Mulai Pemulihan Gratis
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight size={22} />
                        </motion.div>
                    </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Link
                        href="#fitur"
                        className="flex items-center justify-center w-full px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-foreground/5 text-foreground/80 font-bold text-base sm:text-lg hover:bg-foreground/10 transition-all border border-foreground/10 backdrop-blur-sm"
                    >
                        Lihat 14 Fitur Unggulan
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function AnimatedSection({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
    return (
        <motion.section 
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={className}
        >
            {children}
        </motion.section>
    );
}

export function FeatureCard({ feature, index }: { feature: any, index: number }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0D1225] border border-primary/10 p-8 rounded-[32px] hover:border-accent/40 transition-colors overflow-hidden shadow-2xl flex flex-col h-full"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
            <div className={`w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                <span className="text-xs font-black opacity-20 group-hover:opacity-40">{index + 1}</span>
            </div>
            <h4 className="text-xl font-black text-foreground mb-4 group-hover:text-accent transition-colors leading-tight">{feature.title}</h4>
            <p className="text-foreground/50 leading-relaxed text-sm font-medium">
                {feature.description}
            </p>
        </motion.div>
    );
}
