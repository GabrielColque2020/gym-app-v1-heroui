"use client";

import { useState } from "react";
import { Alert, Button, Description, Drawer, Label, ListBox, Select, Spinner, Typography, toast } from "@heroui/react";
import { Copy } from "lucide-react";

import { useCopyMealPlan, useMealPlanCopySources } from "@/features/meal-plans/hooks/use-meal-plan-copy";
import { formatMealTime, type MealTimeValue } from "@/features/meal-plans/services/meal-plan-formatters";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type MealPlanCopyDrawerProps = {
	// Comidas que el estudiante destino ya tiene: son las que la copia borra.
	existingMealCount: number;
	isOpen: boolean;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	studentId: string;
	studentName: string;
};

function pluralizeMeals( count: number ) {
	return count === 1 ? "1 comida" : `${ count } comidas`;
}

// Copia el plan entero de otro estudiante. El destino queda igual al origen, asi
// que si ya tenia comidas se avisa que se pierden y se pide confirmar.
export function MealPlanCopyDrawer( {
	existingMealCount,
	isOpen,
	onOpenChangeAction,
	studentId,
	studentName,
}: MealPlanCopyDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const sourcesQuery = useMealPlanCopySources( studentId, isOpen );
	const copyMealPlan = useCopyMealPlan();
	const [ selectedSourceId, setSelectedSourceId ] = useState<string | null>( null );
	// El origen para el que el entrenador ya toco "reemplazar" una vez.
	const [ confirmedSourceId, setConfirmedSourceId ] = useState<string | null>( null );
	const sources = sourcesQuery.data ?? [];
	// Mientras no elija, queda propuesto el primero de la lista.
	const source = sources.find( ( candidate ) => candidate.id === selectedSourceId ) ?? sources[ 0 ] ?? null;
	const willReplace = existingMealCount > 0;
	const isConfirming = willReplace && source !== null && confirmedSourceId === source.id;

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setSelectedSourceId( null );
			setConfirmedSourceId( null );
			copyMealPlan.reset();
		}

		onOpenChangeAction( nextIsOpen );
	}

	async function handlePrimaryPress() {
		if (!source) return;

		// Si la copia pisa comidas, el primer toque solo pide confirmar.
		if (willReplace && !isConfirming) {
			setConfirmedSourceId( source.id );
			return;
		}

		try {
			await copyMealPlan.mutateAsync( {
				sourceStudentId: source.id,
				studentId,
			} );
			toast.success( "Plan copiado", {
				description: `${ studentName } ahora tiene el plan de ${ source.name }.`,
			} );
			handleOpenChange( false );
		} catch {
			toast.danger( "No se pudo copiar el plan", {
				description: "El plan quedó como estaba. Probá de nuevo.",
			} );
		}
	}

	return (
		<FeatureDrawerLayout
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[34rem]" }
			onOpenChangeAction={ handleOpenChange }
		>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Copy className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Drawer.Heading>Copiar plan de otro estudiante</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							{ studentName } queda con las mismas comidas. Después podés ajustarlas.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto py-3" }>
				{ sourcesQuery.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>No se pudieron cargar los estudiantes</Alert.Title>
							<Alert.Description>{ sourcesQuery.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ copyMealPlan.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>No se pudo copiar</Alert.Title>
							<Alert.Description>{ copyMealPlan.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ sourcesQuery.isLoading ? (
					<div className={ "flex min-h-32 items-center justify-center" }>
						<Spinner size={ "lg" }/>
					</div>
				) : !sourcesQuery.isError && sources.length === 0 ? (
					<div className={ "rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted" }>
						Ningún otro estudiante tiene un plan cargado para copiar.
					</div>
				) : source ? (
					<>
						<Select
							value={ source.id }
							onChange={ ( key ) => {
								setSelectedSourceId( key as string );
								setConfirmedSourceId( null );
							} }
						>
							<Label>Copiar de</Label>
							<Select.Trigger className={ "border border-border" }>
								<Select.Value/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									{ sources.map( ( candidate ) => (
										<ListBox.Item key={ candidate.id } id={ candidate.id } textValue={ candidate.name }>
											{ candidate.name }
											<ListBox.ItemIndicator/>
										</ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>

						<div className={ "rounded-xl border border-border bg-surface-secondary p-3" }>
							<Typography className={ "text-sm font-semibold" }>
								Se copian { pluralizeMeals( source.mealTimes.length ) }
							</Typography>
							<Typography className={ "mt-1 text-sm text-muted" }>
								{ source.mealTimes.map( ( mealTime ) => formatMealTime( mealTime as MealTimeValue ) ).join( " · " ) }
							</Typography>
						</div>

						{ willReplace ? (
							<Alert className={ "border border-warning/20" } status={ "warning" }>
								<Alert.Content>
									<Alert.Title>Se reemplaza el plan actual</Alert.Title>
									<Alert.Description>
										{ studentName } ya tiene { pluralizeMeals( existingMealCount ) }. Al copiar se borran todas y quedan solo las de { source.name }.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						) : null }
					</>
				) : null }
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 flex-col items-stretch gap-2 border-t pt-4" }>
				{ isConfirming && source ? (
					<Typography className={ "text-sm font-medium text-danger" } role={ "alert" }>
						¿Borrar el plan actual de { studentName } ({ pluralizeMeals( existingMealCount ) }) y copiar el de { source.name }? No se puede deshacer.
					</Typography>
				) : null }
				<div className={ "flex justify-end gap-2" }>
					{ isConfirming ? (
						<Button className={ "flex-1 sm:flex-none" } isDisabled={ copyMealPlan.isPending } variant={ "secondary" } onPress={ () => setConfirmedSourceId( null ) }>
							Volver
						</Button>
					) : (
						<Button slot={ "close" } className={ "flex-1 sm:flex-none" } isDisabled={ copyMealPlan.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
					) }
					<Button
						className={ `min-w-0 flex-1 sm:flex-none ${ willReplace ? "bg-danger text-danger-foreground" : "" }` }
						isDisabled={ !source || copyMealPlan.isPending }
						isPending={ copyMealPlan.isPending }
						onPress={ handlePrimaryPress }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Copy className={ "size-4" }/> }
								<span className={ "truncate" }>
									{ isPending ? "Copiando..." : isConfirming ? "Sí, reemplazar" : willReplace ? "Reemplazar plan" : "Copiar plan" }
								</span>
							</>
						) }
					</Button>
				</div>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}
