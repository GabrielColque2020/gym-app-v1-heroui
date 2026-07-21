import { Button, Chip } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import type { ExerciseVariantOption } from "@/features/routine/types/routine-exercise.types";

type ExerciseChangeDrawerVariantOptionProps = {
	isCurrentVariant: boolean;
	variant: ExerciseVariantOption;
	onSelect: ( variant: ExerciseVariantOption ) => void;
};

function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

export function ExerciseChangeDrawerVariantOption( {
	isCurrentVariant,
	variant,
	onSelect,
}: ExerciseChangeDrawerVariantOptionProps ) {
	return (
		<Button
			className={ "h-auto w-full justify-start border border-border px-4 py-3 text-left shadow-sm" }
			variant={ isCurrentVariant ? "secondary" : "outline" }
			onPress={ () => onSelect( variant ) }
		>
			<div className={ "flex w-full items-center gap-3" }>
				<AsyncMedia
					alt={ `Miniatura de ${ variant.name }` }
					className={ "size-12 shrink-0 rounded-xl border border-border" }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando imagen de ${ variant.name }` }
					src={ variant.imageUrl }
				/>

				<div className={ "min-w-0 flex-1" }>
					<div className={ "flex items-start justify-between gap-3" }>
						<div className={ "min-w-0" }>
							<p className={ "truncate text-sm font-semibold text-foreground" }>{ variant.name }</p>
							<p className={ "truncate text-xs text-muted" }>
								{ formatBodyPart( variant.bodyPart as Parameters<typeof formatBodyPart>[0] ) }
							</p>
							<p className={ "truncate text-xs text-muted" }>
								{ variant.lastSession ? (
									`Ultima sesion: ${ formatSessionDateLabel( variant.lastSession.date ) }`
								) : (
									"Sin registro anterior"
								) }
							</p>
						</div>

						{ variant.active ? (
							<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
								<Chip.Label>Activo</Chip.Label>
							</Chip>
						) : (
							<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
								<Chip.Label>Inactivo</Chip.Label>
							</Chip>
						) }
					</div>
				</div>
			</div>
		</Button>
	);
}
