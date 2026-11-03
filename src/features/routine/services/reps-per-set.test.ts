import { describe, expect, it } from "vitest";

import {
	formatSetBlocksSummary,
	getSetTargetReps,
	parseSetBlocks,
	serializeSetBlocks,
} from "@/features/routine/services/reps-per-set";

describe( "repeticiones por serie", () => {
	it( "sin barra, todas las series piden lo mismo", () => {
		expect( [ 1, 2, 3 ].map( ( set ) => getSetTargetReps( "8-10", set ) ) ).toEqual( [ "8-10", "8-10", "8-10" ] );
		expect( getSetTargetReps( "al fallo", 2 ) ).toBe( "al fallo" );
	} );

	it( "top set + back-off: cada serie toma su valor", () => {
		expect( [ 1, 2, 3 ].map( ( set ) => getSetTargetReps( "5 / 6 / 6", set ) ) ).toEqual( [ "5", "6", "6" ] );
	} );

	it( "con menos valores que series, la última se repite", () => {
		expect( [ 1, 2, 3 ].map( ( set ) => getSetTargetReps( "5/6", set ) ) ).toEqual( [ "5", "6", "6" ] );
	} );

	it( "ignora barras de más y vacíos", () => {
		expect( getSetTargetReps( " / 12 /", 1 ) ).toBe( "12" );
		expect( getSetTargetReps( "", 1 ) ).toBe( "" );
		expect( getSetTargetReps( null, 1 ) ).toBe( "" );
	} );
} );

describe( "bloques de series", () => {
	it( "arma los bloques de lo guardado", () => {
		expect( parseSetBlocks( "3", "5 / 6 / 6" ) ).toEqual( [ { reps: "5", sets: "1" }, { reps: "6", sets: "2" } ] );
		expect( parseSetBlocks( "3", "5 / 6" ) ).toEqual( [ { reps: "5", sets: "1" }, { reps: "6", sets: "2" } ] );
		expect( parseSetBlocks( "3", "10" ) ).toBeNull();
	} );

	it( "guarda los bloques en series y repeticiones", () => {
		expect( serializeSetBlocks( [ { reps: "5", sets: "1" }, { reps: "6", sets: "2" } ] ) ).toEqual( { reps: "5 / 6 / 6", sets: "3" } );
		expect( serializeSetBlocks( [ { reps: "8-10", sets: "1" }, { reps: "8-10", sets: "2" } ] ) ).toEqual( { reps: "8-10", sets: "3" } );
	} );

	it( "un bloque sin completar deja todo vacío", () => {
		expect( serializeSetBlocks( [ { reps: "5", sets: "1" }, { reps: "", sets: "2" } ] ) ).toEqual( { reps: "", sets: "" } );
		expect( serializeSetBlocks( [] ) ).toEqual( { reps: "", sets: "" } );
	} );

	it( "se lee como 1×5 + 2×6", () => {
		expect( formatSetBlocksSummary( "3", "5 / 6 / 6" ) ).toBe( "1×5 + 2×6" );
		expect( formatSetBlocksSummary( "3", "10" ) ).toBeNull();
	} );
} );
