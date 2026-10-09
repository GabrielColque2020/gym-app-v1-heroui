"use client";

import { unwrapped } from "@/lib/action-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import {
	applyRoutineTemplateAction,
	copyRoutineTemplateWeeksAction,
	createRoutineTemplateAction,
	deleteRoutineTemplateAction,
	duplicateRoutineTemplateAction,
	getRoutineTemplateDetailAction,
	getRoutineTemplatesAction,
	renameRoutineTemplateAction,
	repeatRoutineTemplateWeekAction,
	saveRoutineAsTemplateAction,
	updateRoutineTemplateStructureAction,
} from "@/features/training-routine/actions/routine-templates";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const saveRoutineAsTemplate = unwrapped( saveRoutineAsTemplateAction );

export const coachRoutineTemplatesQueryKey = [ "coach-routine-templates" ] as const;

export const coachRoutineTemplateDetailQueryKey = ( templateId: string ) => [ "coach-routine-template", templateId ] as const;

export function useSaveRoutineAsTemplate() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveRoutineAsTemplate,
		onSuccess: ( result ) => {
			if (result.ok) void queryClient.invalidateQueries( { queryKey: coachRoutineTemplatesQueryKey } );
		},
	} );
}

type UseRoutineTemplateDetailParams = {
	// La pantalla de la plantilla pide lo ultimo al abrirse; el editor de un dia
	// usa lo que ya hay, que el guardado mantiene al dia.
	alwaysFresh?: boolean;
	templateId: string | null;
};

export function useRoutineTemplateDetail( { alwaysFresh = false, templateId }: UseRoutineTemplateDetailParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		enabled: Boolean( templateId ),
		queryFn: () => unwrapped( getRoutineTemplateDetailAction )( templateId ?? "" ),
		queryKey: coachRoutineTemplateDetailQueryKey( templateId ?? "missing-template" ),
		refetchOnMount: alwaysFresh ? "always" : QUERY_DEFAULTS.coach.refetchOnMount,
	} );
}

// La lista cambia poco y solo desde esta app: guardar una plantilla la invalida.
// La pantalla "Plantillas" igual la pide al abrirse, porque editar un dia cambia
// cuantos ejercicios tiene cada una.
export function useRoutineTemplates( { alwaysFresh = false }: { alwaysFresh?: boolean } = {} ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		refetchOnMount: alwaysFresh ? "always" : QUERY_DEFAULTS.coach.refetchOnMount,
		queryFn: unwrapped( getRoutineTemplatesAction ),
		queryKey: coachRoutineTemplatesQueryKey,
	} );
}

export function useApplyRoutineTemplate() {
	return useRoutineTemplateIntoMonthMutation( unwrapped( applyRoutineTemplateAction ) );
}

export function useCopyRoutineTemplateWeeks() {
	return useRoutineTemplateIntoMonthMutation( unwrapped( copyRoutineTemplateWeeksAction ) );
}

// Usar una plantilla, entera o por semanas, cambia la rutina del mes del estudiante.
function useRoutineTemplateIntoMonthMutation<
	TInput extends { month: number; studentId: string; year: number },
	TResult extends { ok: boolean },
>( mutationFn: ( input: TInput ) => Promise<TResult> ) {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn,
		onSuccess: ( result, input ) => {
			if (!result.ok) {
				// La plantilla ya no existe: la lista guardada quedo vieja.
				void queryClient.invalidateQueries( { queryKey: coachRoutineTemplatesQueryKey } );

				return;
			}

			void queryClient.invalidateQueries( {
				queryKey: coachTrainingRoutinesQueryKey( input.studentId, input.month, input.year ),
			} );
		},
	} );
}

// Renombrar, duplicar y borrar cambian la lista: se vuelve a pedir siempre, aun
// cuando la accion no se pudo hacer, porque eso suele significar que quedo vieja.
function useRoutineTemplateListMutation<TInput, TResult>( mutationFn: ( input: TInput ) => Promise<TResult> ) {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn,
		onSettled: () => {
			void queryClient.invalidateQueries( { queryKey: coachRoutineTemplatesQueryKey } );
			// Tambien el contenido de cada plantilla que este abierta o guardada.
			void queryClient.invalidateQueries( { queryKey: [ "coach-routine-template" ] } );
		},
	} );
}

export function useCreateRoutineTemplate() {
	return useRoutineTemplateListMutation( unwrapped( createRoutineTemplateAction ) );
}

export function useUpdateRoutineTemplateStructure() {
	return useRoutineTemplateListMutation( unwrapped( updateRoutineTemplateStructureAction ) );
}

export function useRepeatRoutineTemplateWeek() {
	return useRoutineTemplateListMutation( unwrapped( repeatRoutineTemplateWeekAction ) );
}

export function useRenameRoutineTemplate() {
	return useRoutineTemplateListMutation( unwrapped( renameRoutineTemplateAction ) );
}

export function useDuplicateRoutineTemplate() {
	return useRoutineTemplateListMutation( unwrapped( duplicateRoutineTemplateAction ) );
}

export function useDeleteRoutineTemplate() {
	return useRoutineTemplateListMutation( unwrapped( deleteRoutineTemplateAction ) );
}
