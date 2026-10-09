"use client";

import type { Key } from "@heroui/react";
import { Button, Card, Chip, Dropdown, Header, Label, Spinner, toast } from "@heroui/react";
import { CheckCircle2, CircleSlash, EllipsisVertical, Eye, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";

import { AsyncMedia } from "@/components/common";
import { CoachDeleteExerciseDrawer } from "@/features/role/coach/exercises/components/shared/coach-delete-exercise-drawer";
import { ExerciseDetailDrawer } from "@/features/role/coach/exercises/components/shared/exercise-detail-drawer";
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
	const [ isDetailOpen, setIsDetailOpen ] = useState( false );
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
	const { changeStatus, isPending, statusLabel } = useCoachExerciseStatusAction( { exercise } );
	const deleteCoachExercise = useDeleteCoachExercise();
	const canDeleteExercise = exercise.sourceType === "coach" && Boolean( exercise.coachExerciseId );

	function handleAction( key: Key ) {
		if (key === "view") {
			setIsDetailOpen( true );
			return;
		}

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
				description: "El ejercicio fue borrado permanentemente del catálogo del coach.",
			} );
		} catch (error) {
			toast.danger( "Error al eliminar ejercicio", {
				description: error instanceof Error ? error.message : "No se pudo eliminar el ejercicio.",
			} );
		}
	}

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
								<Dropdown.Item id={ "view" } textValue={ "Ver ejercicio" }>
									<Eye className={ "size-4 shrink-0" }/>
									<Label>Ver ejercicio</Label>
								</Dropdown.Item>
								<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
									<PencilLine className={ "size-4 shrink-0 text-foreground" }/>
									<Label>Editar</Label>
								</Dropdown.Item>
								<Dropdown.Item
									id={ "status" }
									textValue={ statusLabel }
									variant={ exercise.active ? "danger" : "default" }
								>
									{ /* Desactivar va en rojo porque le corta el acceso a alguien o saca
									     un ejercicio de uso. El tacho queda solo para eliminar. */ }
									{ exercise.active ? (
										<CircleSlash className={ "size-4 shrink-0 text-danger" }/>
									) : (
										<CheckCircle2 className={ "size-4 shrink-0 text-foreground" }/>
									) }
									<Label className={ exercise.active ? "text-danger" : undefined }>{ statusLabel }</Label>
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
