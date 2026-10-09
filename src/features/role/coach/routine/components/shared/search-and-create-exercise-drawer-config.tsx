"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { ArrowLeft, ChevronDown, Link2 } from "lucide-react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DraftVariantItem } from "@/features/role/coach/exercises/components/shared/exercise-variants-drawer.types";
import { ExerciseVariantsPicker } from "@/features/role/coach/exercises/components/shared/exercise-variants-picker";
import { SearchAndCreateExerciseDrawerPrescription } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-prescription";

type SearchAndCreateExerciseDrawerConfigProps = {
	exercise: ExerciseListItem;
	onBackAction: () => void;
	onRepsChange: ( value: string ) => void;
	onRestChange: ( value: number | null ) => void;
	onSetsChange: ( value: string ) => void;
	onVariantsChangeAction: ( variants: DraftVariantItem[] ) => void;
	repsValue: string;
	restValue: number | null;
	setsValue: string;
	variants: DraftVariantItem[];
};

// Segunda pantalla de "Agregar ejercicio": lo que se decide sobre el ejercicio
// elegido. Antes las series y repeticiones se escribian arriba de la lista,
// antes de saber para que ejercicio eran, y las variantes no tenian lugar.
export function SearchAndCreateExerciseDrawerConfig( {
	exercise,
	onBackAction,
	onRepsChange,
	onRestChange,
	onSetsChange,
	onVariantsChangeAction,
	repsValue,
	restValue,
	setsValue,
	variants,
}: SearchAndCreateExerciseDrawerConfigProps ) {
	// Las variantes son opcionales y su lista es larga: quedan plegadas para que
	// quien no las usa vea solo series, repeticiones y "Agregar".
	const [ isVariantsOpen, setIsVariantsOpen ] = useState( false );
	const variantsSummary = variants.length === 0
		? "Opcional"
		: variants.length === 1 ? "1 elegida" : `${ variants.length } elegidas`;

	return (
		<div className={ "space-y-4" }>
			<Button className={ "-ms-2 gap-1 px-2 text-muted" } size={ "sm" } variant={ "ghost" } onPress={ onBackAction }>
				<ArrowLeft className={ "size-4" }/>
				Elegir otro ejercicio
			</Button>

			<div className={ "flex min-w-0 items-center gap-3" }>
				<MediaPreviewThumbnail
					imageUrl={ exercise.imageUrl }
					name={ exercise.name }
					thumbnailClassName={ "size-16" }
					videoUrl={ exercise.videoUrl }
				/>
				<div className={ "min-w-0" }>
					<p className={ "text-base font-semibold leading-5 text-foreground" }>{ exercise.name }</p>
					<p className={ "mt-0.5 text-xs text-muted" }>{ formatBodyPart( exercise.bodyPart ) }</p>
				</div>
			</div>

			<SearchAndCreateExerciseDrawerPrescription
				repsValue={ repsValue }
				restValue={ restValue }
				setsValue={ setsValue }
				onRepsChange={ onRepsChange }
				onRestChange={ onRestChange }
				onSetsChange={ onSetsChange }
			/>

			<div className={ "rounded-xl border border-border bg-surface-secondary" }>
				<button
					aria-expanded={ isVariantsOpen }
					className={ "flex w-full items-center gap-3 rounded-xl p-3 text-start focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent" }
					type={ "button" }
					onClick={ () => setIsVariantsOpen( ( current ) => !current ) }
				>
					<Link2 aria-hidden className={ "size-4 shrink-0 text-muted" }/>
					<span className={ "min-w-0 flex-1" }>
						<span className={ "block text-sm font-medium text-foreground" }>Variantes</span>
						<span className={ "block text-xs text-muted" }>
							Ejercicios que el estudiante puede hacer en lugar de este.
						</span>
					</span>
					<span className={ variants.length > 0 ? "shrink-0 text-xs font-medium text-accent" : "shrink-0 text-xs text-muted" }>
						{ variantsSummary }
					</span>
					<ChevronDown aria-hidden className={ `size-4 shrink-0 text-muted transition-transform ${ isVariantsOpen ? "rotate-180" : "" }` }/>
				</button>

				{ isVariantsOpen ? (
					<div className={ "border-t border-border p-3" }>
						<ExerciseVariantsPicker
							exercise={ exercise }
							hideEmptySelection
							variants={ variants }
							onChangeAction={ onVariantsChangeAction }
						/>
					</div>
				) : null }
			</div>
		</div>
	);
}
