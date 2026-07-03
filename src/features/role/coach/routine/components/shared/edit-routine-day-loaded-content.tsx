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
	onRefreshRoutineDay: () => Promise<RoutineDayDetailBase | null>;
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
	onRefreshRoutineDay,
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
		isSaving,
		routineName,
		resetRefreshConfirmOpen,
		updateExerciseField,
		deleteExercise,
		validationError,
	} = useEditRoutineDayLoadedState( {
		data,
		isRefreshing,
		onRefreshRoutineDay,
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
				isSaveDisabled={ !draftRoutines.length || Boolean( validationError ) || isSaving }
				isSaving={ isSaving }
				title={ title }
				onSave={ handleSave }
			/>

			<EditRoutineDayMainCard
				addedExerciseIds={ addedExerciseIds }
				draftRoutines={ draftRoutines }
				getSuggestedOrder={ getSuggestedOrder }
				isRefreshing={ isRefreshing }
				routineSubtitle={ description }
				routineTitle={ routineName }
				validationError={ validationError }
				onAddExercise={ handleAddExercise }
				onDeleteExercise={ deleteExercise }
				onRefresh={ handleRefresh }
				onUpdateExerciseField={ updateExerciseField }
			/>

			<EditRoutineDayRefreshModal
				isOpen={ isRefreshConfirmOpen }
				onClose={ resetRefreshConfirmOpen }
				onConfirm={ handleConfirmRefresh }
			/>
		</div>
	);
}
