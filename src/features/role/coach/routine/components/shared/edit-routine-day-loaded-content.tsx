"use client";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ExerciseVariantsDrawer } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer";
import { RoutineDayEditorActionsProvider } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

import { buildEditRoutineDayHref, buildEditTemplateDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useRoutineTemplateDetail } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import { useTrainingRoutines } from "@/features/role/coach/training-routine/hooks/use-training-routines";

import { EditRoutineDayLoadedHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-loaded-header";
import { EditRoutineDayNavigation } from "@/features/role/coach/routine/components/shared/edit-routine-day-navigation";
import { EditRoutineDayMainCard } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card";
import { EditRoutineDayRefreshModal } from "@/features/role/coach/routine/components/shared/edit-routine-day-refresh-modal";
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

	// Las variantes cuelgan del ejercicio ya guardado en la rutina. Para uno recien
	// agregado se guarda el dia y recien ahi se abre el drawer, con la fila guardada.
	// Se recuerda por orden y no por id: la fila nueva recibe su id al guardarse y
	// un ejercicio del catalogo global pasa a ser uno propio del coach, con otro id.
	const [ pendingVariantsOrder, setPendingVariantsOrder ] = useState<number | null>( null );
	const variantsRoutine = pendingVariantsOrder !== null
		? draftRoutines.find( ( routine ) => routine.order === pendingVariantsOrder && routine.id ) ?? null
		: null;

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
		onCopyFromDay: ( sourceDayId: string ) => {
			const source = daysWithExercises.find( ( { day } ) => day.id === sourceDayId );

			if (source) replaceWithCopies( source.day.routines );
		},
		onMoveExercise: moveExercise,
		onRequestVariants: async ( clientId: string ) => {
			const order = draftRoutines.find( ( routine ) => routine.clientId === clientId )?.order;

			if (order !== undefined && await handleSave()) setPendingVariantsOrder( order );
		},
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
