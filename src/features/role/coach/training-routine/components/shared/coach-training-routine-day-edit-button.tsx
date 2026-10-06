"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { PencilLine, Plus } from "lucide-react";

type CoachTrainingRoutineDayEditButtonProps = {
	dayNumber: number;
	hasExercises: boolean;
	month: number;
	routineDayId: string;
	studentId: string;
	year: number;
};

// Entrada directa al editor del dia, a la vista en la tarjeta: es lo que se
// viene a hacer a esta pantalla.
export function CoachTrainingRoutineDayEditButton( {
													   dayNumber,
													   hasExercises,
													   month,
													   routineDayId,
													   studentId,
													   year,
												   }: CoachTrainingRoutineDayEditButtonProps ) {
	const router = useRouter();

	function handleEdit() {
		const params = new URLSearchParams( {
			month: String( month ),
			routineDayId,
			studentId,
			year: String( year ),
		} );

		router.push( `/coach/routine?${ params.toString() }` );
	}

	return (
		<Button
			aria-label={ hasExercises ? `Editar día ${ dayNumber }` : `Cargar ejercicios del día ${ dayNumber }` }
			className={ hasExercises ? "shrink-0" : "shrink-0 bg-accent text-accent-foreground" }
			size={ "sm" }
			variant={ hasExercises ? "secondary" : undefined }
			onPress={ handleEdit }
		>
			{ hasExercises ? <PencilLine className={ "size-4" }/> : <Plus className={ "size-4" }/> }
			{ hasExercises ? "Editar" : "Cargar ejercicios" }
		</Button>
	);
}
