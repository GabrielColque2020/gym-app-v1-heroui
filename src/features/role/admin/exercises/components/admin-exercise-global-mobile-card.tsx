"use client";

import { Card, Chip } from "@heroui/react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
import { AdminExerciseGlobalRowActions } from "@/features/role/admin/exercises/components/admin-exercise-global-row-actions";
import { formatAdminExerciseCode, type AdminExerciseGlobalRow } from "@/features/role/admin/exercises/hooks/use-admin-exercise-globals-page-state";

type AdminExerciseGlobalMobileCardProps = {
	exercise: AdminExerciseGlobalRow;
};

// Fila compacta: son mas de mil ejercicios, conviene que entren varios por pantalla.
export function AdminExerciseGlobalMobileCard( {
	exercise,
}: AdminExerciseGlobalMobileCardProps ) {
	const details = [ exercise.category, exercise.target, exercise.equipment ].filter( Boolean ).join( " · " );

	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "flex flex-row items-center gap-3 p-2" }>
				{ /* En el telefono se abre al tocar la imagen y se cierra al tocar afuera. */ }
				<MediaPreviewThumbnail
					imageUrl={ exercise.imageUrl }
					name={ exercise.name }
					thumbnailClassName={ "size-14" }
					videoUrl={ exercise.videoUrl }
				/>
				<div className={ "min-w-0 flex-1 space-y-0.5" }>
					<p className={ "line-clamp-3 text-sm font-semibold leading-snug text-foreground" }>{ exercise.name }</p>
					<p className={ "truncate text-xs text-muted" }>{ details }</p>
					<p className={ exercise.sameNameCount > 1 ? "truncate text-xs font-medium text-warning" : "truncate text-xs text-muted" }>
						{ exercise.sameNameCount > 1 ? `Hay ${ exercise.sameNameCount } con este nombre · ` : "" }
						{ formatAdminExerciseCode( exercise ) }
					</p>
					{ exercise.active ? null : (
						<Chip color={ "danger" } size={ "sm" } variant={ "soft" }>Inactivo</Chip>
					) }
				</div>
				<AdminExerciseGlobalRowActions exercise={ exercise }/>
			</Card.Content>
		</Card>
	);
}
