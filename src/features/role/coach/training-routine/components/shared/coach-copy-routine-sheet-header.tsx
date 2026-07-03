"use client";

import { Copy } from "@gravity-ui/icons";
import { Chip, Typography } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

type CoachCopyRoutineSheetHeaderProps = {
	destLabel: string;
	hasActiveRoutine?: boolean;
};

export function CoachCopyRoutineSheetHeader( {
	destLabel,
	hasActiveRoutine = true,
}: CoachCopyRoutineSheetHeaderProps ) {
	return (
		<Sheet.Header className={ "border-default-100 relative border-b px-4 pb-3 pt-3 sm:px-6 sm:pb-5 sm:pt-5" }>
			<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
				<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent sm:size-10" }>
					<Copy className={ "size-4 sm:size-5" }/>
				</div>
				<div className={ "min-w-0 flex-1" }>
					<Sheet.Heading>Copiar rutina</Sheet.Heading>
					<div className={ "mt-1 flex min-w-0 flex-wrap items-center gap-2" }>
						<Typography className={ "text-sm text-muted" }>Destino</Typography>
						<Typography className={ "text-sm font-semibold" }>{ destLabel }</Typography>
						{ hasActiveRoutine ? (
							<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
								Rutina activa
							</Chip>
						) : null }
					</div>
				</div>
			</div>
		</Sheet.Header>
	);
}
