import "dotenv/config";

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

type AssetKind = "images" | "videos";

type CliOptions = {
	assetFolderRoot: string;
	assetKinds: AssetKind[];
	datasetFile: string;
	datasetDir: string;
	outputFile: string;
	overwrite: boolean;
};

type DatasetExerciseRecord = {
	gif_url?: string;
	id?: string | number;
	image?: string;
	image_url?: string;
	video_url?: string;
};

type CloudinaryCredentials = {
	apiKey: string;
	apiSecret: string;
	cloudName: string;
};

type UploadConfig = {
	directory: string;
	kind: AssetKind;
};

type UploadedAsset = {
	bytes: number;
	fileName: string;
	kind: AssetKind;
	publicId: string;
	secureUrl: string;
	sourcePath: string;
};

type UploadMap = {
	generatedAt: string;
	items: UploadedAsset[];
};

const DEFAULT_DATASET_DIR = path.resolve( process.cwd(), "public/exercises-dataset" );
const DEFAULT_ASSET_FOLDER_ROOT = "exercises";
const DEFAULT_DATASET_FILE = path.resolve(
	process.cwd(),
	"public/exercises-dataset/data/exercises.es.json",
);
const DEFAULT_OUTPUT_FILE = path.resolve(
	process.cwd(),
	"public/exercises-dataset/data/cloudinary-upload-map.json",
);
const IMAGE_EXTENSIONS = new Set( [ ".jpg", ".jpeg", ".png", ".webp" ] );
const VIDEO_EXTENSIONS = new Set( [ ".gif", ".mp4", ".webm", ".mov", ".m4v" ] );

function parseArgs( argv: string[] ) {
	const args = new Map<string, string | boolean>();

	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[ index ];

		if (!current.startsWith( "--" )) continue;

		const equalsIndex = current.indexOf( "=" );
		const next = argv[ index + 1 ];

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

function resolveCliOptions( argv: string[] ): CliOptions {
	const args = parseArgs( argv );
	const assetFolderRoot = typeof args.get( "asset-folder-root" ) === "string"
		? String( args.get( "asset-folder-root" ) ).trim().replace( /^\/+|\/+$/g, "" )
		: process.env.CLOUDINARY_ASSET_FOLDER_ROOT?.trim().replace( /^\/+|\/+$/g, "" ) || DEFAULT_ASSET_FOLDER_ROOT;
	const datasetFile = typeof args.get( "json" ) === "string"
		? path.resolve( process.cwd(), String( args.get( "json" ) ) )
		: DEFAULT_DATASET_FILE;
	const datasetDir = typeof args.get( "dataset" ) === "string"
		? path.resolve( process.cwd(), String( args.get( "dataset" ) ) )
		: DEFAULT_DATASET_DIR;
	const outputFile = typeof args.get( "output" ) === "string"
		? path.resolve( process.cwd(), String( args.get( "output" ) ) )
		: DEFAULT_OUTPUT_FILE;
	const assetKindArg = typeof args.get( "kind" ) === "string"
		? String( args.get( "kind" ) ).trim().toLowerCase()
		: "all";
	const overwrite = args.get( "no-overwrite" ) !== true;
	const assetKinds = assetKindArg === "images"
		? [ "images" ]
		: assetKindArg === "videos"
			? [ "videos" ]
			: [ "images", "videos" ];

	return {
		assetFolderRoot,
		assetKinds,
		datasetFile,
		datasetDir,
		outputFile,
		overwrite,
	};
}

function getCloudinaryCredentials(): CloudinaryCredentials {
	const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();

	if (!cloudinaryUrl) {
		throw new Error( "CLOUDINARY_URL es requerido para subir assets a Cloudinary." );
	}

	const parsed = new URL( cloudinaryUrl );
	const cloudName = parsed.hostname.trim();
	const apiKey = decodeURIComponent( parsed.username );
	const apiSecret = decodeURIComponent( parsed.password );

	if (!cloudName || !apiKey || !apiSecret) {
		throw new Error( "CLOUDINARY_URL no tiene el formato esperado." );
	}

	return {
		apiKey,
		apiSecret,
		cloudName,
	};
}

async function listAssetFiles( directory: string ) {
	const entries = await readdir( directory, { withFileTypes: true } );

	return entries
		.filter( ( entry ) => entry.isFile() )
		.map( ( entry ) => path.join( directory, entry.name ) )
		.sort();
}

function normalizeDatasetAssetPath( value: unknown ) {
	if (typeof value !== "string") return null;

	const trimmed = value.trim();

	if (!trimmed || /^(?:https?:)?\/\//i.test( trimmed ) || trimmed.startsWith( "data:" )) {
		return null;
	}

	return trimmed.replace( /^\.?\//, "" ).replace( /\\/g, "/" );
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

function collectReferencedAssets( dataset: DatasetExerciseRecord[], kind: AssetKind ) {
	const values = dataset
		.map( ( record ) => (kind === "images" ? record.image ?? record.image_url : record.gif_url ?? record.video_url) )
		.map( normalizeDatasetAssetPath )
		.filter( ( value ): value is string => Boolean( value ) );

	return new Set( values );
}

function buildPublicId( filePath: string, kind: AssetKind ) {
	const baseName = path.basename( filePath, path.extname( filePath ) );

	return `exercises/${ kind }/${ baseName }`;
}

function buildAssetFolder( assetFolderRoot: string, kind: AssetKind ) {
	return `${ assetFolderRoot }/${ kind }`;
}

function resolveCloudinaryResourceType( filePath: string, kind: AssetKind ) {
	const extension = path.extname( filePath ).toLowerCase();

	if (extension === ".gif") {
		return "image";
	}

	return kind === "videos" ? "video" : "image";
}

function buildUploadSignature( params: Record<string, string>, apiSecret: string ) {
	const serialized = Object.entries( params )
		.sort( ( [ keyA ], [ keyB ] ) => keyA.localeCompare( keyB ) )
		.map( ( [ key, value ] ) => `${ key }=${ value }` )
		.join( "&" );

	return createHash( "sha1" )
		.update( `${ serialized }${ apiSecret }` )
		.digest( "hex" );
}

async function uploadAsset(
	filePath: string,
	kind: AssetKind,
	credentials: CloudinaryCredentials,
	overwrite: boolean,
	assetFolderRoot: string,
) {
	const fileBuffer = await readFile( filePath );
	const fileBytes = Uint8Array.from( fileBuffer );
	const timestamp = Math.floor( Date.now() / 1000 ).toString();
	const publicId = buildPublicId( filePath, kind );
	const assetFolder = buildAssetFolder( assetFolderRoot, kind );
	const resourceType = resolveCloudinaryResourceType( filePath, kind );
	const endpoint = `https://api.cloudinary.com/v1_1/${ credentials.cloudName }/${ resourceType }/upload`;
	const paramsToSign = {
		asset_folder: assetFolder,
		overwrite: overwrite ? "true" : "false",
		public_id: publicId,
		timestamp,
		unique_filename: "false",
		use_filename: "false",
	};
	const signature = buildUploadSignature( paramsToSign, credentials.apiSecret );
	const form = new FormData();

	form.set( "file", new Blob( [ fileBytes ] ), path.basename( filePath ) );
	form.set( "api_key", credentials.apiKey );
	form.set( "asset_folder", assetFolder );
	form.set( "overwrite", paramsToSign.overwrite );
	form.set( "public_id", publicId );
	form.set( "signature", signature );
	form.set( "timestamp", timestamp );
	form.set( "unique_filename", paramsToSign.unique_filename );
	form.set( "use_filename", paramsToSign.use_filename );

	const response = await fetch( endpoint, {
		body: form,
		method: "POST",
	} );

	if (!response.ok) {
		const errorText = await response.text();

		throw new Error( `Cloudinary rechazo ${ path.basename( filePath ) }: ${ response.status } ${ errorText }` );
	}

	const payload = await response.json() as { bytes?: number; public_id?: string; secure_url?: string };

	if (!payload.public_id || !payload.secure_url) {
		throw new Error( `Cloudinary no devolvio public_id/secure_url para ${ path.basename( filePath ) }.` );
	}

	return {
		bytes: payload.bytes ?? fileBuffer.byteLength,
		fileName: path.basename( filePath ),
		kind,
		publicId: payload.public_id,
		secureUrl: payload.secure_url,
		sourcePath: filePath,
	} satisfies UploadedAsset;
}

async function uploadDirectory(
	config: UploadConfig,
	credentials: CloudinaryCredentials,
	overwrite: boolean,
	referencedAssets: Set<string>,
	datasetDir: string,
	assetFolderRoot: string,
) {
	const files = await listAssetFiles( config.directory );
	const allowedExtensions = config.kind === "videos" ? VIDEO_EXTENSIONS : IMAGE_EXTENSIONS;
	const acceptedFiles = files
		.filter( ( filePath ) => allowedExtensions.has( path.extname( filePath ).toLowerCase() ) )
		.filter( ( filePath ) => referencedAssets.has( path.relative( datasetDir, filePath ).replace( /\\/g, "/" ) ) );
	const uploaded: UploadedAsset[] = [];

	for (const filePath of acceptedFiles) {
		const asset = await uploadAsset( filePath, config.kind, credentials, overwrite, assetFolderRoot );
		uploaded.push( asset );
		console.log( `[${ config.kind }] ${ asset.fileName } -> ${ asset.publicId }` );
	}

	return uploaded;
}

async function writeUploadMap( outputFile: string, items: UploadedAsset[] ) {
	await mkdir( path.dirname( outputFile ), { recursive: true } );

	let existingItems: UploadedAsset[] = [];

	try {
		const existingRaw = await readFile( outputFile, "utf8" );
		const existingPayload = JSON.parse( existingRaw ) as UploadMap;
		existingItems = Array.isArray( existingPayload.items ) ? existingPayload.items : [];
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String( error );

		if (!message.includes( "ENOENT" )) {
			throw error;
		}
	}

	const mergedByKey = new Map<string, UploadedAsset>();

	for (const item of existingItems) {
		mergedByKey.set( `${ item.kind }:${ item.fileName }`, item );
	}

	for (const item of items) {
		mergedByKey.set( `${ item.kind }:${ item.fileName }`, item );
	}

	const payload: UploadMap = {
		generatedAt: new Date().toISOString(),
		items: Array.from( mergedByKey.values() ).sort( ( left, right ) =>
			left.kind.localeCompare( right.kind ) || left.fileName.localeCompare( right.fileName ),
		),
	};

	await writeFile( outputFile, `${ JSON.stringify( payload, null, 2 ) }\n`, "utf8" );
}

async function main() {
	const options = resolveCliOptions( process.argv.slice( 2 ) );
	const credentials = getCloudinaryCredentials();
	const dataset = await loadDataset( options.datasetFile );
	const imageDirectory = path.join( options.datasetDir, "images" );
	const videoDirectory = path.join( options.datasetDir, "videos" );
	const referencedImages = collectReferencedAssets( dataset, "images" );
	const referencedVideos = collectReferencedAssets( dataset, "videos" );
	const items: UploadedAsset[] = [];

	if (options.assetKinds.includes( "images" )) {
		const uploadedImages = await uploadDirectory(
			{
				directory: imageDirectory,
				kind: "images",
			},
			credentials,
			options.overwrite,
			referencedImages,
			options.datasetDir,
			options.assetFolderRoot,
		);

		items.push( ...uploadedImages );
	}

	if (options.assetKinds.includes( "videos" )) {
		const uploadedVideos = await uploadDirectory(
			{
				directory: videoDirectory,
				kind: "videos",
			},
			credentials,
			options.overwrite,
			referencedVideos,
			options.datasetDir,
			options.assetFolderRoot,
		);

		items.push( ...uploadedVideos );
	}

	await writeUploadMap( options.outputFile, items );

	console.log(
		`Subida completada. Assets procesados: ${ items.length }. Mapeo guardado en: ${ options.outputFile }`,
	);
}

main().catch( ( error: unknown ) => {
	console.error( "Error subiendo media a Cloudinary:", error );
	process.exitCode = 1;
} );
