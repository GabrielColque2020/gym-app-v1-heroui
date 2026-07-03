"use client";

import type { Key } from "react-aria-components/Breadcrumbs";
import { useMemo, useState } from "react";
import { Typography } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { TrainingRoutinesDayCard } from "@/features/role/student/training-routine/components/training-routines-day-card";
import { TrainingRoutinesEmptyState } from "@/features/role/student/training-routine/components/training-routines-empty-state";
import { TrainingRoutinesErrorState } from "@/features/role/student/training-routine/components/training-routines-error-state";
import { TrainingRoutinesFilter } from "@/features/role/student/training-routine/components/training-routines-filter";
import { TrainingRoutinesLoadingState } from "@/features/role/student/training-routine/components/training-routines-loading-state";
import { TrainingRoutinesWeekSelector } from "@/features/role/student/training-routine/components/training-routines-week-selector";
import { useTrainingRoutines } from "@/features/role/student/training-routine/hooks/use-training-routines";

type TrainingRoutinesPageContentProps = {
	initialMonth?: number;
	initialYear?: number;
};

const EMPTY_ROUTINES: never[] = [];

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

	const routines = data?.routines ?? EMPTY_ROUTINES;
	const selectedWeekExists =
		selectedWeekId !== null &&
		routines.some( ( routine ) => routine.id === selectedWeekId );
	const effectiveSelectedWeekId = selectedWeekExists ? selectedWeekId : ( routines[ 0 ]?.id ?? "" );
	const selectedRoutine = useMemo(
		() =>
			routines.find( ( routine ) => routine.id === effectiveSelectedWeekId ) ??
			routines[ 0 ] ??
			null,
		[ effectiveSelectedWeekId, routines ],
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

	function handleClear() {
		setActiveMonth( initialMonth );
		setActiveYear( initialYear );
	}

	const defaultMonth = String( initialMonth ).padStart( 2, "0" );
	const defaultYear = String( initialYear );

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/student/dashboard" }
				backLabel={ "Volver" }
				crumbs={ [
					{ href: "/student/dashboard", label: "Inicio" },
					{ label: "Rutina de entrenamiento" },
				] }
			/>

			<TrainingRoutinesFilter
				defaultMonth={ defaultMonth }
				defaultYear={ defaultYear }
				isRefreshing={ isFetching && !isLoading }
				onClear={ handleClear }
				onRefresh={ () => {
					void refetch();
				} }
				onSearch={ handleSearch }
			/>

			<div className={ "w-full" }>
				<div className={ "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }>
					<Typography type={ "h3" } className={ "font-black" }>
						Plan Semanal
					</Typography>
					{ isLoading ? (
						<div
							className={ "flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted" }
						>
							Cargando semanas
						</div>
					) : routines.length > 0 ? (
						<TrainingRoutinesWeekSelector
							activeMonth={ activeMonth }
							activeYear={ activeYear }
							routines={ routines }
							onSelectionChange={ setSelectedWeekId }
						/>
					) : null }
				</div>
			</div>

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
				routines.length === 0 ? (
					<TrainingRoutinesEmptyState month={ activeMonth } year={ activeYear }/>
				) : (
					<div className={ "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }>
						{ selectedRoutine?.routineDays.map( ( day ) => (
							<TrainingRoutinesDayCard key={ day.id } day={ day }/>
						) ) }
					</div>
				)
			) : null }
		</div>
	);
}
