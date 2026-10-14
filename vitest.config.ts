import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Tests de la logica que se rompe sin que se note en pantalla: fechas, sesion,
// proxima sesion, mensajes de error. Corren en Node, sin base ni navegador.
export default defineConfig( {
	resolve: {
		alias: {
			"@": fileURLToPath( new URL( "./src", import.meta.url ) ),
		},
	},
	test: {
		environment: "node",
		include: [ "src/**/*.test.ts" ],
		// Las fechas de la app son en hora argentina: los tests no dependen del
		// huso de la maquina que los corre.
		env: {
			TZ: "UTC",
		},
	},
} );
