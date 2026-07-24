import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f1f4fb",
    categories: [ "health", "fitness", "productivity" ],
    description: "Gym App dashboard for coaches and students.",
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
      {
        sizes: "716x716",
        src: "/logo.png",
        type: "image/png",
      },
    ],
    lang: "en",
    name: "Gym App",
    orientation: "portrait",
    short_name: "Gym App",
    start_url: "/",
    theme_color: "#0c66e4",
  };
}
