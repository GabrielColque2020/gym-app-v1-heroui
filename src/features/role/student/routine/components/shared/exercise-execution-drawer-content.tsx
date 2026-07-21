import { Button, Description, Drawer } from "@heroui/react";
import { Dumbbell, PlaySquare } from "lucide-react";

import { AsyncMedia } from "@/components/common";

type ExerciseExecutionDrawerContentProps = {
	imageUrl?: string | null;
	instructions?: string | null;
	name: string;
	videoUrl?: string | null;
};

export function ExerciseExecutionDrawerContent( {
	imageUrl,
	instructions,
	name,
	videoUrl,
}: ExerciseExecutionDrawerContentProps ) {
	const trimmedImageUrl = imageUrl?.trim() ?? "";
	const trimmedInstructions = instructions?.trim() ?? "";
	const trimmedVideoUrl = videoUrl?.trim() ?? "";
	const mediaUrl = trimmedVideoUrl || trimmedImageUrl;
	const hasMedia = mediaUrl.length > 0;

	return (
		<>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Dumbbell className={ "size-5" }/>
					</div>
					<div className={ "min-w-0" }>
						<Drawer.Heading>{ name }</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Ejecucion del ejercicio
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex flex-1 flex-col gap-5 overflow-y-auto py-3" }>
				{ hasMedia ? (
					<AsyncMedia
						alt={ `Ejecucion de ${ name }` }
						className={ "h-48 shrink-0 rounded-xl border border-border bg-content2 sm:h-56" }
						spinnerLabel={ `Cargando media de ${ name }` }
						src={ mediaUrl }
					/>
				) : null }

				<div className={ "space-y-2" }>
					<div className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
						<PlaySquare className={ "size-4 text-accent" }/>
						Instrucciones
					</div>
					{ trimmedInstructions ? (
						<div className={ "space-y-2 rounded-xl border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground" }>
							{ trimmedInstructions.split( /\r?\n/ ).map( ( line, index ) => (
								<p key={ `${ line }-${ index }` }>{ line }</p>
							) ) }
						</div>
					) : (
						<p className={ "rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground" }>
							Sin instrucciones cargadas para este ejercicio.
						</p>
					) }
				</div>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } variant={ "secondary" }>
					Cerrar
				</Button>
			</Drawer.Footer>
		</>
	);
}
