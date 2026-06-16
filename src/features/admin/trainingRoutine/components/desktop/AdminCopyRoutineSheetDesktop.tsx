"use client";

import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Copy } from "@gravity-ui/icons";

import {
	AdminCopyRoutineSheetInnerDesktop,
	type AdminCopyRoutineSheetInnerProps,
} from "./AdminCopyRoutineSheetInnerDesktop";

export type AdminCopyRoutineSheetDesktopProps = AdminCopyRoutineSheetInnerProps;

export function AdminCopyRoutineSheetDesktop( props: AdminCopyRoutineSheetDesktopProps ) {
	return (
		<Sheet isDetached placement={ "right" }>
			<Sheet.Trigger>
				<Button
					variant={ "outline" }
					className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				>
					<Copy/>
					Copiar desde otro mes
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content>
					<Sheet.Dialog className={ "flex h-full max-h-screen min-h-0 flex-col" }>
						<AdminCopyRoutineSheetInnerDesktop { ...props } />
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
