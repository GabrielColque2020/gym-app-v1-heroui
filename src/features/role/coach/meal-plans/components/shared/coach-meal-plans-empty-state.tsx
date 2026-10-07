import { Card } from "@heroui/react";

import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";

type CoachMealPlansEmptyStateProps = {
	studentId: string;
	studentName: string;
};

export function CoachMealPlansEmptyState( { studentId, studentName }: CoachMealPlansEmptyStateProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>El plan todavía está vacío</p>
				<p className={ "mt-1 text-sm text-muted" }>
					Empezá por la primera comida de { studentName }.
				</p>
				{ /* El boton va aca mismo: es lo unico que se puede hacer con el plan vacio. */ }
				<div className={ "mx-auto mt-4 w-fit" }>
					<MealPlanDrawer mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
				</div>
			</Card.Content>
		</Card>
	);
}
