"use client";

import { useMemo, useState } from "react";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { Button, Description, Drawer, ScrollShadow, Spinner, toast, Typography } from "@heroui/react";

import {
	buildRoutineStructureInput,
	buildSelectedDays,
	buildSelectedWeeks,
	DAY_OPTIONS,
	getStructureRemovalWarning,
	WEEK_OPTIONS,
} from "@/features/training-routine/services/routine-structure";
import { useCreateTrainingRoutineStructure, useUpdateTrainingRoutineStructure, } from "@/features/training-routine/hooks/use-training-routine-structure";
import { CoachRoutineStructureAlerts } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-alerts";
import { CoachRoutineStructureDaySelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-day-selector";
import { CoachRoutineStructureSummary } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-summary";
import { CoachRoutineStructureWeekSelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-week-selector";
import { CheckCircle2, PencilLine, Plus } from "lucide-react";

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

	const Icon = mode === "create" ? Plus : PencilLine;
	const title = mode === "create" ? "Crear rutina" : "Editar rutina";

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
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Icon className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Typography className={ "text-lg font-semibold" }>{ title }</Typography>
						<Description className={ "mt-1 text-sm" }>{ description }</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
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
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button isDisabled={ activeMutation.isPending } variant={ "secondary" } onPress={ onSavedAction }>
					Cancelar
				</Button>
				<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } onPress={ handleSave }>
					{ ( { isPending: buttonPending } ) => (
						<>
							{ buttonPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
							{ buttonPending ? "Guardando..." : mode === "create" ? "Crear rutina" : "Guardar estructura" }
						</>
					) }
				</Button>
			</Drawer.Footer>
		</>
	);
}
