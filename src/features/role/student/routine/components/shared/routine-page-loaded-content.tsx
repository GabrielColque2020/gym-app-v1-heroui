import { PageBreadcrumbs } from "@/components/common";
import DesktopRoutineView from "@/features/role/student/routine/components/desktop/desktop-routine-view";
import MobileRoutineView from "@/features/role/student/routine/components/mobile/mobile-routine-view";
import { RoutinePageLoadedHeader } from "@/features/role/student/routine/components/shared/routine-page-loaded-header";
import RoutineSaveSheet from "@/features/role/student/routine/components/shared/routine-save-sheet";
import { RoutineRefreshConfirmModal } from "@/features/role/student/routine/components/shared/routine-refresh-confirm-modal";
import type { useRoutinePageState } from "@/features/role/student/routine/hooks/use-routine-page-state";

type RoutinePageState = ReturnType<typeof useRoutinePageState>;

type RoutinePageLoadedContentProps = {
	state: RoutinePageState;
};

export function RoutinePageLoadedContent( {
	state,
}: RoutinePageLoadedContentProps ) {
	const {
		activeSession,
		backHref,
		canSaveProgress,
		handleConfirmRefresh,
		handleConfirmSave,
		handleOpenSaveSheet,
		handleSetUpdate,
		handleVariantChange,
		isRefreshConfirmOpen,
		isSaveSheetOpen,
		latestProgressDate,
		saveRoutineSession,
		saveSummary,
		setIsRefreshConfirmOpen,
		setIsSaveSheetOpen,
		validationError,
	} = state;

	if (!activeSession) return null;

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ backHref }
				backLabel={ "Volver" }
				crumbs={ [
					{ href: "/student/dashboard", label: "Inicio" },
					{ href: backHref, label: "Rutina de entrenamiento" },
					{ label: "Rutina" },
				] }
			/>
			<RoutinePageLoadedHeader state={ state }/>
			<MobileRoutineView
				exercises={ activeSession.exercises }
				canSaveProgress={ canSaveProgress }
				isPending={ saveRoutineSession.isPending }
				latestProgressDate={ latestProgressDate }
				onSave={ handleOpenSaveSheet }
				onSetUpdate={ handleSetUpdate }
				onVariantChangeAction={ handleVariantChange }
				routineStatusDescription={ state.routineStatusDescription }
			/>
			<DesktopRoutineView
				exercises={ activeSession.exercises }
				latestProgressDate={ latestProgressDate }
				onVariantChangeAction={ handleVariantChange }
				onSetUpdate={ handleSetUpdate }
				routineStatusDescription={ state.routineStatusDescription }
			/>
			<RoutineSaveSheet
				isOpen={ isSaveSheetOpen }
				isPending={ saveRoutineSession.isPending }
				validationError={ validationError }
				summaryItems={ saveSummary }
				onConfirmAction={ handleConfirmSave }
				onOpenChangeAction={ setIsSaveSheetOpen }
			/>
			<RoutineRefreshConfirmModal
				isOpen={ isRefreshConfirmOpen }
				onCloseAction={ () => setIsRefreshConfirmOpen( false ) }
				onConfirmAction={ handleConfirmRefresh }
			/>
		</div>
	);
}
