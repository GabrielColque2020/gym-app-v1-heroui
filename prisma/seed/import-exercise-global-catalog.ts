import "dotenv/config";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../src/generated/prisma/client";

type DatasetInstructions = string | string[] | Record<string, unknown> | null | undefined;

type DatasetExerciseRecord = {
	active?: boolean;
	attribution?: string;
	body_part?: string;
	bodyPart?: string;
	category?: string;
	equipment?: string;
	gif_url?: string;
	id?: string | number;
	image?: string;
	image_url?: string;
	instructions?: DatasetInstructions;
	media_id?: string | number;
	muscle_group?: string;
	name?: string;
	target?: string;
	video_url?: string;
};

type CloudinaryUploadMapItem = {
	fileName?: string;
	kind?: "images" | "videos";
	secureUrl?: string;
	sourcePath?: string;
};

type CloudinaryUploadMap = {
	items?: CloudinaryUploadMapItem[];
};

type ImportStats = {
	created: number;
	processed: number;
	updated: number;
};

const DEFAULT_MEDIA_PUBLIC_BASE = "/exercises-dataset";
const DEFAULT_DATASET_DIR = "public/exercises-dataset";
const DEFAULT_DATASET_FILE = "data/exercises.es.json";
const DEFAULT_CLOUDINARY_UPLOAD_MAP_FILE = "data/cloudinary-upload-map.json";

function normalizeSearchName( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

function normalizeText( value: unknown ) {
	return typeof value === "string" ? value.trim() : "";
}

function toRelativeAssetPath( value: string ) {
	const trimmed = value.trim();

	if (!trimmed) return "";

	return trimmed.replace( /^\.?\//, "" ).replace( /\\/g, "/" );
}

function isAbsoluteUrl( value: string ) {
	return /^(?:https?:)?\/\//i.test( value ) || value.startsWith( "data:" );
}

function resolveMediaUrl( value: unknown, publicBasePath: string ) {
	const normalizedValue = normalizeText( value );

	if (!normalizedValue) return null;

	if (isAbsoluteUrl( normalizedValue )) {
		return normalizedValue;
	}

	const basePath = publicBasePath.trim().replace( /\/+$/, "" ) || DEFAULT_MEDIA_PUBLIC_BASE;
	const relativePath = toRelativeAssetPath( normalizedValue );

	return `${ basePath }/${ relativePath }`;
}

function readInstructions( value: DatasetInstructions ) {
	if (!value) return "";

	if (typeof value === "string") {
		return value.trim();
	}

	if (Array.isArray( value )) {
		return value
			.map( ( item ) => normalizeText( item ) )
			.filter( Boolean )
			.join( "\n" )
			.trim();
	}

	const preferredLanguageKeys = [
		"es",
		"es-ES",
		"spa",
		"spanish",
		"Spanish",
		"espanol",
		"castellano",
		"en",
		"en-US",
		"english",
		"English",
	];

	for (const key of preferredLanguageKeys) {
		const candidate = value[ key ];

		if (typeof candidate === "string" && candidate.trim()) {
			return candidate.trim();
		}

		if (Array.isArray( candidate )) {
			const joined = candidate.map( ( item ) => normalizeText( item ) ).filter( Boolean ).join( "\n" ).trim();

			if (joined) return joined;
		}
	}

	return Object.values( value )
		.flatMap( ( item ) => (Array.isArray( item ) ? item : [ item ] ) )
		.map( ( item ) => normalizeText( item ) )
		.filter( Boolean )
		.join( "\n" )
		.trim();
}

function parseArgs( argv: string[] ) {
	const args = new Map<string, string | boolean>();

	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[ index ];

		if (!current.startsWith( "--" )) continue;

		const next = argv[ index + 1 ];
		const equalsIndex = current.indexOf( "=" );

		if (equalsIndex > 0) {
			args.set( current.slice( 2, equalsIndex ), current.slice( equalsIndex + 1 ) );
			continue;
		}

		if (next && !next.startsWith( "--" )) {
			args.set( current.slice( 2 ), next );
			index += 1;
			continue;
		}

		args.set( current.slice( 2 ), true );
	}

	return args;
}

function pickDatasetFile( args: Map<string, string | boolean> ) {
	const explicitDatasetPath = typeof args.get( "dataset" ) === "string" ? String( args.get( "dataset" ) ) : "";
	const explicitJsonPath = typeof args.get( "json" ) === "string" ? String( args.get( "json" ) ) : "";

	if (explicitJsonPath) {
		return path.resolve( process.cwd(), explicitJsonPath );
	}

	if (explicitDatasetPath) {
		const resolved = path.resolve( process.cwd(), explicitDatasetPath );

		return resolved.endsWith( ".json" ) ? resolved : path.join( resolved, DEFAULT_DATASET_FILE );
	}

	return path.resolve( process.cwd(), DEFAULT_DATASET_DIR, DEFAULT_DATASET_FILE );
}

function pickCloudinaryUploadMapFile( args: Map<string, string | boolean>, datasetFile: string ) {
	const explicitMapPath = typeof args.get( "cloudinary-map" ) === "string"
		? String( args.get( "cloudinary-map" ) )
		: "";

	if (explicitMapPath) {
		return path.resolve( process.cwd(), explicitMapPath );
	}

	const datasetDirectory = path.dirname( datasetFile );

	return path.resolve( datasetDirectory, path.basename( DEFAULT_CLOUDINARY_UPLOAD_MAP_FILE ) );
}

function buildSearchName( record: {
	category: string;
	equipment: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	target: string;
} ) {
	return normalizeSearchName( [
		record.name,
		record.category,
		record.target,
		record.muscleGroup,
		record.equipment,
		record.instructions,
	].filter( Boolean ).join( " " ) );
}

function buildCloudinaryLookupKey( kind: "images" | "videos", value: unknown ) {
	const normalizedValue = normalizeText( value );

	if (!normalizedValue || isAbsoluteUrl( normalizedValue )) {
		return null;
	}

	const normalizedPath = toRelativeAssetPath( normalizedValue );
	const fileName = path.posix.basename( normalizedPath );

	return `${ kind }:${ fileName }`;
}

function buildCloudinaryLookup( uploadMap: CloudinaryUploadMap | null ) {
	const lookup = new Map<string, string>();

	for (const item of uploadMap?.items ?? []) {
		const fileName = normalizeText( item.fileName );
		const secureUrl = normalizeText( item.secureUrl );

		if (!fileName || !secureUrl || (item.kind !== "images" && item.kind !== "videos")) {
			continue;
		}

		lookup.set( `${ item.kind }:${ fileName }`, secureUrl );
	}

	return lookup;
}

function isValidCloudinarySecureUrl(
	secureUrl: string,
	kind: "images" | "videos",
	expectedFileName: string,
) {
	try {
		const parsedUrl = new URL( secureUrl );
		const expectedResourceTypes = kind === "videos" && expectedFileName.toLowerCase().endsWith( ".gif" )
			? [ "image", "video" ]
			: [ kind === "videos" ? "video" : "image" ];
		const normalizedPath = parsedUrl.pathname.toLowerCase();
		const normalizedExpectedFileName = expectedFileName.toLowerCase();
		const normalizedActualFileName = path.posix.basename( parsedUrl.pathname ).toLowerCase();

		return expectedResourceTypes.some( ( resourceType ) => normalizedPath.includes( `/${ resourceType }/upload/` ) )
			&& normalizedActualFileName === normalizedExpectedFileName;
	} catch {
		return false;
	}
}

function resolveExerciseMediaUrl(
	value: unknown,
	kind: "images" | "videos",
	mediaPublicBasePath: string,
	cloudinaryLookup: Map<string, string>,
) {
	const lookupKey = buildCloudinaryLookupKey( kind, value );

	if (lookupKey) {
		const secureUrl = cloudinaryLookup.get( lookupKey );

		if (secureUrl) {
			const expectedFileName = lookupKey.split( ":" )[ 1 ] ?? "";

			if (expectedFileName && isValidCloudinarySecureUrl( secureUrl, kind, expectedFileName )) {
				return secureUrl;
			}

			console.warn(
				`Se ignoro una URL de Cloudinary invalida para ${ kind }: ${ expectedFileName } -> ${ secureUrl }`,
			);
		}
	}

	return resolveMediaUrl( value, mediaPublicBasePath );
}

function mapRecordToCreateInput(
	record: DatasetExerciseRecord,
	mediaPublicBasePath: string,
	cloudinaryLookup: Map<string, string>,
) {
	const name = normalizeText( record.name );
	const externalId = normalizeText( record.id ) || normalizeText( record.media_id ) || normalizeSearchName( name ).replace( /\s+/g, "-" ).slice( 0, 64 );
	const category = normalizeText( record.category || record.body_part || record.bodyPart ) || "sin categoria";
	const target = normalizeText( record.target ) || category;
	const muscleGroup = normalizeText( record.muscle_group ) || category;
	const equipment = normalizeText( record.equipment ) || "peso corporal";
	const instructions = readInstructions( record.instructions );
	const imageUrl = resolveExerciseMediaUrl( record.image ?? record.image_url, "images", mediaPublicBasePath, cloudinaryLookup );
	const videoUrl = resolveExerciseMediaUrl( record.gif_url ?? record.video_url, "videos", mediaPublicBasePath, cloudinaryLookup );
	const attribution = normalizeText( record.attribution ) || null;

	if (!name) {
		throw new Error( `El ejercicio ${ externalId || "(sin id)" } no tiene nombre.` );
	}

	return {
		active: record.active ?? true,
		category,
		attribution,
		equipment,
		externalId,
		imageUrl,
		instructions: instructions || null,
		muscleGroup,
		name,
		searchName: buildSearchName( {
			category,
			equipment,
			instructions,
			muscleGroup,
			name,
			target,
		} ),
		target,
		videoUrl,
	};
}

async function loadDataset( filePath: string ) {
	const raw = await readFile( filePath, "utf8" );
	const parsed = JSON.parse( raw ) as unknown;

	if (Array.isArray( parsed )) {
		return parsed as DatasetExerciseRecord[];
	}

	if (parsed && typeof parsed === "object") {
		const candidate = (parsed as { exercises?: unknown }).exercises;

		if (Array.isArray( candidate )) {
			return candidate as DatasetExerciseRecord[];
		}
	}

	throw new Error( "El archivo del dataset no tiene el formato esperado." );
}

async function loadCloudinaryUploadMap( filePath: string ) {
	try {
		const raw = await readFile( filePath, "utf8" );
		const parsed = JSON.parse( raw ) as CloudinaryUploadMap;

		return parsed && typeof parsed === "object" ? parsed : null;
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String( error );

		if (message.includes( "ENOENT" )) {
			return null;
		}

		throw error;
	}
}

async function main(): Promise<ImportStats> {
	const accelerateUrl = process.env.DATABASE_URL;

	if (!accelerateUrl) {
		throw new Error( "DATABASE_URL es requerido para importar el catalogo global." );
	}

	const args = parseArgs( process.argv.slice( 2 ) );
	const datasetFile = pickDatasetFile( args );
	const cloudinaryUploadMapFile = pickCloudinaryUploadMapFile( args, datasetFile );
	const mediaPublicBasePath = typeof args.get( "media-base" ) === "string"
		? String( args.get( "media-base" ) )
		: process.env.EXERCISE_MEDIA_PUBLIC_BASE_PATH || DEFAULT_MEDIA_PUBLIC_BASE;
	const dryRun = args.get( "dry-run" ) === true;

	const dataset = await loadDataset( datasetFile );
	const cloudinaryUploadMap = await loadCloudinaryUploadMap( cloudinaryUploadMapFile );
	const cloudinaryLookup = buildCloudinaryLookup( cloudinaryUploadMap );
	const prisma = new PrismaClient( { accelerateUrl } ).$extends( withAccelerate() );

	try {
		const stats: ImportStats = {
			created: 0,
			processed: 0,
			updated: 0,
		};

		for (const record of dataset) {
			const data = mapRecordToCreateInput( record, mediaPublicBasePath, cloudinaryLookup );

			stats.processed += 1;

			if (dryRun) {
				continue;
			}

			const existing = await prisma.exerciseGlobal.findUnique( {
				select: {
					id: true,
				},
				where: {
					externalId: data.externalId,
				},
			} );

			await prisma.exerciseGlobal.upsert( {
				create: data,
				update: data,
				where: {
					externalId: data.externalId,
				},
			} );

			if (existing) {
				stats.updated += 1;
			} else {
				stats.created += 1;
			}
		}

		return stats;
	} finally {
		await prisma.$disconnect();
	}
}

main()
	.then( ( stats ) => {
		console.log(
			`Importacion de ejercicios globales completada. Procesados: ${ stats.processed }, creados: ${ stats.created }, actualizados: ${ stats.updated }`,
		);
	} )
	.catch( async ( error: unknown ) => {
		console.error( "Error importando ejercicios globales:", error );
		process.exitCode = 1;
	} );
