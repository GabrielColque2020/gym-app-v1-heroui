"use client";

import type { RoutineTemplateDetail } from "@/features/training-routine/services/routine-template";

import { useState } from "react";
import { Button, Description, Drawer, FieldError, Input, Label, Spinner, TextArea, TextField, toast, Typography } from "@heroui/react";
import { CheckCircle2, PencilLine, Plus } from "lucide-react";

import { CoachRoutineStructureAlerts } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-alerts";
import { CoachRoutineStructureDaySelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-day-selector";
import { CoachRoutineStructureSummary } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-summary";
import { CoachRoutineStructureWeekSelector } from "@/features/role/coach/training-routine/components/shared/coach-routine-structure-week-selector";
import {
	useCreateRoutineTemplate,
	useUpdateRoutineTemplateStructure,
} from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import {
	buildSelectedDays,
	buildSelectedWeeks,
	DAY_OPTIONS,
	getStructureRemovalWarning,
	WEEK_OPTIONS,
} from "@/features/training-routine/services/routine-structure";
import {
	isRoutineTemplateNameValid,
	ROUTINE_TEMPLATE_NAME_MAX_LENGTH,
} from "@/features/training-routine/services/routine-template";

type RoutineTemplateStructureDrawerProps = {
	// Con plantilla, edita sus semanas y dias. Sin plantilla, crea una nueva.
	detail?: RoutineTemplateDetail;
	isOpen: boolean;
	// Se llama al crear una plantilla, con su id, para abrirla.
	onCreatedAction?: ( templateId: string ) => void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

const ALL_WEEKS = WEEK_OPTIONS.map( ( option ) => option.value );

function sortNumeric( values: string[] ) {
	return [ ...values ].sort( ( a, b ) => Number( a ) - Number( b ) );
}

// El formulario vive adentro del drawer para que cada apertura arranque con los
// datos de ese momento, sin tener que limpiarlo a mano al cerrar.
function RoutineTemplateStructureForm( {
	detail,
	onCreatedAction,
	onCloseAction,
}: Pick<RoutineTemplateStructureDrawerProps, "detail" | "onCreatedAction"> & { onCloseAction: () => void } ) {
	const isCreate = !detail;
	const createTemplate = useCreateRoutineTemplate();
	const updateStructure = useUpdateRoutineTemplateStructure();
	const isPending = createTemplate.isPending || updateStructure.isPending;
	const [ name, setName ] = useState( "" );
	const [ nameError, setNameError ] = useState<string | null>( null );
	// Una plantilla nueva arranca con las cuatro semanas, que es lo habitual; los
	// dias por semana los elige el entrenador.
	const [ selectedWeeks, setSelectedWeeks ] = useState<string[]>( () => ( detail ? buildSelectedWeeks( detail.weeks ) : ALL_WEEKS ) );
	const [ selectedDays, setSelectedDays ] = useState<string[]>( () => ( detail ? buildSelectedDays( detail.weeks ) : [] ) );
	const [ objective, setObjective ] = useState( detail?.template.objective ?? "" );
	const hasRemovalWarning = detail ? getStructureRemovalWarning( detail.weeks, selectedWeeks, selectedDays ) : false;
	const isSubmitDisabled = selectedWeeks.length === 0 || selectedDays.length === 0 || isPending || ( isCreate && !name.trim() );
	const Icon = isCreate ? Plus : PencilLine;

	async function handleSave() {
		if (isSubmitDisabled) return;

		if (isCreate && !isRoutineTemplateNameValid( name )) {
			setNameError( "Escribí un nombre para la plantilla." );

			return;
		}

		const days = selectedDays.map( Number );
		const weeks = selectedWeeks.map( ( week ) => ( { days, week: Number( week ) } ) );

		try {
			if (detail) {
				const result = await updateStructure.mutateAsync( { objective, templateId: detail.template.id, weeks } );

				if (!result.ok) {
					toast.danger( "Esa plantilla ya no existe", { description: "Volvé a la lista para ver las que tenés." } );
				} else {
					toast.success( "Plantilla actualizada", { description: "Las semanas y días se guardaron." } );
				}

				onCloseAction();

				return;
			}

			const result = await createTemplate.mutateAsync( { name, objective, weeks } );

			if (result.ok) {
				toast.success( "Plantilla creada", { description: "Ahora cargale los ejercicios de cada día." } );
				onCloseAction();
				onCreatedAction?.( result.id );

				return;
			}

			setNameError(
				result.reason === "duplicate-name"
					? "Ya tenés una plantilla con ese nombre. Probá con otro."
					: "Escribí un nombre para la plantilla.",
			);
		} catch {
			toast.danger( isCreate ? "No se pudo crear la plantilla" : "No se pudo guardar la plantilla", {
				description: "Probá de nuevo.",
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
						<Typography className={ "text-lg font-semibold" }>{ isCreate ? "Nueva plantilla" : "Semanas y días" }</Typography>
						<Description className={ "mt-1 text-sm" }>
							{ isCreate
								? "Elegí el nombre, las semanas y los días. Después cargás los ejercicios de cada día."
								: "Agregá o quitá semanas y días de la plantilla. Los ejercicios de los días que ya están no se tocan." }
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 overflow-y-auto py-3" }>
				<div className={ "grid gap-5 pb-2" }>
					<CoachRoutineStructureAlerts hasRemovalWarning={ hasRemovalWarning }/>

					{ isCreate ? (
						<TextField
							fullWidth
							isRequired
							className={ "p-1.5" }
							isInvalid={ nameError !== null }
							maxLength={ ROUTINE_TEMPLATE_NAME_MAX_LENGTH }
							name={ "template-name" }
							value={ name }
							onChange={ ( value ) => {
								setName( value );
								setNameError( null );
							} }
						>
							<Label>Nombre de la plantilla</Label>
							<Input className={ "border border-border" } placeholder={ "Ej.: Hipertrofia 4 días" }/>
							<FieldError>{ nameError }</FieldError>
						</TextField>
					) : null }

					<CoachRoutineStructureWeekSelector
						selectedWeeks={ selectedWeeks }
						weekOptions={ WEEK_OPTIONS }
						onChangeAction={ ( value ) => setSelectedWeeks( sortNumeric( value ) ) }
					/>

					<div className={ "border-t border-default-100" }/>

					<CoachRoutineStructureDaySelector
						dayOptions={ DAY_OPTIONS }
						selectedDays={ selectedDays }
						onChangeAction={ ( value ) => setSelectedDays( sortNumeric( value ) ) }
					/>

					<div className={ "border-t border-default-100" }/>

					<TextField
						fullWidth
						className={ "p-1.5" }
						maxLength={ 180 }
						name={ "objective" }
						value={ objective }
						onChange={ setObjective }
					>
						<Label>Objetivo</Label>
						<TextArea
							className={ "min-h-24 border border-border" }
							placeholder={ "Ej. hipertrofia de tren superior, ganancia de fuerza o enfoque técnico." }
							rows={ 3 }
						/>
						<Description className={ "text-xs" }>Al usar la plantilla, pasa a ser el objetivo del mes del estudiante.</Description>
					</TextField>

					<CoachRoutineStructureSummary
						selectedDaysCount={ selectedDays.length }
						selectedWeeksCount={ selectedWeeks.length }
					/>
				</div>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button isDisabled={ isPending } variant={ "secondary" } onPress={ onCloseAction }>
					Cancelar
				</Button>
				<Button isDisabled={ isSubmitDisabled } isPending={ isPending } onPress={ () => void handleSave() }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
					{ isPending ? "Guardando..." : isCreate ? "Crear plantilla" : "Guardar cambios" }
				</Button>
			</Drawer.Footer>
		</>
	);
}

// Crea una plantilla de cero o cambia las semanas, los dias y el objetivo de una
// que ya existe. Usa los mismos selectores que la rutina de un estudiante.
export function RoutineTemplateStructureDrawer( {
	detail,
	isOpen,
	onCreatedAction,
	onOpenChangeAction,
}: RoutineTemplateStructureDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();

	return (
		<FeatureDrawerLayout
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[42rem]" }
			onOpenChangeAction={ onOpenChangeAction }
		>
			{ isOpen ? (
				<RoutineTemplateStructureForm
					detail={ detail }
					onCloseAction={ () => onOpenChangeAction( false ) }
					onCreatedAction={ onCreatedAction }
				/>
			) : null }
		</FeatureDrawerLayout>
	);
}
