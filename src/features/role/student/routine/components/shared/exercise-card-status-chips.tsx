import { Chip } from "@heroui/react";

type ExerciseCardStatusChipsProps = {
	baseName: string;
	completedSets: number;
	hasCompletedSets: boolean;
	isCompact?: boolean;
	isVariantSelected: boolean;
	label: string;
	totalSets: number;
};

export function ExerciseCardStatusChips( {
	baseName,
	completedSets,
	hasCompletedSets,
	isCompact = false,
	isVariantSelected,
	label,
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
				<Chip.Label>{ `Series completadas: ${ completedSets }/${ totalSets }` }</Chip.Label>
			</Chip>
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
