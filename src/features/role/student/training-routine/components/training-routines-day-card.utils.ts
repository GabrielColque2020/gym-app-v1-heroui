import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";

export function getTrainingRoutineDayTitle( dayNumber: number ) {
	return `Día ${ dayNumber }`;
}

export function getTrainingRoutineDayDescription( day: {
	routines: Array<{
		exercise?: {
			bodyPart?: Parameters<typeof formatBodyPart>[0] | null;
		} | null;
	}>;
} ) {
	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( ( bodyPart ): bodyPart is Parameters<typeof formatBodyPart>[0] =>
					Boolean( bodyPart ),
				)
				.map( ( bodyPart ) => formatBodyPart( bodyPart ) ),
		),
	);

	return bodyParts.length > 0 ? bodyParts.join( " + " ) : "Sin ejercicios cargados";
}

type DayStatusInput = {
	isFinalized: boolean;
	loadedSetCount: number;
};

// Un dia esta en curso cuando ya tiene series cargadas y todavia no se termino.
export function getTrainingRoutineDayStatus( day: DayStatusInput ) {
	if (day.isFinalized) return { actionLabel: "Ver lo que hice", color: "success", label: "Terminado" } as const;
	if (day.loadedSetCount > 0) return { actionLabel: "Continuar", color: "accent", label: "En curso" } as const;

	return { actionLabel: "Empezar", color: "default", label: "Pendiente" } as const;
}
