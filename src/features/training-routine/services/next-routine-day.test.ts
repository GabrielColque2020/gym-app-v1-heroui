import { describe, expect, it } from "vitest";

import { pickNextRoutineDay, summarizeRoutineMonth } from "@/features/training-routine/services/next-routine-day";

type Day = { exerciseCount: number; hasProgress: boolean; id: string; isFinalized: boolean };

// Una semana de dias en orden: "f" terminado, "p" con series sin terminar,
// "-" sin nada, "0" sin ejercicios.
function days( pattern: string ): Day[] {
	return [ ...pattern ].map( ( mark, index ) => ( {
		exerciseCount: mark === "0" ? 0 : 1,
		hasProgress: mark === "f" || mark === "p",
		id: `d${ index + 1 }`,
		isFinalized: mark === "f",
	} ) );
}

describe( "pickNextRoutineDay", () => {
	it( "sin nada cargado propone el primer dia", () => {
		expect( pickNextRoutineDay( days( "---" ) )?.id ).toBe( "d1" );
	} );

	it( "sigue con el dia que sigue al ultimo terminado", () => {
		expect( pickNextRoutineDay( days( "ff--" ) )?.id ).toBe( "d3" );
	} );

	it( "un dia salteado no traba: sigue desde el mas avanzado", () => {
		// Falto el d2 y siguio entrenando: antes quedaba el d2 primero para siempre.
		expect( pickNextRoutineDay( days( "f-f--" ) )?.id ).toBe( "d4" );
	} );

	it( "el dia mas avanzado sin terminar es el que propone", () => {
		expect( pickNextRoutineDay( days( "ffp-" ) )?.id ).toBe( "d3" );
	} );

	it( "un dia empezado y abandonado atras no traba", () => {
		expect( pickNextRoutineDay( days( "pf--" ) )?.id ).toBe( "d3" );
	} );

	it( "si no queda nada adelante, propone lo que quedo pendiente", () => {
		expect( pickNextRoutineDay( days( "f-ff" ) )?.id ).toBe( "d2" );
	} );

	it( "con todo terminado devuelve el mas avanzado", () => {
		expect( pickNextRoutineDay( days( "fff" ) )?.id ).toBe( "d3" );
	} );

	it( "saltea los dias sin ejercicios", () => {
		expect( pickNextRoutineDay( days( "0f0-" ) )?.id ).toBe( "d4" );
		expect( pickNextRoutineDay( days( "0--" ) )?.id ).toBe( "d2" );
	} );

	it( "sin dias con ejercicios devuelve el primero, y sin dias nada", () => {
		expect( pickNextRoutineDay( days( "00" ) )?.id ).toBe( "d1" );
		expect( pickNextRoutineDay( [] ) ).toBeNull();
	} );
} );

describe( "summarizeRoutineMonth", () => {
	const summary = ( pattern: string ) => {
		const result = summarizeRoutineMonth( days( pattern ) );

		return {
			done: result.doneCount,
			skipped: [ ...result.skippedIndexes ],
			total: result.totalCount,
			unfinished: [ ...result.unfinishedIndexes ],
		};
	};

	it( "sin nada cargado no hay salteados: todavia no le toca nada", () => {
		expect( summary( "----" ) ).toEqual( { done: 0, skipped: [], total: 4, unfinished: [] } );
	} );

	it( "cuenta como salteado lo que quedo atras sin series", () => {
		expect( summary( "f-f--" ) ).toEqual( { done: 2, skipped: [ 1 ], total: 5, unfinished: [] } );
	} );

	it( "lo empezado y dejado atras es sin terminar; el mas avanzado esta en curso", () => {
		expect( summary( "pf-p-" ) ).toEqual( { done: 1, skipped: [ 2 ], total: 5, unfinished: [ 0 ] } );
	} );

	it( "los dias sin ejercicios no cuentan", () => {
		expect( summary( "0f0-f" ) ).toEqual( { done: 2, skipped: [ 3 ], total: 3, unfinished: [] } );
	} );
} );
