"use client";

import { Button, Spinner, toast } from "@heroui/react";
import { Eye, PencilLine, RotateCcw } from "lucide-react";
import { useState } from "react";

import {
	CoachDeleteExerciseDrawer
} from "@/features/role/coach/exercises/components/shared/coach-delete-exercise-drawer";
import { ExerciseDetailDrawer } from "@/features/role/coach/exercises/components/shared/exercise-detail-drawer";
import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import { useDeleteCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import { useCoachExerciseStatusAction } from "@/features/role/coach/exercises/hooks/use-coach-exercise-status-action";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type ExerciseRowActionsProps = {
	exercise: CoachExerciseListItem;
	// En la tarjeta del telefono tocar la tarjeta ya abre la ficha: no hace falta
	// "Ver", y "Editar" va solo con el lapiz para no sacarle lugar al nombre.
	isCompact?: boolean;
	// La tarjeta abre la ficha desde afuera (al tocarla): maneja ella el estado.
	isDetailOpen?: boolean;
	onDetailOpenChangeAction?: ( isOpen: boolean ) => void;
};

// Las acciones de un ejercicio a la vista, cada una con su nombre: "Ver" y
// "Editar", y "Restaurar" si esta inactivo. Desactivar y eliminar estan al final
// del formulario de edicion: antes compartian un menu de tres puntos con
// "Editar", lo mas usado al lado de lo mas grave.
export function ExerciseRowActions( {
	exercise,
	isCompact = false,
	isDetailOpen: controlledIsDetailOpen,
	onDetailOpenChangeAction,
}: ExerciseRowActionsProps ) {
	const [ internalIsDetailOpen, setInternalIsDetailOpen ] = useState( false );
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const { changeStatus, isPending } = useCoachExerciseStatusAction( { exercise } );
	const deleteCoachExercise = useDeleteCoachExercise();
	const placement = useResponsiveDrawerPlacement();
	const canDeleteExercise = exercise.sourceType === "coach" && Boolean( exercise.coachExerciseId );
	const isDetailOpen = controlledIsDetailOpen ?? internalIsDetailOpen;
	const setIsDetailOpen = onDetailOpenChangeAction ?? setInternalIsDetailOpen;

	async function handleConfirmDelete() {
		try {
			await deleteCoachExercise.mutateAsync( exercise.id );
			setIsDeleteOpen( false );
			toast.success( "Ejercicio eliminado", {
				description: "Se borró de tu catálogo.",
			} );
		} catch {
			// El motivo queda a la vista dentro de la confirmacion, que sigue abierta.
		}
	}

	async function handleDeactivateInstead() {
		if (await changeStatus()) {
			setIsDeleteOpen( false );
		}
	}

	return (
		<>
			<div className={ "flex shrink-0 items-center gap-2" }>
				{ isCompact ? null : (
					<Button
						aria-label={ `Ver ${ exercise.name }` }
						className={ "shrink-0" }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ () => setIsDetailOpen( true ) }
					>
						<Eye className={ "size-4" }/>
						Ver
					</Button>
				) }
				{ /* Restaurar es de un toque, sin confirmar: no le saca nada a nadie. */ }
				{ exercise.active ? null : (
					<Button
						aria-label={ `Restaurar ${ exercise.name }` }
						// En la tarjeta va solo el icono: con el texto, el nombre del
						// ejercicio quedaba en una columna de tres letras.
						className={ isCompact ? "size-9 shrink-0" : "shrink-0" }
						isDisabled={ isPending }
						isIconOnly={ isCompact }
						size={ "sm" }
						variant={ "secondary" }
						onPress={ () => void changeStatus() }
					>
						{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <RotateCcw className={ "size-4" }/> }
						{ isCompact ? null : "Restaurar" }
					</Button>
				) }
				<Button
					aria-label={ `Editar ${ exercise.name }` }
					className={ isCompact ? "size-9 shrink-0" : "shrink-0" }
					isIconOnly={ isCompact }
					size={ "sm" }
					variant={ "secondary" }
					onPress={ () => setIsEditOpen( true ) }
				>
					<PencilLine className={ "size-4" }/>
					{ isCompact ? null : "Editar" }
				</Button>
			</div>

			<ExerciseDetailDrawer
				exercise={ exercise }
				isOpen={ isDetailOpen }
				onEditAction={ () => {
					setIsDetailOpen( false );
					setIsEditOpen( true );
				} }
				onOpenChangeAction={ setIsDetailOpen }
			/>
			<ExerciseDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ isCompact ? "bottom" : placement }
				onOpenChangeAction={ setIsEditOpen }
				// Eliminar tiene su propia confirmacion: el formulario se cierra y le deja paso.
				onRequestDeleteAction={ canDeleteExercise
					? () => {
						setIsEditOpen( false );
						setIsDeleteOpen( true );
					}
					: undefined }
			/>
			{ canDeleteExercise ? (
				<CoachDeleteExerciseDrawer
					deleteErrorMessage={ deleteCoachExercise.error?.message }
					exercise={ exercise }
					isDeactivating={ isPending }
					isDeleting={ deleteCoachExercise.isPending }
					isOpen={ isDeleteOpen }
					onCloseAction={ () => setIsDeleteOpen( false ) }
					onConfirmAction={ handleConfirmDelete }
					onDeactivateAction={ handleDeactivateInstead }
				/>
			) : null }
		</>
	);
}
