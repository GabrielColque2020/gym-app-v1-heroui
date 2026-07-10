"use client";

import type { Key } from "@heroui/react";
import { Button, Card, Dropdown, Header, Label } from "@heroui/react";
import { useState } from "react";
import { CircleDot, MoreVertical, Pencil, Trash2 } from "lucide-react";

import type { CoachMealPlan } from "@/features/meal-plans/types/meal-plans-types";
import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { MealPlanDeleteDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-drawer";
import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";

type MealPlanCardProps = {
	mealPlan: CoachMealPlan;
	studentId: string;
};

export function MealPlanCard( {
								  mealPlan,
								  studentId,
							  }: MealPlanCardProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "delete") {
			setIsDeleteOpen( true );
		}
	}

	return (
		<Card className={ "overflow-hidden border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-1 py-1" }>
				<div className={ "min-w-0" }>
					<div className={ "flex min-w-0 items-center justify-between gap-3" }>
						<p className={ "min-w-0 truncate text-base font-semibold text-foreground" }>
							{ formatMealTime( mealPlan.title ) }
						</p>

						<Dropdown>
							<Button
								isIconOnly
								aria-label={ `Acciones de ${ formatMealTime( mealPlan.title ) }` }
								className={ "shrink-0 text-foreground" }
								variant={ "ghost" }
							>
								<MoreVertical className={ "size-4" }/>
							</Button>
							<Dropdown.Popover placement={ "bottom end" }>
								<Dropdown.Menu onAction={ handleAction }>
									<Header>Opciones</Header>
									<Dropdown.Item id={ "edit" } textValue={ "Editar plan" }>
										<Pencil className={ "size-4 shrink-0 text-warning" }/>
										<Label className={ "text-warning" }>Editar plan</Label>
									</Dropdown.Item>
									<Dropdown.Item id={ "delete" } textValue={ "Eliminar plan" } variant={ "danger" }>
								<Trash2 className={ "size-4 shrink-0 text-danger" }/>
										<Label>Eliminar plan</Label>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Popover>
						</Dropdown>
					</div>
				</div>
			</Card.Header>

			<Card.Content className={ "px-4 py-4" }>
				<div className={ "space-y-2 text-sm leading-6 text-muted" }>
					{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
						<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
							<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
								<CircleDot className={ "size-2 text-accent" }/>
							</span>
							<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
						</div>
					) ) }
				</div>
			</Card.Content>

			<MealPlanDrawer
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
