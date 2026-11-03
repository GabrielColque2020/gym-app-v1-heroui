import { formatBodyPart, isBodyPartValue } from "@/features/exercises/services/exercise-formatters";

type RoutineDayTitleInput = {
	// El que le puso el entrenador; sin titulo, los grupos musculares.
	title?: string | null;
	routines: Array<{
		exercise?: {
			bodyPart?: string | null;
		} | null;
	}>;
};

export function getTrainingRoutineDayTitle( day: RoutineDayTitleInput ) {
	if (day.title?.trim()) return day.title.trim();

	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( Boolean ),
		),
	);

	if (bodyParts.length === 0) return "Sin ejercicios cargados";

	return bodyParts
		.map( ( bodyPart ) => ( bodyPart && isBodyPartValue( bodyPart ) ? formatBodyPart( bodyPart ) : bodyPart ) )
		.join( " + " );
}
