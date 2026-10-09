"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";

const RECENT_EXERCISES_LIMIT = 15;

// Los ejercicios que el coach cargo ultimamente en rutinas, del mas reciente al
// mas viejo. Un coach arma la mayoria de sus rutinas con un grupo chico de
// ejercicios, y buscarlos cada vez entre mas de mil es lo que mas tiempo lleva.
export async function getRecentRoutineExerciseIdsAction(): Promise<ActionResult<string[]>> {
	return runAction( "No se pudieron obtener los ejercicios recientes.", async () => {
		const session = await requireCoachSession( "consultar los ejercicios recientes" );

		const recentExercises = await prisma.routine.groupBy( {
			_max: {
				createdAt: true,
			},
			by: [ "exerciseId" ],
			orderBy: {
				_max: {
					createdAt: "desc",
				},
			},
			take: RECENT_EXERCISES_LIMIT,
			where: {
				exercise: {
					coachId: session.sub,
				},
				exerciseId: {
					not: null,
				},
			},
		} ) as Array<{ exerciseId: string | null }>;

		return recentExercises
			.map( ( routine ) => routine.exerciseId )
			.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) );
	} );
}
