"use client";

import { useState } from "react";
import { Alert, Button, Card } from "@heroui/react";
import { Download, RotateCw } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { buildMealPlansReportPdfUrl } from "@/features/meal-plans/services/meal-plans-report-pdf-url";
import { CoachMealPlansEmptyState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-empty-state";
import { CoachMealPlansErrorState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-error-state";
import { CoachMealPlansLoadingState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-loading-state";
import { MealPlanCard } from "@/features/role/coach/meal-plans/components/shared/meal-plan-card";
import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";
import { useCoachMealPlansPageState } from "@/features/role/coach/meal-plans/hooks/use-coach-meal-plans-page-state";
import { CoachStudentTabs } from "@/features/role/coach/students/components/coach-student-tabs";
import { downloadFileFromUrl } from "@/features/shared/services/download-file";

type CoachMealPlansPageContentProps = {
	studentId: string | null;
};

function MealPlansPageContentLoaded( { studentId }: { studentId: string } ) {
	const { breadcrumbs, data, error, handleRefresh, isError, isLoading, isRefreshing } = useCoachMealPlansPageState( studentId );
	const [ isDownloading, setIsDownloading ] = useState( false );

	function handleDownload() {
		setIsDownloading( true );
		downloadFileFromUrl( buildMealPlansReportPdfUrl( { studentId } ) );
		window.setTimeout( () => {
			setIsDownloading( false );
		}, 1200 );
	}

	if (isLoading) {
		return <CoachMealPlansLoadingState breadcrumbs={ breadcrumbs }/>;
	}

	if (isError) {
		return <CoachMealPlansErrorState breadcrumbs={ breadcrumbs } message={ error?.message ?? "No se pudo cargar el plan alimenticio." }/>;
	}

	if (!data) return null;

	const mealTimes = data.mealPlans.map( ( mealPlan ) => mealPlan.title as string );

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/student" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<CoachStudentTabs active={ "meal-plan" } studentId={ studentId }/>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				{ /* Con `flex-wrap` los botones bajan de renglon antes de que el titulo se parta. */ }
				<Card.Header className={ "flex flex-row flex-wrap items-center justify-between gap-3 border-b border-border p-3" }>
					<div className={ "min-w-48 flex-1" }>
						<PageHeader
							description={ `${ data.student.name }` }
							title={ "Plan alimenticio" }
						/>
					</div>
					{ /* En el telefono va todo en un renglon: tres botones apilados a todo el
					     ancho ocupaban media pantalla antes de mostrar un solo plan. */ }
					<div className={ "flex w-full items-center gap-2 md:hidden" }>
						<Button
							isIconOnly
							aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						</Button>
						<Button
							isIconOnly
							aria-label={ isDownloading ? "Descargando" : "Descargar PDF" }
							isDisabled={ data.mealPlans.length === 0 || isDownloading }
							variant={ "secondary" }
							onPress={ handleDownload }
						>
							{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
						</Button>
						<div className={ "min-w-0 flex-1" }>
							<MealPlanDrawer existingMealTimes={ mealTimes } mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
						</div>
					</div>
					<div className={ "hidden flex-wrap items-center gap-2 md:flex" }>
						<Button
							isDisabled={ data.mealPlans.length === 0 || isDownloading }
							variant={ "secondary" }
							onPress={ handleDownload }
						>
							{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
							{ isDownloading ? "Descargando..." : "Descargar PDF" }
						</Button>
						<Button
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<MealPlanDrawer existingMealTimes={ mealTimes } mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
					</div>
				</Card.Header>
				<Card.Content className={ "p-3" }>
					{ data.mealPlans.length === 0 ? (
						<CoachMealPlansEmptyState studentId={ studentId } studentName={ data.student.name }/>
					) : (
						<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
							{ data.mealPlans.map( ( mealPlan ) => (
								<MealPlanCard
									key={ mealPlan.id }
									existingMealTimes={ data.mealPlans.filter( ( other ) => other.id !== mealPlan.id ).map( ( other ) => other.title as string ) }
									mealPlan={ mealPlan }
									studentId={ studentId }
								/>
							) ) }
						</div>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}

export default function CoachMealPlansPageContent( { studentId }: CoachMealPlansPageContentProps ) {
	if (!studentId) {
		const breadcrumbs = [
			{ href: "/", label: "Inicio" },
			{ href: "/coach/student", label: "Estudiantes" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/student" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Selecciona un estudiante</Alert.Title>
						<Alert.Description>
							Para ver un plan alimenticio primero tenés que elegir un estudiante activo.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	return <MealPlansPageContentLoaded studentId={ studentId }/>;
}
