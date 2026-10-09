"use client";

import { RouteErrorView } from "@/components/common/route-error-view";

// Una pantalla de la app que se rompe: el error se muestra adentro de la app, con
// el menu a mano, y no reemplaza todo.
export default function AuthenticatedError( { error, retry }: { error: Error & { digest?: string }; retry: () => void } ) {
	return <RouteErrorView error={ error } retry={ retry }/>;
}
