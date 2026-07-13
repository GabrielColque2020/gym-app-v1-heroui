import { Button, Card } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { formatBodyPart } from "@/features/exercises/services/exercise-form";

import type { DraftVariantItem } from "./exercise-variants-drawer.types";

type ExerciseVariantRowProps = {
	isRemoveDisabled: boolean;
	onRemove: ( variantExerciseId: string ) => void;
	variant: DraftVariantItem;
};

export function ExerciseVariantRow( {
										isRemoveDisabled,
										onRemove,
										variant,
									}: ExerciseVariantRowProps ) {
	return (
		<Card className={ "border border-border py-1" } variant={ "secondary" }>
			<Card.Content className={ "py-3 px-1" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div className={ "min-w-0 flex-1" }>
						<p className={ "truncate text-sm font-medium text-foreground" }>{ variant.exercise.name }</p>
						<p className={ "truncate text-xs text-muted" }>
							{ formatBodyPart( variant.exercise.bodyPart ) }
							{ variant.exercise.active ? " · Activo" : " · Inactivo" }
						</p>
					</div>
					<Button
						className={ "shrink-0" }
						isIconOnly
						aria-label={ `Eliminar variante ${ variant.exercise.name }` }
						isDisabled={ isRemoveDisabled }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ () => onRemove( variant.exercise.id ) }
					>
						<Trash2 className={ "size-4 text-danger" }/>
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
