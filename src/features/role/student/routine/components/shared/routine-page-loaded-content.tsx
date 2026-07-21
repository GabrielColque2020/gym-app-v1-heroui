import { PageBreadcrumbs } from "@/components/common";
import DesktopRoutineView from "@/features/role/student/routine/components/desktop/desktop-routine-view";
import MobileRoutineView from "@/features/role/student/routine/components/mobile/mobile-routine-view";
import { RoutinePageLoadedHeader } from "@/features/role/student/routine/components/shared/routine-page-loaded-header";
import RoutineSaveDrawer from "@/features/role/student/routine/components/shared/routine-save-drawer";
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
		handleOpenSaveDrawer,
		handleSetUpdate,
		handleVariantChange,
		isRefreshConfirmOpen,
		isSaveDrawerOpen,
		latestProgressDate,
		saveRoutineSession,
		saveSummary,
		routineObservation,
		setIsRefreshConfirmOpen,
		setIsSaveDrawerOpen,
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
				routineObservation={ routineObservation }
				onSave={ handleOpenSaveDrawer }
				onSetUpdate={ handleSetUpdate }
				onVariantChangeAction={ handleVariantChange }
				routineStatusDescription={ state.routineStatusDescription }
			/>
			<DesktopRoutineView
				exercises={ activeSession.exercises }
				latestProgressDate={ latestProgressDate }
				routineObservation={ routineObservation }
				onVariantChangeAction={ handleVariantChange }
				onSetUpdate={ handleSetUpdate }
				routineStatusDescription={ state.routineStatusDescription }
			/>
			<RoutineSaveDrawer
				isOpen={ isSaveDrawerOpen }
				isPending={ saveRoutineSession.isPending }
				validationError={ validationError }
				summaryItems={ saveSummary }
				onConfirmAction={ handleConfirmSave }
				onOpenChangeAction={ setIsSaveDrawerOpen }
			/>
			<RoutineRefreshConfirmModal
				isOpen={ isRefreshConfirmOpen }
				onCloseAction={ () => setIsRefreshConfirmOpen( false ) }
				onConfirmAction={ handleConfirmRefresh }
			/>
		</div>
	);
}

