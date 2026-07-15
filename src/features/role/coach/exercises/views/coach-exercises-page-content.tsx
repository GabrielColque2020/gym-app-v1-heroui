"use client";

import { useCallback } from "react";
import { Card } from "@heroui/react";

import { useExercises } from "@/features/exercises/hooks/use-exercises";
import { PageBreadcrumbs } from "@/components/common";
import { ExercisesContentDesktop } from "@/features/role/coach/exercises/components/desktop/exercises-content-desktop";
import { ExercisesContentMobile } from "@/features/role/coach/exercises/components/mobile/exercises-content-mobile";
import { CoachExercisesErrorState } from "@/features/role/coach/exercises/components/shared/coach-exercises-error-state";
import { CoachExercisesLoadingState } from "@/features/role/coach/exercises/components/shared/coach-exercises-loading-state";
import { CoachExercisesPageHeader } from "@/features/role/coach/exercises/components/shared/coach-exercises-page-header";

export default function CoachExercisesPageContent() {
	const { data: exercises = [], error, isError, isFetching, isLoading, refetch } = useExercises();
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
					backHref={ "/" }
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
				backHref={ "/" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<CoachExercisesPageHeader isRefreshing={ isRefreshing } onRefreshAction={ handleRefresh }/>
				<Card.Content className={ "p-3" }>
					<div className={ "hidden w-full md:flex" }>
						<ExercisesContentDesktop exercises={ exercises }/>
					</div>
					<div className={ "w-full md:hidden" }>
						<ExercisesContentMobile exercises={ exercises }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-3 py-2" }>
					<div className={ "text-sm text-muted" }>
						Desactivar conserva el ejercicio en rutinas y progresos historicos.
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
