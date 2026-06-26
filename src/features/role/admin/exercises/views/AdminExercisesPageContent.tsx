"use client";

import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { ExerciseSheet } from "@/features/role/admin/exercises/components/shared/ExerciseSheet";
import { ExercisesContentDesktop } from "@/features/role/admin/exercises/components/desktop/ExercisesContentDesktop";
import { useExercises } from "@/features/exercises/hooks/useExercises";
import { ExercisesContentMobile } from "@/features/role/admin/exercises/components/mobile/ExercisesContentMobile";

export default function AdminExercisesPageContent() {
	const { data: exercises = [], error, isError, isLoading } = useExercises();
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ label: "Ejercicios" },
	];

	if (isLoading) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando ejercicios</p>
							<p className={ "text-sm text-muted" }>Consultando la base de datos y sincronizando la cache.</p>
						</div>
					</Card.Content>
				</Card>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar ejercicios</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</div>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" }>
					<PageHeader
						title={ "Ejercicios" }
						description={ "Listado administrativo con estado, grupo muscular y fecha de alta." }
					/>
					<div className={ "w-full md:hidden" }>
						<ExerciseSheet
							mode={ "create" }
							placement={ "bottom" }
							triggerClassName={ "w-full bg-accent text-accent-foreground" }
						/>
					</div>
					<div className={ "hidden md:block" }>
						<ExerciseSheet
							mode={ "create" }
							placement={ "right" }
							triggerClassName={ "bg-accent text-accent-foreground" }
						/>
					</div>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					<div className={ "hidden w-full md:flex" }>
						<ExercisesContentDesktop exercises={ exercises }/>
					</div>
					<div className={ "w-full md:hidden" }>
						<ExercisesContentMobile exercises={ exercises }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-5 py-4 sm:px-6" }>
					<div className={ "text-sm text-muted" }>
						Desactivar conserva el ejercicio en rutinas y progresos historicos.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
