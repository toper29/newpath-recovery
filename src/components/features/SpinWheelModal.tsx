"use client";

import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

interface SpinWheelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DEFAULT_ITEMS = [
    { label: "Bukan hari keberuntunganmu", isDeposit: false, weight: 17 },
    { label: "Simpan uangmu hari ini", isDeposit: false, weight: 17 },
    { label: "Coba lagi besok", isDeposit: false, weight: 17 },
    { label: "Uangmu lebih berharga", isDeposit: false, weight: 17 },
    { label: "Slot menang, kamu kalah", isDeposit: false, weight: 17 },
    { label: "Silakan deposit", isDeposit: true, weight: 15 }, 
];

// Calculate sectors for CSS
// We have 6 items, so 360 / 6 = 60 degrees each.
// Wait, the visual wheel has equal slices, but the stop probability is heavily skewed to the first 5.
// We can visually make slices equal (60deg each), but randomly select the target based on weights, 
// and then rotate the wheel to land exactly on that slice.

export default function SpinWheelModal({ isOpen, onClose }: SpinWheelModalProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<typeof DEFAULT_ITEMS[0] | null>(null);
    const [items, setItems] = useState(DEFAULT_ITEMS);

    useEffect(() => {
        if (isOpen) {
            fetch("/api/admin/settings?keys=wheel_safe_prob,wheel_fail_prob")
                .then(res => res.json())
                .then(json => {
                    if (json.success && json.data) {
                        const safeProb = json.data.wheel_safe_prob !== undefined ? Number(json.data.wheel_safe_prob) : 85;
                        const failProb = json.data.wheel_fail_prob !== undefined ? Number(json.data.wheel_fail_prob) : 15;
                        
                        setItems(prev => prev.map(item => ({
                            ...item,
                            weight: item.isDeposit ? failProb : (safeProb / 5)
                        })));
                    }
                })
                .catch(err => console.error("Failed to fetch wheel settings", err));
        }
    }, [isOpen]);

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setResult(null);

        // Weighted random selection
        const totalWeight = items.reduce((acc, item) => acc + item.weight, 0); // ~100
        let randomVal = Math.random() * totalWeight;

        let selectedIdx = 0;
        for (let i = 0; i < items.length; i++) {
            if (randomVal <= items[i].weight) {
                selectedIdx = i;
                break;
            }
            randomVal -= items[i].weight;
        }

        // Each slice is 60 deg. 
        // To land on selectedIdx, the top of the wheel (arrow position) should be within the slice.
        // Let's assume slice 0 is 0-60deg, slice 1 is 60-120deg etc.
        // If the arrow is fixed at top (0 deg/360 deg), we need to rotate backwards by the slice angle + random offset.
        // Wait, CSS rotate(Xdeg) rotates clockwise.
        // Slice angles around the center:
        // Item 0: center at 30 deg
        // Item 1: center at 90 deg
        // Item 2: center at 150 deg
        // Item 3: center at 210 deg
        // Item 4: center at 270 deg
        // Item 5: center at 330 deg

        // If wheel is rotated by -30deg, Item 0 is at top. (Arrow at top)
        // To land on selectedIdx, rotation needed is `360 - (selectedIdx * 60 + 30)` 
        // Plus add extra spins (e.g. 5 full rotations = 1800 deg).
        const extraSpins = 360 * 5;
        const targetBaseRotation = 360 - (selectedIdx * 60 + 30);
        // Add randomness within the slice (-20 to +20 deg)
        const randomOffset = (Math.random() - 0.5) * 40;

        const finalRotation = rotation + extraSpins + targetBaseRotation + randomOffset - (rotation % 360);

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setResult(items[selectedIdx]);
        }, 5000); // 5s spin duration
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Emergency Anti-Deposit">
            <div className="flex flex-col items-center">
                <p className="text-sm text-foreground/70 mb-6 text-center">
                    Anda yakin ingin deposit? Putar roda ini lebih dulu.
                </p>

                {/* Wheel Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-full shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                    {/* Arrow */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-accent z-20 drop-shadow-md" />

                    <div
                        className="w-full h-full rounded-full overflow-hidden border-4 border-primary/40 relative transition-transform ease-out"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transitionDuration: isSpinning ? "5s" : "0s",
                            background: `conic-gradient(
                #134e4a 0deg 60deg, 
                #115e59 60deg 120deg, 
                #0f766e 120deg 180deg, 
                #0d9488 180deg 240deg, 
                #14b8a6 240deg 300deg, 
                #ef4444 300deg 360deg
              )`
                        }}
                    >
                        {/* Labels placed inside wheel slices */}
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="absolute w-[50%] h-[50%] left-[25%] top-0 origin-bottom flex justify-center pt-6 md:pt-10"
                                style={{ transform: `rotate(${idx * 60 + 30}deg)` }}
                            >
                                <span className="text-[10px] md:text-xs font-bold w-[70px] md:w-[90px] text-center leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full border-4 border-primary/40 z-10 shadow-inner flex items-center justify-center">
                        <span className="w-4 h-4 rounded-full bg-accent/50" />
                    </div>
                </div>

                {/* Result & Actions */}
                <div className="h-24 flex flex-col items-center justify-center w-full">
                    {result ? (
                        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300 flex flex-col items-center">
                            <h3 className={`text-xl font-bold mb-2 text-center ${result.isDeposit ? "text-red-500" : "text-accent"}`}>
                                {result.label}
                            </h3>
                            <div className="mt-4 flex gap-3">
                                {result.isDeposit ? (
                                    <button
                                        onClick={onClose}
                                        className="text-sm px-6 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        Lanjut Deposit
                                    </button>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="text-sm px-6 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                                    >
                                        Tutup & Simpan Uang
                                    </button>
                                )}
                                <button
                                    onClick={() => setResult(null)}
                                    className="text-sm px-6 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg transition-colors border border-white/10"
                                >
                                    Putar Lagi
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={spinWheel}
                            disabled={isSpinning}
                            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${isSpinning
                                ? "bg-primary/50 text-foreground/50 cursor-not-allowed"
                                : "bg-accent text-background hover:bg-accent/90 hover:scale-105 shadow-accent/20"
                                }`}
                        >
                            {isSpinning ? "Memutar..." : "Putar Spin"}
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
