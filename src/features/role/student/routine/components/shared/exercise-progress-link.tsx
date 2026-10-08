"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TrendingUp } from "lucide-react";

type ExerciseProgressLinkProps = {
	// El ejercicio que se esta haciendo: la variante elegida, si hay una.
	exerciseId: string;
	exerciseName: string;
};

// De la tarjeta del ejercicio a su progreso. Lo que el estudiante lleva cargado
// del dia queda guardado como borrador, asi que al volver lo encuentra igual.
export function ExerciseProgressLink( { exerciseId, exerciseName }: ExerciseProgressLinkProps ) {
	// El dia que se esta haciendo viaja en la direccion, para que la pantalla de
	// progreso ofrezca volver a el.
	const routineDayId = useSearchParams().get( "routineDayId" );
	const params = new URLSearchParams( { exerciseId } );

	if (routineDayId) params.set( "routineDayId", routineDayId );

	return (
		<Link
			aria-label={ `Ver el progreso de ${ exerciseName }` }
			className={ "inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent hover:underline" }
			href={ `/student/progress?${ params.toString() }` }
		>
			<TrendingUp className={ "size-3.5" }/>
			Ver progreso
		</Link>
	);
}
