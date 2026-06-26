"use client";

import { useMemo, useState } from "react";

import type { AdminTrainingRoutine } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";
import {
	Alert,
	Button,
	Chip,
	Description,
	Label,
	ScrollShadow,
	Separator,
	Spinner,
	Surface,
	Typography,
	toast,
} from "@heroui/react";
import { CheckboxButtonGroup } from "@heroui-pro/react";
import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";

import {
	DAY_OPTIONS,
	WEEK_OPTIONS,
	buildRoutineStructureInput,
	buildSelectedDays,
	buildSelectedWeeks,
	getStructureRemovalWarning,
} from "@/features/trainingRoutine/services/routine-structure";
import {
	useCreateTrainingRoutineStructure,
	useUpdateTrainingRoutineStructure,
} from "@/features/trainingRoutine/hooks/useTrainingRoutineStructure";

type AdminRoutineStructureProps = {
	mode: "create" | "edit";
	month: number;
	onSaved: () => void;
	routines?: AdminTrainingRoutine[];
	studentId: string;
	year: number;
};

// Renderiza el formulario para crear o editar la estructura semanal de una rutina.
export default function AdminRoutineStructure( {
	mode,
	month,
	onSaved,
	routines = [],
	studentId,
	year,
}: AdminRoutineStructureProps ) {
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

	const hasRemovalWarning = mode === "edit" && getStructureRemovalWarning( routines, sortedSelectedWeeks, sortedSelectedDays );
	const isSubmitDisabled = sortedSelectedWeeks.length === 0
		|| sortedSelectedDays.length === 0
		|| activeMutation.isPending;

	const title = mode === "create" ? "Crear rutina" : "Editar rutina";
	const description = mode === "create"
		? "Configura semanas y dias de entrenamiento para crear la base de la rutina."
		: "Activa o desactiva semanas y dias sin modificar ejercicios desde la pantalla principal.";
	const Icon = mode === "create" ? Plus : Pencil;

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

			onSaved();
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
			<div className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Icon className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Typography className={ "text-lg font-semibold" }>{ title }</Typography>
						<Description className={ "mt-1 text-sm" }>{ description }</Description>
					</div>
				</div>
			</div>

			<div className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-6 py-5" }>
				{ activeMutation.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al guardar</Alert.Title>
							<Alert.Description>{ activeMutation.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ hasRemovalWarning ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>Revisar cambios</Alert.Title>
							<Alert.Description>
								Esta accion puede eliminar dias o ejercicios ya cargados.
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<ScrollShadow className={ "min-h-0 flex-1" }>
					<div className={ "grid gap-5 pb-2" }>
						<div className={ "grid gap-2" }>
							<div>
								<Label className={ "mr-1 text-sm font-semibold" }>Semanas</Label>
								<Description className={ "text-sm" }>Selecciona las semanas activas de la rutina.</Description>
							</div>
							<CheckboxButtonGroup
								className={ "grid-cols-2 gap-3 [--checkbox-button-group-item-radius:0.75rem] px-0.5 md:grid-cols-4" }
								layout={ "grid" }
								value={ sortedSelectedWeeks }
								variant={ "secondary" }
								onChange={ ( value ) => handleWeeksChange( value as string[] ) }
							>
								{ WEEK_OPTIONS.map( ( week ) => (
									<CheckboxButtonGroup.Item key={ week.value } className={ "gap-2 px-4 py-3" } value={ week.value }>
										<CheckboxButtonGroup.Indicator/>
										<CheckboxButtonGroup.ItemContent>
											<Label className={ "text-sm" }>{ week.label }</Label>
										</CheckboxButtonGroup.ItemContent>
									</CheckboxButtonGroup.Item>
								) ) }
							</CheckboxButtonGroup>
						</div>

						<Separator/>

						<div className={ "grid gap-2" }>
							<div>
								<Label className={ "mr-1 text-sm font-semibold" }>Dias por semana</Label>
								<Description className={ "text-sm" }>
									Los dias seleccionados se aplican a todas las semanas activas.
								</Description>
							</div>
							<CheckboxButtonGroup
								className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem] px-0.5 md:grid-cols-3" }
								layout={ "grid" }
								value={ sortedSelectedDays }
								variant={ "secondary" }
								onChange={ ( value ) => handleDaysChange( value as string[] ) }
							>
								{ DAY_OPTIONS.map( ( day ) => (
									<CheckboxButtonGroup.Item key={ day.value } className={ "gap-2 px-3 py-2.5" } value={ day.value }>
										<CheckboxButtonGroup.Indicator/>
										<CheckboxButtonGroup.ItemContent>
											<Label className={ "text-sm" }>{ day.label }</Label>
										</CheckboxButtonGroup.ItemContent>
									</CheckboxButtonGroup.Item>
								) ) }
							</CheckboxButtonGroup>
						</div>

						<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
							<div className={ "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }>
								<div>
									<Typography className={ "text-sm font-semibold" }>Resumen</Typography>
									<Description className={ "text-sm" }>La misma cantidad de dias se aplicara a cada semana.</Description>
								</div>
								<div className={ "flex flex-wrap gap-2" }>
									<Chip color={ sortedSelectedWeeks.length > 0 ? "accent" : "default" } size={ "sm" } variant={ "soft" }>
										{ sortedSelectedWeeks.length } semanas activas
									</Chip>
									<Chip color={ sortedSelectedDays.length > 0 ? "accent" : "default" } size={ "sm" } variant={ "soft" }>
										{ sortedSelectedDays.length } dias por semana
									</Chip>
								</div>
							</div>
						</Surface>
					</div>
				</ScrollShadow>
			</div>

			<div className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Button isDisabled={ activeMutation.isPending } variant={ "secondary" } onPress={ onSaved }>
					Cancelar
				</Button>
				<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } onPress={ handleSave }>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleCheck className={ "size-4" }/> }
							{ isPending ? "Guardando..." : mode === "create" ? "Crear rutina" : "Guardar estructura" }
						</>
					) }
				</Button>
			</div>
		</>
	);
}
