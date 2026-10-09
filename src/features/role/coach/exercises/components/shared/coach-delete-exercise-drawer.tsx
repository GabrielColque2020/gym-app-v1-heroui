"use client";

import { Alert, Button, Description, Drawer, Spinner, Surface } from "@heroui/react";
import { EyeOff, Trash2 } from "lucide-react";

import type { CoachExerciseDeleteImpact } from "@/features/role/coach/exercises/actions/coach-exercises";
import { useCoachExerciseDeleteImpact } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type CoachDeleteExerciseDrawerProps = {
	deleteErrorMessage?: string;
	exercise: CoachExerciseListItem;
	isDeactivating?: boolean;
	isDeleting: boolean;
	isOpen: boolean;
	onCloseAction: () => void;
	onConfirmAction: () => void;
	// Desactivar en vez de eliminar: no se pierde nada. Solo si esta activo.
	onDeactivateAction?: () => void;
};

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

// Lo que se pierde, en renglones que se entienden solos. Vacio si no se pierde nada.
function describeImpact( impact: CoachExerciseDeleteImpact ) {
	const lines: string[] = [];

	if (impact.progressCount > 0) {
		lines.push( `Se borran ${ pluralize( impact.progressCount, "serie cargada", "series cargadas" ) } por ${ pluralize( impact.studentCount, "estudiante", "estudiantes" ) }: desaparecen de su historial y su progreso.` );
	}

	if (impact.studentRoutineCount > 0) {
		lines.push( `Queda un lugar vacío en ${ pluralize( impact.studentRoutineCount, "día de rutina", "días de rutina" ) } de tus estudiantes.` );
	}

	if (impact.templateRoutineCount > 0) {
		lines.push( `Queda un lugar vacío en ${ pluralize( impact.templateRoutineCount, "día", "días" ) } de tus plantillas.` );
	}

	if (impact.variantCount > 0) {
		lines.push( `Deja de ser variante en ${ pluralize( impact.variantCount, "ejercicio", "ejercicios" ) } de las rutinas.` );
	}

	return lines;
}

// Antes de borrar dice exactamente que se pierde (series de los estudiantes,
// lugares en rutinas, variantes) y, si se pierde algo, ofrece desactivar: deja
// de ofrecerse para rutinas nuevas sin borrar nada. El aviso de antes decia que
// "puede afectar" lo que ven los estudiantes, y borraba su progreso sin decirlo.
export function CoachDeleteExerciseDrawer( {
	deleteErrorMessage,
	exercise,
	isDeactivating = false,
	isDeleting,
	isOpen,
	onCloseAction,
	onConfirmAction,
	onDeactivateAction,
}: CoachDeleteExerciseDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const impactQuery = useCoachExerciseDeleteImpact( exercise.id, isOpen );
	const impactLines = impactQuery.data ? describeImpact( impactQuery.data ) : [];
	const hasImpact = impactLines.length > 0;
	const canDeactivate = Boolean( onDeactivateAction ) && exercise.active;
	const isBusy = isDeleting || isDeactivating;

	return (
		<FeatureDrawerLayout
			isDismissable={ false }
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[34rem]" }
			onOpenChangeAction={ onCloseAction }
		>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
						<Trash2 className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Drawer.Heading>Eliminar ejercicio</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Esta acción es permanente y no se puede deshacer.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				{ impactQuery.isPending ? (
					<div className={ "flex items-center gap-2 text-sm text-muted" } role={ "status" }>
						<Spinner size={ "sm" }/>
						Revisando dónde se usa…
					</div>
				) : impactQuery.isError ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>No se pudo revisar dónde se usa</Alert.Title>
							<Alert.Description>
								Si lo eliminás, se borran las series que tus estudiantes cargaron con este ejercicio.
								Si no estás seguro, desactivalo.
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) : hasImpact ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Esto se pierde al eliminarlo</Alert.Title>
							<ul className={ "mt-1 list-disc space-y-1 ps-4 text-sm" }>
								{ impactLines.map( ( line ) => <li key={ line }>{ line }</li> ) }
							</ul>
						</Alert.Content>
					</Alert>
				) : (
					<Alert className={ "border border-success/20" } status={ "success" }>
						<Alert.Content>
							<Alert.Title>No lo usa nadie</Alert.Title>
							<Alert.Description>
								No está en ninguna rutina ni plantilla, y nadie cargó series con él. Se puede eliminar sin perder nada.
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) }

				{ canDeactivate && ( hasImpact || impactQuery.isError ) ? (
					<Surface className={ "space-y-3 rounded-xl border border-default-hover bg-surface p-4" }>
						<p className={ "text-sm text-foreground" }>
							<span className={ "font-semibold" }>Mejor desactivalo.</span>{ " " }
							Deja de ofrecerse para rutinas nuevas y no se borra nada: las series de tus estudiantes
							siguen en su historial. Lo podés restaurar cuando quieras.
						</p>
						<Button isDisabled={ isBusy } isPending={ isDeactivating } variant={ "secondary" } onPress={ onDeactivateAction }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <EyeOff className={ "size-4" }/> }
									{ isPending ? "Desactivando..." : "Desactivar en su lugar" }
								</>
							) }
						</Button>
					</Surface>
				) : null }

				{ deleteErrorMessage ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al eliminar</Alert.Title>
							<Alert.Description>{ deleteErrorMessage }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
					<div className={ "grid gap-3 text-sm" }>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Ejercicio</span>
							<span className={ "font-semibold text-foreground" }>{ exercise.name }</span>
						</div>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Categoría</span>
							<span className={ "text-foreground" }>{ exercise.category || "Sin categoría" }</span>
						</div>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Origen</span>
							<span className={ "text-foreground" }>{ exercise.isOverride ? "Del catálogo, editado por vos" : "Creado por vos" }</span>
						</div>
					</div>
				</Surface>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button isDisabled={ isBusy } variant={ "secondary" } onPress={ onCloseAction }>
					Cancelar
				</Button>
				<Button
					className={ "bg-danger text-danger-foreground" }
					// Mientras se revisa el impacto no se confirma: se borraria sin ver que se pierde.
					isDisabled={ isBusy || impactQuery.isPending }
					isPending={ isDeleting }
					onPress={ onConfirmAction }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Trash2 className={ "size-4" }/> }
							{ isPending ? "Eliminando..." : "Eliminar permanentemente" }
						</>
					) }
				</Button>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}
