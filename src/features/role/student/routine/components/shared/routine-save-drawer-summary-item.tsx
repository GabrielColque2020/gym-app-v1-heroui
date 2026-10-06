import { Chip } from "@heroui/react";

import type { RoutineSaveSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-drawer";

type RoutineSaveDrawerSummaryItemProps = {
	item: RoutineSaveSummaryItem;
};

function formatCompletionLabel( completedSets: number, totalSets: number ) {
	return `${ completedSets }/${ totalSets } series`;
}

export function RoutineSaveDrawerSummaryItem( {
	item,
}: RoutineSaveDrawerSummaryItemProps ) {
	return (
		<div className={ "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background px-3 py-2.5" }>
			{ /* El nombre va entero: cortado, varios ejercicios se leen iguales. */ }
			<p className={ "min-w-0 text-sm font-semibold text-foreground" }>{ item.name }</p>
			<Chip
				className={ "shrink-0" }
				color={ item.completedSets === item.totalSets && item.totalSets > 0 ? "success" : "warning" }
				size={ "sm" }
				variant={ "soft" }
			>
				<Chip.Label>{ formatCompletionLabel( item.completedSets, item.totalSets ) }</Chip.Label>
			</Chip>
		</div>
	);
}

