// Descanso entre series que el entrenador le fija a un ejercicio. Es opcional:
// sin valor, el estudiante usa el descanso que tenga elegido en su telefono.
export const REST_SECONDS_MIN = 15;
export const REST_SECONDS_MAX = 600;

// Los valores que se ofrecen para elegir, de menor a mayor.
export const REST_SECONDS_OPTIONS = [ 30, 45, 60, 90, 120, 150, 180, 240, 300 ] as const;

export function formatRestSeconds( totalSeconds: number ) {
	const minutes = Math.floor( totalSeconds / 60 );
	const seconds = totalSeconds % 60;

	return `${ minutes }:${ String( seconds ).padStart( 2, "0" ) }`;
}

// Deja el valor en un entero dentro del rango, o en `null` si no hay descanso
// definido. Tambien cubre lo que venga de un borrador viejo, que no traia el campo.
export function normalizeRestSeconds( value: unknown ): number | null {
	if (value === null || value === undefined || value === "") return null;

	const seconds = Math.round( Number( value ) );

	if (!Number.isFinite( seconds ) || seconds <= 0) return null;

	return Math.min( REST_SECONDS_MAX, Math.max( REST_SECONDS_MIN, seconds ) );
}
