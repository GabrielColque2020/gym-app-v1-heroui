"use client";

import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Copy } from "@gravity-ui/icons";

import {
	AdminCopyRoutineSheetInnerDesktop,
	type AdminCopyRoutineSheetInnerProps,
} from "../desktop/AdminCopyRoutineSheetInnerDesktop";
import { AdminCopyRoutineSheetInnerMobile } from "@/features/admin/taining/components/mobile/AdminCopyRoutineSheetInnerMobile";

export type AdminCopyRoutineSheetMobileProps = AdminCopyRoutineSheetInnerProps;

export function AdminCopyRoutineSheetMobile( props: AdminCopyRoutineSheetMobileProps ) {
	return (
		<Sheet isDetached placement={ "bottom" }>
			<Sheet.Trigger>
				<Button
					variant={ "outline" }
					className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				>
					<Copy className={ "size-4" }/>
					Copiar desde otro mes
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "blur" }>
				<Sheet.Content className={ "mx-auto flex max-h-[92vh] w-full max-w-140 flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl" }>
					<Sheet.Handle/>
					<Sheet.Dialog className={ "flex min-h-0 flex-1 flex-col" }>
						<AdminCopyRoutineSheetInnerMobile { ...props } />
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
