"use client";

import { IconButton } from "../../../components/ui/icon-button";
import { Eye, PencilLine, Trash2 } from "lucide-react";

export interface OrdersRowActionsProps {
	orderId: string;
}

export function OrdersRowActions( { orderId }: OrdersRowActionsProps ) {
	return (
		<div className={ "flex items-center justify-end gap-0.5" } data-order-id={ orderId }>
			<IconButton label={ "View order" } size={ "sm" } variant={ "tertiary" }>
				<Eye className={ "size-4" }/>
			</IconButton>
			<IconButton label={ "Edit order" } size={ "sm" } variant={ "tertiary" }>
				<PencilLine className={ "size-4" }/>
			</IconButton>
			<IconButton label={ "Delete order" } size={ "sm" } variant={ "danger-soft" }>
				<Trash2 className={ "size-4" }/>
			</IconButton>
		</div>
	);
}
