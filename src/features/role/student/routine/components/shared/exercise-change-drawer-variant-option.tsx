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
			className={ "h-auto w-full justify-start whitespace-normal border border-border px-4 py-3 text-left shadow-sm" }
			variant={ isCurrentVariant ? "secondary" : "outline" }
			onPress={ () => onSelect( variant ) }
		>
			<div className={ "flex w-full items-start gap-3" }>
				<AsyncMedia
					alt={ `Miniatura de ${ variant.name }` }
					className={ "h-16 w-16 shrink-0 rounded-2xl border border-border object-cover sm:h-20 sm:w-20" }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando imagen de ${ variant.name }` }
					src={ variant.imageUrl }
				/>

				<div className={ "min-w-0 flex-1 space-y-1" }>
					<div className={ "grid grid-cols-1 items-start gap-2 sm:grid-cols-[minmax(0,1fr)_auto]" }>
						<p className={ "min-w-0 break-words text-sm font-semibold leading-snug text-foreground" }>
							{ variant.name }
						</p>
						{ variant.active ? (
							<Chip className={ "justify-self-start shrink-0 sm:justify-self-end" } color={ "success" } size={ "sm" } variant={ "soft" }>
								<Chip.Label>Activo</Chip.Label>
							</Chip>
						) : (
							<Chip className={ "justify-self-start shrink-0 sm:justify-self-end" } color={ "warning" } size={ "sm" } variant={ "soft" }>
								<Chip.Label>Inactivo</Chip.Label>
							</Chip>
						) }
					</div>
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
			</div>
		</Button>
	);
}
