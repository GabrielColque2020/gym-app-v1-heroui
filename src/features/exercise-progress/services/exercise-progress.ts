// El progreso de un estudiante en un ejercicio: cada vez que lo hizo y con
// cuanto. Estas funciones no tocan la base: arman las sesiones a partir de las
// series guardadas, para que el servidor y las pantallas usen la misma cuenta.

export type ExerciseProgressRow = {
	date: Date | string;
	dayNumber: number;
	month: number;
	repsCompleted: string;
	repsNumber: number | null;
	week: number;
	weightUsed: string;
	year: number;
};

export type ExerciseProgressSet = {
	reps: number | null;
	setNumber: number | null;
	// El peso como numero, o `null` si no se cargo o no es un numero.
	weight: number | null;
	// Lo que se escribio en el campo de peso, por si no es un numero.
	weightText: string;
};

export type ExerciseProgressSession = {
	// Cuando se cargo: la fecha de la ultima serie de la sesion.
	date: string;
	dayNumber: number;
	key: string;
	month: number;
	sets: ExerciseProgressSet[];
	// La serie mas pesada y la de mas repeticiones de la sesion.
	topReps: number | null;
	topWeight: number | null;
	// Repeticiones por peso, sumadas. Sin peso en ninguna serie, no hay volumen.
	volume: number | null;
	week: number;
	year: number;
};

// Que se compara de una sesion a otra: el peso, o las repeticiones si el
// ejercicio se hace sin peso (dominadas, abdominales).
export type ExerciseProgressMetric = "reps" | "weight";

export type ExerciseProgressListItem = {
	exerciseId: string;
	lastDate: string;
	name: string;
	sessionCount: number;
};

export type ExerciseProgressDetail = {
	exercise: { id: string; name: string };
	sessions: ExerciseProgressSession[];
};

// "152,5" y "152.5" son el mismo peso. Lo que no sea un numero no se adivina.
export function parseProgressNumber( value: string | null | undefined ) {
	const text = value?.trim().replace( ",", "." ) ?? "";

	if (!/^\d+(\.\d+)?$/.test( text )) return null;

	return Number( text );
}

export function formatProgressNumber( value: number ) {
	return new Intl.NumberFormat( "es-AR", { maximumFractionDigits: 2 } ).format( value );
}

function maxOrNull( values: Array<number | null> ) {
	const numbers = values.filter( ( value ): value is number => value !== null );

	return numbers.length > 0 ? Math.max( ...numbers ) : null;
}

// Una sesion es un dia de la rutina (año, mes, semana y dia): junta sus series.
// Devuelve las sesiones de la mas vieja a la mas nueva, por la fecha en que se
// cargaron y no por la semana de la rutina: un dia completado con atraso cuenta
// cuando se hizo.
export function buildExerciseProgressSessions( rows: ExerciseProgressRow[] ): ExerciseProgressSession[] {
	const sessionsByKey = new Map<string, ExerciseProgressSession>();
	// La hora de la ultima serie de cada sesion, para ordenarlas.
	const timeByKey = new Map<string, number>();

	for (const row of rows) {
		const key = `${ row.year }-${ row.month }-${ row.week }-${ row.dayNumber }`;
		const time = new Date( row.date ).getTime();
		const session = sessionsByKey.get( key ) ?? {
			date: new Date( row.date ).toISOString(),
			dayNumber: row.dayNumber,
			key,
			month: row.month,
			sets: [],
			topReps: null,
			topWeight: null,
			volume: null,
			week: row.week,
			year: row.year,
		};
		const weight = parseProgressNumber( row.weightUsed );

		session.sets.push( {
			reps: parseProgressNumber( row.repsCompleted ),
			setNumber: row.repsNumber,
			// Un peso en cero es "sin peso": no es una marca.
			weight: weight !== null && weight > 0 ? weight : null,
			weightText: row.weightUsed.trim(),
		} );

		if (time >= ( timeByKey.get( key ) ?? 0 )) {
			timeByKey.set( key, time );
			session.date = new Date( row.date ).toISOString();
		}

		sessionsByKey.set( key, session );
	}

	return [ ...sessionsByKey.values() ]
		.sort( ( left, right ) => ( timeByKey.get( left.key ) ?? 0 ) - ( timeByKey.get( right.key ) ?? 0 ) )
		.map( ( session ) => {
			const sets = [ ...session.sets ].sort( ( left, right ) => ( left.setNumber ?? 0 ) - ( right.setNumber ?? 0 ) );
			const weightedSets = sets.filter( ( set ) => set.weight !== null && set.reps !== null );

			return {
				...session,
				sets,
				topReps: maxOrNull( sets.map( ( set ) => set.reps ) ),
				topWeight: maxOrNull( sets.map( ( set ) => set.weight ) ),
				volume: weightedSets.length > 0
					? weightedSets.reduce( ( total, set ) => total + ( set.reps ?? 0 ) * ( set.weight ?? 0 ), 0 )
					: null,
			};
		} );
}

export type ExerciseProgressSummary = {
	best: { date: string; value: number } | null;
	// Cuanto cambio la marca entre la primera sesion y la ultima.
	change: number | null;
	first: { date: string; value: number } | null;
	last: { date: string; value: number } | null;
	metric: ExerciseProgressMetric;
	// Las sesiones que entran al grafico: las que tienen un valor para comparar.
	points: Array<{ date: string; key: string; value: number }>;
};

export function summarizeExerciseProgress( sessions: ExerciseProgressSession[] ): ExerciseProgressSummary {
	// Si alguna vez se cargo peso, se compara el peso. Si nunca, las repeticiones.
	const metric: ExerciseProgressMetric = sessions.some( ( session ) => session.topWeight !== null ) ? "weight" : "reps";
	const points = sessions.flatMap( ( session ) => {
		const value = metric === "weight" ? session.topWeight : session.topReps;

		return value === null ? [] : [ { date: session.date, key: session.key, value } ];
	} );
	const first = points[ 0 ] ?? null;
	const last = points[ points.length - 1 ] ?? null;
	// A igual marca, la mas reciente.
	const best = points.reduce<( typeof points )[ number ] | null>(
		( currentBest, point ) => ( currentBest === null || point.value >= currentBest.value ? point : currentBest ),
		null,
	);

	return {
		best,
		change: first && last && points.length > 1 ? last.value - first.value : null,
		first,
		last,
		metric,
		points,
	};
}
