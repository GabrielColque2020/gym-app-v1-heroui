"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveStudentRoutineSessionAction } from "@/features/role/student/routine/actions/save-routine-session";
import { studentRoutineSessionQueryKey } from "@/features/role/student/routine/hooks/use-student-routine-session";
import { getSessionKey } from "@/features/routine/services/routine-session-progress";
import { studentTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";
import type {
	StudentRoutineSessionDetail,
	StudentRoutineSessionSaveInput,
} from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionMutationInput = StudentRoutineSessionSaveInput & {
	finalize?: boolean;
	studentId: string | null;
};

export function useSaveStudentRoutineSession() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: ( input: SaveStudentRoutineSessionMutationInput ) => saveStudentRoutineSessionAction( input ),
		onSuccess: async ( saved, input ) => {
			const sessionQueryKey = studentRoutineSessionQueryKey( input.routineDayId, input.studentId ?? null );

			// Si justo se estaba pidiendo el dia, ese pedido puede haber leido la base
			// antes de este guardado: se descarta para que no pise lo recien guardado.
			await queryClient.cancelQueries( { queryKey: sessionQueryKey } );

			// El guardado devuelve solo lo que cambio: las series de este dia y si
			// quedo terminado. Se aplica sobre lo que la pantalla ya tiene, sin volver
			// a pedir el dia entero por cada serie.
			//
			// El borrador no se toca aca. Lo descarta `useRoutineSession` cuando ve que
			// quedo igual a lo guardado; si el estudiante siguio cargando mientras
			// viajaba el pedido, no queda igual y eso entra en el guardado siguiente.
			const savedSessionKey = getSessionKey( saved );
			const current = queryClient.getQueryData<StudentRoutineSessionDetail>( sessionQueryKey );

			if (current) {
				queryClient.setQueryData<StudentRoutineSessionDetail>( sessionQueryKey, {
					...current,
					isFinalized: saved.isFinalized,
					progressEntries: [
						...saved.progressEntries,
						...current.progressEntries.filter( ( entry ) => getSessionKey( entry ) !== savedSessionKey ),
					].sort( ( left, right ) => new Date( right.date ).getTime() - new Date( left.date ).getTime() ),
				} );
			} else {
				// No deberia pasar: se guarda desde la pantalla del dia, que ya lo cargo.
				await queryClient.invalidateQueries( { queryKey: sessionQueryKey } );
			}

			// La lista del mes muestra el estado del dia: se actualiza al terminarlo. El
			// paso a "en curso" lo toma sola la proxima vez que se abre.
			if (input.finalize) {
				await queryClient.invalidateQueries( {
					queryKey: studentTrainingRoutinesQueryKey( saved.month, saved.year ),
				} );
			}
		},
	} );
}

export type { SaveStudentRoutineSessionMutationInput };
