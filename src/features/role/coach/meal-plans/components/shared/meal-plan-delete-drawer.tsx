"use client";

import { Alert, Button, Description, Drawer, Spinner, Surface, Typography } from "@heroui/react";
import { CircleDot, Trash2 } from "lucide-react";

import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { MealPlanDeleteSummaryRow } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-summary-row";
import type { MealPlanDeleteDrawerProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-drawer.types";
import { useMealPlanDeleteDrawerState } from "@/features/role/coach/meal-plans/components/shared/use-meal-plan-delete-drawer-state";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

export function MealPlanDeleteDrawer( {
										  hideTrigger,
										  isOpen,
										  mealPlan,
										  onOpenChangeAction,
										  studentId,
										  triggerClassName,
										  triggerVariant,
									  }: MealPlanDeleteDrawerProps ) {
	const {
		deleteMealPlan,
		handleDelete,
		handleOpenChange,
		isOpen: isDeleteOpen,
		openDrawer,
		showTriggerLabel,
	} = useMealPlanDeleteDrawerState( {
		isOpen,
		mealPlan,
		onOpenChangeAction,
		studentId,
		triggerVariant,
	} );

	const placement = useResponsiveDrawerPlacement();

	return (
		<>
			{ hideTrigger ? null : (
				<Button
					isIconOnly={ !showTriggerLabel }
					aria-label={ `Eliminar plan ${ formatMealTime( mealPlan.title ) }` }
					className={ triggerClassName ?? "text-danger" }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ openDrawer }
				>
					<Trash2 className={ "size-4" }/>
					{ showTriggerLabel ? "Eliminar" : null }
				</Button>
			) }

			<FeatureDrawerLayout
				isOpen={ isDeleteOpen }
				placement={ placement }
				rightContentClassName={ "w-[32rem]" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
							<Trash2 className={ "size-5" }/>
						</div>
						<div className={ "min-w-0 flex-1" }>
							<Drawer.Heading>Eliminar plan alimenticio</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								Esta accion no se puede deshacer.
							</Description>
						</div>
					</div>
				</Drawer.Header>

				<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
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
				</Drawer.Body>

				<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
					<Button slot={ "close" } isDisabled={ deleteMealPlan.isPending } variant={ "secondary" }>
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
				</Drawer.Footer>
			</FeatureDrawerLayout>
		</>
	);
}
