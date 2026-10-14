import type { ReactNode } from "react";

import { Button, Card } from "@heroui/react";
import { Plus } from "lucide-react";

type StudentsEmptyStateProps = {
	// Lo que se puede hacer desde aca: cargar el primero o limpiar los filtros.
	action?: ReactNode;
	description?: string;
	message: string;
};

export function StudentsEmptyState( { action, description, message }: StudentsEmptyStateProps ) {
	return (
		<Card className={ "flex-1 border border-border" } variant={ "default" }>
			<Card.Content className={ "flex flex-col items-center gap-3 py-10 text-center" }>
				<div>
					<p className={ "text-base font-semibold text-foreground" }>{ message }</p>
					{ description ? <p className={ "mt-1 text-sm text-muted" }>{ description }</p> : null }
				</div>
				{ action }
			</Card.Content>
		</Card>
	);
}

// La lista sin ningun estudiante: se carga el primero desde aca.
export function StudentsNoneEmptyState( { onCreateStudentAction }: { onCreateStudentAction?: () => void } ) {
	return (
		<StudentsEmptyState
			action={ onCreateStudentAction ? (
				<Button className={ "bg-accent text-accent-foreground" } onPress={ onCreateStudentAction }>
					<Plus className={ "size-4" }/>
					Cargar estudiante
				</Button>
			) : null }
			description={ "Cargá el primero para armarle la rutina y el plan." }
			message={ "Todavía no tenés estudiantes" }
		/>
	);
}

// Los filtros no dejaron a nadie: se sacan de un toque.
export function StudentsNoMatchEmptyState( { onClearFiltersAction }: { onClearFiltersAction: () => void } ) {
	return (
		<StudentsEmptyState
			action={
				<Button variant={ "secondary" } onPress={ onClearFiltersAction }>
					Limpiar filtros
				</Button>
			}
			description={ "Probá con otro nombre o cambiá el estado." }
			message={ "No hay estudiantes que coincidan con los filtros" }
		/>
	);
}
