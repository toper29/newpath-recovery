import { prisma } from "./db";

export type RelapseRiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RelapseDetectionResult {
    riskLevel: RelapseRiskLevel;
    reasons: string[];
    suggestedActions: {
        label: string;
        link: string;
    }[];
}

export async function detectRelapseRisk(userId: string): Promise<RelapseDetectionResult | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                dailyCheckIns: {
                    orderBy: { checkedAt: "desc" },
                    take: 7
                }
            }
        });

        if (!user) return null;

        const reasons: string[] = [];
        let riskScore = 0;

        // 1. Check inactivity
        const lastActivityDate = user.lastActivity 
            ? new Date() // Simplified: if we have lastActivity, it was recorded recently
            : user.updatedAt;

        const daysSinceActivity = Math.floor((new Date().getTime() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceActivity >= 3) {
            riskScore += 2;
            reasons.push("Sudah beberapa hari kamu tidak aktif di platform.");
        }

        // 2. Check moods/risk scores from check-ins
        const checkIns = user.dailyCheckIns;
        const recentHighRisk = checkIns.filter(ci => (ci.riskScore || 0) > 0.5).length;
        
        if (recentHighRisk >= 2) {
            riskScore += 3;
            reasons.push("Kami melihat beberapa laporan harianmu menunjukkan keinginan untuk berjudi.");
        }

        // 3. Check if streak was recently broken
        if (user.streak === 0 && user.longestStreak > 5) {
            // Check if it was broken today or yesterday
            const lastCheckIn = checkIns[0];
            if (lastCheckIn && lastCheckIn.didGamble && (new Date().getTime() - new Date(lastCheckIn.checkedAt).getTime()) < (1000 * 60 * 60 * 48)) {
                riskScore += 4;
                reasons.push("Semangat! Kekalahan sementara bukan akhir dari perjalananmu.");
            }
        }

        // Determine level
        let riskLevel: RelapseRiskLevel = "LOW";
        if (riskScore >= 6) riskLevel = "HIGH";
        else if (riskScore >= 3) riskLevel = "MEDIUM";

        if (riskLevel === "LOW" && reasons.length === 0) return null;

        const actions = [
            { label: "Latihan Kognitif", link: "/dashboard/pelatihan" },
            { label: "Tulis Jurnal", link: "/dashboard/jurnal" },
            { label: "Daily Challenge", link: "/dashboard/tantangan" }
        ];

        return {
            riskLevel,
            reasons,
            suggestedActions: actions
        };
    } catch (error) {
        console.error("Relapse Detection Error:", error);
        return null;
    }
}
