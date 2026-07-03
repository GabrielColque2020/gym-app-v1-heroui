import type { Key } from "react-aria-components/Breadcrumbs";
import type { StudentTrainingRoutine } from "@/features/role/student/training-routine/actions/get-training-routines-by-student";

import { Segment } from "@heroui-pro/react";

type TrainingRoutinesWeekSelectorProps = {
	activeMonth: number;
	activeYear: number;
	onSelectionChange: ( key: Key ) => void;
	routines: StudentTrainingRoutine[];
};

export function TrainingRoutinesWeekSelector( {
	activeMonth,
	activeYear,
	onSelectionChange,
	routines,
}: TrainingRoutinesWeekSelectorProps ) {
	if (routines.length === 0) return null;

	return (
		<div className={ "flex justify-center sm:justify-end" }>
			<Segment
				className={ "w-full max-w-full sm:w-auto" }
				defaultSelectedKey={ routines[ 0 ]?.id }
				key={ `${ activeMonth }-${ activeYear }-${ routines[ 0 ]?.id ?? "empty" }` }
				size={ "md" }
				onSelectionChange={ onSelectionChange }
			>
				{ routines.map( ( routine ) => (
					<Segment.Item key={ routine.id } id={ routine.id }>
						<Segment.Separator/>
						<span className={ "text-xs sm:text-sm" }>{ `Semana ${ routine.week }` }</span>
					</Segment.Item>
				) ) }
			</Segment>
		</div>
	);
}
