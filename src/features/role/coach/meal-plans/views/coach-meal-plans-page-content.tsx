"use client";

import { useCallback, useState } from "react";
import type { Key } from "@heroui/react";
import { Alert, Button, Card, Dropdown, Header, Label, Spinner } from "@heroui/react";
import { ArrowsRotateLeft, CircleFill, EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import type { CoachMealPlan } from "@/features/meal-plans/types/meal-plans-types";
import { MealPlanDeleteSheet } from "@/features/role/coach/meal-plans/components/shared/meal-plan-delete-sheet";
import { MealPlanSheet } from "@/features/role/coach/meal-plans/components/shared/meal-plan-sheet";
import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import { useMealPlans } from "@/features/meal-plans/hooks/use-meal-plans";

type CoachMealPlansPageContentProps = {
	studentId: string | null;
};

function MealPlanCard( {
						   mealPlan,
						   studentId,
					   }: {
	mealPlan: CoachMealPlan;
	studentId: string;
} ) {
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );

	function handleAction( key: Key ) {
		if (key === "edit") {
			setIsEditOpen( true );
			return;
		}

		if (key === "delete") {
			setIsDeleteOpen( true );
		}
	}

	return (
		<Card className={ "overflow-hidden border border-border/70  shadow-sm" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-1 py-1" }>
				<div className={ "min-w-0" }>
					<div className={ " flex min-w-0 items-center justify-between gap-3" }>
						<p className={ "min-w-0 truncate text-base font-semibold text-foreground" }>
							{ formatMealTime( mealPlan.title ) }
						</p>

						<Dropdown>
							<Button
								isIconOnly
								aria-label={ `Acciones de ${ formatMealTime( mealPlan.title ) }` }
								className={ "shrink-0 text-foreground" }
								variant={ "ghost" }
							>
								<EllipsisVertical className={ "size-4" }/>
							</Button>
							<Dropdown.Popover placement={ "bottom end" }>
								<Dropdown.Menu onAction={ handleAction }>
									<Header>Opciones</Header>
									<Dropdown.Item id={ "edit" } textValue={ "Editar plan" }>
										<Pencil className={ "size-4 shrink-0 text-warning" }/>
										<Label className={ "text-warning" }>Editar plan</Label>
									</Dropdown.Item>
									<Dropdown.Item id={ "delete" } textValue={ "Eliminar plan" } variant={ "danger" }>
										<TrashBin className={ "size-4 shrink-0 text-danger" }/>
										<Label>Eliminar plan</Label>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Popover>
						</Dropdown>
					</div>
				</div>
			</Card.Header>

			<Card.Content className={ "px-4 py-4" }>
				<div className={ "space-y-2 text-sm leading-6 text-muted" }>
					{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
						<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
							<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
								<CircleFill className={ "size-2 text-accent" }/>
							</span>
							<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
						</div>
					) ) }
				</div>
			</Card.Content>

			<MealPlanSheet
				hideTrigger
				isOpen={ isEditOpen }
				mealPlan={ mealPlan }
				mode={ "edit" }
				studentId={ studentId }
				onOpenChange={ setIsEditOpen }
			/>
			<MealPlanDeleteSheet
				hideTrigger
				isOpen={ isDeleteOpen }
				mealPlan={ mealPlan }
				studentId={ studentId }
				onOpenChange={ setIsDeleteOpen }
			/>
		</Card>
	);
}

function MealPlansPageContentLoaded( { studentId }: { studentId: string } ) {
	const { data, error, isError, isFetching, isLoading, refetch } = useMealPlans( studentId );
	const breadcrumbs = [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/meal-plans-students", label: "Planes alimenticios por estudiante" },
		{ label: data?.student.name ?? "Planes alimenticios" },
	];
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	if (isLoading) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/coach/meal-plans-students" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando planes alimenticios</p>
							<p className={ "text-sm text-muted" }>Consultando los planes del estudiante seleccionado.</p>
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
						backHref={ "/coach/meal-plans-students" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
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
				backHref={ "/coach/meal-plans-students" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" }>
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
							<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<MealPlanSheet mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
					</div>
					<div className={ "hidden items-center gap-2 md:flex" }>
						<Button
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ handleRefresh }
						>
							<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						<MealPlanSheet mode={ "create" } studentId={ studentId } triggerVariant={ "button" }/>
					</div>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					{ data.mealPlans.length === 0 ? (
						<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
							<Card.Content className={ "py-10 text-center" }>
								<p className={ "text-base font-semibold text-foreground" }>No hay planes alimenticios cargados</p>
								<p className={ "mt-1 text-sm text-muted" }>
									{ data.student.name } no tiene planes alimenticios para consultar.
								</p>
							</Card.Content>
						</Card>
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
