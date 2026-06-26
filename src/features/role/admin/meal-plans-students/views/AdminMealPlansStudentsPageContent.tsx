"use client";

import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { MealPlansStudentsContentDesktop } from "@/features/role/admin/meal-plans-students/components/desktop/MealPlansStudentsContentDesktop";
import { MealPlansStudentsContentMobile } from "@/features/role/admin/meal-plans-students/components/mobile/MealPlansStudentsContentMobile";
import { useMealPlansStudents } from "@/features/role/admin/meal-plans-students/hooks/useMealPlansStudents";

export default function AdminMealPlansStudentsPageContent() {
	const { data: students = [], error, isError, isLoading } = useMealPlansStudents();
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ label: "Planes alimenticios por estudiante" },
	];

	if (isLoading) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/" }
						backLabel={ "Volver al inicio" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando estudiantes activos</p>
							<p className={ "text-sm text-muted" }>Consultando estudiantes disponibles para planes alimenticios.</p>
						</div>
					</Card.Content>
				</Card>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/" }
						backLabel={ "Volver al inicio" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar estudiantes activos</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	return (
		<>
			<div className={ "mb-0" }>
				<PageBreadcrumbs
					backHref={ "/" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
			</div>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" }>
					<PageHeader
						description={ "Selecciona un estudiante activo para consultar sus planes alimenticios." }
						title={ "Planes alimenticios por estudiante" }
					/>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					<div className={ "hidden w-full md:flex" }>
						<MealPlansStudentsContentDesktop students={ students }/>
					</div>
					<div className={ "w-full md:hidden" }>
						<MealPlansStudentsContentMobile students={ students }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-5 py-4 sm:px-6" }>
					<div className={ "text-sm text-muted" }>
						Solo se muestran estudiantes activos.
					</div>
				</Card.Footer>
			</Card>
		</>
	);
}
