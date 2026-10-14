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
