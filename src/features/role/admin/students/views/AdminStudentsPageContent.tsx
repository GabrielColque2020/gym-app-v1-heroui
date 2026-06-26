"use client";

import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { StudentsContentDesktop } from "@/features/students/components/desktop/StudentsContentDesktop";
import { StudentsContentMobile } from "@/features/students/components/mobile/StudentsContentMobile";
import { StudentSheet } from "@/features/students/components/shared/StudentSheet";
import { useStudents } from "@/features/students/hooks/useStudents";

// Renderiza el listado administrativo de estudiantes y sus estados de carga.
export default function AdminStudentsPageContent() {
	const { data: students = [], error, isError, isLoading } = useStudents();
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ label: "Estudiantes" },
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
							<p className={ "text-base font-semibold text-foreground" }>Cargando estudiantes</p>
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
						<Alert.Title>Error al cargar estudiantes</Alert.Title>
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
						description={ "Listado administrativo con DNI, contacto, estado y datos de seguimiento." }
						title={ "Estudiantes" }
					/>
					<div className={ "w-full md:hidden" }>
						<StudentSheet
							mode={ "create" }
							placement={ "bottom" }
							triggerClassName={ "w-full bg-accent text-accent-foreground" }
						/>
					</div>
					<div className={ "hidden md:block" }>
						<StudentSheet
							mode={ "create" }
							placement={ "right" }
							triggerClassName={ "bg-accent text-accent-foreground" }
						/>
					</div>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					<div className={ "hidden w-full md:flex" }>
						<StudentsContentDesktop students={ students }/>
					</div>
					<div className={ "w-full md:hidden" }>
						<StudentsContentMobile students={ students }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-5 py-4 sm:px-6" }>
					<div className={ "text-sm text-muted" }>
						Desactivar conserva al estudiante y su informacion historica.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
