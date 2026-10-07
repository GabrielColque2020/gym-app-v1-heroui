"use client";

import { useCallback } from "react";

import { useMealPlans } from "@/features/meal-plans/hooks/use-meal-plans";

export function useCoachMealPlansPageState( studentId: string ) {
	const { data, error, isError, isFetching, isLoading, refetch } = useMealPlans( studentId );
	const breadcrumbs = [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
		{ label: data?.student.name ?? "Plan alimenticio" },
	];
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	return {
		breadcrumbs,
		data,
		error,
		handleRefresh,
		isError,
		isLoading,
		isRefreshing,
	};
}
