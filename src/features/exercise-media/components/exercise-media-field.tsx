"use client";

import { useRef, useState } from "react";
import { Button, Label } from "@heroui/react";
import { Trash2, Upload } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { createExerciseMediaUploadTicketAction } from "@/features/exercise-media/actions/exercise-media";
import {
	EXERCISE_MEDIA_HELP,
	EXERCISE_VIDEO_MAX_SECONDS,
	type ExerciseMediaSlot,
	formatMegabytes,
	getExerciseMediaUploadRules,
	resolveExerciseMediaUploadKind,
} from "@/features/exercise-media/services/exercise-media-limits";

type ExerciseMediaFieldProps = {
	exerciseName: string;
	isDisabled?: boolean;
	slot: ExerciseMediaSlot;
	value: string;
	onChangeAction: ( url: string ) => void;
	// Mientras sube un archivo el formulario no se puede guardar.
	onUploadingChangeAction: ( isUploading: boolean ) => void;
};

const ACCEPT = {
	image: "image/jpeg,image/png,image/webp",
	video: "video/mp4,video/webm,video/quicktime,image/gif",
} as const;

const TEXT = {
	image: { empty: "Sin imagen", label: "Imagen", upload: "Subir imagen" },
	// El GIF va primero: es lo que mas se sube, igual que en el catalogo.
	video: { empty: "Sin GIF ni video", label: "GIF o video corto", upload: "Subir GIF o video" },
} as const;

// Cuanto dura un video, leido en el navegador antes de subirlo. `null` si el
// navegador no lo puede abrir: en ese caso decide el servidor al guardar.
function readVideoDuration( file: File ) {
	return new Promise<number | null>( ( resolve ) => {
		const video = document.createElement( "video" );
		const objectUrl = URL.createObjectURL( file );
		let isDone = false;
		const finish = ( duration: number | null ) => {
			if (isDone) return;

			isDone = true;
			URL.revokeObjectURL( objectUrl );
			resolve( duration );
		};

		video.preload = "metadata";
		video.onloadedmetadata = () => {
			if (Number.isFinite( video.duration )) {
				finish( video.duration );
				return;
			}

			// Algunos videos (los WebM grabados desde el navegador o la camara) no
			// traen la duracion escrita y el navegador responde "infinito". Saltar
			// al final lo obliga a calcularla.
			video.ontimeupdate = () => {
				video.ontimeupdate = null;
				finish( Number.isFinite( video.duration ) ? video.duration : null );
			};
			video.currentTime = Number.MAX_SAFE_INTEGER;
		};
		video.onerror = () => finish( null );
		// Si el navegador no llega a responder, decide el servidor al guardar.
		window.setTimeout( () => finish( null ), 4000 );
		video.src = objectUrl;
	} );
}

function uploadToCloudinary( url: string, body: FormData, onProgress: ( percent: number ) => void ) {
	return new Promise<{ secure_url?: string }>( ( resolve, reject ) => {
		const request = new XMLHttpRequest();

		request.open( "POST", url );
		request.upload.onprogress = ( event ) => {
			if (event.lengthComputable) onProgress( Math.round( ( event.loaded / event.total ) * 100 ) );
		};
		request.onerror = () => reject( new Error( "network" ) );
		request.onload = () => {
			try {
				const data = JSON.parse( request.responseText ) as { secure_url?: string };

				if (request.status >= 200 && request.status < 300) resolve( data );
				else reject( new Error( "rejected" ) );
			} catch {
				reject( new Error( "rejected" ) );
			}
		};
		request.send( body );
	} );
}

// Un lugar para subir la imagen o el video de un ejercicio. El archivo va del
// navegador directo a Cloudinary; aca solo queda su direccion, que se guarda
// con el resto del formulario.
export function ExerciseMediaField( {
	exerciseName,
	isDisabled = false,
	slot,
	value,
	onChangeAction,
	onUploadingChangeAction,
}: ExerciseMediaFieldProps ) {
	const inputRef = useRef<HTMLInputElement | null>( null );
	const [ error, setError ] = useState<string | null>( null );
	const [ progress, setProgress ] = useState<number | null>( null );
	const text = TEXT[ slot ];
	const isUploading = progress !== null;
	const name = exerciseName.trim() || "ejercicio";

	async function handleFile( file: File ) {
		setError( null );

		const kind = resolveExerciseMediaUploadKind( slot, file );

		if (!kind) {
			setError( `Ese archivo no sirve acá. ${ EXERCISE_MEDIA_HELP[ slot ] }` );
			return;
		}

		const rules = getExerciseMediaUploadRules( kind );

		if (file.size > rules.maxBytes) {
			setError( `El archivo pesa ${ formatMegabytes( file.size ) } y el máximo es ${ formatMegabytes( rules.maxBytes ) }.` );
			return;
		}

		if (rules.maxSeconds !== null) {
			const duration = await readVideoDuration( file );

			if (duration !== null && duration > rules.maxSeconds + 0.5) {
				setError( `El video dura ${ Math.round( duration ) } segundos y el máximo es ${ EXERCISE_VIDEO_MAX_SECONDS }.` );
				return;
			}
		}

		setProgress( 0 );
		onUploadingChangeAction( true );

		try {
			const result = await createExerciseMediaUploadTicketAction( kind );

			if (!result.ok) {
				setError( result.reason );
				return;
			}

			const { ticket } = result;
			const body = new FormData();

			body.set( "file", file );
			body.set( "api_key", ticket.apiKey );
			body.set( "timestamp", String( ticket.timestamp ) );
			body.set( "folder", ticket.folder );
			body.set( "allowed_formats", ticket.allowedFormats );
			body.set( "signature", ticket.signature );

			const uploaded = await uploadToCloudinary(
				`https://api.cloudinary.com/v1_1/${ ticket.cloudName }/${ ticket.resourceType }/upload`,
				body,
				setProgress,
			);

			if (!uploaded.secure_url) {
				setError( "No se pudo subir el archivo. Probá de nuevo." );
				return;
			}

			onChangeAction( uploaded.secure_url );
		} catch ( uploadError ) {
			// Cloudinary lo rechaza cuando el archivo esta dañado o no es lo que su
			// nombre dice; lo otro es que no se haya podido llegar.
			setError( uploadError instanceof Error && uploadError.message === "rejected"
				? "No se pudo procesar ese archivo. Puede estar dañado; probá con otro."
				: "No se pudo subir el archivo. Revisá la conexión y probá de nuevo." );
		} finally {
			setProgress( null );
			onUploadingChangeAction( false );
		}
	}

	return (
		<div className={ "space-y-2" }>
			<Label>{ text.label }</Label>
			<AsyncMedia
				alt={ `${ text.label } de ${ name }` }
				className={ "h-44 rounded-2xl border border-border" }
				emptyLabel={ text.empty }
				spinnerLabel={ `Cargando ${ text.label.toLowerCase() } de ${ name }` }
				src={ value || null }
			/>
			<input
				ref={ inputRef }
				hidden
				accept={ ACCEPT[ slot ] }
				aria-label={ `Elegir archivo: ${ text.label.toLowerCase() } de ${ name }` }
				type={ "file" }
				onChange={ ( event ) => {
					const file = event.target.files?.[ 0 ];

					// Se vacia para que elegir dos veces el mismo archivo vuelva a avisar.
					event.target.value = "";

					if (file) void handleFile( file );
				} }
			/>
			<div className={ "flex flex-wrap items-center gap-2" }>
				<Button
					isDisabled={ isDisabled || isUploading }
					size={ "sm" }
					variant={ "secondary" }
					onPress={ () => inputRef.current?.click() }
				>
					<Upload className={ "size-4" }/>
					{ isUploading ? `Subiendo ${ progress }%` : value ? "Cambiar" : text.upload }
				</Button>
				{ value && !isUploading ? (
					<Button
						aria-label={ `Quitar ${ text.label.toLowerCase() } de ${ name }` }
						isDisabled={ isDisabled }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ () => {
							setError( null );
							onChangeAction( "" );
						} }
					>
						<Trash2 className={ "size-4" }/>
						Quitar
					</Button>
				) : null }
			</div>
			{ error ? (
				<p className={ "text-xs text-danger" } role={ "alert" }>{ error }</p>
			) : (
				<p className={ "text-xs text-muted" }>{ EXERCISE_MEDIA_HELP[ slot ] }</p>
			) }
		</div>
	);
}
