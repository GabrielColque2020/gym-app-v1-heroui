import { Chip } from "@heroui/react";

import type { ExerciseSessionHistory } from "@/features/routine/types/routine-exercise.types";

type ExerciseCardSessionHistoryProps = {
	history: ExerciseSessionHistory | null;
	isCompact?: boolean;
};

function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

export function ExerciseCardSessionHistory( {
												history,
												isCompact = false,
											}: ExerciseCardSessionHistoryProps ) {
	if (!history?.sets.length) {
		return (
			<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
				<Chip.Label>Sin registro anterior</Chip.Label>
			</Chip>
		);
	}

	const containerClassName = isCompact
		? "flex flex-wrap items-center gap-2"
		: "flex items-center gap-3 whitespace-nowrap overflow-x-auto pb-1";
	const chipClassName = isCompact ? undefined : "shrink-0";

	return (
		<div className={ containerClassName }>
			<Chip className={ chipClassName } size={ "sm" } variant={ "soft" }>
				<Chip.Label>{ formatSessionDateLabel( history.date ) }</Chip.Label>
			</Chip>
			{ history.sets.map( ( set, index ) => (
				<Chip
					key={ `${ history.date.toISOString() }-${ set.setNumber }-${ index }` }
					className={ chipClassName }
					size={ "sm" }
					variant={ "soft" }
				>
					<Chip.Label>{ `${ String( set.setNumber ).padStart( 2, "0" ) } x ${ set.repsCompleted ?? 0 } reps · ${ set.weightUsed ?? 0 } kg` }</Chip.Label>
				</Chip>
			) ) }
		</div>
	);
}

