"use client";

import { useCallback, useMemo } from "react";

import { useHistoryRoutines } from "@/features/role/coach/history-routines/hooks/use-history-routines";
import { buildYearOptions, MONTH_OPTIONS } from "@/features/role/coach/history-routines/services/history-routines-form";
import { useCoachHistoryRoutinesFilters } from "@/features/role/coach/history-routines/hooks/use-coach-history-routines-filters";
import { useCoachHistoryRoutinesWeekSelection } from "@/features/role/coach/history-routines/hooks/use-coach-history-routines-week-selection";
import {
	buildHistoryRoutineMonthSummary,
	groupHistoryRoutinesByWeek,
} from "@/features/role/coach/history-routines/services/history-routines-view";

export function useCoachHistoryRoutinesPageState( studentId: string ) {
	const {
		activeMonth,
		activeYear,
		onMonthChange,
		onYearChange,
		selectedMonth,
		selectedYear,
	} = useCoachHistoryRoutinesFilters();

	const { data, error, isError, isFetching, isLoading, refetch } = useHistoryRoutines( {
		month: activeMonth,
		studentId,
		year: activeYear,
	} );
	const isRefreshing = isFetching && !isLoading;

	const yearOptions = useMemo( () => buildYearOptions(), [] );
	const weekGroups = useMemo(
		() => groupHistoryRoutinesByWeek( data?.historyRoutines ?? [] ),
		[ data?.historyRoutines ],
	);
	const { handleWeekToggle, selectedWeeks } = useCoachHistoryRoutinesWeekSelection( weekGroups );
	const selectedWeekGroups = useMemo(
		() => weekGroups.filter( ( weekGroup ) => selectedWeeks.includes( weekGroup.week ) ),
		[ selectedWeeks, weekGroups ],
	);
	const desktopSummary = useMemo(
		() => buildHistoryRoutineMonthSummary( selectedWeekGroups.length > 0 ? selectedWeekGroups : weekGroups ),
		[ selectedWeekGroups, weekGroups ],
	);
	const mobileSummary = useMemo(
		() => buildHistoryRoutineMonthSummary( weekGroups ),
		[ weekGroups ],
	);

	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	const breadcrumbs = [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/history-routines-students", label: "Historial de rutinas por estudiante" },
		{ label: data?.student.name ?? "Historial de rutinas" },
	];
	const monthLabel = `${ String( activeMonth ).padStart( 2, "0" ) }/${ activeYear }`;

	return {
		activeMonth,
		activeYear,
		breadcrumbs,
		data,
		desktopSummary,
		error,
		handleRefresh,
		handleWeekToggle,
		isError,
		isLoading,
		isRefreshing,
		monthLabel,
		mobileSummary,
		onMonthChange,
		onYearChange,
		selectedMonth,
		selectedWeeks,
		selectedWeekGroups,
		selectedYear,
		weekGroups,
		yearOptions,
		monthOptions: MONTH_OPTIONS,
	};
}
