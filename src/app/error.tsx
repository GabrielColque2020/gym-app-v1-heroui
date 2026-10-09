"use client";

import { RouteErrorView } from "@/components/common/route-error-view";

// Las pantallas de afuera de la app (el ingreso, la de sin conexion).
export default function RootError( { error, retry }: { error: Error & { digest?: string }; retry: () => void } ) {
	return <RouteErrorView error={ error } retry={ retry }/>;
}
