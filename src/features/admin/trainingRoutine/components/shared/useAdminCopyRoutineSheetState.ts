"use client";

import { useMemo, useState } from "react";
import { toast } from "@heroui/react";

import {
	monthYearLabel,
	padMonth,
} from "@/features/admin/trainingRoutine/components/shared/adminCopyRoutineConstants";
import { useTrainingRoutineCopySource } from "@/features/admin/trainingRoutine/hooks/useTrainingRoutineCopySource";
import {
	useCopyTrainingRoutineMonth,
	useCopyTrainingRoutineWeeks,
} from "@/features/admin/trainingRoutine/hooks/useTrainingRoutineCopy";

export type AdminCopyRoutineSheetProps = {
	destinationYear: string;
	destinationMonth: string;
	hasActiveRoutine?: boolean;
	destinationWeeksOccupied?: number;
	studentId: string;
};

type CopyRoutineMode = "month" | "weeks";

function buildYearOptions() {
	const currentYear = new Date().getFullYear();

	return Array.from( { length: 8 }, ( _, i ) => ( {
		value: ( currentYear - 3 + i ).toString(),
		label: ( currentYear - 3 + i ).toString(),
	} ) );
}

function weekListLabel( weeks: string[] ) {
	if (weeks.length === 0) return "-";

	return weeks.map( ( week ) => `Semana ${ week }` ).join( ", " );
}

export function useAdminCopyRoutineSheetState( {
												  destinationYear,
												  destinationMonth,
												  destinationWeeksOccupied = 0,
												  studentId,
											  }: AdminCopyRoutineSheetProps ) {
	const yearOptions = useMemo( () => buildYearOptions(), [] );
	const destinationMonthNumber = Number( destinationMonth );
	const destinationYearNumber = Number( destinationYear );
	const destLabel = monthYearLabel( destinationMonth, destinationYear );
	const [ mode, setMode ] = useState<CopyRoutineMode>( "month" );
	const [ sourceYear, setSourceYear ] = useState( destinationYear || String( new Date().getFullYear() ) );
	const [ sourceMonth, setSourceMonth ] = useState( () =>
		padMonth( destinationMonth ) === "01" ? "12" : String( Math.max( 1, Number( destinationMonth ) - 1 ) ),
	);
	const [ selectedSourceWeeks, setSelectedSourceWeeks ] = useState<string[]>( [] );
	const [ singleDestWeeks, setSingleDestWeeks ] = useState<string[]>( [] );
	const [ multiDestByOrigin, setMultiDestByOrigin ] = useState<Record<string, string>>( {} );
	const sourceMonthNumber = Number( sourceMonth );
	const sourceYearNumber = Number( sourceYear );
	const sameMonth = sourceMonthNumber === destinationMonthNumber && sourceYearNumber === destinationYearNumber;
	const sourceQuery = useTrainingRoutineCopySource( {
		month: sourceMonthNumber,
		studentId,
		year: sourceYearNumber,
	} );
	const copyMonth = useCopyTrainingRoutineMonth();
	const copyWeeks = useCopyTrainingRoutineWeeks();
	const source = sourceQuery.data;
	const sourceLabel = monthYearLabel( sourceMonth, sourceYear );
	const sourceWeeks = source?.routines ?? [];
	const selectedSorted = useMemo(
		() => [ ...selectedSourceWeeks ].sort( ( a, b ) => Number( a ) - Number( b ) ),
		[ selectedSourceWeeks ],
	);
	const isSingleWeek = selectedSorted.length === 1;
	const assignedDestByOrigin = useMemo( () => {
		if (selectedSorted.length < 2) return {};

		const used = new Set<string>();
		const next: Record<string, string> = {};

		for (const origin of selectedSorted) {
			const stored = multiDestByOrigin[ origin ];

			if (stored && !used.has( stored )) {
				next[ origin ] = stored;
				used.add( stored );
				continue;
			}

			const fallback = [ "1", "2", "3", "4" ].find( ( week ) => !used.has( week ) );

			if (fallback) {
				next[ origin ] = fallback;
				used.add( fallback );
			}
		}

		return next;
	}, [ multiDestByOrigin, selectedSorted ] );
	const weekMappings = useMemo( () => {
		if (isSingleWeek) {
			return singleDestWeeks.map( ( destinationWeek ) => ( {
				destinationWeek: Number( destinationWeek ),
				sourceWeek: Number( selectedSorted[ 0 ] ),
			} ) );
		}

		return Object.entries( assignedDestByOrigin ).map( ( [ sourceWeek, destinationWeek ] ) => ( {
			destinationWeek: Number( destinationWeek ),
			sourceWeek: Number( sourceWeek ),
		} ) );
	}, [ assignedDestByOrigin, isSingleWeek, selectedSorted, singleDestWeeks ] );
	const selectedSourceRoutineStats = useMemo( () => {
		if (!source) return { dayCount: 0, exerciseCount: 0 };

		if (mode === "month") {
			return {
				dayCount: source.dayCount,
				exerciseCount: source.exerciseCount,
			};
		}

		const selectedSet = new Set( selectedSorted );
		const routines = source.routines.filter( ( routine ) => selectedSet.has( String( routine.week ) ) );

		return routines.reduce(
			( totals, routine ) => ( {
				dayCount: totals.dayCount + routine.dayCount,
				exerciseCount: totals.exerciseCount + routine.exerciseCount,
			} ),
			{ dayCount: 0, exerciseCount: 0 },
		);
	}, [ mode, selectedSorted, source ] );
	const destinationAffectedLabel = useMemo( () => {
		if (mode === "month") {
			return destinationWeeksOccupied > 0 ? `${ destinationWeeksOccupied } semanas en ${ destLabel }` : destLabel;
		}

		const destinationWeeks = weekMappings
			.map( ( mapping ) => String( mapping.destinationWeek ) )
			.sort( ( a, b ) => Number( a ) - Number( b ) );

		return weekListLabel( destinationWeeks );
	}, [ destLabel, destinationWeeksOccupied, mode, weekMappings ] );
	const selectedSourceWeeksLabel = mode === "month"
		? ( source?.weekCount ? `${ source.weekCount } semanas` : "-" )
		: weekListLabel( selectedSorted );
	const singleWeekPreview = singleDestWeeks.length > 0
		? `Semana ${ selectedSorted[ 0 ] } de ${ sourceLabel } sera copiada en ${ weekListLabel( singleDestWeeks ) }.`
		: "Selecciona una o mas semanas destino.";
	const monthPrimaryDisabled = sameMonth || sourceQuery.isLoading || !source?.hasRoutine || copyMonth.isPending;
	const weeksPrimaryDisabled = sourceQuery.isLoading
		|| !source?.hasRoutine
		|| weekMappings.length === 0
		|| copyWeeks.isPending;
	const primaryDisabled = mode === "month" ? monthPrimaryDisabled : weeksPrimaryDisabled;
	const primaryLabel = mode === "month" ? "Copiar rutina completa" : "Copiar semanas seleccionadas";

	function clearWeekSelection() {
		setSelectedSourceWeeks( [] );
		setSingleDestWeeks( [] );
		setMultiDestByOrigin( {} );
	}

	function handleSourceYearChange( value: string ) {
		setSourceYear( value );
		clearWeekSelection();
	}

	function handleSourceMonthChange( value: string ) {
		setSourceMonth( value );
		clearWeekSelection();
	}

	function destChoicesForRow( originSlot: string ) {
		const others = new Set(
			Object.entries( assignedDestByOrigin )
				.filter( ( [ key ] ) => key !== originSlot )
				.map( ( [ , value ] ) => value ),
		);

		return [ "1", "2", "3", "4" ].filter( ( week ) => !others.has( week ) || assignedDestByOrigin[ originSlot ] === week );
	}

	async function handleCopy() {
		try {
			if (mode === "month") {
				await copyMonth.mutateAsync( {
					destinationMonth: destinationMonthNumber,
					destinationYear: destinationYearNumber,
					sourceMonth: sourceMonthNumber,
					sourceYear: sourceYearNumber,
					studentId,
				} );
			} else {
				await copyWeeks.mutateAsync( {
					destinationMonth: destinationMonthNumber,
					destinationYear: destinationYearNumber,
					sourceMonth: sourceMonthNumber,
					sourceYear: sourceYearNumber,
					studentId,
					weekMappings,
				} );
			}

			toast.success( "Rutina copiada", {
				description: "La rutina destino se actualizo correctamente.",
			} );
		} catch {
			toast.danger( "Error al copiar rutina", {
				description: "No se pudo completar la copia.",
			} );
		}
	}

	return {
		assignedDestByOrigin,
		copyMonth,
		copyWeeks,
		destChoicesForRow,
		destLabel,
		destinationAffectedLabel,
		handleCopy,
		handleSourceMonthChange,
		handleSourceYearChange,
		isSingleWeek,
		mode,
		padMonth,
		primaryDisabled,
		primaryLabel,
		sameMonth,
		selectedSorted,
		selectedSourceRoutineStats,
		selectedSourceWeeks,
		selectedSourceWeeksLabel,
		setMode,
		setMultiDestByOrigin,
		setSelectedSourceWeeks,
		setSingleDestWeeks,
		singleDestWeeks,
		singleWeekPreview,
		source,
		sourceLabel,
		sourceMonth,
		sourceQuery,
		sourceWeeks,
		sourceYear,
		weekMappings,
		yearOptions,
	};
}
