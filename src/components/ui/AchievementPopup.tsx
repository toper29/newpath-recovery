"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Sparkles, X } from "lucide-react";

interface AchievementPopupProps {
  achievement: {
    title: string;
    description?: string;
    icon?: string;
  };
  onClose: () => void;
}

export default function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const audio = new Audio("/assets/sounds/achievement.mp3");
    audio.play().catch(() => {}); // Ignore if sound fails
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsVisible(false)} />
      
      <div className="relative bg-[#1A1A2E] border-2 border-accent/40 w-full max-w-sm rounded-[2.5rem] shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden animate-in zoom-in-95">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        
        <div className="p-8 text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-accent/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 bg-accent/10 border-2 border-accent/40 rounded-[1.5rem] flex items-center justify-center text-accent shadow-lg ring-4 ring-accent/5">
              <Trophy size={40} className="drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            </div>
            <div className="absolute -top-2 -right-2 bg-amber-400 text-black p-1.5 rounded-lg shadow-lg rotate-12">
              <Sparkles size={16} />
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-accent font-black uppercase tracking-[0.2em] text-[10px]">Achievement Unlocked</h4>
            <h2 className="text-2xl font-black text-white tracking-tight italic">{achievement.title}</h2>
          </div>
          
          <p className="text-white/60 text-sm leading-relaxed">
            {achievement.description || "Selamat! Kamu telah menyelesaikan tantangan hari ini dan naik ke stage baru."}
          </p>
          
          <div className="pt-2 flex justify-center">
            <div className="flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="w-full bg-accent/10 hover:bg-accent/20 py-4 text-xs font-bold text-accent uppercase tracking-widest border-t border-accent/10 transition-colors"
        >
          Klaim & Lanjutkan
        </button>
      </div>
    </div>
  );
}
