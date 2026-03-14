"use client";

import RecoveryOverview from "@/components/features/RecoveryOverview";
import RecentAchievements from "@/components/features/RecentAchievements";
import RecoveryChallenge14 from "@/components/features/RecoveryChallenge14";

export default function UserDashboard() {
    return (
        <div className="space-y-8">
            <RecoveryOverview />
            <RecentAchievements />
            <RecoveryChallenge14 />
        </div>
    );
}
