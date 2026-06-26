"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Magnifier } from "@gravity-ui/icons";
import { Alert, Button, Card, Chip, Spinner } from "@heroui/react";

import { FilterSelect, PageBreadcrumbs, PageHeader } from "@/components/common";
import { HistoryRoutineWeeksAccordion } from "@/features/role/admin/history-routines/components/desktop/HistoryRoutineWeeksAccordion";
import { HistoryRoutineWeeksSelector } from "@/features/role/admin/history-routines/components/desktop/HistoryRoutineWeeksSelector";
import { useHistoryRoutines } from "@/features/role/admin/history-routines/hooks/useHistoryRoutines";
import { buildYearOptions, getCurrentMonth, getCurrentYear, MONTH_OPTIONS, } from "@/features/role/admin/history-routines/services/history-routines-form";
import { groupHistoryRoutinesByWeek } from "@/features/role/admin/history-routines/services/history-routines-view";

type AdminHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function AdminHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ selectedMonth, setSelectedMonth ] = useState( String( getCurrentMonth() ) );
	const [ selectedYear, setSelectedYear ] = useState( String( getCurrentYear() ) );
	const [ activeMonth, setActiveMonth ] = useState( getCurrentMonth() );
	const [ activeYear, setActiveYear ] = useState( getCurrentYear() );
	const [ selectedWeeks, setSelectedWeeks ] = useState<number[]>( [] );

	const { data, error, isError, isLoading } = useHistoryRoutines( {
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
		{ href: "/", label: "Inicio" },
		{ href: "/admin/historyRoutinesStudents", label: "Historial de rutinas por estudiante" },
		{ label: data?.student.name ?? "Historial de rutinas" },
	];

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/admin/historyRoutinesStudents" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" }>
					<PageHeader
						description={ "Consulta el progreso mensual del estudiante seleccionado." }
						title={ "Historial de rutinas" }
					/>
					{ data?.student.name ? (
						<Chip color={ "accent" } variant={ "soft" }>
							{ data.student.name }
						</Chip>
					) : null }
				</Card.Header>

				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					<div className={ "grid gap-3 rounded-xl border border-border bg-surface-secondary p-3 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end" }>
						<FilterSelect
							label={ "Mes" }
							name={ "history-routines-month-filter" }
							options={ MONTH_OPTIONS.map( ( option ) => ( { label: option.label, value: option.value } ) ) }
							placeholder={ "Todos los meses" }
							value={ selectedMonth }
							onSelectionChange={ setSelectedMonth }
						/>

						<FilterSelect
							label={ "Anio" }
							name={ "history-routines-year-filter" }
							options={ yearOptions }
							placeholder={ "Todos los anios" }
							value={ selectedYear }
							onSelectionChange={ setSelectedYear }
						/>

						<Button className={ "shadow-sm" } onPress={ handleSearch }>
							<Magnifier/>
							Buscar
						</Button>

						<Button variant={ "secondary" } onPress={ handleClear }>
							Limpiar
						</Button>
					</div>
				</Card.Content>
			</Card>

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
					<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
						<Card.Content className={ "py-10 text-center" }>
							<p className={ "text-base font-semibold text-foreground" }>No hay historial de rutinas cargado</p>
							<p className={ "mt-1 text-sm text-muted" }>
								No encontramos registros para { String( activeMonth ).padStart( 2, "0" ) }/{ activeYear }.
							</p>
						</Card.Content>
					</Card>
				) : (
					<div className={ "flex flex-col gap-4" }>
						<Card className={ "border border-border bg-surface" } variant={ "default" }>
							<Card.Content className={ "p-3" }>
								<HistoryRoutineWeeksSelector
									weeks={ weekGroups }
									selectedWeeks={ selectedWeeks }
									onWeekToggle={ handleWeekToggle }
								/>
							</Card.Content>
						</Card>

						<HistoryRoutineWeeksAccordion weeks={ selectedWeekGroups }/>
					</div>
				)
			) : null }
		</div>
	);
}

export default function AdminHistoryRoutinesPageContent( { studentId }: AdminHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		const breadcrumbs = [
			{ href: "/", label: "Inicio" },
			{ href: "/admin/historyRoutinesStudents", label: "Historial de rutinas por estudiante" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/admin/historyRoutinesStudents" }
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

	return <AdminHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
