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
		canFinishDay,
		handleConfirmFinish,
		handleConfirmRefresh,
		handleExerciseUpdate,
		handleOpenFinishDrawer,
		handleRepeatLastSession,
		handleSetUpdate,
		handleVariantChange,
		isDayFinished,
		isFinishDrawerOpen,
		isRefreshConfirmOpen,
		saveRoutineSession,
		saveSummary,
		setIsFinishDrawerOpen,
		setIsRefreshConfirmOpen,
		validationError,
	} = state;

	if (!activeSession) return null;

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			{ /* En el telefono la vuelta atras va dentro del encabezado, para que el
			     ejercicio quede mas arriba. */ }
			<div className={ "hidden sm:block" }>
				<PageBreadcrumbs
					backHref={ backHref }
					backLabel={ "Volver" }
					crumbs={ [
						{ href: "/student/dashboard", label: "Inicio" },
						{ href: backHref, label: "Rutina de entrenamiento" },
						{ label: "Rutina" },
					] }
				/>
			</div>
			<RoutinePageLoadedHeader state={ state }/>
			<MobileRoutineView
				exercises={ activeSession.exercises }
				canFinishDay={ canFinishDay }
				isDayFinished={ isDayFinished }
				onExerciseUpdate={ handleExerciseUpdate }
				onRepeatLastSessionAction={ handleRepeatLastSession }
				onFinishDayAction={ handleOpenFinishDrawer }
				onSetUpdate={ handleSetUpdate }
				onVariantChangeAction={ handleVariantChange }
			/>
			<DesktopRoutineView
				exercises={ activeSession.exercises }
				onExerciseUpdate={ handleExerciseUpdate }
				onRepeatLastSessionAction={ handleRepeatLastSession }
				onVariantChangeAction={ handleVariantChange }
				onSetUpdate={ handleSetUpdate }
			/>
			<RoutineSaveDrawer
				isOpen={ isFinishDrawerOpen }
				isPending={ saveRoutineSession.isPending }
				validationError={ validationError }
				summaryItems={ saveSummary }
				onConfirmAction={ handleConfirmFinish }
				onOpenChangeAction={ setIsFinishDrawerOpen }
			/>
			<RoutineRefreshConfirmModal
				isOpen={ isRefreshConfirmOpen }
				onCloseAction={ () => setIsRefreshConfirmOpen( false ) }
				onConfirmAction={ handleConfirmRefresh }
			/>
		</div>
	);
}

