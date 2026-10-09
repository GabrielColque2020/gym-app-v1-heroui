"use client";

import { useState } from "react";

import { Alert, Button, Drawer, toast } from "@heroui/react";

import { useSaveExerciseVariants } from "@/features/exercises/hooks/use-exercise-variants";

import { type DraftVariantItem, type ExerciseVariantsTarget } from "./exercise-variants-drawer.types";
import { ExerciseVariantsPicker } from "./exercise-variants-picker";

type ExerciseVariantsDrawerContentProps = {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	// Con valor, las variantes no van a la base: el ejercicio todavia no esta
	// guardado en el dia y se le avisa a quien abrio el drawer, que las guarda
	// junto con el dia.
	onPendingChangeAction?: ( variantExerciseIds: string[] ) => void;
	routineId: string | null;
	onCloseAction: () => void;
};

export function ExerciseVariantsDrawerContent( {
	exercise,
	initialVariants,
	onPendingChangeAction,
	routineId,
	onCloseAction,
}: ExerciseVariantsDrawerContentProps ) {
	const [ draftVariants, setDraftVariants ] = useState<DraftVariantItem[]>( initialVariants );
	const saveVariants = useSaveExerciseVariants( routineId ?? "" );

	// Cada alta o baja se guarda en el momento, como el resto del editor: no hay
	// un "Guardar" que olvidar. Si falla, la lista vuelve a como estaba.
	async function persistVariants( nextVariants: DraftVariantItem[] ) {
		const previousVariants = draftVariants;
		const variantExerciseIds = nextVariants.map( ( variant ) => variant.exercise.id );

		setDraftVariants( nextVariants );

		if (onPendingChangeAction || !routineId) {
			onPendingChangeAction?.( variantExerciseIds );

			return;
		}

		try {
			await saveVariants.mutateAsync( { routineId, variantExerciseIds } );
		} catch (error) {
			setDraftVariants( previousVariants );
			toast.danger( "No se pudo guardar el cambio", {
				description: error instanceof Error ? error.message : "Probá de nuevo.",
			} );
		}
	}

	return (
		<>
			<Drawer.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto py-3" }>
				{ saveVariants.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al guardar variantes</Alert.Title>
							<Alert.Description>{ saveVariants.error?.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<ExerciseVariantsPicker
					exercise={ exercise }
					isSaving={ saveVariants.isPending }
					variants={ draftVariants }
					onChangeAction={ ( nextVariants ) => void persistVariants( nextVariants ) }
				/>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				{ /* No hay "Guardar": cada cambio ya quedo guardado. */ }
				<Button isDisabled={ saveVariants.isPending } onPress={ onCloseAction }>
					Listo
				</Button>
			</Drawer.Footer>
		</>
	);
}
