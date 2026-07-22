"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import {
	buildStudentRoutineProgressWhere,
	collectStudentRoutineProgressIds,
} from "@/features/role/student/routine/actions/get-routine-session.utils";
import type { StudentRoutineProgressEntry, StudentRoutineSessionDetail } from "@/features/routine/services/routine-session";

type GetStudentRoutineSessionInput = {
	routineDayId: string;
	studentId?: string | null;
};

export async function getStudentRoutineSessionAction( {
	routineDayId,
	studentId,
}: GetStudentRoutineSessionInput ): Promise<StudentRoutineSessionDetail> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver tu rutina." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar esta rutina." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "La rutina solicitada no pertenece al estudiante autenticado." );
		}

		const routineDay = await getRoutineDayAction( {
			routineDayId,
			studentId: activeStudentId,
		} );
		const externalIds = Array.from(
			new Set(
				routineDay.routines.flatMap( ( routine ) => [
					routine.exercise?.externalId,
					...routine.variants.map( ( variant ) => variant.variantExercise.externalId ),
				] ).filter( ( externalId ): externalId is string => Boolean( externalId ) ),
			),
		);
		const globalExercises = externalIds.length > 0
			? await prisma.exerciseGlobal.findMany( {
				select: {
					externalId: true,
					imageUrl: true,
					instructions: true,
					videoUrl: true,
				},
				where: {
					externalId: {
						in: externalIds,
					},
				},
			} )
			: [];
		const globalImageByExternalId = new Map(
			globalExercises.map( ( exercise ) => [ exercise.externalId, exercise.imageUrl ] ),
		);
		const globalInstructionsByExternalId = new Map(
			globalExercises.map( ( exercise ) => [ exercise.externalId, exercise.instructions ] ),
		);
		const globalVideoByExternalId = new Map(
			globalExercises.map( ( exercise ) => [ exercise.externalId, exercise.videoUrl ] ),
		);
		const enrichedRoutineDay = {
			...routineDay,
			routines: routineDay.routines.map( ( routine ) => {
				const exerciseImageUrl = routine.exercise?.imageUrl?.trim()
					|| (routine.exercise?.externalId ? globalImageByExternalId.get( routine.exercise.externalId ) : null)
					|| null;
				const exerciseInstructions = routine.exercise?.instructions?.trim()
					|| routine.exercise?.tips?.trim()
					|| routine.exercise?.globalExercise?.instructions?.trim()
					|| (routine.exercise?.externalId ? globalInstructionsByExternalId.get( routine.exercise.externalId ) : null)
					|| null;
				const exerciseVideoUrl = routine.exercise?.videoUrl?.trim()
					|| routine.exercise?.globalExercise?.videoUrl?.trim()
					|| (routine.exercise?.externalId ? globalVideoByExternalId.get( routine.exercise.externalId ) : null)
					|| null;

				return {
					...routine,
					exercise: routine.exercise
						? {
							...routine.exercise,
							imageUrl: exerciseImageUrl,
							instructions: exerciseInstructions,
							videoUrl: exerciseVideoUrl,
						}
						: routine.exercise,
					variants: routine.variants.map( ( variant ) => {
						const variantImageUrl = variant.variantExercise.imageUrl?.trim()
							|| variant.variantExercise.globalExercise?.imageUrl?.trim()
							|| (variant.variantExercise.externalId ? globalImageByExternalId.get( variant.variantExercise.externalId ) : null)
							|| null;
						const variantInstructions = variant.variantExercise.instructions?.trim()
							|| variant.variantExercise.globalExercise?.instructions?.trim()
							|| (variant.variantExercise.externalId ? globalInstructionsByExternalId.get( variant.variantExercise.externalId ) : null)
							|| null;
						const variantVideoUrl = variant.variantExercise.videoUrl?.trim()
							|| variant.variantExercise.globalExercise?.videoUrl?.trim()
							|| (variant.variantExercise.externalId ? globalVideoByExternalId.get( variant.variantExercise.externalId ) : null)
							|| null;

						return {
							...variant,
							variantExercise: {
								...variant.variantExercise,
								imageUrl: variantImageUrl,
								instructions: variantInstructions,
								videoUrl: variantVideoUrl,
							},
						};
					} ),
				};
			} ),
		};
		const { exerciseIds, variantExerciseIds } = collectStudentRoutineProgressIds( enrichedRoutineDay );
		const progressEntries = ( await prisma.exerciseProgress.findMany( {
			orderBy: [
				{
					date: "desc",
				},
				{
					id: "desc",
				},
			],
			where: buildStudentRoutineProgressWhere( activeStudentId, exerciseIds, variantExerciseIds ),
		} ) ) as unknown as StudentRoutineProgressEntry[];

		return {
			...enrichedRoutineDay,
			progressEntries,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la rutina del estudiante.";

		throw new Error( `No se pudo obtener la rutina del estudiante. ${ message }` );
	}
}

