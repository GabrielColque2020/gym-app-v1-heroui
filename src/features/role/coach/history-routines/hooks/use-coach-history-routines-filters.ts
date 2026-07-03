"use client";

import { useState } from "react";

import { getCurrentMonth, getCurrentYear } from "@/features/role/coach/history-routines/services/history-routines-form";

export function useCoachHistoryRoutinesFilters() {
	const [ selectedMonth, setSelectedMonth ] = useState( String( getCurrentMonth() ) );
	const [ selectedYear, setSelectedYear ] = useState( String( getCurrentYear() ) );
	const [ activeMonth, setActiveMonth ] = useState( getCurrentMonth() );
	const [ activeYear, setActiveYear ] = useState( getCurrentYear() );

	function handleSearch() {
		setActiveMonth( Number( selectedMonth ) );
		setActiveYear( Number( selectedYear ) );
	}

	function handleClear() {
		const month = getCurrentMonth();
		const year = getCurrentYear();

		setSelectedMonth( String( month ) );
		setSelectedYear( String( year ) );
		setActiveMonth( month );
		setActiveYear( year );
	}

	return {
		activeMonth,
		activeYear,
		handleClear,
		handleSearch,
		onMonthChange: setSelectedMonth,
		onYearChange: setSelectedYear,
		selectedMonth,
		selectedYear,
	};
}
