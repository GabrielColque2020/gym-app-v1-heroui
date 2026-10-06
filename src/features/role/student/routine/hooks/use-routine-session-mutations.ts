"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveStudentRoutineSessionAction } from "@/features/role/student/routine/actions/save-routine-session";
import { studentRoutineSessionQueryKey } from "@/features/role/student/routine/hooks/use-student-routine-session";
import { studentTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";
import type { StudentRoutineSessionSaveInput } from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionMutationInput = StudentRoutineSessionSaveInput & {
	finalize?: boolean;
	studentId: string | null;
};

export function useSaveStudentRoutineSession() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: ( input: SaveStudentRoutineSessionMutationInput ) => saveStudentRoutineSessionAction( input ),
		onSuccess: async ( savedSession, input ) => {
			// La respuesta ya es la sesion tal como quedo: se usa directamente, sin
			// volver a pedirla. Con el guardado automatico eso seria un pedido de mas
			// por cada serie.
			//
			// El borrador no se toca aca. Lo descarta `useRoutineSession` cuando ve que
			// quedo igual a lo guardado; si el estudiante siguio cargando mientras
			// viajaba el pedido, no queda igual y eso entra en el guardado siguiente.
			const sessionQueryKey = studentRoutineSessionQueryKey( input.routineDayId, input.studentId ?? null );

			// Si justo se estaba pidiendo el dia, ese pedido puede haber leido la base
			// antes de este guardado: se descarta para que no pise lo recien guardado.
			await queryClient.cancelQueries( { queryKey: sessionQueryKey } );
			queryClient.setQueryData( sessionQueryKey, savedSession );

			// La lista del mes muestra el estado del dia: se actualiza al terminarlo. El
			// paso a "en curso" lo toma sola la proxima vez que se abre.
			if (input.finalize) {
				await queryClient.invalidateQueries( {
					queryKey: studentTrainingRoutinesQueryKey(
						savedSession.trainingRoutine.month,
						savedSession.trainingRoutine.year,
					),
				} );
			}
		},
	} );
}

export type { SaveStudentRoutineSessionMutationInput };
