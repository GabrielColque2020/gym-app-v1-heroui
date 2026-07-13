import { Button, Card } from "@heroui/react";
import { Plus } from "lucide-react";

import { formatBodyPart } from "@/features/exercises/services/exercise-form";

import type { ExerciseVariantsTarget } from "./exercise-variants-drawer.types";

type ExerciseCandidateRowProps = {
	candidate: ExerciseVariantsTarget;
	isDisabled: boolean;
	onAdd: ( candidate: ExerciseVariantsTarget ) => void;
};

export function ExerciseCandidateRow( {
										  candidate,
										  isDisabled,
										  onAdd,
									  }: ExerciseCandidateRowProps ) {
	return (
		<Card className={ "border border-border py-1" }>
			<Card.Content className={ "py-3 px-1" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div className={ "min-w-0 flex-1" }>
						<p className={ "truncate text-sm font-medium text-foreground" }>{ candidate.name }</p>
						<p className={ "truncate text-xs text-muted" }>
							{ formatBodyPart( candidate.bodyPart ) }
							{ candidate.active ? " · Activo" : " · Inactivo" }
						</p>
					</div>
					<Button
						className={ "shrink-0" }
						isDisabled={ isDisabled }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ () => onAdd( candidate ) }
					>
						<Plus className={ "size-4" }/>
						Agregar
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
