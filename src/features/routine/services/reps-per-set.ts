// Repeticiones distintas por serie: se guardan en el mismo campo, separadas por
// barra. "5 / 6 / 6" con 3 series pide 5 en la primera y 6 en las otras dos.
// Sirve para una top set con back-off o una piramide. Si hay menos valores que
// series, la ultima se repite; sin barra, todas piden lo mismo.
//
// El entrenador no escribe la barra: carga bloques ("1 × 5" y "2 × 6") y se
// arma sola (`serializeSetBlocks`).
export const REPS_PER_SET_SEPARATOR = "/";

// Un bloque de series iguales: "2 series × 6".
export type SetBlock = { reps: string; sets: string };

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

// Junta en bloques las series seguidas que piden lo mismo: 5, 6, 6 es 1 × 5 y 2 × 6.
export function groupSetTargets( targets: string[] ): SetBlock[] {
	const blocks: SetBlock[] = [];

	for (const target of targets) {
		const last = blocks.at( -1 );

		if (last && last.reps === target) last.sets = String( Number( last.sets ) + 1 );
		else blocks.push( { reps: target, sets: "1" } );
	}

	return blocks;
}

// Los bloques de lo guardado, o `null` si todas las series piden lo mismo.
export function parseSetBlocks( sets: string, reps: string ): SetBlock[] | null {
	const parts = splitRepsBySet( reps );

	if (parts.length <= 1) return null;

	const setCount = Math.max( Number.parseInt( sets, 10 ) || 0, parts.length );

	return groupSetTargets( Array.from( { length: setCount }, ( _, index ) => getSetTargetReps( reps, index + 1 ) ) );
}

// Lo que se guarda de unos bloques. Con un bloque sin completar quedan vacios,
// como un ejercicio sin series: el dia no se guarda hasta completarlo. Si todos
// piden lo mismo se guarda como siempre ("3" y "6"), sin barra.
export function serializeSetBlocks( blocks: SetBlock[] ): SetBlock {
	const isComplete = blocks.length > 0
		&& blocks.every( ( block ) => Number.parseInt( block.sets, 10 ) > 0 && block.reps.trim() );

	if (!isComplete) return { reps: "", sets: "" };

	const targets = blocks.flatMap( ( block ) => Array.from( { length: Number.parseInt( block.sets, 10 ) }, () => block.reps.trim() ) );
	const isUniform = targets.every( ( target ) => target === targets[ 0 ] );

	return {
		reps: isUniform ? targets[ 0 ] : targets.join( ` ${ REPS_PER_SET_SEPARATOR } ` ),
		sets: String( targets.length ),
	};
}

// "1×5 + 2×6", para mostrar unas series que no piden todas lo mismo.
export function formatSetBlocks( blocks: SetBlock[] ) {
	return blocks.map( ( block ) => `${ block.sets }×${ block.reps }` ).join( " + " );
}

// Series y repeticiones como se leen: "1×5 + 2×6" si son distintas por serie;
// si no, `null` y cada pantalla las muestra como siempre.
export function formatSetBlocksSummary( sets: string, reps: string ) {
	const blocks = parseSetBlocks( sets, reps );

	return blocks ? formatSetBlocks( blocks ) : null;
}
