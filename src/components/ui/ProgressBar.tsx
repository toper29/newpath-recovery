"use client";

interface ProgressBarProps {
    progress: number; // 0 to 100
    label?: string;
    className?: string;
    colorClass?: string;
}

export default function ProgressBar({
    progress,
    label,
    className = "",
    colorClass = "bg-accent"
}: ProgressBarProps) {

    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground/80">{label}</span>
                    <span className="text-sm font-bold text-accent">{clampedProgress}%</span>
                </div>
            )}
            <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
        </div>
    );
}
