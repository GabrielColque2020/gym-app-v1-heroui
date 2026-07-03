import type { Query, QueryKey } from "@tanstack/react-query";

const QUERY_TIME_BASE = 60 * 60 * 1000; // 1 hora
const QUERY_ACCELERATE_TTL = {
	catalog: 5 * 60, // 5 minutos
	standard: 60, // 60 segundos
	short: 15, // 15 segundos
} as const;

export const QUERY_PERSIST_STORAGE_KEY = "react-query-cache";
export const QUERY_PERSIST_MAX_AGE_MS = 4 * 60 * 60 * 1000; // 4 horas
export const QUERY_PERSIST_BUSTER = "v1";
export const QUERY_NON_PERSISTED_KEY_PREFIXES = [
	"coach-exercise-variants",
] as const;

export const QUERY_VOLATILE_DEFAULTS = {
	staleTime: 0,
	refetchOnWindowFocus: true,
} as const;

export const QUERY_ACCELERATE_CACHE = {
	catalog: {
		// 5 minutos de cache fresca, 1 minuto de stale-while-revalidate.
		swr: 60,
		ttl: QUERY_ACCELERATE_TTL.catalog,
	},
	short: {
		// 15 segundos de cache fresca y 15 segundos de stale-while-revalidate.
		swr: QUERY_ACCELERATE_TTL.short,
		ttl: QUERY_ACCELERATE_TTL.short,
	},
	standard: {
		// 60 segundos de cache fresca, 30 segundos de stale-while-revalidate.
		swr: 30,
		ttl: QUERY_ACCELERATE_TTL.standard,
	},
} as const;

export const QUERY_DEFAULTS = {
	coach: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		// 1 hora de datos estables en React Query.
		staleTime: QUERY_TIME_BASE,
		// 2 horas entre refetch automaticos.
		refetchInterval: 2 * 60 * 60 * 1000, // 2 hora
		retry: 2,
	},
	student: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		// 1 hora de datos estables en React Query.
		staleTime: QUERY_TIME_BASE,
		// 2 horas entre refetch automaticos.
		refetchInterval: 2 * 60 * 60 * 1000, // 2 hora
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
		prefix as ( typeof QUERY_NON_PERSISTED_KEY_PREFIXES )[ number ],
	);
}

export function shouldPersistQuery( query: Query ) {
	return query.state.status === "success" && shouldPersistQueryKey( query.queryKey );
}

export function clearPersistedQueryCache() {
	if (typeof window === "undefined") return;

	window.localStorage.removeItem( QUERY_PERSIST_STORAGE_KEY );
}
