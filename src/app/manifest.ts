import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		background_color: "#f1f4fb",
		categories: [ "health", "fitness", "productivity" ],
		description: "Rutinas, planes de alimentación e historial de entrenamiento para entrenadores y estudiantes.",
		display: "standalone",
		icons: [
			{
				sizes: "any",
				src: "/app-icon.svg",
				type: "image/svg+xml",
			},
			{
				purpose: "maskable",
				sizes: "any",
				src: "/app-icon.svg",
				type: "image/svg+xml",
			},
		],
		lang: "es-AR",
		name: "Gym App",
		orientation: "portrait",
		short_name: "Gym App",
		start_url: "/",
		theme_color: "#0c66e4",
	};
}
