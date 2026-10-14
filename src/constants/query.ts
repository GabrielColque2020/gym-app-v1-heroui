import type { Query, QueryKey } from "@tanstack/react-query";

const QUERY_TIME_BASE = 60 * 60 * 1000; // 1 hora
const QUERY_ACCELERATE_TTL = {
	catalog: 5 * 60, // 5 minutos
	standard: 60, // 60 segundos
	short: 15, // 15 segundos
} as const;

export const QUERY_PERSIST_STORAGE_KEY = "react-query-cache";
export const QUERY_PERSIST_MAX_AGE_MS = 4 * 60 * 60 * 1000; // 4 horas
// Subirlo descarta la cache guardada en el navegador: hace falta cuando cambia
// la forma de lo que devuelven las consultas.
export const QUERY_PERSIST_BUSTER = "v2";
export const QUERY_NON_PERSISTED_KEY_PREFIXES = [
	"coach-exercise-variants",
	"coach-exercise-delete-impact",
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
	admin: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		// Al volver la señal se piden de nuevo solo las que estan viejas o fallaron:
		// con datos de menos de una hora no cambia nada.
		refetchOnReconnect: true,
		refetchOnWindowFocus: false,
		// 1 hora de datos estables en React Query.
		staleTime: QUERY_TIME_BASE,
		// 2 horas entre refetch automaticos.
		refetchInterval: 2 * 60 * 60 * 1000, // 2 hora
		retry: 2,
	},
	coach: {
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchOnMount: false,
		// Al volver la señal se piden de nuevo solo las que estan viejas o fallaron:
		// con datos de menos de una hora no cambia nada.
		refetchOnReconnect: true,
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
		// Al volver la señal se piden de nuevo solo las que estan viejas o fallaron:
		// con datos de menos de una hora no cambia nada.
		refetchOnReconnect: true,
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

// De quien es la copia de los datos guardada en el navegador.
const QUERY_CACHE_OWNER_STORAGE_KEY = "gym-app-query-cache-owner";

export function clearPersistedQueryCache() {
	if (typeof window === "undefined") return;

	try {
		window.localStorage.removeItem( QUERY_PERSIST_STORAGE_KEY );
		window.localStorage.removeItem( QUERY_CACHE_OWNER_STORAGE_KEY );
	} catch {
		// Sin almacenamiento no hay copia que borrar.
	}
}

// La copia guardada en el navegador queda a nombre de `userId`. Si era de otra
// cuenta, se borra y devuelve true.
//
// Sin esto, una sesion que vencia con la app cerrada (no pasa por "Cerrar
// sesión") dejaba la copia de esa cuenta, y la siguiente que entraba en ese
// navegador veia sus estudiantes o su rutina: la copia se restaura al abrir y,
// como es reciente, ni siquiera se volvia a pedir.
//
// `clearIfUnknown`: si no hay dueño anotado (copias de antes de que esto
// existiera), al ingresar con la contraseña se borra por las dudas; con la
// sesion ya abierta se asume que es de quien esta adentro.
export function claimPersistedQueryCache( userId: string, { clearIfUnknown }: { clearIfUnknown: boolean } ) {
	if (typeof window === "undefined") return false;

	try {
		const owner = window.localStorage.getItem( QUERY_CACHE_OWNER_STORAGE_KEY );
		const isForeign = owner ? owner !== userId : clearIfUnknown;

		if (isForeign) clearPersistedQueryCache();

		window.localStorage.setItem( QUERY_CACHE_OWNER_STORAGE_KEY, userId );

		return isForeign;
	} catch {
		return false;
	}
}
