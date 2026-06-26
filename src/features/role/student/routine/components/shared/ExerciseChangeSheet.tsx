"use client";

import { ArrowRightArrowLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/role/student/routine/components/shared/useResponsiveSheetPlacement";
import ExerciseChangeSheetContent from "@/features/role/student/routine/components/shared/ExerciseChangeSheetContent";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine.types";

type ExerciseChangeSheetProps = {
	exercise: Exercise;
	hasVariants: boolean;
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onVariantChange: ( exerciseId: string, variantExerciseId: string | null ) => void;
};

// Renderiza el disparador y el sheet compartido para cambiar o restablecer un ejercicio.
export default function ExerciseChangeSheet( {
	exercise,
	hasVariants,
	selectedVariant,
	variantOptions,
	onVariantChange,
}: ExerciseChangeSheetProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const placement = useResponsiveSheetPlacement();

	// Abre el sheet para revisar las variantes disponibles del ejercicio actual.
	function handleOpenVariantSheet() {
		if (!hasVariants) return;
		setIsOpen( true );
	}

	// Aplica la variante seleccionada al draft activo y cierra el sheet.
	function handleSelectVariant( variant: ExerciseVariantOption ) {
		onVariantChange( exercise.id, variant.id );
		setIsOpen( false );
	}

	// Restablece la card al ejercicio original y cierra el sheet.
	function handleResetVariant() {
		onVariantChange( exercise.id, null );
		setIsOpen( false );
	}

	if (!hasVariants) return null;

	return (
		<>
			<Button size={ "sm" } variant={ "secondary" } onPress={ handleOpenVariantSheet }>
				<ArrowRightArrowLeft className={ "size-4" }/>
				Cambiar ejercicio
			</Button>
			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ setIsOpen }>
				<ExerciseChangeSheetContent
					exercise={ exercise }
					hasVariants={ hasVariants }
					placement={ placement }
					selectedVariant={ selectedVariant }
					variantOptions={ variantOptions }
					onResetVariant={ handleResetVariant }
					onSelectVariant={ handleSelectVariant }
				/>
			</FeatureSheetLayout>
		</>
	);
}
