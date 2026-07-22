"use server";

import { Prisma } from "@/generated/prisma/client";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";

const exerciseListSelect = {
	active: true,
	bodyPart: true,
	createdAt: true,
	globalExercise: {
		select: {
			imageUrl: true,
			instructions: true,
			videoUrl: true,
		},
	},
	id: true,
	imageUrl: true,
	name: true,
	tips: true,
	videoUrl: true,
} satisfies Prisma.ExerciseCoachSelect;

type ExerciseListQueryResult = Prisma.ExerciseCoachGetPayload<{
	select: typeof exerciseListSelect;
}>;

export async function getExercisesAction() {
	try {
		const session = await requireCoachSession( "consultar ejercicios" );

		const exercises = ( await prisma.exerciseCoach.findMany( {
			orderBy: {
				createdAt: "desc",
			},
			select: exerciseListSelect,
			where: {
				coachId: session.sub,
			},
		} ) ) as ExerciseListQueryResult[];

		return exercises.map( ( exercise ): ExerciseListItem => ( {
			active: exercise.active,
			bodyPart: exercise.bodyPart,
			createdAt: exercise.createdAt,
			id: exercise.id,
			imageUrl: exercise.imageUrl?.trim() || exercise.globalExercise?.imageUrl || null,
			name: exercise.name,
			tips: exercise.tips?.trim() || exercise.globalExercise?.instructions || null,
			videoUrl: exercise.videoUrl?.trim() || exercise.globalExercise?.videoUrl || null,
		} ) );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de ejercicios. ${ message }` );
	}
}
