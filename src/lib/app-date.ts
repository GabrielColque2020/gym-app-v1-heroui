// La hora de la app es la de Argentina, corra donde corra el codigo. En el
// servidor (Vercel) la hora es UTC: el ultimo dia de cada mes, de 21 a 24 hs,
// `new Date().getMonth()` ya daba el mes siguiente, y la rutina abria un mes
// vacio. En el navegador daba bien solo si el telefono estaba en hora argentina.
export const APP_TIME_ZONE = "America/Argentina/Buenos_Aires";

const datePartsFormatter = new Intl.DateTimeFormat( "en-US", {
	day: "numeric",
	month: "numeric",
	timeZone: APP_TIME_ZONE,
	year: "numeric",
} );

// Dia, mes (1 a 12) y año de `date` en hora argentina.
export function getAppDateParts( date: Date = new Date() ) {
	const parts = datePartsFormatter.formatToParts( date );
	const read = ( type: Intl.DateTimeFormatPartTypes ) => Number( parts.find( ( part ) => part.type === type )?.value );

	return {
		day: read( "day" ),
		month: read( "month" ),
		year: read( "year" ),
	};
}

export function getAppCurrentMonth() {
	return getAppDateParts().month;
}

export function getAppCurrentYear() {
	return getAppDateParts().year;
}

// El dia de `date` en hora argentina como "AAAA-MM-DD": asi viaja una fecha sin
// hora entre la pantalla y el servidor, sin que el huso la corra un dia.
export function toAppDateKey( date: Date = new Date() ) {
	const { day, month, year } = getAppDateParts( date );

	return `${ year }-${ String( month ).padStart( 2, "0" ) }-${ String( day ).padStart( 2, "0" ) }`;
}

// El dia `days` dias antes o despues de `key`.
export function shiftAppDateKey( key: string, days: number ) {
	return toAppDateKey( new Date( appDateKeyToNoon( key ).getTime() + days * 24 * 60 * 60 * 1000 ) );
}

// El mediodia de ese dia en Argentina (UTC−3, sin horario de verano): queda lejos
// de la medianoche, asi que en cualquier huso sigue siendo el mismo dia.
export function appDateKeyToNoon( key: string ) {
	return new Date( `${ key }T12:00:00-03:00` );
}

// Un "AAAA-MM-DD" que existe: "2026-02-30" no.
export function isAppDateKey( value: unknown ): value is string {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test( value )) return false;

	const noon = appDateKeyToNoon( value );

	return !Number.isNaN( noon.getTime() ) && toAppDateKey( noon ) === value;
}
