"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const LIST_QUERY_STORAGE_PREFIX = "gym-app-list-query:";

// Se guarda la busqueda de cada lista para que "Volver" la recupere: el
// recorrido tipico es filtrar, abrir un estudiante y volver, y al volver se
// perdia todo.
function rememberListQuery( pathname: string, search: string ) {
	try {
		window.sessionStorage.setItem( `${ LIST_QUERY_STORAGE_PREFIX }${ pathname }`, search );
	} catch {
		// Sin almacenamiento se vuelve a la lista sin filtros, como antes.
	}
}

// `href` con la ultima busqueda que tuvo esa lista en esta pestaña, si tuvo.
export function withRememberedListQuery( href: string ) {
	if (href.includes( "?" )) return href;

	try {
		const search = window.sessionStorage.getItem( `${ LIST_QUERY_STORAGE_PREFIX }${ href }` );

		return search ? `${ href }${ search }` : href;
	} catch {
		return href;
	}
}

type UrlStateOptions<T> = {
	// De lo que dice la URL al valor; `null` si no se entiende (vale el de fabrica).
	parse?: ( raw: string ) => T | null;
	serialize?: ( value: T ) => string;
};

// Un filtro (o la pagina) de una lista que vive en la URL: sobrevive a abrir un
// elemento y volver, a recargar y a compartir el enlace. Se escribe con
// `replaceState`, que Next acompaña sin volver a pedir la pantalla al servidor:
// tipear en el buscador no hace un pedido por letra.
export function useUrlState<T extends string | number | boolean>(
	key: string,
	defaultValue: T,
	{ parse, serialize }: UrlStateOptions<T> = {},
) {
	const searchParams = useSearchParams();
	const raw = searchParams.get( key );
	const parsed = raw === null ? null : parse ? parse( raw ) : ( raw as T );
	const value = parsed ?? defaultValue;

	useEffect( () => {
		rememberListQuery( window.location.pathname, window.location.search );
	}, [ raw ] );

	const setValue = useCallback( ( nextValue: T ) => {
		const params = new URLSearchParams( window.location.search );
		const serialized = serialize ? serialize( nextValue ) : String( nextValue );

		// El valor de fabrica no se escribe: la URL queda limpia sin filtros.
		if (nextValue === defaultValue || serialized === "") {
			params.delete( key );
		} else {
			params.set( key, serialized );
		}

		const query = params.toString();
		const search = query ? `?${ query }` : "";

		// Con `null` como estado: asi Next se entera y actualiza `useSearchParams`. Con
		// el estado que ya tenia la historia, la URL cambiaba y la lista no.
		window.history.replaceState( null, "", `${ window.location.pathname }${ search }` );
		rememberListQuery( window.location.pathname, search );
	}, [ defaultValue, key, serialize ] );

	return [ value, setValue ] as const;
}

// La pagina de una lista: un numero de 1 en adelante.
export function useUrlPage( key = "pagina" ) {
	return useUrlState<number>( key, 1, {
		parse: ( raw ) => {
			const page = Number( raw );

			return Number.isInteger( page ) && page > 0 ? page : null;
		},
	} );
}

// Un filtro que solo puede tomar ciertos valores: uno que no esta en la lista
// (un enlace viejo, uno escrito a mano) vuelve al de fabrica.
export function useUrlEnum<T extends string>( key: string, defaultValue: T, allowed: readonly T[] ) {
	return useUrlState<T>( key, defaultValue, {
		parse: ( raw ) => ( allowed.includes( raw as T ) ? raw as T : null ),
	} );
}

// Un interruptor (solo repetidos, solo sin entrenador): en la URL es "1".
export function useUrlFlag( key: string ) {
	return useUrlState<boolean>( key, false, {
		parse: ( raw ) => raw === "1",
		serialize: ( value ) => ( value ? "1" : "" ),
	} );
}

// Texto libre, como lo escrito en un buscador.
export function useUrlText( key: string ) {
	return useUrlState<string>( key, "" );
}
