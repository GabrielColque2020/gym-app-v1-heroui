"use client";

import { RouteErrorView } from "@/components/common/route-error-view";

import "./globals.css";

// Cuando falla el layout de la raiz (por ejemplo, la base no responde al leer la
// sesion), Next reemplaza toda la pagina por esto: trae su propio html y body.
export default function GlobalError( { error, retry }: { error: Error & { digest?: string }; retry: () => void } ) {
	return (
		<html className={ "bg-background text-foreground" } lang={ "es" }>
			<body className={ "font-sans antialiased" }>
				<RouteErrorView error={ error } retry={ retry }/>
			</body>
		</html>
	);
}
