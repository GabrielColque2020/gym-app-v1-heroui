"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutineMonthFilters } from "@/features/role/student/history-routines/components/shared/history-routine-month-filters";
import { StudentHistoryRoutinesDesktopContent } from "@/features/role/student/history-routines/components/desktop/student-history-routines-desktop-content";
import { StudentHistoryRoutinesMobileContent } from "@/features/role/student/history-routines/components/mobile/student-history-routines-mobile-content";
import { useHistoryRoutines } from "@/features/role/student/history-routines/hooks/use-history-routines";
import { buildYearOptions, getCurrentMonth, getCurrentYear, MONTH_OPTIONS } from "@/features/history-routines/services/history-routines-form";
import { buildHistoryRoutineMonthSummary, groupHistoryRoutinesByWeek } from "@/features/history-routines/services/history-routines-view";

type StudentHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function StudentHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ selectedMonth, setSelectedMonth ] = useState( String( getCurrentMonth() ) );
	const [ selectedYear, setSelectedYear ] = useState( String( getCurrentYear() ) );
	const [ activeMonth, setActiveMonth ] = useState( getCurrentMonth() );
	const [ activeYear, setActiveYear ] = useState( getCurrentYear() );
	const [ selectedWeeks, setSelectedWeeks ] = useState<number[]>( [] );

	const { data, error, isError, isLoading, isFetching, refetch } = useHistoryRoutines( {
		month: activeMonth,
		studentId,
		year: activeYear,
	} );

	const yearOptions = useMemo( () => buildYearOptions(), [] );
	const weekGroups = useMemo(
		() => groupHistoryRoutinesByWeek( data?.historyRoutines ?? [] ),
		[ data?.historyRoutines ],
	);
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
	const didInitializeWeeks = useRef( false );

	useEffect( () => {
		if (weekGroups.length === 0) {
			didInitializeWeeks.current = false;
			setSelectedWeeks( [] );

			return;
		}

		if (!didInitializeWeeks.current) {
			didInitializeWeeks.current = true;
			setSelectedWeeks( [ weekGroups[ 0 ].week ] );

			return;
		}

		setSelectedWeeks( ( currentSelectedWeeks ) =>
			currentSelectedWeeks.filter( ( week ) =>
				weekGroups.some( ( weekGroup ) => weekGroup.week === week ),
			),
		);
	}, [ weekGroups ] );

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

	function handleWeekToggle( week: number ) {
		setSelectedWeeks( ( currentSelectedWeeks ) => (
			currentSelectedWeeks.includes( week )
				? currentSelectedWeeks.filter( ( currentWeek ) => currentWeek !== week )
				: [ ...currentSelectedWeeks, week ].sort( ( left, right ) => left - right )
		) );
	}

	const breadcrumbs = [
		{ href: "/student/dashboard", label: "Inicio" },
		{ label: "Mi historial de rutinas" },
	];
	const monthLabel = `${ String( activeMonth ).padStart( 2, "0" ) }/${ activeYear }`;

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/student/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>

			<HistoryRoutineMonthFilters
				monthOptions={ MONTH_OPTIONS }
				onClearAction={ handleClear }
				onMonthChangeAction={ setSelectedMonth }
				onRefreshAction={ () => {
					void refetch();
				} }
				onSearchAction={ handleSearch }
				onYearChangeAction={ setSelectedYear }
				isRefreshing={ isFetching && !isLoading }
				selectedMonth={ selectedMonth }
				selectedYear={ selectedYear }
				yearOptions={ yearOptions }
			/>

			{ isLoading ? (
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando historial</p>
							<p className={ "text-sm text-muted" }>Consultando el progreso mensual.</p>
						</div>
					</Card.Content>
				</Card>
			) : null }

			{ isError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar historial</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ !isLoading && !isError && data ? (
				data.historyRoutines.length === 0 ? (
					<Card className={ "border border-dashed border-border" } variant={ "default" }>
						<Card.Content className={ "py-10 text-center" }>
							<p className={ "text-base font-semibold text-foreground" }>No hay historial de rutinas cargado</p>
							<p className={ "mt-1 text-sm text-muted" }>
								No encontramos registros para { monthLabel }.
							</p>
						</Card.Content>
					</Card>
				) : (
					<>
						<div className={ "hidden md:block" }>
							<StudentHistoryRoutinesDesktopContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ desktopSummary }
								weekGroups={ weekGroups }
								onWeekToggleAction={ handleWeekToggle }
							/>
						</div>
						<div className={ "md:hidden" }>
							<StudentHistoryRoutinesMobileContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ mobileSummary }
								weekGroups={ weekGroups }
								onWeekToggleAction={ handleWeekToggle }
							/>
						</div>
					</>
				)
			) : null }
		</div>
	);
}

export default function StudentHistoryRoutinesPageContent( { studentId }: StudentHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Debes iniciar sesion</Alert.Title>
					<Alert.Description>
						No se pudo identificar tu cuenta para mostrar tu historial de rutinas.
					</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return <StudentHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
