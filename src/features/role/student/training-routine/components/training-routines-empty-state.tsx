import { Card } from "@heroui/react";

import { monthYearLabel } from "@/constants/months";

type TrainingRoutinesEmptyStateProps = {
	month: number;
	year: number;
};

export function TrainingRoutinesEmptyState( { month, year }: TrainingRoutinesEmptyStateProps ) {
	return (
		<Card.Content className={ "py-10 text-center" }>
			<p className={ "text-base font-semibold text-foreground" }>
				Todavía no tenés rutina para { monthYearLabel( String( month ), String( year ) ).toLowerCase() }
			</p>
			<p className={ "mt-1 text-sm text-muted" }>
				Cuando tu entrenador la cargue, la vas a ver acá. Con las flechas podés ver otros meses.
			</p>
		</Card.Content>
	);
}
