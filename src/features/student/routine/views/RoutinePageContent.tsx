"use client";

import { useCallback, useMemo, useState } from "react";

import { FloppyDisk } from "@gravity-ui/icons";
import { Alert, Button, Card, Spinner, toast } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import DesktopRoutineView from "../components/desktop/DesktopRoutineView";
import MobileRoutineView from "../components/mobile/MobileRoutineView";
import { RoutineHeader, RoutineSaveSheet } from "@/features/student/routine/components/shared";
import { useRoutineSession } from "@/features/student/routine/hooks/useRoutineSession";
import { useSaveStudentRoutineSession } from "@/features/student/routine/hooks/useRoutineSessionMutations";
import { useStudentRoutineSession } from "@/features/student/routine/hooks/useStudentRoutineSession";
import { mapStudentRoutineSessionToSaveInput, type StudentRoutineSession } from "@/features/student/routine/services/routine-session";
import type { RoutineSaveSummaryItem } from "@/features/student/routine/components/shared/RoutineSaveSheet";

type RoutinePageContentProps = {
	routineDayId: string | null;
	studentId: string | null;
};

function LoadingState() {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
				<Spinner size={ "lg" }/>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Cargando rutina</p>
					<p className={ "text-sm text-muted" }>Consultando la sesion del dia seleccionado.</p>
				</div>
			</Card.Content>
		</Card>
	);
}

// Resume cuantas series completadas tiene cada ejercicio del draft actual.
function buildRoutineSaveSummary( session: StudentRoutineSession ): RoutineSaveSummaryItem[] {
	return session.exercises.map( ( exercise, index ) => {
		const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;
		const selectedVariantName = exercise.variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId )?.name;

		return {
			completedSets,
			id: exercise.id,
			name: `${ index + 1 }. ${ selectedVariantName ?? exercise.name }`,
			totalSets: exercise.sets.length,
		};
	} );
}

// Aplica una edicion de serie sobre la sesion visible para conservar ejercicios nuevos del servidor.
function updateSessionSet(
	session: StudentRoutineSession,
	exerciseId: string,
	setId: string,
	updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
) {
	return {
		...session,
		exercises: session.exercises.map( ( exercise ) => (
			exercise.id === exerciseId
				? {
					...exercise,
					sets: exercise.sets.map( ( set ) => (
						set.id === setId
							? {
								...set,
								...( updates.reps !== undefined ? { currentReps: updates.reps } : {} ),
								...( updates.weight !== undefined ? { currentWeight: updates.weight } : {} ),
								...( updates.notes !== undefined ? { notes: updates.notes } : {} ),
								completed: (
									( updates.reps !== undefined ? updates.reps : set.currentReps ) !== null
									&& ( updates.weight !== undefined ? updates.weight : set.currentWeight ) !== null
								),
							}
							: set
					) ),
				}
				: exercise
		) ),
	};
}

export default function RoutinePageContent( {
												routineDayId,
												studentId,
											}: RoutinePageContentProps ) {
	const [ isSaveSheetOpen, setIsSaveSheetOpen ] = useState( false );
	const { data, error, isError, isLoading, refetch } = useStudentRoutineSession( {
		routineDayId,
		studentId,
	} );
	const { activeSession, validationError, replaceDraft } = useRoutineSession( {
		routineDayId: routineDayId ?? "",
		sourceDetail: data ?? null,
	} );
	const saveRoutineSession = useSaveStudentRoutineSession();

	const exerciseCount = activeSession?.exercises.length ?? 0;
	const completedExercises = activeSession?.exercises.filter( ( exercise ) =>
		exercise.sets.length > 0
		&& exercise.sets.every( ( set ) => set.completed && set.currentReps !== null && set.currentWeight !== null ),
	).length ?? 0;
	const latestProgressDate = data?.progressEntries[ 0 ]?.date ? new Date( data.progressEntries[ 0 ].date ) : null;
	const routineStatusDescription = activeSession
		? `${ completedExercises } de ${ exerciseCount } ejercicios completos`
		: "Sin ejercicios cargados";
	const saveSummary = useMemo(
		() => ( activeSession ? buildRoutineSaveSummary( activeSession ) : [] ),
		[ activeSession ],
	);

	const handleSetUpdate = useCallback( (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => {
		if (!routineDayId || !activeSession) return;

		replaceDraft( updateSessionSet( activeSession, exerciseId, setId, updates ) );
	}, [ activeSession, replaceDraft, routineDayId ] );

	// Actualiza la variante ejecutada dentro del draft activo para poder persistirla al guardar.
	const handleVariantChange = useCallback( (
		exerciseId: string,
		variantExerciseId: string | null,
	) => {
		if (!activeSession) return;

		replaceDraft( {
			...activeSession,
			exercises: activeSession.exercises.map( ( exercise ) => (
				exercise.id === exerciseId
					? {
						...exercise,
						variantExerciseId,
						variantSelectionExplicit: true,
					}
					: exercise
			) ),
		} );
	}, [ activeSession, replaceDraft ] );

	// Abre el resumen de guardado para confirmar la persistencia del draft actual.
	const handleOpenSaveSheet = useCallback( () => {
		setIsSaveSheetOpen( true );
	}, [] );

	// Confirma el guardado real de la rutina luego de revisar el resumen en el sheet.
	const handleConfirmSave = useCallback( async () => {
		if (!activeSession || !routineDayId || !studentId) {
			toast.danger( "No se puede guardar", {
				description: "Faltan datos para persistir la sesion.",
			} );
			return;
		}

		if (validationError) {
			toast.danger( "No se puede guardar", {
				description: validationError,
			} );
			return;
		}

		try {
			await saveRoutineSession.mutateAsync( {
				...mapStudentRoutineSessionToSaveInput( activeSession ),
				studentId,
			} );

			setIsSaveSheetOpen( false );
			toast.success( "Rutina actualizada", {
				description: "Los cambios se guardaron correctamente.",
			} );
		} catch (saveError) {
			toast.danger( "Error al guardar", {
				description: saveError instanceof Error ? saveError.message : "No se pudieron guardar los cambios.",
			} );
		}
	}, [
		activeSession,
		routineDayId,
		saveRoutineSession,
		studentId,
		validationError,
	] );

	if (!routineDayId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Selecciona una rutina</Alert.Title>
					<Alert.Description>
						Para ver tu rutina primero debes elegir un dia desde la lista de rutinas.
					</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	if (isLoading) {
		return <LoadingState/>;
	}

	if (isError) {
		return (
			<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center" }>
					<p className={ "text-base font-semibold text-foreground" }>No se pudo cargar tu rutina</p>
					<p className={ "max-w-xl text-sm text-muted" }>{ error instanceof Error ? error.message : "Ocurrio un error inesperado." }</p>
					<Button className={ "mt-1" } onPress={ () => refetch() }>
						Reintentar
					</Button>
				</Card.Content>
			</Card>
		);
	}

	if (!activeSession) {
		return null;
	}

	const backHref = `/trainingRoutine?month=${ data?.trainingRoutine.month ?? "" }&year=${ data?.trainingRoutine.year ?? "" }`;

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ backHref }
				backLabel={ "Volver" }
				crumbs={ [
					{ href: "/dashboard", label: "Inicio" },
					{ href: backHref, label: "Rutina de entrenamiento" },
					{ label: "Rutina" },
				] }
			/>

			<Card className={ "px-5" }>
				<div className={ "sm:hidden" }>
					<RoutineHeader
						title={ `Rutina - Dia ${ activeSession.dayNumber }` }
						description={ `${ activeSession.title } - Sesion de entrenamiento` }
						isPending={ saveRoutineSession.isPending }
						statusDescription={ routineStatusDescription }
						onSave={ handleOpenSaveSheet }
					/>
				</div>

				<div className={ "hidden items-end gap-4 sm:flex" }>
					<div className={ "flex-1 space-y-2" }>
						<h1 className={ "text-4xl font-black tracking-tight text-foreground" }>
							{ `Rutina - Dia ${ activeSession.dayNumber }` }
						</h1>
						<p className={ "text-base font-semibold text-muted" }>
							{ `${ activeSession.title } · Sesion de entrenamiento` }
						</p>
					</div>

					<Button
						isPending={ saveRoutineSession.isPending }
						onPress={ handleOpenSaveSheet }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <FloppyDisk/> }
								Guardar progreso
							</>
						) }
					</Button>
				</div>
			</Card>

			<MobileRoutineView
				exercises={ activeSession.exercises }
				isPending={ saveRoutineSession.isPending }
				latestProgressDate={ latestProgressDate }
				onSave={ handleOpenSaveSheet }
				onSetUpdate={ handleSetUpdate }
				onVariantChange={ handleVariantChange }
				routineStatusDescription={ routineStatusDescription }
			/>

			<DesktopRoutineView
				exercises={ activeSession.exercises }
				latestProgressDate={ latestProgressDate }
				onVariantChange={ handleVariantChange }
				onSetUpdate={ handleSetUpdate }
				routineStatusDescription={ routineStatusDescription }
			/>

			<RoutineSaveSheet
				isOpen={ isSaveSheetOpen }
				isPending={ saveRoutineSession.isPending }
				validationError={ validationError }
				summaryItems={ saveSummary }
				onConfirm={ handleConfirmSave }
				onOpenChange={ setIsSaveSheetOpen }
			/>
		</div>
	);
}
