type NextRoutineDayCandidate = {
	exerciseCount: number;
	// Ya tiene series cargadas.
	hasProgress: boolean;
	isFinalized: boolean;
};

// El dia por el que sigue el estudiante, con los dias en el orden de la rutina
// (semana y dia).
//
// Se sigue desde el dia mas avanzado en el que ya cargo algo: si ese quedo sin
// terminar, es ese; si lo termino, el proximo sin terminar. Antes era "el primero
// sin terminar" del mes, y un dia que falto al gimnasio (o que empezo y dejo)
// quedaba primero para siempre, aunque ya fuera por la semana siguiente.
//
// Lo de atras que quedo sin hacer no traba nada; si ya no queda nada adelante, se
// propone lo que quedo pendiente. Sin nada cargado todavia, el primer dia.
export function pickNextRoutineDay<T extends NextRoutineDayCandidate>( days: T[] ): T | null {
	// Un dia sin ejercicios no es una sesion: se saltea.
	const trainableDays = days.filter( ( day ) => day.exerciseCount > 0 );

	if (trainableDays.length === 0) return days[ 0 ] ?? null;

	const furthestIndex = trainableDays.findLastIndex( ( day ) => day.hasProgress || day.isFinalized );

	if (furthestIndex < 0) {
		return trainableDays.find( ( day ) => !day.isFinalized ) ?? trainableDays[ 0 ];
	}

	const furthest = trainableDays[ furthestIndex ];

	if (!furthest.isFinalized) return furthest;

	return trainableDays.slice( furthestIndex + 1 ).find( ( day ) => !day.isFinalized )
		?? trainableDays.find( ( day ) => !day.isFinalized )
		?? furthest;
}
