import { Button, Description, Drawer } from "@heroui/react";

import { ExerciseChangeDrawerEmptyState } from "@/features/role/student/routine/components/shared/exercise-change-drawer-empty-state";
import { ExerciseChangeDrawerSelectedVariant } from "@/features/role/student/routine/components/shared/exercise-change-drawer-selected-variant";
import { ExerciseChangeDrawerVariantOption } from "@/features/role/student/routine/components/shared/exercise-change-drawer-variant-option";
import type { Exercise, ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";
import { Link2 } from "lucide-react";

type ExerciseChangeDrawerContentProps = {
	exercise: Exercise;
	hasVariants: boolean;
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onResetVariant: () => void;
	onSelectVariant: ( variant: ExerciseVariantOption ) => void;
};

export default function ExerciseChangeDrawerContent( {
	exercise,
	hasVariants,
	selectedVariant,
	variantOptions,
	onResetVariant,
	onSelectVariant,
}: ExerciseChangeDrawerContentProps ) {
	return (
		<>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Link2 className={ "size-5" }/>
					</div>
					<div className={ "min-w-0" }>
						<Drawer.Heading>Cambiar ejercicio</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Selecciona una variante disponible para esta rutina.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex flex-1 flex-col space-y-6 overflow-y-auto py-3" }>
				{ selectedVariant ? (
					<ExerciseChangeDrawerSelectedVariant
						exerciseBaseName={ exercise.baseName }
						imageUrl={ exercise.imageUrl }
						onResetVariant={ onResetVariant }
					/>
				) : null }

				{ !hasVariants ? (
					<ExerciseChangeDrawerEmptyState/>
				) : (
					<div className={ "space-y-2" }>
						{ variantOptions.map( ( variant ) => {
							const isCurrentVariant = variant.id === exercise.variantExerciseId;

							return (
								<ExerciseChangeDrawerVariantOption
									key={ variant.id }
									isCurrentVariant={ isCurrentVariant }
									variant={ variant }
									onSelect={ onSelectVariant }
								/>
							);
						} ) }
					</div>
				) }
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } variant={ "secondary" }>
					Cerrar
				</Button>
			</Drawer.Footer>
		</>
	);
}
