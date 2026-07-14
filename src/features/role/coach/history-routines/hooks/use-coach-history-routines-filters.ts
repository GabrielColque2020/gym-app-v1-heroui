"use client";

import { useState } from "react";

import { getCurrentMonth, getCurrentYear } from "@/features/role/coach/history-routines/services/history-routines-form";

export function useCoachHistoryRoutinesFilters() {
	const [ selectedMonth, setSelectedMonth ] = useState( String( getCurrentMonth() ) );
	const [ selectedYear, setSelectedYear ] = useState( String( getCurrentYear() ) );
	const [ activeMonth, setActiveMonth ] = useState( getCurrentMonth() );
	const [ activeYear, setActiveYear ] = useState( getCurrentYear() );

	function handleMonthChange( month: string ) {
		setSelectedMonth( month );

		const nextMonth = Number( month );

		if (Number.isInteger( nextMonth ) && nextMonth >= 1 && nextMonth <= 12) {
			setActiveMonth( nextMonth );
		}
	}

	function handleYearChange( year: string ) {
		setSelectedYear( year );

		const nextYear = Number( year );

		if (Number.isInteger( nextYear ) && nextYear >= 2000 && nextYear <= 2100) {
			setActiveYear( nextYear );
		}
	}

	return {
		activeMonth,
		activeYear,
		onMonthChange: handleMonthChange,
		onYearChange: handleYearChange,
		selectedMonth,
		selectedYear,
	};
}
