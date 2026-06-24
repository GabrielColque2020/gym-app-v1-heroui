"use client";

import { CircleLink } from "@gravity-ui/icons";
import { Alert, Button, Chip, Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";
import type { Exercise, ExerciseVariantOption } from "@/features/student/routine/types/routine.types";

type ExerciseChangeSheetContentProps = {
	exercise: Exercise;
	hasVariants: boolean;
	placement: "bottom" | "right";
	selectedVariant: ExerciseVariantOption | null;
	variantOptions: ExerciseVariantOption[];
	onResetVariant: () => void;
	onSelectVariant: ( variant: ExerciseVariantOption ) => void;
};

// Formatea la fecha de una sesion historica para mostrarla en la lista de variantes.
function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

// Renderiza el contenido compartido del sheet para cambiar o restablecer un ejercicio.
export function ExerciseChangeSheetContent( {
												exercise,
												hasVariants,
												placement,
												selectedVariant,
												variantOptions,
												onResetVariant,
												onSelectVariant,
											}: ExerciseChangeSheetContentProps ) {
	return (
		<>
			<Sheet.Header className={ "border-default-100 border-b pb-4" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<CircleLink className={ "size-5" }/>
					</div>
					<div className={ "min-w-0" }>
						<Sheet.Heading>Cambiar ejercicio</Sheet.Heading>
						<Description className={ "mt-1 text-sm" }>
							Selecciona una variante disponible para esta rutina.
						</Description>
					</div>
				</div>
			</Sheet.Header>

			<Sheet.Body className={ placement === "right" ? "flex flex-col gap-4 py-5" : "" }>
				{ selectedVariant ? (
					<div className={ "flex items-center justify-between gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3" }>
						<div className={ "min-w-0" }>
							<p className={ "text-sm font-semibold text-foreground" }>Ejercicio original</p>
							<p className={ "truncate text-sm text-muted" }>{ exercise.baseName }</p>
						</div>

						<Button size={ "sm" } variant={ "secondary" } onPress={ onResetVariant }>
							Restablecer al original
						</Button>
					</div>
				) : null }

				{ !hasVariants ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>Sin variantes disponibles</Alert.Title>
							<Alert.Description>
								Esta rutina no tiene ejercicios alternativos configurados.
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) : (
					<div className={ "space-y-2" }>
						{ variantOptions.map( ( variant ) => {
							const isCurrentVariant = variant.id === exercise.variantExerciseId;

							return (
								<Button
									key={ variant.id }
									className={ "h-auto w-full justify-start px-4 py-3 text-left" }
									variant={ isCurrentVariant ? "secondary" : "ghost" }
									onPress={ () => onSelectVariant( variant ) }
								>
									<div className={ "flex w-full items-center justify-between gap-3" }>
										<div className={ "min-w-0" }>
											<p className={ "truncate text-sm font-semibold text-foreground" }>{ variant.name }</p>
											<p className={ "truncate text-xs text-muted" }>{ formatBodyPart( variant.bodyPart as Parameters<typeof formatBodyPart>[0] ) }</p>
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
						} ) }
					</div>
				) }
			</Sheet.Body>

			<Sheet.Footer
				className={ placement === "right" ? "border-default-100 flex shrink-0 justify-end gap-2 border-t px-6 py-4" : "border-default-100 flex shrink-0 justify-end gap-2 border-t px-4 py-4" }>
				<Sheet.Close>
					<Button variant={ "secondary" }>
						Cerrar
					</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</>
	);
}
