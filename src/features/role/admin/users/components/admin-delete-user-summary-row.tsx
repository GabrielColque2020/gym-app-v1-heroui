"use client";

import type { ReactNode } from "react";

import { Typography } from "@heroui/react";

type AdminDeleteUserSummaryRowProps = {
	label: string;
	value: ReactNode;
};

export function AdminDeleteUserSummaryRow( { label, value }: AdminDeleteUserSummaryRowProps ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium text-foreground" }>{ value }</Typography>
		</div>
	);
}
