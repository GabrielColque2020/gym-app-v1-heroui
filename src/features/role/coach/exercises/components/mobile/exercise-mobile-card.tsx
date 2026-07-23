"use client";

import type { Key } from "@heroui/react";
import { Button, Card, Chip, Dropdown, Header, Label, Spinner, toast } from "@heroui/react";
import { CheckCircle2, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

import { AsyncMedia } from "@/components/common";
import { CoachDeleteExerciseDrawer } from "@/features/role/coach/exercises/components/shared/coach-delete-exercise-drawer";
import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import { useDeleteCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import { useCoachExerciseStatusAction } from "@/features/role/coach/exercises/hooks/use-coach-exercise-status-action";
import { formatCoachExerciseSource, formatCoachExerciseSummary } from "@/features/role/coach/exercises/services/coach-exercise-formatters";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

type ExerciseMobileCardProps = {
	exercise: CoachExerciseListItem;
};

export function ExerciseMobileCard( {
	exercise,
}: ExerciseMobileCardProps ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useCoachExerciseStatusAction( { exercise } );
	const deleteCoachExercise = useDeleteCoachExercise();
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
		<Card className={ "overflow-hidden rounded-2xl border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Content className={ "py-1" }>
				<div className={ "grid grid-cols-[4rem_1fr_auto] items-start gap-3" }>
					<AsyncMedia
						alt={ `Imagen de ${ exercise.name }` }
						className={ "size-16 rounded-2xl border border-border text-accent" }
						emptyLabel={ "Sin imagen" }
						spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
						src={ exercise.imageUrl }
					/>

					<div className={ "min-w-0" }>
						<h3 className={ "truncate text-lg font-semibold leading-6 text-foreground" }>{ exercise.name }</h3>
						<p className={ "mt-1 truncate text-sm font-medium text-muted" }>{ formatCoachExerciseSummary( exercise ) || "Sin datos adicionales" }</p>
						<div className={ "mt-2 flex flex-wrap gap-2" }>
							<Chip color={ exercise.sourceType === "global" ? "accent" : exercise.isOverride ? "warning" : "default" } size={ "sm" } variant={ "soft" }>
								{ formatCoachExerciseSource( exercise ) }
							</Chip>
							<Chip
								color={ exercise.active ? "success" : "danger" }
								size={ "sm" }
								variant={ "soft" }
							>
								{ exercise.active ? "Activo" : "Inactivo" }
							</Chip>
						</div>
					</div>

					<Dropdown>
						<Button
							isIconOnly
							aria-label={ `Opciones de ${ exercise.name }` }
							className={ "size-8 shrink-0 text-foreground" }
							isDisabled={ isPending }
							variant={ "ghost" }
						>
							{ isPending ? (
								<Spinner color={ "current" } size={ "sm" }/>
							) : (
								<EllipsisVertical className={ "size-5" }/>
							) }
						</Button>
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
									<Label className={ exercise.active ? "text-danger" : "text-success" }>{ statusLabel }</Label>
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
				</div>
			</Card.Content>

			<ExerciseDrawer
				hideTrigger
				exercise={ exercise }
				isOpen={ isEditOpen }
				mode={ "edit" }
				placement={ "bottom" }
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
		</Card>
	);
}
