import { Button, Card } from "@heroui/react";
import { Plus } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";

import type { ExerciseVariantsTarget } from "./exercise-variants-drawer.types";

type ExerciseCandidateRowProps = {
	candidate: ExerciseVariantsTarget;
	isDisabled: boolean;
	onAdd: ( candidate: ExerciseVariantsTarget ) => void | Promise<void>;
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
					<div className={ "flex min-w-0 flex-1 items-center gap-3" }>
						<AsyncMedia
							alt={ `Imagen de ${ candidate.name }` }
							className={ "size-10 shrink-0 rounded-lg border border-border" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ candidate.name }` }
							src={ candidate.imageUrl }
						/>
						<div className={ "min-w-0" }>
							<p className={ "truncate text-sm font-medium text-foreground" }>{ candidate.name }</p>
							<p className={ "truncate text-xs text-muted" }>
								{ formatBodyPart( candidate.bodyPart ) }
								{ candidate.active ? " · Activo" : " · Inactivo" }
							</p>
						</div>
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
