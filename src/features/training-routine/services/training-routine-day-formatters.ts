type RoutineDayTitleInput = {
	routines: Array<{
		exercise?: {
			bodyPart?: string | null;
		} | null;
	}>;
};

export function getTrainingRoutineDayTitle( day: RoutineDayTitleInput ) {
	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( Boolean ),
		),
	);

	if (bodyParts.length === 0) return "Sin ejercicios cargados";

	return bodyParts.join( " + " );
}
