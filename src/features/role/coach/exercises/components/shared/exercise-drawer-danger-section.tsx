"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CircleSlash, Trash2 } from "lucide-react";

import { useCoachExerciseStatusAction } from "@/features/role/coach/exercises/hooks/use-coach-exercise-status-action";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { DeactivateConfirmModal } from "@/features/shared/components/deactivate-confirm-modal";

type ExerciseDrawerDangerSectionProps = {
	exercise: CoachExerciseListItem;
	// Se llama cuando el ejercicio quedo desactivado, para cerrar el formulario.
	onDeactivatedAction: () => void;
	// Pide eliminar el ejercicio: quien abrio el formulario lo cierra y muestra
	// la confirmacion. Sin valor, este ejercicio no se puede eliminar.
	onRequestDeleteAction?: () => void;
};

// Desactivar y eliminar viven al final del formulario de edicion y no en la
// lista: se usan poco y son las dos acciones que sacan un ejercicio de uso.
export function ExerciseDrawerDangerSection( {
	exercise,
	onDeactivatedAction,
	onRequestDeleteAction,
}: ExerciseDrawerDangerSectionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const { changeStatus, isPending } = useCoachExerciseStatusAction( { exercise } );

	if (!exercise.active && !onRequestDeleteAction) return null;

	return (
		<section className={ "space-y-3 rounded-xl border border-danger/30 p-3" }>
			{ exercise.active ? (
				<div className={ "space-y-2" }>
					<div>
						<h3 className={ "text-sm font-semibold text-foreground" }>Desactivar ejercicio</h3>
						<p className={ "mt-0.5 text-xs leading-5 text-muted" }>
							Deja de aparecer al armar rutinas y al elegir variantes. Las rutinas que ya lo tienen lo conservan, y lo podés restaurar desde la lista.
						</p>
					</div>
					<Button
						className={ "border border-danger/40 text-danger" }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ () => setIsConfirmOpen( true ) }
					>
						<CircleSlash className={ "size-4" }/>
						Desactivar
					</Button>
				</div>
			) : null }

			{ onRequestDeleteAction ? (
				<div className={ "space-y-2" }>
					<div>
						<h3 className={ "text-sm font-semibold text-foreground" }>Eliminar ejercicio</h3>
						<p className={ "mt-0.5 text-xs leading-5 text-muted" }>
							Lo borra de tu catálogo para siempre. No se puede deshacer.
						</p>
					</div>
					<Button
						className={ "border border-danger/40 text-danger" }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ onRequestDeleteAction }
					>
						<Trash2 className={ "size-4" }/>
						Eliminar permanentemente
					</Button>
				</div>
			) : null }

			<DeactivateConfirmModal
				description={ "Deja de aparecer al armar rutinas y al elegir variantes. Las rutinas que ya lo tienen lo conservan. Lo podés restaurar cuando quieras." }
				isOpen={ isConfirmOpen }
				isPending={ isPending }
				title={ `Desactivar ${ exercise.name }` }
				onConfirmAction={ async () => {
					await changeStatus();
					onDeactivatedAction();
				} }
				onOpenChangeAction={ setIsConfirmOpen }
			/>
		</section>
	);
}
