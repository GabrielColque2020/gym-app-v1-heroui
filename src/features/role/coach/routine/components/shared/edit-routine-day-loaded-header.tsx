"use client";

import { Card } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { CoachEditRoutineHeader } from "@/features/role/coach/routine/components/shared/coach-edit-routine-header";

type EditRoutineDayLoadedHeaderProps = {
	backHref: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	description: string;
	isSaveDisabled: boolean;
	isSaving: boolean;
	onSave: () => void;
	title: string;
};

export function EditRoutineDayLoadedHeader( {
	backHref,
	breadcrumbs,
	description,
	isSaveDisabled,
	isSaving,
	onSave,
	title,
}: EditRoutineDayLoadedHeaderProps ) {
	return (
		<>
			<PageBreadcrumbs backHref={ backHref } backLabel={ "Volver a rutina" } crumbs={ breadcrumbs }/>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<CoachEditRoutineHeader
					description={ description }
					isSaveDisabled={ isSaveDisabled }
					isSaving={ isSaving }
					title={ title }
					onSave={ onSave }
				/>
			</Card>
		</>
	);
}
