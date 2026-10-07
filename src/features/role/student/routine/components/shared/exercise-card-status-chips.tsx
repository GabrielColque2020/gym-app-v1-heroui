import { Chip } from "@heroui/react";
import { Timer } from "lucide-react";

import { formatRestSeconds } from "@/features/routine/services/rest-seconds";

type ExerciseCardStatusChipsProps = {
	baseName: string;
	completedSets: number;
	hasCompletedSets: boolean;
	isCompact?: boolean;
	isVariantSelected: boolean;
	label: string;
	// Descanso entre series que fijo el entrenador, si lo hay.
	restSeconds?: number | null;
	totalSets: number;
};

export function ExerciseCardStatusChips( {
	baseName,
	completedSets,
	hasCompletedSets,
	isCompact = false,
	isVariantSelected,
	label,
	restSeconds = null,
	totalSets,
}: ExerciseCardStatusChipsProps ) {
	const chipClassName = isCompact ? undefined : "shrink-0";
	const size = isCompact ? "sm" : "md";

	return (
		<>
			<Chip className={ chipClassName } color={ "default" } size={ size } variant={ "soft" }>
				{ label }
			</Chip>
			<Chip
				className={ chipClassName }
				color={ hasCompletedSets ? "success" : "default" }
				size={ size }
				variant={ "soft" }
			>
				<Chip.Label>{ `${ completedSets }/${ totalSets } series` }</Chip.Label>
			</Chip>
			{ restSeconds ? (
				<Chip className={ chipClassName } color={ "accent" } size={ size } variant={ "soft" }>
					<Timer className={ "size-3.5" }/>
					<Chip.Label>{ `Descanso ${ formatRestSeconds( restSeconds ) }` }</Chip.Label>
				</Chip>
			) : null }
			{ isVariantSelected ? (
				<Chip className={ chipClassName } color={ "warning" } size={ size } variant={ "soft" }>
					<Chip.Label>Ejercicio cambiado</Chip.Label>
				</Chip>
			) : null }
			{ isVariantSelected ? (
				<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
					<Chip.Label>{ `Original: ${ baseName }` }</Chip.Label>
				</Chip>
			) : null }
		</>
	);
}

