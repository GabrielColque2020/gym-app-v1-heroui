"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutineMonthFilters } from "@/features/role/coach/history-routines/components/shared/HistoryRoutineMonthFilters";
import { CoachHistoryRoutinesDesktopContent } from "@/features/role/coach/history-routines/components/desktop/CoachHistoryRoutinesDesktopContent";
import { CoachHistoryRoutinesMobileContent } from "@/features/role/coach/history-routines/components/mobile/CoachHistoryRoutinesMobileContent";
import { useHistoryRoutines } from "@/features/role/coach/history-routines/hooks/useHistoryRoutines";
import { buildYearOptions, getCurrentMonth, getCurrentYear, MONTH_OPTIONS, } from "@/features/role/coach/history-routines/services/history-routines-form";
import { buildHistoryRoutineMonthSummary, groupHistoryRoutinesByWeek, } from "@/features/role/coach/history-routines/services/history-routines-view";

type CoachHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function CoachHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ selectedMonth, setSelectedMonth ] = useState( String( getCurrentMonth() ) );
	const [ selectedYear, setSelectedYear ] = useState( String( getCurrentYear() ) );
	const [ activeMonth, setActiveMonth ] = useState( getCurrentMonth() );
	const [ activeYear, setActiveYear ] = useState( getCurrentYear() );
	const [ selectedWeeks, setSelectedWeeks ] = useState<number[]>( [] );

	const { data, error, isError, isFetching, isLoading, refetch } = useHistoryRoutines( {
		month: activeMonth,
		studentId,
		year: activeYear,
	} );
	const isRefreshing = isFetching && !isLoading;

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

	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ href: "/coach/historyRoutinesStudents", label: "Historial de rutinas por estudiante" },
		{ label: data?.student.name ?? "Historial de rutinas" },
	];
	const monthLabel = `${ String( activeMonth ).padStart( 2, "0" ) }/${ activeYear }`;

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/historyRoutinesStudents" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<HistoryRoutineMonthFilters
				isRefreshing={ isRefreshing }
				monthOptions={ MONTH_OPTIONS }
				onClear={ handleClear }
				onMonthChange={ setSelectedMonth }
				onRefresh={ handleRefresh }
				onSearch={ handleSearch }
				onYearChange={ setSelectedYear }
				selectedMonth={ selectedMonth }
				selectedYear={ selectedYear }
				yearOptions={ yearOptions }
				userName={ data?.student.name }
			/>

			{ isLoading ? (
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando historial</p>
							<p className={ "text-sm text-muted" }>Consultando el progreso mensual del estudiante.</p>
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
							<CoachHistoryRoutinesDesktopContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ desktopSummary }
								weekGroups={ weekGroups }
								onWeekToggle={ handleWeekToggle }
							/>
						</div>
						<div className={ "md:hidden" }>
							<CoachHistoryRoutinesMobileContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ mobileSummary }
								weekGroups={ weekGroups }
								onWeekToggle={ handleWeekToggle }
							/>
						</div>
					</>
				)
			) : null }
		</div>
	);
}

export default function CoachHistoryRoutinesPageContent( { studentId }: CoachHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		const breadcrumbs = [
			{ href: "/", label: "Inicio" },
			{ href: "/coach/historyRoutinesStudents", label: "Historial de rutinas por estudiante" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/historyRoutinesStudents" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Selecciona un estudiante</Alert.Title>
						<Alert.Description>
							Para consultar historial de rutinas primero tenes que elegir un estudiante activo.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	return <CoachHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
