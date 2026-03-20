export interface UserMembership {
    membership_status: string;
    isPremium: boolean;
    premium_start_date?: string | Date;
    premium_expiry_date?: string | Date;
    admin_override: boolean;
}

/**
 * Checks if a user has premium access.
 * Logic: Either membership_status is PREMIUM or admin_override is true.
 */
export function checkPremiumAccess(user: UserMembership | null | undefined): boolean {
    if (!user) return false;
    return user.membership_status?.toLowerCase() === "premium" || user.admin_override === true;
}

/**
 * Message to show when a feature is locked.
 */
export const PREMIUM_LOCK_MESSAGE = "Fitur ini tersedia untuk member premium yang telah mendukung pengembangan platform.";
