"use client";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ExerciseVariantsDrawer } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer";
import { RoutineDayEditorActionsProvider } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

import { buildEditRoutineDayHref, buildEditTemplateDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useRoutineTemplateDetail } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import { useTrainingRoutines } from "@/features/role/coach/training-routine/hooks/use-training-routines";

import { EditRoutineDayLoadedHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-loaded-header";
import { EditRoutineDayNavigation } from "@/features/role/coach/routine/components/shared/edit-routine-day-navigation";
import { EditRoutineDayMainCard } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card";
import { EditRoutineDayRefreshModal } from "@/features/role/coach/routine/components/shared/edit-routine-day-refresh-modal";
import { routineDayQueryOptions } from "@/features/routine/services/routine-day-query";
import { useEditRoutineDayLoadedState } from "@/features/role/coach/routine/hooks/use-edit-routine-day-loaded-state";

const NO_WEEKS: never[] = [];

type EditRoutineDayLoadedContentProps = {
	data: RoutineDayDetailBase;
	description: string;
	backHref: string;
	backLabel: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	isRefreshing: boolean;
	onRefreshRoutineDayAction: () => Promise<RoutineDayDetailBase | null>;
	routineDayId: string;
	studentId: string | null;
	title: string;
};

export function EditRoutineDayLoadedContent( {
												 data,
												 backHref,
												 backLabel,
												 breadcrumbs,
												 description,
												 isRefreshing,
												 onRefreshRoutineDayAction,
												 routineDayId,
												 studentId,
												 title,
											 }: EditRoutineDayLoadedContentProps ) {
	const {
		addedExerciseIds,
		draftRoutines,
		getSuggestedOrder,
		handleAddExercise,
		handleConfirmRefresh,
		handleRefresh,
		handleSave,
		hasHydrated,
		isDirty,
		isRefreshConfirmOpen,
		isSaveDisabled,
		saveStatus,
		setExercisePendingVariants,
		moveExercise,
		replaceWithCopies,
		requiredFieldsMessage,
		resetRefreshConfirmOpen,
		updateExerciseField,
		deleteExercise,
		validationError,
	} = useEditRoutineDayLoadedState( {
		data,
		isRefreshing,
		onRefreshRoutineDayAction,
		routineDayId,
		studentId,
		templateId: data.trainingRoutine.template?.id ?? null,
	} );

	// El dia que sigue dentro de la misma semana, para guardar y continuar sin
	// volver a la pantalla de la rutina.
	const router = useRouter();
	const queryClient = useQueryClient();
	const { month, student, template, year } = data.trainingRoutine;
	// Las semanas entre las que se mueve el editor: las del mes del estudiante o
	// las de la plantilla. Solo se pide la que corresponde.
	const studentWeeks = useTrainingRoutines( { month, studentId: student?.id ?? null, year } ).data?.routineMonth.weeks;
	const templateWeeks = useRoutineTemplateDetail( { templateId: template?.id ?? null } ).data?.weeks;
	const monthWeeks = template ? templateWeeks : studentWeeks;
	const buildDayHref = ( dayId: string ) => (
		template
			? buildEditTemplateDayHref( dayId, template.id )
			: buildEditRoutineDayHref( dayId, student?.id ?? "", month, year )
	);
	// Lo que sigue: el proximo dia de la semana y, en el ultimo, el primero de la
	// semana siguiente, para recorrer el mes entero guardando.
	const currentWeekIndex = ( monthWeeks ?? [] ).findIndex(
		( week ) => week.routineDays.some( ( day ) => day.id === routineDayId ),
	);
	const weekDays = monthWeeks?.[ currentWeekIndex ]?.routineDays ?? [];
	const nextDayInWeek = weekDays[ weekDays.findIndex( ( day ) => day.id === routineDayId ) + 1 ] ?? null;
	const nextWeek = nextDayInWeek ? null : monthWeeks?.[ currentWeekIndex + 1 ] ?? null;
	const nextDay = nextDayInWeek ?? nextWeek?.routineDays[ 0 ] ?? null;
	const nextStepLabel = nextDayInWeek
		? `pasar al Día ${ nextDayInWeek.dayNumber }`
		: nextWeek && nextDay
			? `pasar a la Semana ${ nextWeek.week }`
			: null;

	async function handleSaveAndNext() {
		if (!nextDay) return;

		// Guarda antes de pasar solo lo editado en esta visita. Sin cambios, o con
		// cambios que quedaron de antes y el coach no decidio guardar, solo avanza.
		const canAdvance = saveStatus === "pending" ? await handleSave() : true;

		if (canAdvance) router.push( buildDayHref( nextDay.id ) );
	}

	// Un solo drawer de variantes para todo el dia, abierto desde la fila.
	// Las variantes cuelgan del ejercicio ya guardado en la rutina. Uno recien
	// agregado que ya se puede guardar se guarda antes de abrir. Si todavia no se
	// puede (le faltan series o repeticiones), las variantes se eligen igual y
	// esperan en el borrador hasta que el dia se guarde.
	// Se recuerda por orden y no por id: la fila nueva recibe su id al guardarse y
	// un ejercicio del catalogo global pasa a ser uno propio del coach, con otro id.
	const [ pendingVariantsOrder, setPendingVariantsOrder ] = useState<number | null>( null );
	const variantsRoutine = pendingVariantsOrder !== null
		? draftRoutines.find( ( routine ) => routine.order === pendingVariantsOrder ) ?? null
		: null;
	const variantCountByRoutineId = useMemo(
		() => new Map( data.routines.map( ( routine ) => [ routine.id, routine.variants.length ] ) ),
		[ data.routines ],
	);

	async function requestVariants( clientId: string ) {
		const routine = draftRoutines.find( ( candidate ) => candidate.clientId === clientId );

		if (!routine) return;

		// Guardar antes, cuando se puede, evita tener las variantes en dos lados:
		// el drawer abre ya sobre la fila guardada. Si el guardado falla, abre
		// igual y las variantes quedan esperando en el borrador.
		if (!routine.id && saveStatus === "pending") await handleSave();

		setPendingVariantsOrder( routine.order );
	}

	const daysWithExercises = ( monthWeeks ?? [] ).flatMap( ( week ) =>
		week.routineDays
			.filter( ( day ) => day.id !== routineDayId && day.routines.length > 0 )
			.map( ( day ) => ( { day, week: week.week } ) ),
	);
	const editorActions = {
		copyOptions: daysWithExercises.map( ( { day, week } ) => ( {
			exerciseCount: day.routines.length,
			id: day.id,
			label: `Semana ${ week } · Día ${ day.dayNumber }`,
		} ) ),
		onCopyFromDay: async ( sourceDayId: string ) => {
			const source = daysWithExercises.find( ( { day } ) => day.id === sourceDayId );

			if (!source) return;

			// La lista del mes no trae las variantes de cada ejercicio: se pide el
			// dia de origen completo para copiarlas tambien. Si no se puede, se copia
			// igual con lo que hay, sin variantes.
			try {
				const sourceDay = await queryClient.fetchQuery( {
					...routineDayQueryOptions( sourceDayId, studentId, template?.id ?? null ),
					staleTime: 0,
				} );

				replaceWithCopies( sourceDay.routines.map( ( routine ) => ( {
					...routine,
					variantExerciseIds: routine.variants.map( ( variant ) => variant.variantExerciseId ),
				} ) ) );
			} catch {
				replaceWithCopies( source.day.routines );
			}
		},
		onMoveExercise: moveExercise,
		onRequestVariants: ( clientId: string ) => void requestVariants( clientId ),
		variantCountByRoutineId,
	};

	if (!hasHydrated) {
		return null;
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<EditRoutineDayLoadedHeader
				backHref={ backHref }
				backLabel={ backLabel }
				breadcrumbs={ breadcrumbs }
				description={ description }
				hasExercises={ draftRoutines.length > 0 }
				isSaveDisabled={ isSaveDisabled }
				saveStatus={ saveStatus }
				nextStepLabel={ nextStepLabel }
				title={ title }
				onSave={ handleSave }
				onSaveAndNext={ handleSaveAndNext }
			/>

			<EditRoutineDayNavigation
				buildDayHrefAction={ buildDayHref }
				isCurrentDayDirty={ isDirty }
				routineDayId={ routineDayId }
				weeks={ monthWeeks ?? NO_WEEKS }
			/>

			<RoutineDayEditorActionsProvider value={ editorActions }>
			<EditRoutineDayMainCard
				addedExerciseIds={ addedExerciseIds }
				draftRoutines={ draftRoutines }
				getSuggestedOrder={ getSuggestedOrder }
				isRefreshing={ isRefreshing }
				requiredFieldsMessage={ requiredFieldsMessage }
				validationError={ validationError }
				onAddExerciseAction={ handleAddExercise }
				onDeleteExerciseAction={ deleteExercise }
				onRefreshAction={ handleRefresh }
				onUpdateExerciseField={ updateExerciseField }
			/>
			</RoutineDayEditorActionsProvider>

			{ variantsRoutine?.exercise ? (
				<ExerciseVariantsDrawer
					hideTrigger
					isOpen
					exercise={ variantsRoutine.exercise }
					routineId={ variantsRoutine.id }
					pendingVariantExerciseIds={ variantsRoutine.pendingVariantExerciseIds }
					onPendingChangeAction={ ( variantExerciseIds ) => setExercisePendingVariants( variantsRoutine.clientId, variantExerciseIds ) }
					onOpenChangeAction={ ( isOpen ) => {
						if (!isOpen) setPendingVariantsOrder( null );
					} }
				/>
			) : null }

			<EditRoutineDayRefreshModal
				isOpen={ isRefreshConfirmOpen }
				onCloseAction={ resetRefreshConfirmOpen }
				onConfirmAction={ handleConfirmRefresh }
			/>
		</div>
	);
}
