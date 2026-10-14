import { afterEach, describe, expect, it, vi } from "vitest";

import {
	appDateKeyToNoon,
	getAppCurrentMonth,
	getAppDateParts,
	isAppDateKey,
	shiftAppDateKey,
	toAppDateKey,
} from "@/lib/app-date";

afterEach( () => {
	vi.useRealTimers();
} );

describe( "fechas en hora argentina", () => {
	it( "el ultimo dia del mes a las 22 hs sigue siendo ese mes (el servidor esta en UTC)", () => {
		// 31/10 22:00 en Argentina = 1/11 01:00 UTC.
		vi.useFakeTimers( { now: new Date( "2026-11-01T01:00:00Z" ) } );

		expect( getAppCurrentMonth() ).toBe( 10 );
		expect( getAppDateParts() ).toEqual( { day: 31, month: 10, year: 2026 } );
	} );

	it( "toAppDateKey usa el dia argentino, no el UTC", () => {
		expect( toAppDateKey( new Date( "2026-10-14T02:30:00Z" ) ) ).toBe( "2026-10-13" );
		expect( toAppDateKey( new Date( "2026-10-14T03:00:00Z" ) ) ).toBe( "2026-10-14" );
	} );

	it( "appDateKeyToNoon es el mediodia argentino de ese dia", () => {
		expect( appDateKeyToNoon( "2026-10-13" ).toISOString() ).toBe( "2026-10-13T15:00:00.000Z" );
		expect( toAppDateKey( appDateKeyToNoon( "2026-10-13" ) ) ).toBe( "2026-10-13" );
	} );

	it( "shiftAppDateKey cruza meses y años", () => {
		expect( shiftAppDateKey( "2026-11-01", -1 ) ).toBe( "2026-10-31" );
		expect( shiftAppDateKey( "2026-12-31", 1 ) ).toBe( "2027-01-01" );
		expect( shiftAppDateKey( "2028-03-01", -1 ) ).toBe( "2028-02-29" );
	} );

	it( "isAppDateKey acepta solo fechas que existen", () => {
		expect( isAppDateKey( "2026-10-14" ) ).toBe( true );
		expect( isAppDateKey( "2026-02-30" ) ).toBe( false );
		expect( isAppDateKey( "2026-13-01" ) ).toBe( false );
		expect( isAppDateKey( "14/10/2026" ) ).toBe( false );
		expect( isAppDateKey( "" ) ).toBe( false );
		expect( isAppDateKey( null ) ).toBe( false );
	} );
} );
