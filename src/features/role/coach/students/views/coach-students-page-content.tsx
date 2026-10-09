"use client";

import { useCallback } from "react";
import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { ErrorAlert, PageBreadcrumbs, PageHeader } from "@/components/common";
import { TableSkeleton } from "@/components/common/skeletons";
import { StudentsContentDesktop } from "@/features/students/components/desktop/students-content-desktop";
import { StudentsContentMobile } from "@/features/students/components/mobile/students-content-mobile";
import { StudentDrawer } from "@/features/students/components/shared/student-drawer";
import { useStudents } from "@/features/students/hooks/use-students";

// Renderiza el listado de estudiantes y sus estados de carga.
export default function CoachStudentsPageContent() {
	const { data: students = [], error, isError, isFetching, isLoading, refetch } = useStudents();
	const breadcrumbs = [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ label: "Estudiantes" },
	];
	const isRefreshing = isFetching && !isLoading;
	const activeCount = students.filter( ( student ) => student.active ).length;
	// Cuantos hay, en vez de una frase que describe la pantalla.
	const summary = students.length === 0
		? "Todavía no cargaste estudiantes."
		: `${ students.length } ${ students.length === 1 ? "estudiante" : "estudiantes" } · ${ activeCount } ${ activeCount === 1 ? "activo" : "activos" }`;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	if (isLoading) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/coach/dashboard" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<TableSkeleton columns={ 5 } rows={ 6 } />
			</div>
		);
	}

	if (isError) {
		return (
			<div className={ "flex flex-col gap-4" }>
				<PageBreadcrumbs
					backHref={ "/coach/dashboard" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
				<ErrorAlert
					isRetrying={ isFetching }
					message={ error.message }
					title={ "Error al cargar estudiantes" }
					onRetryAction={ () => void refetch() }
				/>
			</div>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-row items-start justify-between gap-3 border-b border-border px-3 py-2 sm:items-center" }>
					<div className={ "min-w-0" }>
						<PageHeader
							description={ summary }
							title={ "Estudiantes" }
						/>
					</div>
					{ /* En el telefono las dos acciones van como iconos junto al titulo, igual
					     que en ejercicios, para que la lista empiece mas arriba. */ }
					<div className={ "flex shrink-0 items-center gap-2 md:hidden" }>
						<Button
							isIconOnly
							aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						</Button>
						<StudentDrawer
							mode={ "create" }
							placement={ "bottom" }
							triggerClassName={ "bg-accent text-accent-foreground" }
							triggerVariant={ "icon" }
						/>
					</div>
					<div className={ "hidden items-center gap-2 md:flex" }>
						<Button
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<StudentDrawer
							mode={ "create" }
							placement={ "right" }
							triggerClassName={ "bg-accent text-accent-foreground" }
						/>
					</div>
				</Card.Header>
				{ /* Tabla o tarjetas segun el ancho de este bloque y no el de la ventana: con
				     el menu lateral abierto, una ventana mediana le deja a la tabla menos
				     lugar del que necesita y "Abrir" quedaba escondido a la derecha. */ }
				<Card.Content className={ "@container p-3" }>
					<div className={ "hidden w-full @2xl:flex" }>
						<StudentsContentDesktop students={ students }/>
					</div>
					<div className={ "w-full @2xl:hidden" }>
						<StudentsContentMobile students={ students }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-3 py-2" }>
					<div className={ "text-sm text-muted" }>
						Desactivar conserva al estudiante y su información historica.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
