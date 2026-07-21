"use client";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { EditRoutineDayLoadedHeader } from "@/features/role/coach/routine/components/shared/edit-routine-day-loaded-header";
import { EditRoutineDayMainCard } from "@/features/role/coach/routine/components/shared/edit-routine-day-main-card";
import { EditRoutineDayRefreshModal } from "@/features/role/coach/routine/components/shared/edit-routine-day-refresh-modal";
import { useEditRoutineDayLoadedState } from "@/features/role/coach/routine/hooks/use-edit-routine-day-loaded-state";

type EditRoutineDayLoadedContentProps = {
	data: RoutineDayDetailBase;
	description: string;
	backHref: string;
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
		isRefreshConfirmOpen,
		isSaveDisabled,
		isSaving,
		requiredFieldsMessage,
		routineName,
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
	} );

	if (!hasHydrated) {
		return null;
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<EditRoutineDayLoadedHeader
				backHref={ backHref }
				breadcrumbs={ breadcrumbs }
				description={ description }
				isSaveDisabled={ isSaveDisabled }
				isSaving={ isSaving }
				title={ title }
				onSave={ handleSave }
			/>

			<EditRoutineDayMainCard
				addedExerciseIds={ addedExerciseIds }
				draftRoutines={ draftRoutines }
				getSuggestedOrder={ getSuggestedOrder }
				isRefreshing={ isRefreshing }
				requiredFieldsMessage={ requiredFieldsMessage }
				routineSubtitle={ description }
				routineTitle={ routineName }
				validationError={ validationError }
				onAddExerciseAction={ handleAddExercise }
				onDeleteExerciseAction={ deleteExercise }
				onRefreshAction={ handleRefresh }
				onUpdateExerciseField={ updateExerciseField }
			/>

			<EditRoutineDayRefreshModal
				isOpen={ isRefreshConfirmOpen }
				onCloseAction={ resetRefreshConfirmOpen }
				onConfirmAction={ handleConfirmRefresh }
			/>
		</div>
	);
}
