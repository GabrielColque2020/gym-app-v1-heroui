"use client";

import { Alert, Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { CoachMealPlansEmptyState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-empty-state";
import { CoachMealPlansErrorState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-error-state";
import { CoachMealPlansLoadingState } from "@/features/role/coach/meal-plans/components/shared/coach-meal-plans-loading-state";
import { MealPlanCard } from "@/features/role/coach/meal-plans/components/shared/meal-plan-card";
import { MealPlanDrawer } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer";
import { useCoachMealPlansPageState } from "@/features/role/coach/meal-plans/hooks/use-coach-meal-plans-page-state";

type CoachMealPlansPageContentProps = {
	studentId: string | null;
};

function MealPlansPageContentLoaded( { studentId }: { studentId: string } ) {
	const { breadcrumbs, data, error, handleRefresh, isError, isLoading, isRefreshing } = useCoachMealPlansPageState( studentId );

	if (isLoading) {
		return <CoachMealPlansLoadingState breadcrumbs={ breadcrumbs }/>;
	}

	if (isError) {
		return <CoachMealPlansErrorState breadcrumbs={ breadcrumbs } message={ error?.message ?? "Error al cargar planes alimenticios." }/>;
	}

	if (!data) return null;

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/meal-plans-students" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between" }>
					<PageHeader
						description={ `${ data.student.name }` }
						title={ "Planes alimenticios del estudiante" }
					/>
					<div className={ "flex w-full flex-col gap-2 md:hidden" }>
						<Button
							className={ "w-full" }
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<MealPlanDrawer mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
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
						<MealPlanDrawer mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
					</div>
				</Card.Header>
				<Card.Content className={ "p-3" }>
					{ data.mealPlans.length === 0 ? (
						<CoachMealPlansEmptyState studentName={ data.student.name }/>
					) : (
						<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
							{ data.mealPlans.map( ( mealPlan ) => (
								<MealPlanCard key={ mealPlan.id } mealPlan={ mealPlan } studentId={ studentId }/>
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
			{ href: "/coach/meal-plans-students", label: "Planes alimenticios por estudiante" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/meal-plans-students" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Selecciona un estudiante</Alert.Title>
						<Alert.Description>
							Para consultar planes alimenticios primero tenes que elegir un estudiante activo.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	return <MealPlansPageContentLoaded studentId={ studentId }/>;
}
