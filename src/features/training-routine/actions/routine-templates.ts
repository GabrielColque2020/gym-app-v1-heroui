"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import {
	isRoutineTemplateNameValid,
	normalizeRoutineTemplateName,
	type SaveRoutineAsTemplateInput,
	type SaveRoutineAsTemplateResult,
} from "@/features/training-routine/services/routine-template";
import {
	countRoutineWeeksContent,
	createRoutineWeeksCopy,
	type RoutineWeekCopySource,
	routineWeeksCopyInclude,
} from "@/features/training-routine/services/routine-weeks-copy";
import prisma from "@/lib/prisma";

// Guarda la rutina de un mes de un estudiante como plantilla del entrenador. Es
// una copia: despues, cambiar la rutina del estudiante no cambia la plantilla.
export async function saveRoutineAsTemplateAction( input: SaveRoutineAsTemplateInput ): Promise<SaveRoutineAsTemplateResult> {
	const session = await requireCoachSession( "guardar la rutina como plantilla" );

	if (!isRoutineTemplateNameValid( input.name )) return { ok: false, reason: "invalid-name" };

	const name = normalizeRoutineTemplateName( input.name );
	const sourceMonth = ( await prisma.trainingRoutineMonth.findFirst( {
		include: {
			weeks: {
				include: routineWeeksCopyInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			month: input.month,
			// La rutina tiene que ser de un estudiante de este entrenador.
			student: {
				coachId: session.sub,
				role: "STUDENT",
			},
			studentId: input.studentId,
			year: input.year,
		},
	} ) ) as unknown as { objective: string | null; weeks: RoutineWeekCopySource[] } | null;
	const sourceWeeks = sourceMonth?.weeks ?? [];
	const summary = countRoutineWeeksContent( sourceWeeks );

	// Una plantilla sin ejercicios no le ahorra nada a nadie.
	if (!sourceMonth || summary.exerciseCount === 0) return { ok: false, reason: "empty-routine" };

	// "Fuerza" y "fuerza" son la misma plantilla para quien las busca en una lista.
	const sameNameTemplate = await prisma.routineTemplate.findFirst( {
		select: {
			id: true,
		},
		where: {
			coachId: session.sub,
			name: {
				equals: name,
				mode: "insensitive",
			},
		},
	} );

	if (sameNameTemplate) return { ok: false, reason: "duplicate-name" };

	const template = await prisma.$transaction( async ( tx ) => {
		const createdTemplate = await tx.routineTemplate.create( {
			data: {
				coachId: session.sub,
				name,
				objective: sourceMonth.objective,
			},
			select: {
				id: true,
				name: true,
			},
		} );

		await createRoutineWeeksCopy( tx, sourceWeeks, { routineTemplateId: createdTemplate.id } );

		return createdTemplate;
	} );

	return { ok: true, template: { ...template, ...summary } };
}
