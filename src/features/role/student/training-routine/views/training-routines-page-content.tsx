"use client";

import type { Key } from "react-aria-components/Breadcrumbs";
import { useMemo, useRef, useState } from "react";
import { Card, Typography } from "@heroui/react";
import { useReactToPrint } from "react-to-print";

import { PageBreadcrumbs } from "@/components/common";
import { TrainingRoutinesDayCard } from "@/features/role/student/training-routine/components/training-routines-day-card";
import { TrainingRoutinesEmptyState } from "@/features/role/student/training-routine/components/training-routines-empty-state";
import { TrainingRoutinesErrorState } from "@/features/role/student/training-routine/components/training-routines-error-state";
import { TrainingRoutinesFilter } from "@/features/role/student/training-routine/components/training-routines-filter";
import { TrainingRoutinesLoadingState } from "@/features/role/student/training-routine/components/training-routines-loading-state";
import { TrainingRoutinesWeekSelector } from "@/features/role/student/training-routine/components/training-routines-week-selector";
import { useTrainingRoutines } from "@/features/role/student/training-routine/hooks/use-training-routines";
import { TrainingRoutinePrintable } from "@/features/training-routine/components/shared/training-routine-printable";

type TrainingRoutinesPageContentProps = {
	initialMonth?: number;
	initialYear?: number;
};

const EMPTY_ROUTINE_WEEKS: never[] = [];

function getCurrentMonth() {
	return new Date().getMonth() + 1;
}

function getCurrentYear() {
	return new Date().getFullYear();
}

export default function TrainingRoutinesPageContent( {
														 initialMonth = getCurrentMonth(),
														 initialYear = getCurrentYear(),
													 }: TrainingRoutinesPageContentProps ) {
	const [ activeMonth, setActiveMonth ] = useState( initialMonth );
	const [ activeYear, setActiveYear ] = useState( initialYear );
	const [ selectedWeekId, setSelectedWeekId ] = useState<Key | null>( null );
	const { data, error, isError, isFetching, isLoading, refetch } = useTrainingRoutines( {
		month: activeMonth,
		year: activeYear,
	} );
	const printRef = useRef<HTMLDivElement | null>( null );
	const handlePrint = useReactToPrint( {
		contentRef: printRef,
		documentTitle: `rutina-${ activeYear }-${ String( activeMonth ).padStart( 2, "0" ) }`,
		pageStyle: `
			@page {
				size: A4 portrait;
				margin: 6mm;
			}
			body {
				-webkit-print-color-adjust: exact;
				print-color-adjust: exact;
			}
		`,
	} );

	const routineWeeks = data?.routineMonth.weeks ?? EMPTY_ROUTINE_WEEKS;
	const selectedWeekExists =
		selectedWeekId !== null &&
		routineWeeks.some( ( routineWeek ) => routineWeek.id === selectedWeekId );
	const effectiveSelectedWeekId = selectedWeekExists ? selectedWeekId : ( routineWeeks[ 0 ]?.id ?? "" );
	const selectedRoutine = useMemo(
		() =>
			routineWeeks.find( ( routineWeek ) => routineWeek.id === effectiveSelectedWeekId ) ??
			routineWeeks[ 0 ] ??
			null,
		[ effectiveSelectedWeekId, routineWeeks ],
	);

	function handleSearch( value: { month: string; year: string } ) {
		const nextMonth = Number( value.month );
		const nextYear = Number( value.year );
		if (Number.isInteger( nextMonth ) && nextMonth >= 1 && nextMonth <= 12) {
			setActiveMonth( nextMonth );
		}
		if (Number.isInteger( nextYear ) && nextYear >= 2000 && nextYear <= 2100) {
			setActiveYear( nextYear );
		}
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/student/dashboard" }
				backLabel={ "Volver" }
				crumbs={ [
					{ href: "/student/dashboard", label: "Inicio" },
					{ label: "Rutina de entrenamiento" },
				] }
			/>

			<TrainingRoutinesFilter
				defaultMonth={ String( activeMonth ).padStart( 2, "0" ) }
				defaultYear={ String( activeYear ) }
				isPrintDisabled={ routineWeeks.length === 0 }
				isRefreshing={ isFetching && !isLoading }
				onPrint={ () => {
					void handlePrint();
				} }
				onRefresh={ () => {
					void refetch();
				} }
				onSearch={ handleSearch }
			/>

			<Card className={ "border border-border shadow-sm py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-col border-b border-border gap-4 sm:flex-row sm:items-center sm:justify-between p-3" }>
					<Typography type={ "h3" } className={ "font-black" }>
						Plan Semanal
					</Typography>
					{ isLoading ? (
						<div
							className={ "flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted" }
						>
							Cargando semanas
						</div>
					) : routineWeeks.length > 0 ? (
						<TrainingRoutinesWeekSelector
							activeMonth={ activeMonth }
							activeYear={ activeYear }
							routines={ routineWeeks }
							onSelectionChange={ setSelectedWeekId }
						/>
					) : null }
				</Card.Header>
				{ isLoading ? <TrainingRoutinesLoadingState/> : null }

				{ isError ? (
					<TrainingRoutinesErrorState
						errorMessage={ error instanceof Error ? error.message : "Ocurrio un error inesperado." }
						onRetry={ () => {
							void refetch();
						} }
					/>
				) : null }

				{ !isLoading && !isError ? (
					routineWeeks.length === 0 ? (
						<TrainingRoutinesEmptyState month={ activeMonth } year={ activeYear }/>
					) : (
						<Card.Content className={ "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-3" }>
							{ selectedRoutine?.routineDays.map( ( day ) => (
								<TrainingRoutinesDayCard key={ day.id } day={ day }/>
							) ) }
						</Card.Content>
					)
				) : null }
			</Card>
			{ data ? (
				<TrainingRoutinePrintable
					contentRef={ printRef }
					month={ activeMonth }
					routineObjective={ data.routineMonth.objective }
					routineWeeks={ routineWeeks }
					studentName={ data.student.name }
					year={ activeYear }
				/>
			) : null }
		</div>
	);
}
