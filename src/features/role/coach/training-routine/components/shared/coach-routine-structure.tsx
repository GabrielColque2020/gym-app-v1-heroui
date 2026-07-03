"use client";

import { useMemo, useState } from "react";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { ScrollShadow, toast } from "@heroui/react";

import {
	DAY_OPTIONS,
	WEEK_OPTIONS,
	buildRoutineStructureInput,
	buildSelectedDays,
	buildSelectedWeeks,
	getStructureRemovalWarning,
} from "@/features/training-routine/services/routine-structure";
import {
	useCreateTrainingRoutineStructure,
	useUpdateTrainingRoutineStructure,
} from "@/features/training-routine/hooks/use-training-routine-structure";
import { CoachRoutineStructureAlerts } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-alerts";
import { CoachRoutineStructureDaySelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-day-selector";
import { CoachRoutineStructureFooter } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-footer";
import { CoachRoutineStructureHeader } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-header";
import { CoachRoutineStructureSummary } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-summary";
import { CoachRoutineStructureWeekSelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-week-selector";

type CoachRoutineStructureProps = {
	mode: "create" | "edit";
	month: number;
	onSavedAction: () => void;
	routines?: CoachTrainingRoutine[];
	studentId: string;
	year: number;
};

export default function CoachRoutineStructure( {
	mode,
	month,
	onSavedAction,
	routines = [],
	studentId,
	year,
}: CoachRoutineStructureProps ) {
	const [ selectedWeeks, setSelectedWeeks ] = useState<string[]>( () =>
		mode === "edit" ? buildSelectedWeeks( routines ) : [],
	);
	const [ selectedDays, setSelectedDays ] = useState<string[]>( () =>
		mode === "edit" ? buildSelectedDays( routines ) : [],
	);

	const createStructure = useCreateTrainingRoutineStructure();
	const updateStructure = useUpdateTrainingRoutineStructure();
	const activeMutation = mode === "create" ? createStructure : updateStructure;

	const sortedSelectedWeeks = useMemo(
		() => [ ...selectedWeeks ].sort( ( a, b ) => Number( a ) - Number( b ) ),
		[ selectedWeeks ],
	);

	const sortedSelectedDays = useMemo(
		() => [ ...selectedDays ].sort( ( a, b ) => Number( a ) - Number( b ) ),
		[ selectedDays ],
	);

	const hasRemovalWarning =
		mode === "edit" && getStructureRemovalWarning( routines, sortedSelectedWeeks, sortedSelectedDays );
	const isSubmitDisabled =
		sortedSelectedWeeks.length === 0 || sortedSelectedDays.length === 0 || activeMutation.isPending;

	const description =
		mode === "create"
			? "Configura semanas y dias de entrenamiento para crear la base de la rutina."
			: "Activa o desactiva semanas y dias sin modificar ejercicios desde la pantalla principal.";

	function handleWeeksChange( value: string[] ) {
		setSelectedWeeks( [ ...value ].sort( ( a, b ) => Number( a ) - Number( b ) ) );
	}

	function handleDaysChange( value: string[] ) {
		setSelectedDays( [ ...value ].sort( ( a, b ) => Number( a ) - Number( b ) ) );
	}

	async function handleSave() {
		if (isSubmitDisabled) return;

		const input = buildRoutineStructureInput( sortedSelectedWeeks, sortedSelectedDays, studentId, month, year );

		try {
			if (mode === "create") {
				await createStructure.mutateAsync( input );
				toast.success( "Rutina creada", {
					description: "La estructura inicial se guardo correctamente.",
				} );
			} else {
				await updateStructure.mutateAsync( input );
				toast.success( "Estructura actualizada", {
					description: "Las semanas y dias se guardaron correctamente.",
				} );
			}

			onSavedAction();
		} catch {
			toast.danger( mode === "create" ? "Error al crear rutina" : "Error al editar rutina", {
				description: mode === "create"
					? "No se pudo crear la estructura."
					: "No se pudo guardar la estructura.",
			} );
		}
	}

	return (
		<>
			<CoachRoutineStructureHeader description={ description } mode={ mode }/>

			<div className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-6 py-5" }>
				<CoachRoutineStructureAlerts
					errorMessage={ activeMutation.isError ? activeMutation.error.message : undefined }
					hasRemovalWarning={ hasRemovalWarning }
				/>

				<ScrollShadow className={ "min-h-0 flex-1" }>
					<div className={ "grid gap-5 pb-2" }>
						<CoachRoutineStructureWeekSelector
							onChangeAction={ handleWeeksChange }
							selectedWeeks={ sortedSelectedWeeks }
							weekOptions={ WEEK_OPTIONS }
						/>

						<div className={ "border-t border-default-100" }/>

						<CoachRoutineStructureDaySelector
							dayOptions={ DAY_OPTIONS }
							onChangeAction={ handleDaysChange }
							selectedDays={ sortedSelectedDays }
						/>

						<CoachRoutineStructureSummary
							selectedDaysCount={ sortedSelectedDays.length }
							selectedWeeksCount={ sortedSelectedWeeks.length }
						/>
					</div>
				</ScrollShadow>
			</div>

				<CoachRoutineStructureFooter
					disabled={ isSubmitDisabled }
					isPending={ activeMutation.isPending }
					mode={ mode }
					onCancelAction={ onSavedAction }
					onSaveAction={ handleSave }
				/>
		</>
	);
}
