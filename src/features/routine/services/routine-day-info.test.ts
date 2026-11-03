import { describe, expect, it } from "vitest";

import { normalizeRoutineDayInfo, ROUTINE_DAY_TITLE_MAX_LENGTH } from "@/features/routine/services/routine-day-info";

describe( "título y nota del día", () => {
	it( "recorta espacios y deja vacíos en null", () => {
		expect( normalizeRoutineDayInfo( { note: "  ", title: " Pecho + espalda " } ) ).toEqual( { note: null, title: "Pecho + espalda" } );
		expect( normalizeRoutineDayInfo( {} ) ).toEqual( { note: null, title: null } );
	} );

	it( "rechaza un título demasiado largo", () => {
		expect( () => normalizeRoutineDayInfo( { title: "a".repeat( ROUTINE_DAY_TITLE_MAX_LENGTH + 1 ) } ) ).toThrow();
	} );
} );
