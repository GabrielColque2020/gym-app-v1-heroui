"use client";
import { Button } from "@heroui/react";
import { Copy } from "@gravity-ui/icons";
import {
	AdminCopyRoutineSheetInnerMobile,
	type AdminCopyRoutineSheetInnerProps,
} from "@/features/role/admin/training-routine/components/mobile/AdminCopyRoutineSheetInnerMobile";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";
import { AdminCopyRoutineSheetInnerDesktop } from "@/features/role/admin/training-routine/components/desktop/AdminCopyRoutineSheetInnerDesktop";

export type AdminCopyRoutineSheetContentProps = AdminCopyRoutineSheetInnerProps;

export function AdminCopyRoutineSheet(
	props: AdminCopyRoutineSheetContentProps,
) {
	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";
	return (
		<FeatureSheetLayout
			placement={ placement }
			rightContentClassName={ "w-[42rem]" }
			trigger={
				<Button
					variant={ "outline" }
					className={
						isMobile
							? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
							: "bg-surface border border-accent/50 text-accent shadow-sm"
					}
				>
					<Copy className={ "size-4" }/> { !isMobile && "Copiar rutina" }
				</Button>
			}
		>
			{ isMobile ? (
				<AdminCopyRoutineSheetInnerMobile { ...props } />
			) : (
				<AdminCopyRoutineSheetInnerDesktop { ...props } />
			) }
		</FeatureSheetLayout>
	);
}
