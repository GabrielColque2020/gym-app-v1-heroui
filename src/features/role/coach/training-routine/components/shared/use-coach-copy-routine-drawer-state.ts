"use client";

import { toast } from "@heroui/react";
import { useMemo, useState } from "react";

import {
	useCopyTrainingRoutineMonth,
	useCopyTrainingRoutineWeeks,
} from "@/features/training-routine/hooks/use-training-routine-copy";
import {
	useLatestTrainingRoutineMonth,
	useTrainingRoutineCopySource,
} from "@/features/training-routine/hooks/use-training-routine-copy-source";
import { useTrainingRoutinesStudents } from "@/features/role/coach/training-routines-students/hooks/use-training-routines-students";
import { buildYearOptions, monthYearLabel, padMonth, weekListLabel } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-utils";

export type CoachCopyRoutineDrawerProps = {
	// Series que el estudiante ya cargo en el mes destino.
	destinationLoadedSetCount?: number;
	destinationMonth: string;
	// Numeros de las semanas que el mes destino ya tiene armadas.
	destinationWeekNumbers?: number[];
	destinationWeeksOccupied?: number;
	destinationYear: string;
	hasActiveRoutine?: boolean;
	// Se llama cuando la copia termino bien, para cerrar el drawer.
	onCopiedAction?: () => void;
	studentId: string;
};

const NO_WEEKS: number[] = [];

type CopyRoutineMode = "month" | "weeks";

export function useCoachCopyRoutineDrawerState( {
													destinationLoadedSetCount = 0,
													destinationMonth,
													destinationWeekNumbers = NO_WEEKS,
													destinationWeeksOccupied = 0,
													destinationYear,
													onCopiedAction,
													studentId,
												}: CoachCopyRoutineDrawerProps ) {
	const yearOptions = useMemo( () => buildYearOptions(), [] );
	const destinationMonthNumber = Number( destinationMonth );
	const destinationYearNumber = Number( destinationYear );
	const destLabel = monthYearLabel( destinationMonth, destinationYear );
	const [ mode, setMode ] = useState<CopyRoutineMode>( "month" );
	// Lo que eligio el coach a mano. Mientras no elija, el origen es el ultimo mes
	// con rutina, y si no hay ninguno, el mes calendario anterior.
	const [ selectedSource, setSelectedSource ] = useState<{ month: string; year: string } | null>( null );
	// De quien se copia: por defecto el mismo estudiante, o cualquier otro del coach.
	const [ sourceStudentId, setSourceStudentId ] = useState( studentId );
	const isOtherStudent = sourceStudentId !== studentId;
	const studentsQuery = useTrainingRoutinesStudents();
	const studentOptions = useMemo( () => {
		const students = studentsQuery.data ?? [];

		return [
			...students.filter( ( student ) => student.id === studentId ),
			...students.filter( ( student ) => student.id !== studentId ),
		].map( ( student ) => ( {
			label: student.id === studentId ? `${ student.name } (este estudiante)` : student.name,
			value: student.id,
		} ) );
	}, [ studentId, studentsQuery.data ] );
	const sourceStudentName = studentsQuery.data?.find( ( student ) => student.id === sourceStudentId )?.name;
	// De otro estudiante sirve tambien su rutina del mismo mes destino.
	const latestRoutineMonthQuery = useLatestTrainingRoutineMonth( {
		inclusive: isOtherStudent,
		month: destinationMonthNumber,
		studentId: sourceStudentId,
		year: destinationYearNumber,
	} );
	const defaultSource = latestRoutineMonthQuery.data
		? {
			month: String( latestRoutineMonthQuery.data.month ),
			year: String( latestRoutineMonthQuery.data.year ),
		}
		: isOtherStudent
			? { month: String( destinationMonthNumber ), year: String( destinationYearNumber ) }
			: destinationMonthNumber === 1
				? { month: "12", year: String( destinationYearNumber - 1 ) }
				: { month: String( destinationMonthNumber - 1 ), year: String( destinationYearNumber ) };
	const sourceMonth = selectedSource?.month ?? defaultSource.month;
	const sourceYear = selectedSource?.year ?? defaultSource.year;
	const [ selectedSourceWeeks, setSelectedSourceWeeks ] = useState<string[]>( [] );
	const [ singleDestWeeks, setSingleDestWeeks ] = useState<string[]>( [] );
	const [ multiDestByOrigin, setMultiDestByOrigin ] = useState<Record<string, string>>( {} );
	// La seleccion para la que el coach ya toco "reemplazar" una vez.
	const [ confirmedKey, setConfirmedKey ] = useState<string | null>( null );
	const sourceMonthNumber = Number( sourceMonth );
	const sourceYearNumber = Number( sourceYear );
	const sameMonth =
		!isOtherStudent &&
		sourceMonthNumber === destinationMonthNumber &&
		sourceYearNumber === destinationYearNumber;
	const sourceQuery = useTrainingRoutineCopySource( {
		month: sourceMonthNumber,
		studentId: sourceStudentId,
		year: sourceYearNumber,
	} );
	const copyMonth = useCopyTrainingRoutineMonth();
	const copyWeeks = useCopyTrainingRoutineWeeks();
	const source = sourceQuery.data;
	const sourceLabel = isOtherStudent && sourceStudentName
		? `${ monthYearLabel( sourceMonth, sourceYear ) } de ${ sourceStudentName }`
		: monthYearLabel( sourceMonth, sourceYear );
	const sourceWeeks = source?.routineWeeks ?? [];
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

		return Object.entries( assignedDestByOrigin ).map(
			( [ sourceWeek, destinationWeek ] ) => ( {
				destinationWeek: Number( destinationWeek ),
				sourceWeek: Number( sourceWeek ),
			} ),
		);
	}, [ assignedDestByOrigin, isSingleWeek, selectedSorted, singleDestWeeks ] );
	const selectedSourceRoutineStats = useMemo( () => {
		if (!source) return { dayCount: 0, exerciseCount: 0 };

		if (mode === "month") {
			return { dayCount: source.dayCount, exerciseCount: source.exerciseCount };
		}

		const selectedSet = new Set( selectedSorted );
		const selectedRoutineWeeks = source.routineWeeks.filter( ( routineWeek ) =>
			selectedSet.has( String( routineWeek.week ) ),
		);

		return selectedRoutineWeeks.reduce(
			( totals, routineWeek ) => ( {
				dayCount: totals.dayCount + routineWeek.dayCount,
				exerciseCount: totals.exerciseCount + routineWeek.exerciseCount,
			} ),
			{ dayCount: 0, exerciseCount: 0 },
		);
	}, [ mode, selectedSorted, source ] );
	const destinationAffectedLabel = useMemo( () => {
		if (mode === "month") {
			return destinationWeeksOccupied > 0
				? `${ destinationWeeksOccupied } semanas en ${ destLabel }`
				: destLabel;
		}

		const destinationWeeks = weekMappings
			.map( ( mapping ) => String( mapping.destinationWeek ) )
			.sort( ( a, b ) => Number( a ) - Number( b ) );

		return weekListLabel( destinationWeeks );
	}, [ destLabel, destinationWeeksOccupied, mode, weekMappings ] );
	const selectedSourceWeeksLabel =
		mode === "month"
			? source?.weekCount
				? `${ source.weekCount } semanas`
				: "-"
			: weekListLabel( selectedSorted );
	const singleWeekPreview =
		singleDestWeeks.length > 0
			? `Semana ${ selectedSorted[ 0 ] } de ${ sourceLabel } será copiada en ${ weekListLabel( singleDestWeeks ) }.`
			: "Seleccioná una o más semanas destino.";
	const monthPrimaryDisabled =
		sameMonth ||
		sourceQuery.isLoading ||
		!source?.hasRoutine ||
		copyMonth.isPending;
	const weeksPrimaryDisabled =
		sourceQuery.isLoading ||
		!source?.hasRoutine ||
		weekMappings.length === 0 ||
		copyWeeks.isPending;
	const primaryDisabled = mode === "month" ? monthPrimaryDisabled : weeksPrimaryDisabled;
	// Que semanas del destino pisa esta copia. El mes completo borra el mes
	// entero; por semanas, solo las elegidas como destino que ya existian.
	const replacedWeeks = useMemo( () => {
		const occupiedWeeks = [ ...destinationWeekNumbers ].sort( ( a, b ) => a - b );

		if (mode === "month") return occupiedWeeks;

		const destinationWeeks = new Set( weekMappings.map( ( mapping ) => mapping.destinationWeek ) );

		return occupiedWeeks.filter( ( week ) => destinationWeeks.has( week ) );
	}, [ destinationWeekNumbers, mode, weekMappings ] );
	const willReplace = replacedWeeks.length > 0;
	// Lo cargado por el estudiante no se borra con la copia, pero los dias se
	// crean de nuevo y pierden la marca de terminados.
	const loadedSetsNote = destinationLoadedSetCount > 0
		? " Las series que el estudiante ya cargó no se borran, pero los días reemplazados vuelven a figurar sin terminar."
		: "";
	const destinationNotice = destinationWeekNumbers.length === 0
		? null
		: mode === "month"
			? `${ destLabel } ya tiene rutina. Copiar el mes completo la borra entera, con sus ejercicios, notas y variantes, y pone esta en su lugar.${ loadedSetsNote }`
			: willReplace
				? `Se reemplaza ${ weekListLabel( replacedWeeks.map( String ) ) } de ${ destLabel }, con sus ejercicios, notas y variantes. Las demás semanas quedan como están.${ loadedSetsNote }`
				: `${ destLabel } ya tiene rutina. Solo se reemplazan las semanas que elijas como destino; el resto queda como está.`;
	// Cualquier cambio en lo elegido vuelve a pedir la confirmacion.
	const confirmKey = JSON.stringify( [ mode, sourceStudentId, sourceMonth, sourceYear, weekMappings ] );
	const isConfirming = willReplace && confirmedKey === confirmKey;
	const confirmQuestion = mode === "month"
		? `¿Reemplazar toda la rutina de ${ destLabel }? No se puede deshacer.`
		: `¿Reemplazar ${ weekListLabel( replacedWeeks.map( String ) ) } de ${ destLabel }? No se puede deshacer.`;
	const primaryLabel = isConfirming
		? "Sí, reemplazar"
		: willReplace
			? ( mode === "month" ? "Reemplazar mes" : "Reemplazar semanas" )
			: ( mode === "month" ? "Copiar mes" : "Copiar semanas" );

	function clearWeekSelection() {
		setSelectedSourceWeeks( [] );
		setSingleDestWeeks( [] );
		setMultiDestByOrigin( {} );
	}

	function handleSourceStudentChange( value: string ) {
		setSourceStudentId( value );
		// El mes elegido era del estudiante anterior: vuelve al ultimo con rutina del nuevo.
		setSelectedSource( null );
		clearWeekSelection();
	}

	function handleSourceYearChange( value: string ) {
		setSelectedSource( { month: sourceMonth, year: value } );
		clearWeekSelection();
	}

	function handleSourceMonthChange( value: string ) {
		setSelectedSource( { month: value, year: sourceYear } );
		clearWeekSelection();
	}

	function destChoicesForRow( originSlot: string ) {
		const others = new Set(
			Object.entries( assignedDestByOrigin )
				.filter( ( [ key ] ) => key !== originSlot )
				.map( ( [ , value ] ) => value ),
		);

		return [ "1", "2", "3", "4" ].filter(
			( week ) => !others.has( week ) || assignedDestByOrigin[ originSlot ] === week,
		);
	}

	async function handleCopy() {
		try {
			if (mode === "month") {
				await copyMonth.mutateAsync( {
					destinationMonth: destinationMonthNumber,
					destinationYear: destinationYearNumber,
					sourceMonth: sourceMonthNumber,
					sourceStudentId,
					sourceYear: sourceYearNumber,
					studentId,
				} );
			} else {
				await copyWeeks.mutateAsync( {
					destinationMonth: destinationMonthNumber,
					destinationYear: destinationYearNumber,
					sourceMonth: sourceMonthNumber,
					sourceStudentId,
					sourceYear: sourceYearNumber,
					studentId,
					weekMappings,
				} );
			}

			toast.success( "Rutina copiada", {
				description: `Ya está en ${ destLabel }.`,
			} );
			setConfirmedKey( null );
			onCopiedAction?.();
		} catch {
			toast.danger( "Error al copiar rutina", {
				description: "No se pudo completar la copia.",
			} );
		}
	}

	// Si la copia pisa algo, el primer toque solo pide confirmar.
	function handlePrimaryPress() {
		if (willReplace && !isConfirming) {
			setConfirmedKey( confirmKey );
			return;
		}

		void handleCopy();
	}

	return {
		assignedDestByOrigin,
		cancelConfirm: () => setConfirmedKey( null ),
		confirmQuestion,
		copyMonth,
		copyWeeks,
		destChoicesForRow,
		destLabel,
		destinationAffectedLabel,
		destinationNotice,
		handleCopy,
		handlePrimaryPress,
		isConfirming,
		handleSourceMonthChange,
		handleSourceStudentChange,
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
		sourceStudentId,
		sourceWeeks,
		studentOptions,
		sourceYear,
		weekMappings,
		willReplace,
		yearOptions,
	};
}
