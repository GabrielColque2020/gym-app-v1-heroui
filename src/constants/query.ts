import type { Query, QueryKey } from "@tanstack/react-query";

const QUERY_TIME_BASE = 60 * 60 * 1000;

export const QUERY_PERSIST_STORAGE_KEY = "react-query-cache";
export const QUERY_PERSIST_MAX_AGE_MS = 24 * 60 * 60 * 1000;
export const QUERY_PERSIST_BUSTER = "v1";
export const QUERY_NON_PERSISTED_KEY_PREFIXES = [
	"admin-exercise-variants",
] as const;

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

function getQueryKeyPrefix( queryKey: QueryKey ) {
	const firstSegment = queryKey[ 0 ];

	return typeof firstSegment === "string" ? firstSegment : null;
}

export function shouldPersistQueryKey( queryKey: QueryKey ) {
	const prefix = getQueryKeyPrefix( queryKey );

	return prefix !== null && !QUERY_NON_PERSISTED_KEY_PREFIXES.includes(
		prefix as (typeof QUERY_NON_PERSISTED_KEY_PREFIXES)[ number ],
	);
}

export function shouldPersistQuery( query: Query ) {
	return query.state.status === "success" && shouldPersistQueryKey( query.queryKey );
}

export function clearPersistedQueryCache() {
	if (typeof window === "undefined") return;

	window.localStorage.removeItem( QUERY_PERSIST_STORAGE_KEY );
}
