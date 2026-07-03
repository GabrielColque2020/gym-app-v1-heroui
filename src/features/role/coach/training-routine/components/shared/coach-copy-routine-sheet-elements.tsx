"use client";

import type React from "react";

import { Surface, Typography } from "@heroui/react";

export function CoachCopyRoutineNotice( {
	children,
	tone,
}: {
	children: React.ReactNode;
	tone?: "success" | "warning";
} ) {
	const toneClass =
		tone === "success"
			? "border-success-soft bg-success-soft/50"
			: "border-warning-soft bg-warning-soft/60";

	return (
		<Surface className={ `${ toneClass } rounded-xl border px-3 py-2 sm:py-2.5` }>
			<Typography className={ "text-sm leading-5" }>{ children }</Typography>
		</Surface>
	);
}

export function CoachCopyRoutineWeekPill( { children }: { children: React.ReactNode } ) {
	return (
		<span className={ "rounded-lg bg-default px-2.5 py-1 text-center text-xs font-semibold" }>
			{ children }
		</span>
	);
}

export function CoachCopyRoutineSummaryRow( {
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
} ) {
	return (
		<div className={ "flex min-w-0 items-start justify-between gap-3" }>
			<Typography className={ "min-w-0 whitespace-normal break-words text-xs text-muted sm:text-sm" }>
				{ label }
			</Typography>
			<Typography className={ "min-w-0 whitespace-normal break-words text-right text-xs font-medium sm:text-sm" }>
				{ value }
			</Typography>
		</div>
	);
}
