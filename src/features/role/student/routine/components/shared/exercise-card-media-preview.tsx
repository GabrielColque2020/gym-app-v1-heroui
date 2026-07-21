"use client";

import { AsyncMedia } from "@/components/common";

type ExerciseCardMediaPreviewProps = {
	imageUrl?: string | null;
	name: string;
	videoUrl?: string | null;
};

export function ExerciseCardMediaPreview( {
	imageUrl,
	name,
	videoUrl,
}: ExerciseCardMediaPreviewProps ) {
	const hasImage = Boolean( imageUrl?.trim() );
	const hasVideo = Boolean( videoUrl?.trim() );

	if (!hasImage && !hasVideo) {
		return null;
	}

	return (
		<div className={ "grid gap-3 md:grid-cols-2" } aria-label={ "Vista previa de medios" }>
			<AsyncMedia
				alt={ `Vista previa de ${ name }` }
				className={ "h-40 rounded-2xl border border-border" }
				emptyLabel={ "No hay imagen disponible para este ejercicio." }
				spinnerLabel={ `Cargando imagen de ${ name }` }
				src={ imageUrl }
			/>

			<AsyncMedia
				alt={ `Vista previa de video de ${ name }` }
				className={ "h-40 rounded-2xl border border-border" }
				emptyLabel={ "No hay video o GIF disponible para este ejercicio." }
				spinnerLabel={ `Cargando video de ${ name }` }
				src={ videoUrl }
			/>
		</div>
	);
}
