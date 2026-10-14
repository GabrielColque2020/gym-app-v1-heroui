import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { claimPersistedQueryCache, clearPersistedQueryCache, QUERY_PERSIST_STORAGE_KEY } from "@/constants/query";

// Un localStorage en memoria: los tests corren en Node.
function createStorage() {
	const items = new Map<string, string>();

	return {
		getItem: ( key: string ) => items.get( key ) ?? null,
		removeItem: ( key: string ) => void items.delete( key ),
		setItem: ( key: string, value: string ) => void items.set( key, value ),
	};
}

let storage: ReturnType<typeof createStorage>;

beforeEach( () => {
	storage = createStorage();
	vi.stubGlobal( "window", { localStorage: storage } );
} );

afterEach( () => {
	vi.unstubAllGlobals();
} );

describe( "dueño de la copia de los datos", () => {
	it( "si entra otra cuenta, se borra la copia de la anterior", () => {
		claimPersistedQueryCache( "coach-a", { clearIfUnknown: true } );
		storage.setItem( QUERY_PERSIST_STORAGE_KEY, "datos de coach-a" );

		expect( claimPersistedQueryCache( "coach-b", { clearIfUnknown: true } ) ).toBe( true );
		expect( storage.getItem( QUERY_PERSIST_STORAGE_KEY ) ).toBeNull();
	} );

	it( "si vuelve a entrar la misma cuenta, la copia se conserva", () => {
		claimPersistedQueryCache( "coach-a", { clearIfUnknown: true } );
		storage.setItem( QUERY_PERSIST_STORAGE_KEY, "datos de coach-a" );

		expect( claimPersistedQueryCache( "coach-a", { clearIfUnknown: true } ) ).toBe( false );
		expect( storage.getItem( QUERY_PERSIST_STORAGE_KEY ) ).toBe( "datos de coach-a" );
	} );

	it( "una copia sin dueño se borra al ingresar, y se adopta con la sesion abierta", () => {
		storage.setItem( QUERY_PERSIST_STORAGE_KEY, "copia vieja" );
		expect( claimPersistedQueryCache( "coach-a", { clearIfUnknown: false } ) ).toBe( false );
		expect( storage.getItem( QUERY_PERSIST_STORAGE_KEY ) ).toBe( "copia vieja" );

		clearPersistedQueryCache();
		storage.setItem( QUERY_PERSIST_STORAGE_KEY, "copia vieja" );
		expect( claimPersistedQueryCache( "coach-a", { clearIfUnknown: true } ) ).toBe( true );
		expect( storage.getItem( QUERY_PERSIST_STORAGE_KEY ) ).toBeNull();
	} );

	it( "cerrar sesion borra la copia y el dueño", () => {
		claimPersistedQueryCache( "coach-a", { clearIfUnknown: true } );
		storage.setItem( QUERY_PERSIST_STORAGE_KEY, "datos" );
		clearPersistedQueryCache();

		expect( storage.getItem( QUERY_PERSIST_STORAGE_KEY ) ).toBeNull();
		// Sin dueño: la proxima cuenta que ingrese no hereda nada.
		expect( claimPersistedQueryCache( "coach-b", { clearIfUnknown: true } ) ).toBe( true );
	} );
} );
