"use client";

import { useEffect } from "react";

import { Button, Card } from "@heroui/react";
import { House, RotateCw, TriangleAlert, WifiOff } from "lucide-react";

import { isNetworkError } from "@/lib/action-result";
import { useIsOnline } from "@/lib/use-is-online";

type RouteErrorViewProps = {
	error: Error & { digest?: string };
	retry: () => void;
};

// Lo que se ve cuando una pantalla se rompe al mostrarse. Sin esto aparecia la
// pantalla de Next, en ingles y sin salida: en la app instalada en el telefono
// ni siquiera hay boton de recargar.
export function RouteErrorView( { error, retry }: RouteErrorViewProps ) {
	const isOnline = useIsOnline();
	const isConnectionProblem = !isOnline || isNetworkError( error );

	useEffect( () => {
		// Queda en la consola (y en los registros del servidor, por el `digest`)
		// para poder rastrearlo.
		console.error( error );
	}, [ error ] );

	return (
		<div className={ "flex min-h-[60vh] items-center justify-center px-4 py-10" }>
			<Card className={ "w-full max-w-md border border-border" } variant={ "default" }>
				<Card.Content className={ "space-y-4 p-6 text-center" }>
					<div className={ "mx-auto flex size-12 items-center justify-center rounded-full bg-warning/10 text-warning" }>
						{ isConnectionProblem ? <WifiOff className={ "size-6" }/> : <TriangleAlert className={ "size-6" }/> }
					</div>
					<div className={ "space-y-1" }>
						<h1 className={ "text-lg font-semibold text-foreground" }>
							{ isConnectionProblem ? "No hay conexión" : "Algo falló al mostrar esta pantalla" }
						</h1>
						<p className={ "text-sm text-muted" }>
							{ isConnectionProblem
								? "Revisá la señal y probá de nuevo. Lo que cargaste y no se llegó a guardar sigue en este dispositivo."
								: "Probá de nuevo. Si sigue pasando, volvé al inicio y entrá otra vez a esta pantalla." }
						</p>
					</div>
					<div className={ "flex flex-col gap-2 sm:flex-row sm:justify-center" }>
						<Button onPress={ retry }>
							<RotateCw className={ "size-4" }/>
							Reintentar
						</Button>
						{ /* Carga completa: si lo roto es el estado de la app, empezar de cero lo arregla. */ }
						<Button variant={ "secondary" } onPress={ () => window.location.assign( "/" ) }>
							<House className={ "size-4" }/>
							Ir al inicio
						</Button>
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
