import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAchievements() {
    const { data, error, mutate, isValidating } = useSWR<{ success: boolean; data: any[] }>(
        '/api/user/achievements',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 300000, // 5 minutes
        }
    );

    return {
        achievements: data?.success ? data.data : [],
        isLoading: !error && !data,
        isError: error,
        isValidating,
        mutate,
    };
}
