"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target, BrainCircuit, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface LandingContent {
  heroTitle: string;
  heroSub: string;
  stats_users: string;
  stats_rate: string;
}

export default function Home() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/landing-page')
      .then(res => res.json())
      .then(json => {
        console.log('Landing Page API Response:', json);
        if (json.success) setContent(json.data);
      });

    fetch('/api/landing-page/stories')
      .then(res => res.json())
      .then(json => {
        if (json.success) setStories(json.data);
      });

    fetch('/api/landing-page/features')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) setFeatures(json.data);
      });

    fetch('/api/landing-page/testimonials')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) setTestimonials(json.data);
      });
  }, []);

  const data = content || {
    heroTitle: "Slot tidak membuatmu kaya. Slot membuatmu terus berharap.",
    heroSub: "Jangan biarkan hari ini terbuang lagi. Platform pemulihan kami membantu Anda memutus rantai kecanduan dengan metode psikologi yang terbukti efektif dan sepenuhnya anonim.",
    stats_users: "12,400+",
    stats_rate: "85%"
  };

  const defaultFeatures = [
    {
      icon: Target,
      title: "Emergency Anti-Deposit",
      description: "Tunda impuls deposit Anda dengan teknik interaktif yang dirancang untuk mematahkan siklus emosional saat keinginan berjudi muncul.",
      accent: "text-blue-400"
    },
    {
      icon: BrainCircuit,
      title: "Slot Trap Simulator",
      description: "Pahami psikologi di balik desain mesin slot. Kami membongkar ilusi 'Near Miss' dan statistik RTP yang memanipulasi otak Anda.",
      accent: "text-purple-400"
    },
    {
      icon: Zap,
      title: "Program 14 Hari",
      description: "Panduan praktis langkah demi langkah untuk membangun kembali kebiasaan finansial dan emosional dalam 14 hari tanpa judi.",
      accent: "text-yellow-400"
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="flex flex-col items-center bg-background text-foreground overflow-x-hidden pt-16">
      {/* Hero Section */}
      <section className="w-full relative px-4 flex-col flex items-center justify-center min-h-[90vh] text-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)]" />
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-accent text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-sm cursor-default"
          >
            <Sparkles size={16} className="text-secondary" />
            Platform Pemulihan No. 1 di Indonesia
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 py-2"
          >
            {data.heroTitle.split('. ').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-accent italic font-medium">{line}</span> : line}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-foreground/60 max-w-3xl leading-relaxed font-medium px-4"
          >
            {data.heroSub}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto px-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/register"
                className="group relative flex items-center justify-center gap-3 w-full px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-secondary text-accent font-black text-base sm:text-lg shadow-[0_0_30px_rgba(56,189,248,0.2)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                Mulai Pemulihan
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
                Pelajari Fitur
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Stats */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-2 gap-16 mt-20 pt-10 border-t border-foreground/5 w-full max-w-2xl"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <span className="text-4xl md:text-5xl font-black text-foreground group-hover:text-accent transition-colors">{data.stats_users}</span>
              <span className="text-xs text-foreground/40 uppercase font-black tracking-[0.2em] mt-2 group-hover:text-foreground/60 transition-colors">Pengguna Aktif</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <span className="text-4xl md:text-5xl font-black text-foreground group-hover:text-accent transition-colors">{data.stats_rate}</span>
              <span className="text-xs text-foreground/40 uppercase font-black tracking-[0.2em] mt-2 group-hover:text-foreground/60 transition-colors">Tingkat Keberhasilan</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="fitur" className="w-full py-32 px-4 bg-gradient-to-b from-transparent to-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center mb-24"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-accent/40 rounded-full mb-8" 
            />
            <h2 className="text-secondary text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-4 px-4">Metodologi Pemulihan</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground tracking-tight max-w-3xl px-4">
              Hancurkan Ilusi, <br />Rebut Kembali Hidupmu
            </h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {displayFeatures.map((feature, i) => {
              const IconComponent = feature.icon || Target;
              return (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-[#0D1225] border border-primary/10 p-10 rounded-[32px] hover:border-accent/40 transition-colors overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
                  <div className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center ${feature.accent || 'text-accent'} mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                    <IconComponent size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-foreground mb-4 group-hover:text-accent transition-colors">{feature.title}</h4>
                  <p className="text-foreground/50 leading-relaxed text-lg font-medium">
                    {feature.description || feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* Stories & Testimonials Section */}
      {(stories.length > 0 || testimonials.length > 0) && (
        <section className="w-full py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 px-4 tracking-tighter uppercase italic">Mereka Berhasil Keluar</h2>
              <p className="text-white/40 max-w-2xl text-base sm:text-lg px-6">Kisah nyata dan testimoni dari mereka yang berhasil menghentikan siklus kecanduan slot online bersama kami.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Combine and display both, limiting to 3-6 items */}
              {[...testimonials, ...stories].slice(0, 6).map((item, idx) => (
                <motion.div 
                  variants={itemVariants}
                  key={item.id || idx} 
                  className="bg-[#0A0F1F] border border-primary/20 p-8 rounded-3xl hover:border-primary/40 transition-colors shadow-xl flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-accent text-xl group-hover:bg-primary/30 transition-colors overflow-hidden">
                        {(item.avatarUrl || item.thumbnail) ? (
                          <img src={item.avatarUrl || item.thumbnail} alt={item.author || item.title} className="w-full h-full object-cover" />
                        ) : (
                          (item.author || item.title || "U").substring(0, 1)
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors truncate max-w-[150px]">
                          {item.author || item.title}
                        </h4>
                        <span className="text-xs text-foreground/40">
                          {item.role || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : "Survivor")}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 italic flex-grow">
                      "{item.content.substring(0, 180)}{item.content.length > 180 ? "..." : ""}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/5" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto relative z-10 bg-gradient-to-br from-[#0D1225] to-[#0A0F1F] p-8 sm:p-12 md:p-24 rounded-[40px] sm:rounded-[48px] border border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldCheck size={56} className="text-accent mb-8" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase italic">Kerahasiaan Anda Adalah Prioritas</h2>
            <p className="text-base sm:text-xl text-white/50 max-w-2xl mb-10 sm:mb-12 font-medium px-4">
              Pulihkan diri Anda tanpa rasa takut akan stigma. Platform kami 100% anonim dan dienkripsi untuk keamanan total informasi Anda.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 rounded-2xl bg-secondary text-accent font-black text-lg sm:text-xl shadow-xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
              >
                Gabung Gratis
              </Link>
            </motion.div>
          </motion.div>
      </section>
    </div>
  );
}

