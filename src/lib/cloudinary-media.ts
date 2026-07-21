import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";

type CloudinaryResourceType = "image" | "video";

type ParsedCloudinaryAsset = {
	cloudName: string;
	isGif: boolean;
	url: string;
};

function parseCloudinaryAsset( url: string ): ParsedCloudinaryAsset | null {
	try {
		const parsedUrl = new URL( url );

		if (parsedUrl.hostname !== "res.cloudinary.com") {
			return null;
		}

		const pathSegments = parsedUrl.pathname.split( "/" ).filter( Boolean );
		const cloudName = pathSegments[ 0 ];

		if (!cloudName || !parsedUrl.pathname.includes( "/upload/" )) {
			return null;
		}

		return {
			cloudName,
			isGif: /\.gif(?:\?.*)?$/i.test( parsedUrl.pathname ),
			url,
		};
	} catch {
		return null;
	}
}

function normalizeFormat( url: string, resourceType: CloudinaryResourceType ) {
	if (resourceType === "video") {
		return "auto:video";
	}

	return /\.gif(?:\?.*)?$/i.test( url ) ? "auto" : "auto";
}

function replaceUploadSegment( url: string, transformation: string ) {
	return url.replace( "/upload/", `/upload/${ transformation }/` );
}

function convertGifToMp4Url( url: string ) {
	const transformedUrl = replaceUploadSegment( url, "q_auto" );

	return transformedUrl.replace( /\.gif(?:\?.*)?$/i, ".mp4" );
}

export function getOptimizedCloudinaryMedia( url: string, resourceType: CloudinaryResourceType ) {
	const asset = parseCloudinaryAsset( url );

	if (!asset) {
		return {
			kind: resourceType,
			url,
		};
	}

	if (asset.isGif) {
		return {
			kind: "video" as const,
			url: convertGifToMp4Url( asset.url ),
		};
	}

	const config = {
		cloud: {
			cloudName: asset.cloudName,
		},
	};

	if (resourceType === "video") {
		return {
			kind: "video" as const,
			url: getCldVideoUrl(
				{
					format: normalizeFormat( asset.url, resourceType ),
					quality: "auto",
					src: asset.url,
				},
				config,
			),
		};
	}

	return {
		kind: "image" as const,
		url: getCldImageUrl(
			{
				format: normalizeFormat( asset.url, resourceType ),
				quality: "auto",
				src: asset.url,
			},
			config,
		),
	};
}

export function isCloudinaryUrl( url: string ) {
	return parseCloudinaryAsset( url ) !== null;
}
