"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { 
  Play, 
  RefreshCcw, 
  Settings, 
  Info,
  Activity,
  X,
  ArrowRight,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import SlotOnboardingModal from "./SlotOnboardingModal";

// --- Types ---

type SymbolType = 'DIAMOND' | 'CROWN' | 'ZEUS' | 'GRAPES' | 'APPLE' | 'COIN' | 'BLUE_GEM' | 'PURPLE_GEM';

type ProbabilityConfig = {
  lose: number;
  smallWin: number;
  mediumWin: number;
  bigWin: number;
  scatter: number;
};

type SimulationConfig = {
  initialBalance: number;
  betAmount: number;
  rtp: number;
  probabilities: ProbabilityConfig;
  scatterBonusSpins: number;
  scatterMultiplier: number;
};

type SpinResult = {
  outcome: "LOSE" | "SMALL_WIN" | "MEDIUM_WIN" | "BIG_WIN" | "SCATTER";
  winAmount: number;
  balanceAfter: number;
  grid: SymbolType[][];
  winningSymbols: SymbolType[];
  winningCoords: { c: number; r: number }[];
};

// --- Symbol Configuration ---
const SYMBOLS: Record<SymbolType, { src: string; winValue: number; name: string }> = {
  ZEUS: { src: "/assets/symbols/zeus.png", winValue: 5, name: "ZEUS SCATTER" },
  DIAMOND: { src: "/assets/symbols/diamond.png", winValue: 3, name: "DIAMOND" },
  CROWN: { src: "/assets/symbols/crown.png", winValue: 1.5, name: "GOLDEN CROWN" },
  COIN: { src: "/assets/symbols/coin.png", winValue: 0.8, name: "LIGHTNING COIN" },
  BLUE_GEM: { src: "/assets/symbols/blue_gem.png", winValue: 0.4, name: "BLUE SAPPHIRE" },
  PURPLE_GEM: { src: "/assets/symbols/purple_gem.png", winValue: 0.2, name: "PURPLE AMETHYST" },
  GRAPES: { src: "/assets/symbols/grapes.png", winValue: 0.08, name: "GRAPES" },
  APPLE: { src: "/assets/symbols/apple.png", winValue: 0.04, name: "APPLE" },
};

const SYMBOL_LIST: SymbolType[] = ['DIAMOND', 'CROWN', 'ZEUS', 'GRAPES', 'APPLE', 'COIN', 'BLUE_GEM', 'PURPLE_GEM'];

// --- RTP Presets Mapping ---
const RTP_PRESETS: Record<number, ProbabilityConfig> = {
  70: { lose: 85, smallWin: 10, mediumWin: 3, bigWin: 1, scatter: 1 },
  85: { lose: 78, smallWin: 15, mediumWin: 5, bigWin: 1, scatter: 1 },
  95: { lose: 70, smallWin: 20, mediumWin: 7, bigWin: 2, scatter: 1 },
};

const MAX_BET = 1000000;

// --- Sub-Component: Settings Panel ---
const SettingsPanel = ({ 
  config, 
  setConfig, 
  probSum, 
  isFullPage = false 
}: { 
  config: SimulationConfig; 
  setConfig: (c: SimulationConfig) => void; 
  probSum: number;
  isFullPage?: boolean;
}) => {
  const handleNumericChange = (key: keyof SimulationConfig | keyof ProbabilityConfig, val: string, isProb: boolean = false) => {
      const cleanValue = val.replace(/\D/g, "");
      const numValue = parseInt(cleanValue) || 0;
      
      if (isProb) {
          setConfig({
              ...config,
              probabilities: { ...config.probabilities, [key]: numValue }
          });
      } else {
          setConfig({ ...config, [key]: numValue });
      }
  };

  return (
    <div className={`space-y-6 ${isFullPage ? "" : "max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"}`}>
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="text-[10px] text-red-500/80 font-bold uppercase tracking-[0.2em]">Financial Baseline</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/30 uppercase font-black">Modal Awal (Rp)</label>
              <input 
                type="text"
                inputMode="numeric"
                placeholder="Misal: 100000"
                value={config.initialBalance === 0 ? "" : config.initialBalance}
                onChange={(e) => handleNumericChange("initialBalance", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-white/30 uppercase font-black">Bet Default (Rp)</label>
              <input 
                type="text"
                inputMode="numeric"
                placeholder="Misal: 1.000"
                value={config.betAmount === 0 ? "" : config.betAmount.toLocaleString("id-ID")}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const numValue = Math.min(parseInt(rawValue) || 0, MAX_BET);
                  handleNumericChange("betAmount", numValue.toString());
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-[10px] text-red-500/80 font-bold uppercase tracking-[0.2em]">Probability Matrix</div>
            <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded-lg border ${probSum === 100 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
              Total: {probSum}%
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {[
              { key: "lose", label: "Lose %", color: "bg-red-500" },
              { key: "smallWin", label: "Small Win %", color: "bg-emerald-500" },
              { key: "mediumWin", label: "Med Win %", color: "bg-cyan-500" },
              { key: "bigWin", label: "Big Win %", color: "bg-purple-500" },
              { key: "scatter", label: "Scatter %", color: "bg-orange-500" },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl group hover:bg-white/10 transition-all">
                <div className={`w-1 h-6 rounded-full ${item.color} group-hover:scale-y-110 transition-transform`} />
                <span className="text-xs font-bold text-white/70 flex-1">{item.label}</span>
                <input 
                  type="text"
                  inputMode="numeric"
                  value={config.probabilities[item.key as keyof ProbabilityConfig] === 0 ? "" : config.probabilities[item.key as keyof ProbabilityConfig]}
                  onChange={(e) => handleNumericChange(item.key as keyof ProbabilityConfig, e.target.value, true)}
                  className="w-16 bg-black/60 border border-white/10 rounded-xl px-2 py-1.5 text-center text-white focus:outline-none focus:border-red-500 font-mono text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[10px] text-red-500/80 font-bold uppercase tracking-[0.2em]">Quick Presets</div>
          <div className="grid grid-cols-3 gap-2">
            {[70, 85, 95].map(rtp => (
              <button 
                key={rtp}
                onClick={() => setConfig({
                   ...config, 
                   rtp,
                   probabilities: RTP_PRESETS[rtp]
                })}
                className={`py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${config.rtp === rtp ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/30" : "bg-white/5 border-white/10 text-white/30 hover:border-white/30"}`}
              >
                {rtp}% RTP
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RealitySlotSimulator() {
  const [isStarted, setIsStarted] = useState(false);
  const [isSettingsOpenInGame, setIsSettingsOpenInGame] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [forceShowOnboarding, setForceShowOnboarding] = useState(false);

  const [config, setConfig] = useState<SimulationConfig>({
    initialBalance: 100000,
    betAmount: 1000,
    rtp: 70,
    probabilities: RTP_PRESETS[70],
    scatterBonusSpins: 10,
    scatterMultiplier: 1.5,
  });

  const [isSpinning, setIsSpinning] = useState(false);
  // Initialize with a static grid to avoid hydration mismatch
  const [currentGrid, setCurrentGrid] = useState<SymbolType[][]>(() => 
    Array(6).fill(null).map(() => Array(5).fill('DIAMOND'))
  );
  
  // Initialize grid and set mounted status
  useEffect(() => {
    setIsMounted(true);
    const randomGrid = Array(6).fill(null).map(() => 
      Array(5).fill(null).map(() => SYMBOL_LIST[Math.floor(Math.random() * SYMBOL_LIST.length)])
    );
    setCurrentGrid(randomGrid);
  }, []);
  
  const [history, setHistory] = useState<SpinResult[]>([]);
  const [currentBalance, setCurrentBalance] = useState(100000);
  const [lastWinAmount, setLastWinAmount] = useState(0);
  const [winningSymbols, setWinningSymbols] = useState<SymbolType[]>([]);
  const [winningCoords, setWinningCoords] = useState<{ c: number; r: number }[]>([]);
  const [autoSpinRemaining, setAutoSpinRemaining] = useState(0);
  const [isAutoSpinActive, setIsAutoSpinActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalWagered: 0,
    totalWon: 0,
    totalSpins: 0
  });

  const sessionRTP = useMemo(() => {
    if (sessionStats.totalWagered === 0) return 0;
    return (sessionStats.totalWon / sessionStats.totalWagered) * 100;
  }, [sessionStats]);

  const probSum = useMemo(() => {
    const { lose, smallWin, mediumWin, bigWin, scatter } = config.probabilities;
    return lose + smallWin + mediumWin + bigWin + scatter;
  }, [config.probabilities]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getRandomSymbol = useCallback(() => {
    return SYMBOL_LIST[Math.floor(Math.random() * SYMBOL_LIST.length)];
  }, []);

  const handleSpin = async () => {
    if (isSpinning || currentBalance < config.betAmount) return;

    setIsSpinning(true);
    setLastWinAmount(0);
    setWinningSymbols([]);
    setWinningCoords([]);
    setCurrentBalance(prev => prev - config.betAmount);

    const spinDuration = 1500;
    const intervalTime = 80;
    
    const spinInterval = setInterval(() => {
      setCurrentGrid(Array(6).fill(null).map(() => Array(5).fill(null).map(() => getRandomSymbol())));
    }, intervalTime);

    await new Promise(r => setTimeout(r, spinDuration));
    clearInterval(spinInterval);

    const rand = Math.random() * 100;
    let outcome: SpinResult["outcome"] = "LOSE";
    let pickedWinningSymbols: SymbolType[] = [];
    const { lose, smallWin, mediumWin, bigWin } = config.probabilities;

    if (rand < lose) {
      outcome = "LOSE";
    } else if (rand < lose + smallWin) {
      outcome = "SMALL_WIN";
      pickedWinningSymbols = [['APPLE', 'GRAPES', 'PURPLE_GEM', 'BLUE_GEM'][Math.floor(Math.random() * 4)] as SymbolType];
    } else if (rand < lose + smallWin + mediumWin) {
      outcome = "MEDIUM_WIN";
      const symbols: SymbolType[] = ['COIN', 'CROWN', 'DIAMOND'];
      pickedWinningSymbols = [symbols[Math.floor(Math.random() * symbols.length)]];
    } else if (rand < lose + smallWin + mediumWin + bigWin) {
      outcome = "BIG_WIN";
      pickedWinningSymbols = ['DIAMOND', 'CROWN'];
    } else {
      outcome = "SCATTER";
      pickedWinningSymbols = ['ZEUS'];
    }

    // --- Grid Generation & Symbol Injection ---
    let finalGrid: SymbolType[][] = [];
    let finalWinningCoords: { c: number; r: number }[] = [];
    let totalWinAmount = 0;
    
    if (pickedWinningSymbols.length > 0) {
        // WINNING OUTCOME: Force the win injection
        finalGrid = Array(6).fill(null).map(() => Array(5).fill(null).map(() => getRandomSymbol()));
        const allCoords: { c: number; r: number }[] = [];
        for (let c = 0; c < 6; c++) {
          for (let r = 0; r < 5; r++) {
            allCoords.push({ c, r });
          }
        }
        for (let i = allCoords.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]];
        }

        let coordIdx = 0;
        pickedWinningSymbols.forEach(symbol => {
          const count = 8 + Math.floor(Math.random() * 7); // 8 to 14 symbols
          
          let qMultiplier = 1.0;
          if (count >= 12) qMultiplier = 1.5;
          else if (count >= 10) qMultiplier = 1.2;

          const winVal = (config.betAmount / 1000) * SYMBOLS[symbol].winValue * 1000;
          totalWinAmount += (winVal * qMultiplier);

          for (let i = 0; i < count && coordIdx < allCoords.length; i++) {
             const coord = allCoords[coordIdx++];
             finalGrid[coord.c][coord.r] = symbol;
             finalWinningCoords.push(coord);
          }
        });

        if (outcome === "SCATTER") {
            totalWinAmount = totalWinAmount * config.scatterMultiplier;
        }
    } else {
        // LOSE OUTCOME: Suppress "accidental" wins
        let attempts = 0;
        do {
            finalGrid = Array(6).fill(null).map(() => Array(5).fill(null).map(() => getRandomSymbol()));
            attempts++;
            const counts: Record<string, number> = {};
            let hasNaturalWin = false;
            finalGrid.flat().forEach(s => {
                counts[s] = (counts[s] || 0) + 1;
                if (counts[s] >= 8) hasNaturalWin = true;
            });
            if (!hasNaturalWin || attempts > 15) break;
        } while (true);
    }

    // --- State Updates ---
    setCurrentGrid(finalGrid);
    setCurrentBalance(prev => prev + totalWinAmount);
    setLastWinAmount(totalWinAmount);
    setWinningSymbols(pickedWinningSymbols);
    setWinningCoords(finalWinningCoords);
    setIsSpinning(false);

    setSessionStats(prev => ({
      totalWagered: prev.totalWagered + config.betAmount,
      totalWon: prev.totalWon + totalWinAmount,
      totalSpins: prev.totalSpins + 1
    }));
    
    if (isAutoSpinActive) {
        setAutoSpinRemaining(prev => Math.max(0, prev - 1));
    }

    const spinRes: SpinResult = {
      outcome,
      winAmount: totalWinAmount,
      balanceAfter: currentBalance + totalWinAmount - config.betAmount,
      grid: finalGrid,
      winningSymbols: pickedWinningSymbols,
      winningCoords: finalWinningCoords
    };
    setHistory(prev => [...prev, spinRes]);

    fetch("/api/user/game-finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameName: "Reality Slot Simulator",
        score: Math.round(totalWinAmount),
        xpEarned: 0
      })
    }).catch(console.error);
  };

  // Auto-Spin Sequence Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoSpinActive && !isSpinning) {
      if (autoSpinRemaining > 0 && currentBalance >= config.betAmount) {
        // Delay between spins for visual clarity
        timer = setTimeout(() => {
          handleSpin();
        }, 1000);
      } else {
        // Stop auto-spin if conditions aren't met
        setIsAutoSpinActive(false);
        setAutoSpinRemaining(0);
      }
    }
    
    return () => clearTimeout(timer);
  }, [isAutoSpinActive, isSpinning, autoSpinRemaining, currentBalance, config.betAmount, handleSpin]);

  const handleStartGame = () => {
    if (probSum === 100) {
      setCurrentBalance(config.initialBalance);
      setIsStarted(true);
    }
  };

  if (!isMounted) return null;

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-[#0f0f12] text-white flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-red-500/5 blur-[150px] -z-10 rounded-full" />
        <div className="w-full max-w-lg bg-black/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-700">
           <div className="flex flex-col items-center text-center mb-8">
              <div className="p-4 bg-red-500/10 rounded-[1.5rem] border border-red-500/20 text-red-500 mb-4">
                  <Settings size={32} />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">Simulasi Realita Slot</h1>
              <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-bold">Atur Parameter Matematika</p>
           </div>

           <SettingsPanel config={config} setConfig={setConfig} probSum={probSum} isFullPage />

           <div className="mt-8">
              <button 
                onClick={handleStartGame}
                disabled={probSum !== 100}
                className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-20 text-white font-black py-5 rounded-[1.5rem] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 text-lg group"
              >
                ENTER SIMULATOR
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white p-2 md:p-6 font-sans relative overflow-x-hidden custom-scrollbar">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-500/5 blur-[150px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-6 min-h-[calc(100vh-4rem)]">
        {/* --- Top Bar: Compact --- */}
        <div className="flex items-center justify-between bg-black/60 backdrop-blur-md border border-white/5 px-4 py-3 rounded-2xl shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                <Activity className="text-red-500" size={20} />
             </div>
             <div className="hidden sm:block">
                <h1 className="text-lg font-black uppercase tracking-tighter leading-none">Reality Slot</h1>
                <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest leading-none">Math Engine</span>
             </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
             <div className="flex flex-col items-end">
                <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Saldo</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tracking-tighter leading-none">{formatIDR(currentBalance)}</span>
             </div>
             <button 
                onClick={() => {
                  setForceShowOnboarding(true);
                  setIsOnboardingOpen(true);
                }}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95 flex items-center gap-2 group"
                title="Info Simulator"
              >
                <HelpCircle size={18} className="text-red-500" />
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Info Simulator</span>
             </button>
             <button 
                onClick={() => setIsSettingsOpenInGame(true)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95"
              >
                <Settings size={18} />
             </button>
          </div>
        </div>

        {/* --- Main Game Area: Single Viewport Optimization --- */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center lg:items-start lg:pt-4">
            {/* Grid Container */}
            <div className="relative group shrink-0">
                <div className="absolute -inset-4 bg-gradient-to-b from-red-500/5 via-transparent to-red-500/5 rounded-[2rem] blur-2xl opacity-50" />
                <div className="relative bg-black/60 backdrop-blur-3xl border-2 border-white/5 p-3 sm:p-4 rounded-[2.5rem] shadow-2xl ring-1 ring-white/5 grid grid-cols-6 gap-2 sm:gap-2.5">
                    {currentGrid.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-2 sm:gap-2.5">
                            {col.map((symbol, rowIdx) => (
                                <div 
                                    key={`${colIdx}-${rowIdx}`}
                                    className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/5 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden border transition-all duration-300 relative group/symbol ${isSpinning ? "blur-[1px] brightness-75 scale-95 border-white/5" : winningSymbols.includes(symbol) ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105 z-10 brightness-110 ring-2 ring-emerald-500/50" : "hover:scale-105 hover:border-red-500/20 border-white/5"}`}
                                >
                                    <img 
                                        src={SYMBOLS[symbol].src} 
                                        alt={symbol}
                                        className={`w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ${isSpinning ? "translate-y-full" : "translate-y-0"}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Win Display: Positioned Below the Grid to stay completely clear of symbols */}
                {lastWinAmount > 0 && !isSpinning && (
                    <div className="mt-4 w-full animate-in slide-in-from-top-2 duration-500 z-[60]">
                        <div className="bg-emerald-500/10 border-2 border-emerald-500/40 backdrop-blur-2xl p-4 sm:p-5 rounded-[2.5rem] shadow-[0_10px_40px_rgba(16,185,129,0.2)] flex items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {winningSymbols.map((sym, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-black/60 px-3 py-2 rounded-xl border border-white/5 ring-1 ring-emerald-500/20">
                                        <img 
                                            src={SYMBOLS[sym].src} 
                                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                                            alt="Winner"
                                        />
                                        <div className="text-left hidden xs:block">
                                            <div className="text-[7px] text-emerald-400 font-bold uppercase tracking-widest">Win</div>
                                            <div className="text-[10px] font-black text-white uppercase truncate max-w-[60px]">{SYMBOLS[sym].name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-end text-right pr-2">
                                <div className="text-[8px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-0.5">Total Win</div>
                                <div className="text-xl sm:text-3xl font-black font-mono tracking-tighter text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                                    {formatIDR(lastWinAmount)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls Area: Compact Side-by-Side */}
            <div className="w-full max-w-[400px] lg:w-80 flex flex-col gap-4 shrink-0 pb-8 lg:pb-0">
                {/* Bet Box */}
                <div className="bg-black/40 backdrop-blur-md border border-white/5 p-4 sm:p-6 rounded-[2rem] space-y-3">
                    <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] px-1">Taruhan / Bet</div>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-mono text-sm sm:text-base">Rp</span>
                       <input 
                          type="text"
                          inputMode="numeric"
                          value={config.betAmount === 0 ? "" : config.betAmount.toLocaleString("id-ID")}
                          onChange={(e) => {
                             const rawValue = e.target.value.replace(/\D/g, "");
                             const numValue = Math.min(parseInt(rawValue) || 0, MAX_BET);
                             setConfig({...config, betAmount: numValue});
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 sm:py-4 text-lg sm:text-xl font-mono font-bold text-white focus:outline-none focus:border-red-500 transition-all"
                       />
                    </div>
                </div>

                {/* Spin & Auto-Spin controls */}
                <div className="space-y-3">
                    {isAutoSpinActive ? (
                        <button 
                            onClick={() => {
                                setIsAutoSpinActive(false);
                                setAutoSpinRemaining(0);
                            }}
                            className="w-full h-20 bg-amber-500 hover:bg-amber-400 rounded-[2rem] shadow-xl transition-all active:scale-95 flex flex-col items-center justify-center text-black font-black uppercase tracking-widest"
                        >
                            <X size={24} className="mb-1" />
                            <span className="text-[10px]">Berhenti Auto ({autoSpinRemaining})</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleSpin()}
                            disabled={isSpinning || currentBalance < config.betAmount}
                            className="w-full h-20 sm:h-24 bg-red-600 hover:bg-red-500 disabled:bg-white/5 disabled:text-white/10 rounded-[2rem] shadow-2xl transition-all active:scale-95 flex flex-col items-center justify-center group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            {isSpinning ? (
                                <RefreshCcw className="animate-spin text-white" size={28} />
                            ) : (
                                <>
                                    <Play fill="white" size={28} className="mb-1" />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Putar Spin</span>
                                </>
                            )}
                        </button>
                    )}

                    {!isAutoSpinActive && !isSpinning && (
                        <div className="grid grid-cols-3 gap-2">
                            {[10, 25, 100].map(count => (
                                <button
                                    key={count}
                                    onClick={() => {
                                        if (currentBalance >= config.betAmount) {
                                            setAutoSpinRemaining(count);
                                            setIsAutoSpinActive(true);
                                        }
                                    }}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 text-[10px] font-black text-white/50 hover:text-white transition-all"
                                >
                                    AUTO {count}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Session Stats */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">Session Stats</div>
                        <div className="text-[10px] text-white/50 font-mono">{sessionStats.totalSpins} SPINS</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="text-[8px] text-white/20 font-bold uppercase">Total Wagered</div>
                            <div className="text-xs font-mono font-bold text-white/70">{formatIDR(sessionStats.totalWagered)}</div>
                        </div>
                        <div className="space-y-1 text-right">
                            <div className="text-[8px] text-white/20 font-bold uppercase">Total Return</div>
                            <div className="text-xs font-mono font-bold text-emerald-400">{formatIDR(sessionStats.totalWon)}</div>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="text-[8px] text-white/20 font-bold uppercase">Actual RTP</div>
                            <div className={`text-sm font-black font-mono ${sessionRTP > 100 ? "text-emerald-400" : "text-amber-500"}`}>
                                {sessionRTP.toFixed(1)}%
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="text-[8px] text-white/20 font-bold uppercase">Net P/L</div>
                            <div className={`text-sm font-black font-mono ${sessionStats.totalWon >= sessionStats.totalWagered ? "text-emerald-400" : "text-red-500"}`}>
                                {sessionStats.totalWon >= sessionStats.totalWagered ? "+" : ""}{formatIDR(sessionStats.totalWon - sessionStats.totalWagered)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rules Box: Integrated */}
                <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-[2rem] space-y-3">
                    <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest px-1">
                        <Info size={14} /> Math Reality & Rules
                    </div>
                    <div className="space-y-2">
                        <p className="text-[9px] sm:text-[10px] text-white/40 leading-relaxed font-medium">
                            • Minimal <span className="text-white font-bold">8 simbol</span> sama untuk menang.
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-white/40 leading-relaxed font-medium italic">
                            • RTP: <span className="text-white font-bold">{config.rtp}%</span>. Hasil matematika murni.
                        </p>
                    </div>
                </div>

                {/* Educational Center */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-[10px] text-white/30 font-black uppercase tracking-widest px-1">Cara Menggunakan</h3>
                        <div className="space-y-2">
                            {[
                                "Atur RTP & amati peluang",
                                "Jalankan simulasi spin",
                                "Lihat pola kemenangan acak",
                                "Sadari realita kerugian"
                            ].map((text, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                    <span className="text-[9px] font-mono text-red-500 bg-red-500/10 w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-red-500/10">{i+1}</span>
                                    <p className="text-[10px] text-white/50">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-3">
                        <h3 className="text-[10px] text-white/30 font-black uppercase tracking-widest px-1">Manfaat Simulator</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                "Pahami desain sistem slot",
                                "Sadar risiko permainan",
                                "Perspektif realistis menang"
                            ].map((text, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                    <p className="text-[10px] text-white/50">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- In-Game Settings Overlay --- */}
        {isSettingsOpenInGame && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
             <div className="bg-[#15151a] border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col">
                <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Settings size={20} className="text-red-500" />
                        <h2 className="text-lg font-black uppercase tracking-tighter text-white">Adjust Math</h2>
                     </div>
                     <button onClick={() => setIsSettingsOpenInGame(false)} className="text-white/30 hover:text-white p-2">
                        <X size={28} />
                     </button>
                </div>
                <div className="p-6 sm:p-8">
                    <SettingsPanel config={config} setConfig={setConfig} probSum={probSum} />
                    <button 
                        onClick={() => setIsSettingsOpenInGame(false)}
                        disabled={probSum !== 100}
                        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-20 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl mt-8 transition-all text-sm uppercase tracking-widest shadow-xl shadow-red-500/20"
                    >
                        {probSum === 100 ? "Apply Changes" : `Total must be 100% (Current: ${probSum}%)`}
                    </button>
                </div>
             </div>
          </div>
        )}

        <SlotOnboardingModal 
            onClose={() => {
                setIsOnboardingOpen(false);
                setForceShowOnboarding(false);
            }} 
            forceShow={forceShowOnboarding}
        />
      </div>

      <style jsx global>{`
        @media (max-width: 400px) {
            .xs\:w-14 { width: 3.5rem; }
            .xs\:h-14 { height: 3.5rem; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
