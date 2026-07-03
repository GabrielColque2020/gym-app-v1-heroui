"use client";

import { Button, Card } from "@heroui/react";

type RoutinePageErrorStateProps = {
	errorMessage: string;
	onRetry: () => void;
};

export function RoutinePageErrorState( {
	errorMessage,
	onRetry,
}: RoutinePageErrorStateProps ) {
	return (
		<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }>
			<Card.Content className={ "flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>No se pudo cargar tu rutina</p>
				<p className={ "max-w-xl text-sm text-muted" }>{ errorMessage }</p>
				<Button className={ "mt-1" } onPress={ onRetry }>Reintentar</Button>
			</Card.Content>
		</Card>
	);
}
