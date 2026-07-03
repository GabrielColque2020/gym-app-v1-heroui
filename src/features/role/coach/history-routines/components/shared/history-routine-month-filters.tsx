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
	onSearch: () => void;
	onClear: () => void;
	onMonthChange: ( month: string ) => void;
	onRefresh: () => void;
	onYearChange: ( year: string ) => void;
	userName?: string;
	isRefreshing?: boolean;
};

export function HistoryRoutineMonthFilters( {
												monthOptions,
												yearOptions,
												selectedMonth,
												selectedYear,
												onSearch,
												onClear,
												onMonthChange,
												onRefresh,
												onYearChange,
												userName,
												isRefreshing = false,
}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<HistoryRoutineMonthFiltersHeader userName={ userName }/>
				<HistoryRoutineMonthFiltersActions
					isRefreshing={ isRefreshing }
					monthOptions={ monthOptions }
					onClear={ onClear }
					onMonthChange={ onMonthChange }
					onRefresh={ onRefresh }
					onSearch={ onSearch }
					onYearChange={ onYearChange }
					selectedMonth={ selectedMonth }
					selectedYear={ selectedYear }
					yearOptions={ yearOptions }
				/>
			</Card.Content>
		</Card>
	);
}
