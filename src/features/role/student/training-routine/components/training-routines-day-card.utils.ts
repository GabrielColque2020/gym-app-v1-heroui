"use client";

import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";

export function getTrainingRoutineDayTitle( dayNumber: number ) {
	return `Dia ${ dayNumber }`;
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

export function getTrainingRoutineDayStatusLabel( isFinalized: boolean ) {
	return isFinalized ? "Guardado" : "Sin guardar";
}

export function getTrainingRoutineDayStatusColor( isFinalized: boolean ) {
	return isFinalized ? "success" : "warning";
}
