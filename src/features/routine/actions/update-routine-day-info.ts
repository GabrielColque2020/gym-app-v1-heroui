"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { getRoutineDaySaveTarget } from "@/features/routine/services/routine-day-detail";
import { normalizeRoutineDayInfo } from "@/features/routine/services/routine-day-info";

export type UpdateRoutineDayInfoInput = {
	note: string | null;
	routineDayId: string;
	studentId?: string | null;
	templateId?: string | null;
	title: string | null;
};

// Guarda el titulo y la nota del dia. Va aparte del guardado de los ejercicios:
// se editan en otro lugar de la pantalla y no tienen que esperarse uno al otro.
export async function updateRoutineDayInfoAction( input: UpdateRoutineDayInfoInput ): Promise<ActionResult<{ note: string | null; title: string | null }>> {
	return runAction( "No se pudo guardar el título y la nota del día.", async () => {
		const session = await requireCoachSession( "editar el día de rutina" );
		const info = normalizeRoutineDayInfo( input );
		// Confirma que el dia es de un estudiante o de una plantilla de este entrenador.
		const routineDay = await getRoutineDaySaveTarget( {
			coachId: session.sub,
			routineDayId: input.routineDayId,
			studentId: input.studentId,
			templateId: input.templateId,
		} );

		return prisma.routineDay.update( {
			data: info,
			select: { note: true, title: true },
			where: { id: routineDay.id },
		} );
	} );
}
