"use client";
import { Alert, Card, Spinner } from "@heroui/react";
import { CircleFill } from "@gravity-ui/icons";
import { PageBreadcrumbs, PageHeader } from "@/components/common";
import type { StudentMealPlan } from "@/features/mealPlans/types/meal-plans.types";
import { useMealPlans } from "@/features/role/student/meal-plans/hooks/useMealPlans";
import { formatMealPlanDescriptionLines, formatMealTime, } from "@/features/mealPlans/services/meal-plan-formatters";

type StudentMealPlansPageContentProps = { studentId: string | null };

function MealPlanCard( { mealPlan }: { mealPlan: StudentMealPlan } ) {
	return (
		<Card
			className={ "overflow-hidden border border-border/70 shadow-sm" }
			variant={ "default" }
		>
			<Card.Header className={ "border-b border-border px-4 py-4" }>
				<div className={ "min-w-0" }>
					<p className={ "truncate text-base font-semibold text-foreground" }>
						{ formatMealTime( mealPlan.title ) }
					</p>
				</div>
			</Card.Header>
			<Card.Content className={ "px-4 py-4" }>
				<div className={ "space-y-2 text-sm leading-6 text-muted" }>
					{ formatMealPlanDescriptionLines( mealPlan.description ).map(
						( line, index ) => (
							<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
								<span
									className={
										"mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
									}
								>
									<CircleFill className={ "size-2 text-accent" }/>
               					 </span>
								<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>
									{ line }
								</p>
							</div>
						),
					) }
				</div>
			</Card.Content>
		</Card>
	);
}

function MealPlansPageContentLoaded( { studentId }: { studentId: string } ) {
	const { data, error, isError, isLoading } = useMealPlans( studentId );
	const crumbs = [
		{ href: "/dashboard", label: "Inicio" },
		{ label: "Mis planes alimenticios" },
	];
	if (isLoading) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/dashboard" }
						backLabel={ "Volver al inicio" }
						crumbs={ crumbs }
					/>
				</div>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content
						className={
							"flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center"
						}
					>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>
								Cargando planes alimenticios
							</p>
							<p className={ "text-sm text-muted" }>
								Consultando tus planes alimenticios.
							</p>
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
						backHref={ "/dashboard" }
						backLabel={ "Volver al inicio" }
						crumbs={ crumbs }
					/>
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
			<PageBreadcrumbs
				backHref={ "/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ crumbs }
			/>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header
					className={
						"flex flex-col gap-3 border-b border-border px-5 py-4 sm:px-6"
					}
				>
					<PageHeader
						description={
							"Consulta los planes alimenticios asignados a tu cuenta."
						}
						title={ "Mis planes alimenticios" }
					/>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					{ data.mealPlans.length === 0 ? (
						<Card
							className={
								"border border-dashed border-border bg-surface-secondary"
							}
							variant={ "default" }
						>
							<Card.Content className={ "py-10 text-center" }>
								<p className={ "text-base font-semibold text-foreground" }>
									No hay planes alimenticios cargados
								</p>
								<p className={ "mt-1 text-sm text-muted" }>
									No tienes planes alimenticios asignados en este momento.
								</p>
							</Card.Content>
						</Card>
					) : (
						<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
							{ data.mealPlans.map( ( mealPlan ) => (
								<MealPlanCard key={ mealPlan.id } mealPlan={ mealPlan }/>
							) ) }
						</div>
					) }
				</Card.Content>
			</Card>
		</div>
	);
}

export default function StudentMealPlansPageContent( {
														 studentId,
													 }: StudentMealPlansPageContentProps ) {
	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Debes iniciar sesion</Alert.Title>
					<Alert.Description>
						No se pudo identificar tu cuenta para mostrar tus planes
						alimenticios.
					</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}
	return <MealPlansPageContentLoaded studentId={ studentId }/>;
}


