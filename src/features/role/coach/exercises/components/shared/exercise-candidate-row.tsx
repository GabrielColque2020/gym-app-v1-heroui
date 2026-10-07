import { Button, Card } from "@heroui/react";
import { Plus } from "lucide-react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
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
	// Con que se hace y que trabaja: es lo que distingue una variante de otra.
	const summary = [ candidate.equipment, candidate.target ]
		.map( ( part ) => part?.trim() ?? "" )
		.filter( Boolean )
		.join( " · " ) || formatBodyPart( candidate.bodyPart );
	const catalogCode = candidate.externalId?.trim() || null;
	const duplicateNote = ( candidate.sameNameCount ?? 1 ) > 1
		? [
			`Hay ${ candidate.sameNameCount } con este nombre`,
			catalogCode ? `cód. ${ catalogCode }` : null,
		].filter( Boolean ).join( " · " )
		: null;

	return (
		<Card className={ "border border-border py-1" }>
			<Card.Content className={ "px-1 py-1.5" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div className={ "flex min-w-0 flex-1 items-center gap-3" }>
						<MediaPreviewThumbnail imageUrl={ candidate.imageUrl } name={ candidate.name } videoUrl={ candidate.videoUrl }/>
						<div className={ "min-w-0" }>
							<p className={ "line-clamp-4 text-sm font-medium leading-5 text-foreground" }>{ candidate.name }</p>
							<p className={ "truncate text-xs text-muted" }>{ summary }</p>
							{ duplicateNote ? <p className={ "truncate text-xs text-warning" }>{ duplicateNote }</p> : null }
						</div>
					</div>
					<Button
						isIconOnly
						aria-label={ `Agregar ${ candidate.name } como variante` }
						className={ "shrink-0" }
						isDisabled={ isDisabled }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ () => onAdd( candidate ) }
					>
						<Plus className={ "size-4" }/>
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
