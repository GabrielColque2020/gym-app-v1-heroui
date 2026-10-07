import { routineMonthKey } from "@/features/training-routine/services/routine-month-key";
import prisma from "@/lib/prisma";

type GetRoutineMonthsWithContentInput = {
	// Con valor, solo devuelve meses si el estudiante es de ese entrenador.
	coachId?: string;
	studentId: string;
};

// Los meses de un estudiante que tienen rutina, de todos los años juntos. Sirve
// para marcarlos en el selector de mes. Es una sola consulta liviana: lee solo
// mes y año, entra por el indice del estudiante y devuelve a lo sumo doce filas
// por año. "Tiene rutina" es tener al menos un ejercicio cargado: un mes con las
// semanas armadas pero vacias no cuenta. El recorrido de semana a dia y de dia a
// ejercicio va por indice.
export async function getRoutineMonthsWithContent( { coachId, studentId }: GetRoutineMonthsWithContentInput ) {
	const months = await prisma.trainingRoutineMonth.findMany( {
		select: {
			month: true,
			year: true,
		},
		where: {
			student: coachId ? { coachId } : undefined,
			studentId,
			weeks: {
				some: {
					routineDays: {
						some: {
							routines: {
								some: {},
							},
						},
					},
				},
			},
		},
	} );

	return months.map( ( item ) => routineMonthKey( item.month, item.year ) );
}
