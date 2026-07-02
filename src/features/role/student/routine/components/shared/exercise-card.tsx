import type { ReactNode } from "react";
import { Card, Chip } from "@heroui/react";
import type { Exercise } from "@/features/routine/types/routine-types";
import { ArrowRightArrowLeft } from "@gravity-ui/icons";

interface ExerciseCardProps {
	exercise: Exercise;
	children: ReactNode;
}

export default function ExerciseCard( { exercise, children }: ExerciseCardProps ) {
	return (
		<Card className={ "border-l-6 border-accent" }>
			<Card.Header className={ "pb-2" }>
				<Card.Title className={ "text-xl font-bold text-foreground" }>
					Press con Mancuerna
				</Card.Title>
				<Card.Content>
					<div className={ "flex flex-col gap-2" }>
						<Chip size={ "lg" } className={ "mt-2 px-2 py-1" } variant={ "soft" } color={ "success" }>
							<ArrowRightArrowLeft className={ "mr-1 size-3.5" }/>
							Sustituye { exercise.name }
						</Chip>
						<div className={ "flex flex-wrap items-center gap-2" }>
							<span className={ "text-sm text-muted" }>Última sesión:</span>
							{ exercise.sets.map( ( set, idx ) => (
								<Chip key={ idx } size={ "sm" } className={ "px-2" }>
									<Chip.Label>
										{ set.setNumber } x { set.previousReps } - { set.previousWeight }kg
									</Chip.Label>
								</Chip>
							) ) }
						</div>
					</div>
				</Card.Content>
			</Card.Header>
			<Card.Content className={ "pt-2" }>{ children }</Card.Content>
		</Card>
	);
}

