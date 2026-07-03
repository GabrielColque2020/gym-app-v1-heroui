import type React from "react";

import { Typography } from "@heroui/react";

type MealPlanDeleteSummaryRowProps = {
	label: string;
	value: React.ReactNode;
};

export function MealPlanDeleteSummaryRow( {
	label,
	value,
}: MealPlanDeleteSummaryRowProps ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}
