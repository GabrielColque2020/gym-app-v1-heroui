"use client";

import type { Key } from "@heroui/react";
import { Button, Dropdown, Header, Label, Spinner, toast } from "@heroui/react";
import { CheckCircle2, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

import {
	CoachDeleteExerciseDrawer
} from "@/features/role/coach/exercises/components/shared/coach-delete-exercise-drawer";
import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import { useDeleteCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import { useCoachExerciseStatusAction } from "@/features/role/coach/exercises/hooks/use-coach-exercise-status-action";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type ExerciseRowActionsProps = {
	exercise: CoachExerciseListItem;
};

export function ExerciseRowActions( {
	exercise,
}: ExerciseRowActionsProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const { changeStatus, isPending, statusClassName, statusLabel } = useCoachExerciseStatusAction( { exercise } );
	const deleteCoachExercise = useDeleteCoachExercise();
	const placement = useResponsiveDrawerPlacement();
	const canDeleteExercise = exercise.sourceType === "coach" && Boolean( exercise.coachExerciseId );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "status") {
			void changeStatus();
			return;
		}

		if (key === "delete" && canDeleteExercise) {
			setIsDeleteOpen( true );
		}
	}

	async function handleConfirmDelete() {
		try {
			await deleteCoachExercise.mutateAsync( exercise.id );
			setIsDeleteOpen( false );
			toast.success( "Ejercicio eliminado", {
				description: "El ejercicio fue borrado permanentemente del catalogo del coach.",
			} );
		} catch (error) {
			toast.danger( "Error al eliminar ejercicio", {
				description: error instanceof Error ? error.message : "No se pudo eliminar el ejercicio.",
			} );
		}
	}

	return (
		<>
			<Dropdown>
				<div className={ "flex items-center justify-start" }>
					<Button
						isIconOnly
						aria-label={ `Opciones de ${ exercise.name }` }
						className={ "size-8 shrink-0 text-foreground" }
						isDisabled={ isPending }
						size={ "sm" }
						variant={ "ghost" }
					>
						{ isPending ? (
							<Spinner color={ "current" } size={ "sm" }/>
						) : (
							<EllipsisVertical className={ "size-4" }/>
						) }
					</Button>
				</div>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
							<PencilLine className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
						<Dropdown.Item
							id={ "status" }
							textValue={ statusLabel }
							variant={ exercise.active ? "danger" : "default" }
						>
							{ exercise.active ? (
								<Trash2 className={ "size-4 shrink-0 text-danger" }/>
							) : (
								<CheckCircle2 className={ "size-4 shrink-0 text-success" }/>
							) }
							<Label className={ statusClassName }>{ statusLabel }</Label>
						</Dropdown.Item>
						{ canDeleteExercise ? (
							<Dropdown.Item id={ "delete" } textValue={ "Eliminar permanentemente" } variant={ "danger" }>
								<Trash2 className={ "size-4 shrink-0 text-danger" }/>
								<Label className={ "text-danger" }>Eliminar permanentemente</Label>
							</Dropdown.Item>
						) : null }
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<ExerciseDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ placement }
				onOpenChangeAction={ setIsEditOpen }
			/>
			{ canDeleteExercise ? (
				<CoachDeleteExerciseDrawer
					deleteErrorMessage={ deleteCoachExercise.error?.message }
					exercise={ exercise }
					isDeleting={ deleteCoachExercise.isPending }
					isOpen={ isDeleteOpen }
					onCloseAction={ () => setIsDeleteOpen( false ) }
					onConfirmAction={ handleConfirmDelete }
				/>
			) : null }
		</>
	);
}
