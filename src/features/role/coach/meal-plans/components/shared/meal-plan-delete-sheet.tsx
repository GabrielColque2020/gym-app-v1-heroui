"use client";

import { Sheet } from "@heroui-pro/react";
import { Alert, Button, Spinner, Surface, Typography, } from "@heroui/react";
import { CircleDot, Trash2 } from "lucide-react";

import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { MealPlanDeleteSheetHeader } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-sheet-header";
import { MealPlanDeleteSummaryRow } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-summary-row";
import type { MealPlanDeleteSheetProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-sheet.types";
import { useMealPlanDeleteSheetState } from "@/features/role/coach/meal-plans/components/shared/use-meal-plan-delete-sheet-state";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

export function MealPlanDeleteSheet( {
										 hideTrigger,
										 isOpen,
										 mealPlan,
										 onOpenChangeAction,
										 studentId,
										 triggerClassName,
										 triggerVariant,
									 }: MealPlanDeleteSheetProps ) {
	const {
		deleteMealPlan,
		handleDelete,
		handleOpenChange,
		isOpen: isDeleteOpen,
		openSheet,
		setIsOpen,
		showTriggerLabel,
	} = useMealPlanDeleteSheetState( {
		isOpen,
		mealPlan,
		onOpenChangeAction,
		studentId,
		triggerVariant,
	} );

	return (
		<>
			{ hideTrigger ? null : (
				<Button
					isIconOnly={ !showTriggerLabel }
					aria-label={ `Eliminar plan ${ formatMealTime( mealPlan.title ) }` }
					className={ triggerClassName ?? "text-danger" }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ openSheet }
				>
					<Trash2 className={ "size-4" }/>
					{ showTriggerLabel ? "Eliminar" : null }
				</Button>
			) }

			<FeatureSheetLayout
				isOpen={ isDeleteOpen }
				placement={ "right" }
				rightContentClassName={ "w-[32rem]" }
				onOpenChangeAction={ handleOpenChange }
			>
				<MealPlanDeleteSheetHeader/>

				<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5" }>
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Accion irreversible</Alert.Title>
							<Alert.Description>
								Se eliminara el plan alimenticio seleccionado del estudiante.
							</Alert.Description>
						</Alert.Content>
					</Alert>

					{ deleteMealPlan.isError ? (
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>Error al eliminar</Alert.Title>
								<Alert.Description>{ deleteMealPlan.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
						<div className={ "grid gap-3" }>
							<MealPlanDeleteSummaryRow label={ "Tipo" } value={ formatMealTime( mealPlan.title ) }/>
							<div className={ "grid gap-2" }>
								<Typography className={ "text-sm text-muted" }>Descripcion</Typography>
								<div className={ "space-y-2 text-sm leading-6 text-foreground" }>
									{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
										<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
											<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
												<CircleDot className={ "size-2" }/>
											</span>
											<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
										</div>
									) ) }
								</div>
							</div>
						</div>
					</Surface>
				</Sheet.Body>

				<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
					<Button isDisabled={ deleteMealPlan.isPending } variant={ "secondary" } onPress={ () => setIsOpen( false ) }>
						Cancelar
					</Button>
					<Button
						className={ "bg-danger text-danger-foreground" }
						isDisabled={ deleteMealPlan.isPending }
						isPending={ deleteMealPlan.isPending }
						onPress={ handleDelete }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Trash2 className={ "size-4" }/> }
								{ isPending ? "Eliminando..." : "Eliminar plan" }
							</>
						) }
					</Button>
				</Sheet.Footer>
			</FeatureSheetLayout>
		</>
	);
}
