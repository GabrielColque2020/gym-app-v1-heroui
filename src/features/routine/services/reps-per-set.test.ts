import { describe, expect, it } from "vitest";

import { getRepsPerSetWarning, getSetTargetReps } from "@/features/routine/services/reps-per-set";

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

	it( "avisa solo cuando sobran valores", () => {
		expect( getRepsPerSetWarning( "5 / 6 / 6", "3" ) ).toBeNull();
		expect( getRepsPerSetWarning( "5 / 6", "3" ) ).toBeNull();
		expect( getRepsPerSetWarning( "10", "3" ) ).toBeNull();
		expect( getRepsPerSetWarning( "5 / 6 / 6 / 6", "3" ) ).toBe( "Hay 4 valores para 3 series: sobran 1." );
	} );
} );
