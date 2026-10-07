"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { TrainingRoutinesEmptyState } from "@/features/role/student/training-routine/components/training-routines-empty-state";
import { TrainingRoutinesErrorState } from "@/features/role/student/training-routine/components/training-routines-error-state";
import { TrainingRoutinesLoadingState } from "@/features/role/student/training-routine/components/training-routines-loading-state";
import { TrainingRoutinesMonthHeader } from "@/features/role/student/training-routine/components/training-routines-month-header";
import { TrainingRoutinesWeekList } from "@/features/role/student/training-routine/components/training-routines-week-list";
import { useTrainingRoutines } from "@/features/role/student/training-routine/hooks/use-training-routines";
import { downloadFileFromUrl } from "@/features/shared/services/download-file";
import { buildTrainingRoutineReportPdfUrl } from "@/features/training-routine/services/training-routines-report-pdf-url";

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
	const router = useRouter();
	const [ isDownloading, setIsDownloading ] = useState( false );
	// El mes sale de la direccion: asi "volver" desde un dia cae en el mes de ese dia.
	const activeMonth = initialMonth;
	const activeYear = initialYear;
	const { data, error, isError, isFetching, isLoading, refetch } = useTrainingRoutines( {
		month: activeMonth,
		year: activeYear,
	} );

	const routineWeeks = data?.routineMonth.weeks ?? EMPTY_ROUTINE_WEEKS;

	function handleSelectMonth( month: number, year: number ) {
		const params = new URLSearchParams( { month: String( month ), year: String( year ) } );

		router.replace( `/student/training-routine?${ params.toString() }` );
	}

	function handleChangeMonth( offset: -1 | 1 ) {
		const target = new Date( activeYear, activeMonth - 1 + offset, 1 );

		handleSelectMonth( target.getMonth() + 1, target.getFullYear() );
	}

	function handleDownload() {
		setIsDownloading( true );
		downloadFileFromUrl(
			buildTrainingRoutineReportPdfUrl( {
				month: activeMonth,
				year: activeYear,
			} ),
		);
		window.setTimeout( () => {
			setIsDownloading( false );
		}, 1200 );
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			{ /* En el telefono las migas no suman: el menu ya lleva al inicio. */ }
			<div className={ "hidden sm:block" }>
				<PageBreadcrumbs
					backHref={ "/student/dashboard" }
					backLabel={ "Volver" }
					crumbs={ [
						{ href: "/student/dashboard", label: "Inicio" },
						{ label: "Rutina de entrenamiento" },
					] }
				/>
			</div>

			<TrainingRoutinesMonthHeader
				isDownloadDisabled={ routineWeeks.length === 0 || isDownloading }
				isDownloading={ isDownloading }
				isRefreshing={ isFetching && !isLoading }
				month={ activeMonth }
				objective={ data?.routineMonth.objective }
				year={ activeYear }
				onChangeMonthAction={ handleChangeMonth }
				onDownloadAction={ handleDownload }
				onRefreshAction={ () => {
					void refetch();
				} }
				onSelectMonthAction={ handleSelectMonth }
			/>

			{ isLoading ? (
				<Card className={ "border border-border py-2" } variant={ "default" }>
					<TrainingRoutinesLoadingState/>
				</Card>
			) : null }

			{ isError ? (
				<Card className={ "border border-border py-2" } variant={ "default" }>
					<TrainingRoutinesErrorState
						errorMessage={ error instanceof Error ? error.message : "Ocurrió un error inesperado." }
						onRetry={ () => {
							void refetch();
						} }
					/>
				</Card>
			) : null }

			{ !isLoading && !isError ? (
				routineWeeks.length === 0 ? (
					<Card className={ "border border-border py-2" } variant={ "default" }>
						<TrainingRoutinesEmptyState month={ activeMonth } year={ activeYear }/>
					</Card>
				) : (
					<TrainingRoutinesWeekList routineWeeks={ routineWeeks }/>
				)
			) : null }
		</div>
	);
}
