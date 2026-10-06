import type { StudentTrainingRoutineDay } from "@/features/role/student/training-routine/actions/get-training-routines-by-student";

import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { CheckCircle2, CircleDashed, Dumbbell, Play } from "lucide-react";

import {
	getTrainingRoutineDayDescription,
	getTrainingRoutineDayStatus,
	getTrainingRoutineDayTitle,
} from "@/features/role/student/training-routine/components/training-routines-day-card.utils";

type TrainingRoutinesDayCardProps = {
	day: StudentTrainingRoutineDay;
};

export function TrainingRoutinesDayCard( { day }: TrainingRoutinesDayCardProps ) {
	const status = getTrainingRoutineDayStatus( day );

	return (
		<Card className={ "w-full border border-border shadow-sm py-2" }>
			<div className={ "flex flex-1 flex-col gap-3" }>
				<Card.Header className={ "gap-1 px-3 pt-3" }>
					<Card.Title className={ "relative pr-8" }>
						<span className={ "text-lg font-bold text-foreground" }>
							{ getTrainingRoutineDayTitle( day.dayNumber ) }
						</span>
						<Chip
							className={ "absolute right-0 top-0 z-10" }
							color={ status.color }
							size={ "md" }
							variant={ "soft" }
						>
							{ day.isFinalized
								? <CheckCircle2 className={ "size-3" }/>
								: day.loadedSetCount > 0 ? <Play className={ "size-3" }/> : <CircleDashed className={ "size-3" }/> }
							<Chip.Label>
								{ status.label }
							</Chip.Label>
						</Chip>
					</Card.Title>
					<Card.Description>
						{ getTrainingRoutineDayDescription( day ) }
					</Card.Description>
				</Card.Header>
				<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 px-3 pb-3" }>
					<Link className={ "w-full text-center" } href={ `/student/routine?routineDayId=${ day.id }` }>
						{ /* El dia en curso es el que hay que retomar: su boton es el que resalta. */ }
						<Button className={ "w-full" } variant={ status.label === "En curso" ? "primary" : "secondary" }>
							<Dumbbell/>
							{ status.actionLabel }
						</Button>
					</Link>
				</Card.Footer>
			</div>
		</Card>
	);
}
