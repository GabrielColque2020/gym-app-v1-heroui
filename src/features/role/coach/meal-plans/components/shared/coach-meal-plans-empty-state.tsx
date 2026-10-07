import { Button, Card } from "@heroui/react";
import { Copy } from "lucide-react";

import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";

type CoachMealPlansEmptyStateProps = {
	onCopyAction: () => void;
	studentId: string;
	studentName: string;
};

export function CoachMealPlansEmptyState( { onCopyAction, studentId, studentName }: CoachMealPlansEmptyStateProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>El plan todavía está vacío</p>
				<p className={ "mt-1 text-sm text-muted" }>
					Empezá por la primera comida de { studentName }, o copiá el plan de otro estudiante.
				</p>
				{ /* El boton va aca mismo: es lo unico que se puede hacer con el plan vacio. */ }
				<div className={ "mx-auto mt-4 flex w-fit flex-col gap-2" }>
					<MealPlanDrawer mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
					<Button variant={ "secondary" } onPress={ onCopyAction }>
						<Copy className={ "size-4" }/>
						Copiar de otro estudiante
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
