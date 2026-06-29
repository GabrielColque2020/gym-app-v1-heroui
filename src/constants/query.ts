const QUERY_TIME_BASE = 60 * 60 * 1000;

export const QUERY_VOLATILE_DEFAULTS = {
	staleTime: 0,
	refetchOnWindowFocus: true,
} as const;

export const QUERY_DEFAULTS = {
	admin: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		staleTime: QUERY_TIME_BASE,
		refetchInterval: 45 * 60 * 1000,
		retry: 2,
	},
	student: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		staleTime: QUERY_TIME_BASE,
		refetchInterval: 45 * 60 * 1000,
		retry: 2,
	},
} as const;
