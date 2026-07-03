"use client";

import { Chip } from "@heroui/react";

import type { RoutineSaveSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-sheet";

type RoutineSaveSheetSummaryItemProps = {
	item: RoutineSaveSummaryItem;
};

function formatCompletionLabel( completedSets: number, totalSets: number ) {
	return `${ completedSets }/${ totalSets } series completadas`;
}

export function RoutineSaveSheetSummaryItem( {
	item,
}: RoutineSaveSheetSummaryItemProps ) {
	return (
		<div className={ "flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background px-4 py-3" }>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-sm font-semibold text-foreground" }>{ item.name }</p>
				<p className={ "text-xs text-muted" }>Se guardaran solo las series completadas</p>
			</div>
			<Chip
				color={ item.completedSets === item.totalSets && item.totalSets > 0 ? "success" : "warning" }
				size={ "sm" }
				variant={ "soft" }
			>
				<Chip.Label>{ formatCompletionLabel( item.completedSets, item.totalSets ) }</Chip.Label>
			</Chip>
		</div>
	);
}
