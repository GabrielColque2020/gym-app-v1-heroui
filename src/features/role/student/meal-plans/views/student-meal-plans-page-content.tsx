"use client";

import { useState } from "react";
import { Alert, Button, Card, Spinner } from "@heroui/react";
import { CircleDot, Download, RotateCw } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { buildMealPlansReportPdfUrl } from "@/features/meal-plans/services/meal-plans-report-pdf-url";
import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";
import { useMealPlans } from "@/features/role/student/meal-plans/hooks/use-meal-plans";
import { downloadFileFromUrl } from "@/features/shared/services/download-file";

type StudentMealPlansPageContentProps = { studentId: string | null };

function MealPlanCard( { mealPlan }: { mealPlan: MealPlan } ) {
	return (
		<Card className={ "border border-border shadow-sm" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-3 py-2" }>
				<div className={ "min-w-0" }>
					<p className={ "truncate text-base font-semibold text-foreground" }>
						{ formatMealTime( mealPlan.title ) }
					</p>
				</div>
			</Card.Header>
			<Card.Content className={ "p-3" }>
				<div className={ "space-y-2 text-sm leading-6" }>
					{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
						<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
							<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
								<CircleDot className={ "size-2 text-accent" }/>
							</span>
							<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
						</div>
					) ) }
				</div>
			</Card.Content>
		</Card>
	);
}

function MealPlansPageContentLoaded( { studentId }: { studentId: string } ) {
	const { data, error, isError, isFetching, isLoading, refetch } = useMealPlans( studentId );
	const [ isDownloading, setIsDownloading ] = useState( false );
	const crumbs = [
		{ href: "/student/dashboard", label: "Inicio" },
		{ label: "Mis planes alimenticios" },
	];

	function handleDownload() {
		setIsDownloading( true );
		downloadFileFromUrl( buildMealPlansReportPdfUrl( { studentId } ) );
		window.setTimeout( () => {
			setIsDownloading( false );
		}, 1200 );
	}

	if (isLoading) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs backHref={ "/student/dashboard" } backLabel={ "Volver al inicio" } crumbs={ crumbs }/>
				</div>
				<Card className={ "border border-border py-2" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 p-3 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando planes alimenticios</p>
							<p className={ "text-sm text-muted" }>Consultando tus planes alimenticios.</p>
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
					<PageBreadcrumbs backHref={ "/student/dashboard" } backLabel={ "Volver al inicio" } crumbs={ crumbs }/>
				</div>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar planes alimenticios</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	if (!data) return null;

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs backHref={ "/student/dashboard" } backLabel={ "Volver al inicio" } crumbs={ crumbs }/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-3 py-2" }>
					<div className={ "flex flex-col gap-3 md:flex-row md:items-end md:justify-between" }>
						<PageHeader description={ "Consulta los planes alimenticios asignados a tu cuenta." } title={ "Mis planes alimenticios" }/>
						<div className={ "flex w-full flex-col gap-2 md:w-auto md:flex-row" }>
							<Button
								className={ "w-full shadow-sm md:w-auto" }
								isDisabled={ data.mealPlans.length === 0 || isDownloading }
								variant={ "secondary" }
								onPress={ handleDownload }
							>
								{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
								{ isDownloading ? "Descargando..." : "Descargar PDF" }
							</Button>
							<Button
								className={ "w-full shadow-sm md:w-auto" }
								isDisabled={ isFetching && !isLoading }
								variant={ "secondary" }
								onPress={ () => {
									void refetch();
								} }
							>
								<RotateCw className={ isFetching && !isLoading ? "size-4 animate-spin" : "size-4" }/>
								{ isFetching && !isLoading ? "Actualizando" : "Actualizar" }
							</Button>
						</div>
					</div>
				</Card.Header>
				<Card.Content className={ "p-3" }>
					{ data.mealPlans.length === 0 ? (
						<Card className={ "border border-border" } variant={ "default" }>
							<Card.Content className={ "py-10 text-center" }>
								<p className={ "text-base font-semibold text-foreground" }>No hay planes alimenticios cargados</p>
								<p className={ "mt-1 text-sm text-muted" }>No tienes planes alimenticios asignados en este momento.</p>
							</Card.Content>
						</Card>
					) : (
						<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
							{ data.mealPlans.map( ( mealPlan ) => <MealPlanCard key={ mealPlan.id } mealPlan={ mealPlan }/> ) }
						</div>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}

export default function StudentMealPlansPageContent( { studentId }: StudentMealPlansPageContentProps ) {
	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Debes iniciar sesion</Alert.Title>
					<Alert.Description>No se pudo identificar tu cuenta para mostrar tus planes alimenticios.</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return <MealPlansPageContentLoaded studentId={ studentId }/>;
}
