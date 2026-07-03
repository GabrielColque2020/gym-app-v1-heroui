"use client";

import { Card, Chip } from "@heroui/react";

type CoachTrainingRoutineCardMobileHeaderProps = {
	routineCount: number;
};

export function CoachTrainingRoutineCardMobileHeader( {
	routineCount,
}: CoachTrainingRoutineCardMobileHeaderProps ) {
	return (
		<Card.Header className={ "gap-3 pb-3 pt-4" }>
			<Card.Content className={ "min-w-0" }>
				<Card.Title className={ "text-base font-semibold" }>
					Rutina del mes
				</Card.Title>
				<Card.Description className={ "text-sm" }>
					Gestiona semanas y dias
				</Card.Description>
			</Card.Content>
			<Chip
				className={ "w-fit shrink-0 px-2" }
				color={ "accent" }
				size={ "sm" }
				variant={ "soft" }
			>
				{ routineCount } semanas
			</Chip>
		</Card.Header>
	);
}
