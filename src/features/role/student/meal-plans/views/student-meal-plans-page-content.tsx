"use client";

import { useState } from "react";
import { Alert, Button, Card, Chip } from "@heroui/react";
import { CircleDot, Download, RotateCw } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { CardGridSkeleton } from "@/components/common/skeletons";
import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { buildMealPlansReportPdfUrl } from "@/features/meal-plans/services/meal-plans-report-pdf-url";
import type { MealPlan } from "@/features/meal-plans/types/meal-plans-types";
import { useMealPlans } from "@/features/role/student/meal-plans/hooks/use-meal-plans";
import { downloadFileFromUrl } from "@/features/shared/services/download-file";

type StudentMealPlansPageContentProps = { studentId: string | null };

const DAY_MS = 24 * 60 * 60 * 1000;
// Cuanto tiempo se marca una comida como recien cambiada.
const RECENT_DAYS = 7;

// "hoy", "ayer", "hace 3 días" y, pasada la semana, la fecha: asi el estudiante
// sabe de un vistazo si el plan cambio hace poco o es el de siempre.
function formatUpdatedLabel( updatedAt: Date, now: number ) {
	const startOfDay = ( time: number ) => new Date( time ).setHours( 0, 0, 0, 0 );
	const days = Math.round( ( startOfDay( now ) - startOfDay( updatedAt.getTime() ) ) / DAY_MS );

	if (days <= 0) return "hoy";
	if (days === 1) return "ayer";
	if (days < RECENT_DAYS) return `hace ${ days } días`;

	return `el ${ new Intl.DateTimeFormat( "es-AR", { day: "numeric", month: "long", year: "numeric" } ).format( updatedAt ) }`;
}

function MealPlanCard( { isRecent, mealPlan }: { isRecent: boolean; mealPlan: MealPlan } ) {
	return (
		<Card className={ "border border-border shadow-sm" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-3 py-2" }>
				<div className={ "flex min-w-0 items-center justify-between gap-2" }>
					<p className={ "truncate text-base font-semibold text-foreground" }>
						{ formatMealTime( mealPlan.title ) }
					</p>
					{ /* Marca la comida que el entrenador cambio en los ultimos dias. */ }
					{ isRecent ? (
						<Chip className={ "shrink-0" } color={ "accent" } size={ "sm" } variant={ "soft" }>
							Actualizada
						</Chip>
					) : null }
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
	// El momento en que se abrio la pantalla, para calcular "hace cuanto".
	const [ now ] = useState( () => Date.now() );
	const crumbs = [
		{ href: "/student/dashboard", label: "Inicio" },
		{ label: "Plan alimenticio" },
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
				<CardGridSkeleton cards={ 3 } />
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
						<Alert.Title>No se pudo cargar tu plan alimenticio</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	if (!data) return null;

	const isRefreshing = isFetching && !isLoading;
	const mealCount = data.mealPlans.length;
	// La fecha puede llegar como texto si viene de lo guardado en el telefono.
	const updatedTimes = data.mealPlans.map( ( mealPlan ) => new Date( mealPlan.updatedAt ).getTime() );
	const lastUpdatedAt = mealCount > 0 ? new Date( Math.max( ...updatedTimes ) ) : null;
	const summary = lastUpdatedAt
		? `${ mealCount } ${ mealCount === 1 ? "comida" : "comidas" } · Actualizado ${ formatUpdatedLabel( lastUpdatedAt, now ) }`
		: "Todavía sin comidas cargadas.";

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs backHref={ "/student/dashboard" } backLabel={ "Volver al inicio" } crumbs={ crumbs }/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "border-b border-border px-3 py-2" }>
					{ /* El titulo y las acciones en un renglon. Para el estudiante es un
					     plan con varias comidas, no varios planes. */ }
					<div className={ "flex items-center justify-between gap-3" }>
						<PageHeader
							description={ summary }
							title={ "Plan alimenticio" }
						/>
						{ /* En el telefono, solo los iconos. */ }
						<div className={ "flex shrink-0 items-center gap-2 md:hidden" }>
							<Button
								isIconOnly
								aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
								isDisabled={ isRefreshing }
								variant={ "secondary" }
								onPress={ () => {
									void refetch();
								} }
							>
								<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							</Button>
							<Button
								isIconOnly
								aria-label={ isDownloading ? "Descargando" : "Descargar el plan en PDF" }
								isDisabled={ mealCount === 0 || isDownloading }
								variant={ "secondary" }
								onPress={ handleDownload }
							>
								{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
							</Button>
						</div>
						<div className={ "hidden shrink-0 items-center gap-2 md:flex" }>
							<Button
								isDisabled={ mealCount === 0 || isDownloading }
								variant={ "secondary" }
								onPress={ handleDownload }
							>
								{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
								{ isDownloading ? "Descargando..." : "Descargar PDF" }
							</Button>
							<Button
								isDisabled={ isRefreshing }
								variant={ "secondary" }
								onPress={ () => {
									void refetch();
								} }
							>
								<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
								{ isRefreshing ? "Actualizando" : "Actualizar" }
							</Button>
						</div>
					</div>
				</Card.Header>
				<Card.Content className={ "p-3" }>
					{ data.mealPlans.length === 0 ? (
						<Card className={ "border border-border" } variant={ "default" }>
							<Card.Content className={ "py-10 text-center" }>
								<p className={ "text-base font-semibold text-foreground" }>Todavía no tenés un plan alimenticio</p>
								<p className={ "mt-1 text-sm text-muted" }>Cuando tu entrenador lo cargue, lo vas a ver acá.</p>
							</Card.Content>
						</Card>
					) : (
						<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
							{ data.mealPlans.map( ( mealPlan, index ) => (
								<MealPlanCard
									key={ mealPlan.id }
									isRecent={ now - updatedTimes[ index ] < RECENT_DAYS * DAY_MS }
									mealPlan={ mealPlan }
								/>
							) ) }
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
					<Alert.Title>Debes iniciar sesión</Alert.Title>
					<Alert.Description>No se pudo identificar tu cuenta para mostrar tu plan alimenticio.</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return <MealPlansPageContentLoaded studentId={ studentId }/>;
}
