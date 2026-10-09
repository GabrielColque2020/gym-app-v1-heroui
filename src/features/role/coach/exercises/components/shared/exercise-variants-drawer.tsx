"use client";

import { Alert, Chip, Description, Drawer, Spinner } from "@heroui/react";
import { useState } from "react";
import { Link2 } from "lucide-react";

import { useExerciseVariants } from "@/features/exercises/hooks/use-exercise-variants";
import { useCoachExercises } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

import { type DraftVariantItem, EMPTY_ARRAY, type ExerciseVariantsDrawerProps, type ExerciseVariantsTarget, } from "./exercise-variants-drawer.types";
import { ExerciseVariantsDrawerContent } from "./exercise-variants-drawer-content";
import { mapCoachExerciseToVariantTarget } from "./exercise-variants-picker";
import { ExerciseVariantsDrawerTrigger } from "./exercise-variants-drawer-trigger";

function buildInitialVariants( variants: Awaited<ReturnType<typeof useExerciseVariants>>["data"] ): DraftVariantItem[] {
	return ( variants ?? EMPTY_ARRAY ).map( ( relation ) => ( {
		exercise: {
			active: relation.variantExercise.active,
			bodyPart: relation.variantExercise.bodyPart,
			category: "",
			coachExerciseId: relation.variantExercise.id,
			equipment: "",
			externalId: null,
			globalExerciseId: null,
			id: relation.variantExercise.id,
			imageUrl: relation.variantExercise.imageUrl ?? null,
			instructions: null,
			isOverride: false,
			muscleGroup: "",
			name: relation.variantExercise.name,
			searchName: null,
			sourceType: "coach",
			target: "",
			tips: relation.variantExercise.tips ?? null,
			videoUrl: relation.variantExercise.videoUrl ?? null,
		},
		relationId: relation.id,
	} ) );
}

function ExerciseVariantsDrawerHeader( { exercise }: { exercise: ExerciseVariantsTarget } ) {
	return (
		<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
			<div className={ "flex gap-3" }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					<Link2 className={ "size-5" }/>
				</div>
				<div className={ "min-w-0" }>
					<Drawer.Heading>{ exercise.name }</Drawer.Heading>
					<Description className={ "mt-1 text-sm" }>
						Elegí ejercicios que el estudiante pueda hacer en lugar de este. Los cambios se guardan solos.
					</Description>
					<Chip className={ "mt-2" } color={ "accent" } size={ "sm" } variant={ "soft" }>
						{ formatBodyPart( exercise.bodyPart ) }
					</Chip>
				</div>
			</div>
		</Drawer.Header>
	);
}

// Coordina la apertura del Drawer, la carga inicial de variantes y el estado externo/interno.
export function ExerciseVariantsDrawer( props: ExerciseVariantsDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const responsivePlacement = useResponsiveDrawerPlacement();
	const placement = props.placement ?? responsivePlacement;
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChangeAction ?? setInternalIsOpen;
	const showTriggerLabel = props.triggerVariant === "button";
	const variantsQuery = useExerciseVariants( props.routineId ?? "", isOpen && Boolean( props.routineId ) );
	// Ejercicio sin guardar: las variantes esperan en el borrador del dia. Del
	// borrador solo vienen los ids; el nombre y la imagen salen del catalogo.
	const isPendingMode = !props.routineId && Boolean( props.onPendingChangeAction );
	const coachExercisesQuery = useCoachExercises();
	const pendingVariants: DraftVariantItem[] = isPendingMode
		? ( props.pendingVariantExerciseIds ?? EMPTY_ARRAY ).flatMap( ( variantExerciseId ) => {
			const exercise = ( coachExercisesQuery.data ?? EMPTY_ARRAY ).find( ( candidate ) => candidate.id === variantExerciseId );

			return exercise ? [ { exercise: mapCoachExerciseToVariantTarget( exercise ), relationId: null } ] : [];
		} )
		: EMPTY_ARRAY;

	function openDrawer() {
		if (!props.routineId && !isPendingMode) return;

		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		setIsOpen( nextIsOpen );
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				<ExerciseVariantsDrawerTrigger
					className={ props.triggerClassName }
					exercise={ props.exercise }
					isDisabled={ !props.routineId }
					showLabel={ showTriggerLabel }
					onPress={ openDrawer }
				/>
			) }


			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ handleOpenChange } rightContentClassName={ "w-[38rem]" }>
				<ExerciseVariantsDrawerHeader exercise={ props.exercise }/>

				{ isPendingMode ? (
					coachExercisesQuery.isLoading ? (
						<Drawer.Body className={ "min-h-0 flex-1 overflow-y-auto py-3" }>
							<div className={ "flex min-h-56 items-center justify-center" } role={ "status" }>
								<Spinner aria-label={ "Cargando catálogo" } size={ "lg" }/>
							</div>
						</Drawer.Body>
					) : (
						<ExerciseVariantsDrawerContent
							key={ "pending" }
							exercise={ props.exercise }
							routineId={ null }
							initialVariants={ pendingVariants }
							onCloseAction={ () => setIsOpen( false ) }
							onPendingChangeAction={ props.onPendingChangeAction }
						/>
					)
				) : variantsQuery.isError ? (
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>Error al cargar variantes</Alert.Title>
								<Alert.Description>{ variantsQuery.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					</Drawer.Body>
				) : variantsQuery.isLoading ? (
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						<div className={ "flex min-h-56 flex-col items-center justify-center gap-3 text-center" }>
							<Spinner size={ "lg" }/>
							<div className={ "space-y-1" }>
								<p className={ "text-base font-semibold text-foreground" }>Cargando variantes</p>
								<p className={ "text-sm text-muted" }>Buscando las que ya tiene este ejercicio.</p>
							</div>
						</div>
					</Drawer.Body>
				) : !props.routineId ? (
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						<Alert className={ "border border-warning/20" } status={ "warning" }>
							<Alert.Content>
								<Alert.Title>Esperá a que se guarde el día</Alert.Title>
								<Alert.Description>
									Este ejercicio todavía no terminó de guardarse en el día. Cerrá y volvé a abrir en unos segundos.
								</Alert.Description>
							</Alert.Content>
						</Alert>
					</Drawer.Body>
				) : (
					<ExerciseVariantsDrawerContent
						key={ props.routineId }
						exercise={ props.exercise }
						routineId={ props.routineId }
						initialVariants={ buildInitialVariants( variantsQuery.data ) }
						onCloseAction={ () => setIsOpen( false ) }
					/>
				) }
			</FeatureDrawerLayout>
		</>
	);
}
