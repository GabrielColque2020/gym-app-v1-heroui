import { Card } from "@heroui/react";

export function RoutineExerciseEmptyState() {
	return (
		<Card className={ "border border-dashed border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>No hay ejercicios cargados para este dia</p>
				<p className={ "mt-1 text-sm text-muted" }>
					Cuando la rutina tenga ejercicios asignados vas a poder registrar reps, peso y notas desde aqui.
				</p>
			</Card.Content>
		</Card>
	);
}

