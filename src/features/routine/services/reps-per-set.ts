// Repeticiones distintas por serie: el entrenador escribe "5 / 6 / 6" y la
// serie 1 pide 5 y las otras dos, 6. Sirve para una top set con back-off o una
// piramide. Si hay menos valores que series, la ultima se repite ("5 / 6" con 3
// series es 5, 6, 6); sin barra, como hasta ahora, todas piden lo mismo.
export const REPS_PER_SET_SEPARATOR = "/";

export function splitRepsBySet( reps: string | null | undefined ) {
	return ( reps ?? "" )
		.split( REPS_PER_SET_SEPARATOR )
		.map( ( part ) => part.trim() )
		.filter( Boolean );
}

// Lo que pide la serie `setNumber` (desde 1).
export function getSetTargetReps( reps: string | null | undefined, setNumber: number ) {
	const parts = splitRepsBySet( reps );

	if (parts.length === 0) return "";

	return parts[ Math.min( Math.max( setNumber, 1 ), parts.length ) - 1 ];
}

// Aviso para el entrenador cuando las repeticiones por serie no coinciden con
// las series: con mas valores que series, los de mas no los ve nadie.
export function getRepsPerSetWarning( reps: string, sets: string ) {
	const parts = splitRepsBySet( reps );
	const setCount = Number.parseInt( sets, 10 );

	if (parts.length <= 1 || !Number.isInteger( setCount ) || setCount < 1) return null;

	if (parts.length > setCount) {
		return `Hay ${ parts.length } valores para ${ setCount } ${ setCount === 1 ? "serie" : "series" }: sobran ${ parts.length - setCount }.`;
	}

	return null;
}
