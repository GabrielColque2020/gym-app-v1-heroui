import type { StudentTrainingRoutineDay } from "@/features/role/student/training-routine/actions/get-training-routines-by-student";

import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

import {
	getTrainingRoutineDayDescription,
	getTrainingRoutineDayStatusColor,
	getTrainingRoutineDayStatusLabel,
	getTrainingRoutineDayTitle,
} from "@/features/role/student/training-routine/components/training-routines-day-card.utils";

type TrainingRoutinesDayCardProps = {
	day: StudentTrainingRoutineDay;
};

export function TrainingRoutinesDayCard( { day }: TrainingRoutinesDayCardProps ) {
	return (
		<Card className={ "w-full border border-border/70 shadow-sm" }>
			<div className={ "flex flex-1 flex-col gap-3" }>
				<Card.Header className={ "gap-1" }>
					<Card.Title className={ "relative pr-8" }>
						<span className={ "text-lg font-bold text-foreground" }>
							{ getTrainingRoutineDayTitle( day.dayNumber ) }
						</span>
						<Chip
							className={ "absolute right-0 top-0 z-10" }
							color={ getTrainingRoutineDayStatusColor( day.isFinalized ) }
							size={ "md" }
							variant={ "soft" }
						>
							<CheckCircle2 className={ "size-3" }/>
							<Chip.Label>
								{ getTrainingRoutineDayStatusLabel( day.isFinalized ) }
							</Chip.Label>
						</Chip>
					</Card.Title>
					<Card.Description>
						{ getTrainingRoutineDayDescription( day ) }
					</Card.Description>
				</Card.Header>
				<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3" }>
					<Link className={ "w-full text-center" } href={ `/student/routine?routineDayId=${ day.id }` }>
						<Button className={ "w-full" } variant={ "secondary" }>
							Ver rutina
						</Button>
					</Link>
				</Card.Footer>
			</div>
		</Card>
	);
}
