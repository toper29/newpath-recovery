import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface UserData {
    xp: number;
    level: number;
    username: string;
    title: string;
    email: string;
    phone: string | null;
    streak: number;
    longestStreak: number;
    membership_status: string;
    isPremium: boolean;
    hasCheckedInToday: boolean;
    cleanDays: number;
    completedChallengeDays: number[];
    canDoNextTask: boolean;
    educationCount: number;
    journalCount: number;
}

export function useUser() {
    const { data, error, mutate, isValidating } = useSWR<{ success: boolean; data: UserData }>(
        '/api/user/me',
        fetcher,
        {
            revalidateOnFocus: false, // Don't re-fetch when user switches tabs
            dedupingInterval: 60000, // Dedup requests within 1 minute
            shouldRetryOnError: false,
        }
    );

    return {
        user: data?.success ? data.data : null,
        isLoading: !error && !data,
        isError: error || (data && !data.success),
        isValidating,
        mutate, // Useful for manual refreshes after actions (like check-in)
    };
}
