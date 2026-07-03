"use client";

import { Chip, Button } from "@heroui/react";

import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import type { ExerciseVariantOption } from "@/features/routine/types/routine-types";

type ExerciseChangeSheetVariantOptionProps = {
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

export function ExerciseChangeSheetVariantOption( {
	isCurrentVariant,
	variant,
	onSelect,
}: ExerciseChangeSheetVariantOptionProps ) {
	return (
		<Button
			className={ "h-auto w-full justify-start px-4 py-3 text-left" }
			variant={ isCurrentVariant ? "secondary" : "ghost" }
			onPress={ () => onSelect( variant ) }
		>
			<div className={ "flex w-full items-center justify-between gap-3" }>
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
		</Button>
	);
}
