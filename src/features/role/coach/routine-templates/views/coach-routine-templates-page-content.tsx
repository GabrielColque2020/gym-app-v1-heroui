"use client";

import { Button, Card, Spinner } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { RoutineTemplateCard } from "@/features/role/coach/routine-templates/components/routine-template-card";
import { useRoutineTemplates } from "@/features/role/coach/training-routine/hooks/use-routine-templates";

const BREADCRUMBS = [
	{ href: "/coach/dashboard", label: "Inicio" },
	{ label: "Plantillas" },
];

// La biblioteca de plantillas del entrenador: rutinas con nombre que no son de
// ningun estudiante y sirven para arrancar la de cualquiera.
export default function CoachRoutineTemplatesPageContent() {
	const { data: templates = [], isError, isFetching, isLoading, refetch } = useRoutineTemplates( { alwaysFresh: true } );
	const isRefreshing = isFetching && !isLoading;

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ BREADCRUMBS }
			/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-row items-start justify-between gap-3 border-b border-border p-3 sm:items-center" }>
					<div className={ "min-w-0" }>
						<PageHeader
							title={ "Plantillas" }
							description={ "Rutinas guardadas para armar más rápido la de cualquier estudiante." }
						/>
					</div>
					<Button
						isIconOnly
						aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
						className={ "shrink-0" }
						isDisabled={ isRefreshing || isLoading }
						variant={ "secondary" }
						onPress={ () => void refetch() }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					</Button>
				</Card.Header>
				<Card.Content className={ "p-3" }>
					{ isLoading ? (
						<div className={ "flex justify-center py-10" }>
							<Spinner aria-label={ "Cargando plantillas" }/>
						</div>
					) : isError ? (
						<p className={ "py-10 text-center text-sm text-muted" }>
							No se pudieron cargar las plantillas. Tocá actualizar para probar de nuevo.
						</p>
					) : templates.length === 0 ? (
						<div className={ "mx-auto max-w-md py-10 text-center" }>
							<p className={ "text-base font-semibold text-foreground" }>Todavía no tenés plantillas</p>
							<p className={ "mt-1 text-sm leading-6 text-muted" }>
								Para crear una, abrí la rutina de un estudiante que te guste, tocá los tres puntos y elegí &quot;Guardar como plantilla&quot;.
							</p>
						</div>
					) : (
						<div className={ "grid gap-3 sm:grid-cols-2 xl:grid-cols-3" }>
							{ templates.map( ( template ) => (
								<RoutineTemplateCard key={ template.id } template={ template }/>
							) ) }
						</div>
					) }
				</Card.Content>
				<Card.Footer className={ "border-t border-border p-3" }>
					<div className={ "text-sm text-muted" }>
						Para usar una, abrí la rutina de un estudiante y elegí &quot;Usar una plantilla&quot;. Se copia: cambiar o borrar la plantilla no toca las rutinas ya armadas.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
