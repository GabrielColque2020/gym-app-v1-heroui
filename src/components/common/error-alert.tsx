"use client";

import { Alert, Button, Spinner } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { isNetworkError, NETWORK_ERROR_MESSAGE } from "@/lib/action-result";

type ErrorAlertProps = {
	isRetrying?: boolean;
	message: string;
	// Vuelve a pedir lo que fallo. Sin esto, la unica salida era recargar toda la
	// app, algo dificil en la app instalada en el telefono.
	onRetryAction?: () => void;
	title: string;
};

export function ErrorAlert( { isRetrying = false, message, onRetryAction, title }: ErrorAlertProps ) {
	// Las pantallas pasan `error.message`: sin señal, el navegador lo escribe en
	// ingles ("Failed to fetch").
	const shownMessage = isNetworkError( new Error( message ) ) ? NETWORK_ERROR_MESSAGE : message;

	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content className={ "space-y-3" }>
				<div>
					<Alert.Title>{ title }</Alert.Title>
					<Alert.Description>{ shownMessage }</Alert.Description>
				</div>
				{ onRetryAction ? (
					<Button isDisabled={ isRetrying } isPending={ isRetrying } size={ "sm" } variant={ "secondary" } onPress={ onRetryAction }>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <RotateCw className={ "size-4" }/> }
								{ isPending ? "Reintentando..." : "Reintentar" }
							</>
						) }
					</Button>
				) : null }
			</Alert.Content>
		</Alert>
	);
}
