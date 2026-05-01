import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface ProgressData {
    currentDay: number;
    isCompleted: boolean;
    completedCount: number;
    completionRate: number;
    avgRisk: number;
    streak: number;
    checkInHistory: any[];
}

export function useProgress() {
    const { data, error, mutate, isValidating } = useSWR<{ success: boolean; data: ProgressData }>(
        '/api/user/progress',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );

    return {
        progress: data?.success ? data.data : null,
        isLoading: !error && !data,
        isError: error,
        isValidating,
        mutate,
    };
}
