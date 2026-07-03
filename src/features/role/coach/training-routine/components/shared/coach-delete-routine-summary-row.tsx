"use client";

import type { ReactNode } from "react";
import { Typography } from "@heroui/react";

type CoachDeleteRoutineSummaryRowProps = {
	label: string;
	value: ReactNode;
};

export function CoachDeleteRoutineSummaryRow( {
	label,
	value,
}: CoachDeleteRoutineSummaryRowProps ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}
