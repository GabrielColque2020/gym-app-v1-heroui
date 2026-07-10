"use client";

import { Alert, Chip, Description, Drawer, Spinner } from "@heroui/react";
import { useState } from "react";
import { Link2 } from "lucide-react";

import { useExerciseVariants } from "@/features/exercises/hooks/use-exercise-variants";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

import { type DraftVariantItem, EMPTY_ARRAY, type ExerciseVariantsDrawerProps, type ExerciseVariantsTarget, } from "./exercise-variants-drawer.types";
import { ExerciseVariantsDrawerContent } from "./exercise-variants-drawer-content";
import { ExerciseVariantsDrawerTrigger } from "./exercise-variants-drawer-trigger";

function buildInitialVariants( variants: Awaited<ReturnType<typeof useExerciseVariants>>["data"] ): DraftVariantItem[] {
	return ( variants ?? EMPTY_ARRAY ).map( ( relation ) => ( {
		exercise: {
			active: relation.variantExercise.active,
			bodyPart: relation.variantExercise.bodyPart,
			id: relation.variantExercise.id,
			name: relation.variantExercise.name,
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
						Gestiona las variantes asociadas y guarda la lista cuando termines de editar.
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

	function openDrawer() {
		if (!props.routineId) return;

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


			<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ handleOpenChange }>
				<ExerciseVariantsDrawerHeader exercise={ props.exercise }/>

				{ variantsQuery.isError ? (
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
								<p className={ "text-sm text-muted" }>Consultando las relaciones asociadas al ejercicio.</p>
							</div>
						</div>
					</Drawer.Body>
				) : !props.routineId ? (
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						<Alert className={ "border border-warning/20" } status={ "warning" }>
							<Alert.Content>
								<Alert.Title>Guarda la rutina primero</Alert.Title>
								<Alert.Description>
									Las variantes ahora se guardan por rutina. Necesitas guardar el ejercicio antes de poder asociarle variantes.
								</Alert.Description>
							</Alert.Content>
						</Alert>
					</Drawer.Body>
				) : (
					<ExerciseVariantsDrawerContent
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
