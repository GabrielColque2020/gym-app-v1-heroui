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

export type RoutineMonthSummary = {
	// Dias terminados.
	doneCount: number;
	// Dias con ejercicios: los que cuentan para el total.
	totalCount: number;
	// Sin ninguna serie y antes del dia mas avanzado que ya entreno: los salteo.
	skippedIndexes: Set<number>;
	// Con series pero sin terminar, y antes del dia mas avanzado: los dejo.
	unfinishedIndexes: Set<number>;
};

// Cuanto cumplio el estudiante la rutina del mes, con los dias en el orden de la
// rutina. El mismo criterio que `pickNextRoutineDay`: lo que esta adelante del
// dia mas avanzado todavia no le toca, asi que no cuenta como salteado.
//
// Los indices son los de `days` (incluidos los dias sin ejercicios, que nunca
// cuentan como salteados).
export function summarizeRoutineMonth( days: NextRoutineDayCandidate[] ): RoutineMonthSummary {
	const furthestIndex = days.findLastIndex( ( day ) => day.exerciseCount > 0 && ( day.hasProgress || day.isFinalized ) );
	const skippedIndexes = new Set<number>();
	const unfinishedIndexes = new Set<number>();
	let doneCount = 0;
	let totalCount = 0;

	days.forEach( ( day, index ) => {
		if (day.exerciseCount === 0) return;

		totalCount += 1;

		if (day.isFinalized) {
			doneCount += 1;
			return;
		}

		if (index >= furthestIndex) return;

		if (day.hasProgress) unfinishedIndexes.add( index );
		else skippedIndexes.add( index );
	} );

	return { doneCount, skippedIndexes, totalCount, unfinishedIndexes };
}
