"use client";

import { IconButton } from "../../../components/ui/icon-button";
import { Eye, PencilLine, Trash2 } from "lucide-react";

export interface RowActionsProps {
	employeeId: string;
}

export function RowActions( { employeeId }: RowActionsProps ) {
	return (
		<div className={ "flex items-center justify-end gap-0.5" } data-employee-id={ employeeId }>
			<IconButton label={ "View" } size={ "sm" } variant={ "tertiary" }>
				<Eye className={ "size-4" }/>
			</IconButton>
			<IconButton label={ "Edit" } size={ "sm" } variant={ "tertiary" }>
				<PencilLine className={ "size-4" }/>
			</IconButton>
			<IconButton label={ "Delete" } size={ "sm" } variant={ "danger-soft" }>
				<Trash2 className={ "size-4" }/>
			</IconButton>
		</div>
	);
}
