"use client";

import { Button } from "@heroui/react";
import { Copy } from "@gravity-ui/icons";
import { useState } from "react";

import {
	AdminCopyRoutineSheetInnerMobile,
	type AdminCopyRoutineSheetInnerProps,
} from "@/features/admin/trainingRoutine/components/mobile/AdminCopyRoutineSheetInnerMobile";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";
import { AdminCopyRoutineSheetInnerDesktop } from "@/features/admin/trainingRoutine/components/desktop/AdminCopyRoutineSheetInnerDesktop";

export type AdminCopyRoutineSheetContentProps = AdminCopyRoutineSheetInnerProps;

export function AdminCopyRoutineSheet( props: AdminCopyRoutineSheetContentProps ) {
	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";
	return (
		<FeatureSheetLayout
			placement={ placement }
			trigger={
				<Button
					variant={ "outline" }
					className={ isMobile
						? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
						: "bg-surface border border-accent/50 text-accent shadow-sm"
					}
				>
					<Copy className={ "size-4" }/>
					{ !isMobile && "Copiar desde otro mes" }
				</Button>
			}
		>
			{
				isMobile
					? <AdminCopyRoutineSheetInnerMobile { ...props } />
					: <AdminCopyRoutineSheetInnerDesktop { ...props } />

			}
		</FeatureSheetLayout>
	);
}
