"use client";

import { useCallback } from "react";
import { Card } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { CoachExercisesErrorState } from "@/features/role/coach/exercises/components/shared/coach-exercises-error-state";
import { CoachExercisesLoadingState } from "@/features/role/coach/exercises/components/shared/coach-exercises-loading-state";
import { CoachExercisesPageHeader } from "@/features/role/coach/exercises/components/shared/coach-exercises-page-header";
import { ExercisesContentDesktop } from "@/features/role/coach/exercises/components/desktop/exercises-content-desktop";
import { ExercisesContentMobile } from "@/features/role/coach/exercises/components/mobile/exercises-content-mobile";
import { useCoachExercises } from "@/features/role/coach/exercises/hooks/use-coach-exercises";

export default function CoachExercisesPageContent() {
	const { data: exercises = [], error, isError, isFetching, isLoading, refetch } = useCoachExercises();
	const breadcrumbs = [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ label: "Ejercicios" },
	];
	const isRefreshing = isFetching && !isLoading;
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
				<CoachExercisesLoadingState/>
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
				<CoachExercisesErrorState message={ error.message }/>
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
				<CoachExercisesPageHeader isRefreshing={ isRefreshing } onRefreshAction={ handleRefresh }/>
				{ /* Tabla o tarjetas segun el ancho de este bloque y no el de la ventana:
				     con el menu lateral, una ventana mediana no le deja lugar a la tabla. */ }
				<Card.Content className={ "@container p-3" }>
					<div className={ "hidden w-full @3xl:flex" }>
						<ExercisesContentDesktop exercises={ exercises }/>
					</div>
					<div className={ "w-full @3xl:hidden" }>
						<ExercisesContentMobile exercises={ exercises }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border p-3" }>
					<div className={ "text-sm text-muted" }>
						Los ejercicios del catálogo general los ven todos los entrenadores. Si editás uno, el cambio queda solo para vos.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
