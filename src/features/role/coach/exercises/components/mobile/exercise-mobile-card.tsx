"use client";

import { Card, Chip } from "@heroui/react";
import { useState } from "react";

import { AsyncMedia } from "@/components/common";
import { ExerciseRowActions } from "@/features/role/coach/exercises/components/desktop/exercise-row-actions";
import { formatCoachExerciseSource, formatCoachExerciseSummary } from "@/features/role/coach/exercises/services/coach-exercise-formatters";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

type ExerciseMobileCardProps = {
	exercise: CoachExerciseListItem;
};

export function ExerciseMobileCard( {
	exercise,
}: ExerciseMobileCardProps ) {
	const [ isDetailOpen, setIsDetailOpen ] = useState( false );

	return (
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 p-2.5 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "p-0" }>
				<div className={ "flex items-start gap-1" }>
					{ /* Tocar la fila abre la ficha: imagen grande, video e instrucciones. */ }
					<button
						aria-label={ `Ver ${ exercise.name }` }
						className={ "flex min-w-0 flex-1 items-start gap-3 text-left" }
						type={ "button" }
						onClick={ () => setIsDetailOpen( true ) }
					>
						<AsyncMedia
							alt={ `Imagen de ${ exercise.name }` }
							className={ "h-14 w-14 shrink-0 rounded-xl border border-border text-accent" }
							emptyLabel={ "Sin imagen" }
							spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
							src={ exercise.imageUrl }
						/>

						<div className={ "min-w-0 flex-1" }>
							{ /* Dos renglones: muchos nombres del catalogo solo se distinguen por el final. */ }
							<h3 className={ "line-clamp-4 text-sm font-semibold leading-5 text-foreground" }>{ exercise.name }</h3>
							<p className={ "mt-0.5 truncate text-xs text-muted" }>{ formatCoachExerciseSummary( exercise ) || "Sin datos adicionales" }</p>
							{ /* Solo se marca lo que se sale de lo comun: casi todo es del catalogo y esta activo. */ }
							{ exercise.sourceType === "coach" || !exercise.active ? (
								<div className={ "mt-1 flex flex-wrap gap-1.5" }>
									{ exercise.sourceType === "coach" ? (
										<Chip color={ exercise.isOverride ? "warning" : "accent" } size={ "sm" } variant={ "soft" }>
											{ formatCoachExerciseSource( exercise ) }
										</Chip>
									) : null }
									{ !exercise.active ? (
										<Chip color={ "danger" } size={ "sm" } variant={ "soft" }>
											Inactivo
										</Chip>
									) : null }
								</div>
							) : null }
						</div>
					</button>

					{ /* El lapiz edita; desactivar y eliminar estan dentro del formulario. */ }
					<ExerciseRowActions
						isCompact
						exercise={ exercise }
						isDetailOpen={ isDetailOpen }
						onDetailOpenChangeAction={ setIsDetailOpen }
					/>
				</div>
			</Card.Content>

		</Card>
	);
}
