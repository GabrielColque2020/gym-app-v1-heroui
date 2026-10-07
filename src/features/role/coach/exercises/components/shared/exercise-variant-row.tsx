import { Button, Card } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
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
			<Card.Content className={ "px-1 py-1.5" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div className={ "flex min-w-0 flex-1 items-center gap-3" }>
						<MediaPreviewThumbnail
							imageUrl={ variant.exercise.imageUrl }
							name={ variant.exercise.name }
							videoUrl={ variant.exercise.videoUrl }
						/>
						<div className={ "min-w-0" }>
							<p className={ "line-clamp-4 text-sm font-medium leading-5 text-foreground" }>{ variant.exercise.name }</p>
							<p className={ "truncate text-xs text-muted" }>
								{ formatBodyPart( variant.exercise.bodyPart ) }
								{ variant.exercise.active ? "" : " · Inactivo" }
							</p>
						</div>
					</div>
					<Button
						className={ "shrink-0" }
						isIconOnly
						aria-label={ `Quitar la variante ${ variant.exercise.name }` }
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
