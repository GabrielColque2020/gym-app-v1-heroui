"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import {
	Alert,
	Card,
	Spinner,
	toast,
} from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { AdminEditRoutineHeader } from "@/features/role/admin/routine/components/shared/AdminEditRoutineHeader";
import { SearchAndCreateExerciseSheet } from "@/features/role/admin/routine/components/shared/SearchAndCreateExerciseSheet";
import {
	RoutineDayExercisesDesktop,
	RoutineDayExercisesMobile,
} from "@/features/role/admin/routine/components/shared/RoutineDayExerciseEditor";
import { useRoutineDayDraft } from "@/features/routine/hooks/useRoutineDayDraft";
import { useSaveRoutineDayExercises } from "@/features/routine/hooks/useRoutineDayMutations";
import { useRoutineDay } from "@/features/routine/hooks/useRoutineDay";
import { mapDraftToSaveInput } from "@/features/routine/services/routine-day-editor";

type EditRoutineDayPageContentProps = {
	month: number | null;
	routineDayId: string | null;
	studentId: string | null;
	year: number | null;
};

function buildTrainingRoutineHref( studentId: string | null, month: number | null, year: number | null ) {
	if (!studentId) return "/admin/trainingRoutinesStudents";

	const params = new URLSearchParams( { studentId } );

	if (month) params.set( "month", String( month ) );
	if (year) params.set( "year", String( year ) );

	return `/admin/trainingRoutine?${ params.toString() }`;
}

function buildEditRoutineBreadcrumbs( studentId: string | null, month: number | null, year: number | null, currentLabel: string ) {
	const routineHref = buildTrainingRoutineHref( studentId, month, year );

	return [
		{ href: "/", label: "Inicio" },
		{ href: "/admin/trainingRoutinesStudents", label: "Rutinas por estudiante" },
		{ href: routineHref, label: "Rutina del estudiante" },
		{ label: currentLabel },
	];
}

type EditRoutineDayLoadedProps = {
	data: RoutineDayDetailBase;
	routineDayId: string;
	studentId: string | null;
	title: string;
	description: string;
};

function EditRoutineDayLoaded( {
	data,
	routineDayId,
	studentId,
	title,
	description,
}: EditRoutineDayLoadedProps ) {
	const saveRoutineDay = useSaveRoutineDayExercises();
	const routine = data.trainingRoutine;
	const {
		addExercise,
		addedExerciseIds,
		deleteExercise,
		draftRoutines,
		getSuggestedOrder,
		hasHydrated,
		isDirty,
		updateExerciseField,
		validationError,
	} = useRoutineDayDraft( {
		routineDayId,
		sourceRoutines: data.routines,
	} );

	if (!hasHydrated) {
		return (
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
					<Spinner size={ "lg" }/>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Restaurando borrador</p>
						<p className={ "text-sm text-muted" }>Recuperando los cambios guardados localmente para este dia.</p>
					</div>
				</Card.Content>
			</Card>
		);
	}

	function handleAddExercise( exercise: ExerciseListItem, order: number ) {
		const result = addExercise( exercise, order );

		if ("error" in result) {
			toast.danger( "No se pudo agregar el ejercicio", {
				description: result.error,
			} );

			return;
		}

		toast.success( "Ejercicio agregado al borrador", {
			description: `${ exercise.name } quedo pendiente hasta guardar cambios.`,
		} );
	}

	async function handleSave() {
		if (validationError) {
			toast.danger( "No se puede guardar", {
				description: validationError,
			} );

			return;
		}

		try {
			await saveRoutineDay.mutateAsync( {
				exercises: mapDraftToSaveInput( draftRoutines ),
				routineDayId,
				studentId,
			} );

			toast.success( "Rutina actualizada", {
				description: "Los ejercicios del dia se guardaron correctamente.",
			} );
		} catch {
			toast.danger( "Error al guardar", {
				description: "No se pudieron guardar los cambios del dia.",
			} );
		}
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ buildTrainingRoutineHref(
					routine.studentId ?? studentId,
					routine.month,
					routine.year,
				) }
				backLabel={ "Volver a rutina" }
				crumbs={ buildEditRoutineBreadcrumbs(
					routine.studentId ?? studentId,
					routine.month,
					routine.year,
					title,
				) }
			/>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<AdminEditRoutineHeader
					description={ description }
					isSaveDisabled={ !isDirty || Boolean( validationError ) || saveRoutineDay.isPending }
					isSaving={ saveRoutineDay.isPending }
					title={ title }
					onSave={ handleSave }
				/>
			</Card>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-row items-center justify-between gap-3" }>
					<div className={ "min-w-0 pl-2" }>
						<p className={ "truncate text-lg font-semibold text-foreground" }>
							{ routine.name || `Semana ${ routine.week }` }
						</p>
						<p className={ "text-sm text-muted" }>
							{ draftRoutines.length } ejercicios en borrador
						</p>
					</div>
					<SearchAndCreateExerciseSheet
						addedExerciseIds={ addedExerciseIds }
						onAddExercise={ handleAddExercise }
						suggestedOrder={ getSuggestedOrder() }
					/>
				</Card.Header>

				<Card.Content className={ "space-y-4" }>
					{ validationError ? (
						<Alert className={ "border border-warning/20" } status={ "warning" }>
							<Alert.Content>
								<Alert.Title>Revisa el borrador antes de guardar</Alert.Title>
								<Alert.Description>{ validationError }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					{ draftRoutines.length === 0 ? (
						<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
							Este dia no tiene ejercicios cargados.
						</div>
					) : (
						<>
							<RoutineDayExercisesDesktop
								onDelete={ deleteExercise }
								onUpdateField={ updateExerciseField }
								routines={ draftRoutines }
							/>
							<RoutineDayExercisesMobile
								onDelete={ deleteExercise }
								onUpdateField={ updateExerciseField }
								routines={ draftRoutines }
							/>
						</>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}

export default function EditRoutineDayPageContent( {
	month,
	routineDayId,
	studentId,
	year,
}: EditRoutineDayPageContentProps ) {
	const backHref = buildTrainingRoutineHref( studentId, month, year );
	const breadcrumbs = buildEditRoutineBreadcrumbs(
		studentId,
		month,
		year,
		"Editar Rutina",
	);
	const { data, error, isError, isLoading } = useRoutineDay( { routineDayId, studentId } );

	if (!routineDayId) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ backHref }
						backLabel={ "Volver a rutina" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Selecciona una rutina</Alert.Title>
						<Alert.Description>
							Para editar ejercicios primero tenes que elegir un dia desde la rutina del estudiante.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	if (isLoading) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ backHref }
						backLabel={ "Volver a rutina" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando rutina</p>
							<p className={ "text-sm text-muted" }>Consultando ejercicios del dia seleccionado.</p>
						</div>
					</Card.Content>
				</Card>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ backHref }
						backLabel={ "Volver a rutina" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar rutina</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	if (!data) return null;

	const routine = data.trainingRoutine;
	const studentName = routine.student?.name ?? "Estudiante";
	const title = `Editar Rutina - Dia ${ data.dayNumber }`;
	const description = `Semana ${ routine.week } | ${ routine.month }/${ routine.year } | ${ studentName }`;

	return (
		<EditRoutineDayLoaded
			data={ data }
			description={ description }
			routineDayId={ routineDayId }
			studentId={ studentId }
			title={ title }
		/>
	);
}


