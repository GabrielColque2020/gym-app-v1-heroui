"use client";

import { Card } from "@heroui/react";
import { HistoryRoutineMonthFiltersActions } from "@/features/role/coach/history-routines/components/shared/history-routine-month-filters-actions";
import { HistoryRoutineMonthFiltersHeader } from "@/features/role/coach/history-routines/components/shared/history-routine-month-filters-header";

type HistoryRoutineMonthFiltersProps = {
	monthOptions: Array<{
		label: string;
		value: string;
	}>;
	yearOptions: Array<{
		label: string;
		value: string;
	}>;
	selectedMonth: string;
	selectedYear: string;
	onSearchAction: () => void;
	onClearAction: () => void;
	onMonthChangeAction: ( month: string ) => void;
	onRefreshAction: () => void;
	onYearChangeAction: ( year: string ) => void;
	userName?: string;
	isRefreshing?: boolean;
};

export function HistoryRoutineMonthFilters( {
												monthOptions,
												yearOptions,
												selectedMonth,
												selectedYear,
												onSearchAction,
												onClearAction,
												onMonthChangeAction,
												onRefreshAction,
												onYearChangeAction,
												userName,
												isRefreshing = false,
											}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border bg-surface py-2" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<HistoryRoutineMonthFiltersHeader userName={ userName }/>
				<HistoryRoutineMonthFiltersActions
					isRefreshing={ isRefreshing }
					monthOptions={ monthOptions }
					onClearAction={ onClearAction }
					onMonthChangeAction={ onMonthChangeAction }
					onRefreshAction={ onRefreshAction }
					onSearchAction={ onSearchAction }
					onYearChangeAction={ onYearChangeAction }
					selectedMonth={ selectedMonth }
					selectedYear={ selectedYear }
					yearOptions={ yearOptions }
				/>
			</Card.Content>
		</Card>
	);
}
