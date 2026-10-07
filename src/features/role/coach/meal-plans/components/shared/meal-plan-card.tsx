"use client";

import { Button, Card } from "@heroui/react";
import { useState } from "react";
import { CircleDot, Pencil, Trash2 } from "lucide-react";

import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";
import { formatMealPlanDescriptionLines, formatMealPlanUpdatedLabel, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { MealPlanDeleteDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-drawer";
import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";

type MealPlanCardProps = {
	// Las otras comidas del plan, para avisar si al editar se repite una.
	existingMealTimes: string[];
	mealPlan: MealPlan;
	studentId: string;
};

export function MealPlanCard( {
								  existingMealTimes,
								  mealPlan,
								  studentId,
							  }: MealPlanCardProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	// El momento en que se mostro la tarjeta, para calcular "hace cuanto".
	const [ now ] = useState( () => Date.now() );
	const mealName = formatMealTime( mealPlan.title );

	return (
		<Card className={ "border border-border shadow-sm py-2" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-1 pt-1" }>
				<div className={ "min-w-0" }>
					<div className={ "flex min-w-0 items-center justify-between gap-2" }>
						<div className={ "min-w-0" }>
							<p className={ "truncate text-base font-semibold text-foreground" }>{ mealName }</p>
							{ /* La fecha puede llegar como texto si viene de lo guardado en el navegador. */ }
							<p className={ "truncate text-xs text-muted" }>
								Actualizada { formatMealPlanUpdatedLabel( new Date( mealPlan.updatedAt ), now ) }
							</p>
						</div>

						<div className={ "flex shrink-0 items-center" }>
							<Button
								isIconOnly
								aria-label={ `Editar ${ mealName }` }
								variant={ "ghost" }
								onPress={ () => setIsEditOpen( true ) }
							>
								<Pencil className={ "size-4" }/>
							</Button>
							<Button
								isIconOnly
								aria-label={ `Eliminar ${ mealName }` }
								className={ "text-danger" }
								variant={ "ghost" }
								onPress={ () => setIsDeleteOpen( true ) }
							>
								<Trash2 className={ "size-4" }/>
							</Button>
						</div>
					</div>
				</div>
			</Card.Header>

			<Card.Content className={ "p-2" }>
				<div className={ "space-y-2 text-sm leading-6" }>
					{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
						<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
							<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
								<CircleDot className={ "size-2 text-accent" }/>
							</span>
							<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
						</div>
					) ) }
				</div>
				{ /* La nota del entrenador para esta comida, si la cargo. */ }
				{ mealPlan.observations?.trim() ? (
					<p className={ "mt-3 whitespace-pre-wrap border-t border-border pt-2 text-sm text-muted" }>
						<span className={ "font-medium text-foreground" }>Nota: </span>
						{ mealPlan.observations.trim() }
					</p>
				) : null }
			</Card.Content>

			<MealPlanDrawer
				existingMealTimes={ existingMealTimes }
				hideTrigger
				isOpen={ isEditOpen }
				mealPlan={ mealPlan }
				mode={ "edit" }
				studentId={ studentId }
				onOpenChangeAction={ setIsEditOpen }
			/>
			<MealPlanDeleteDrawer
				hideTrigger
				isOpen={ isDeleteOpen }
				mealPlan={ mealPlan }
				studentId={ studentId }
				onOpenChangeAction={ setIsDeleteOpen }
			/>
		</Card>
	);
}
