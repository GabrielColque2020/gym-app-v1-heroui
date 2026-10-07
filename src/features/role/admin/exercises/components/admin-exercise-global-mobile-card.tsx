"use client";

import { Card, Chip } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
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
				<AsyncMedia
					alt={ `Imagen de ${ exercise.name }` }
					className={ "size-14 shrink-0 rounded-xl border border-border" }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
					src={ exercise.imageUrl }
				/>
				<div className={ "min-w-0 flex-1 space-y-0.5" }>
					<p className={ "line-clamp-2 text-sm font-semibold leading-snug text-foreground" }>{ exercise.name }</p>
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
