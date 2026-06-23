"use client";

import type { Key } from "react-aria-components/Breadcrumbs";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CircleCheckFill } from "@gravity-ui/icons";
import { Button, Card, Chip, Spinner, Typography } from "@heroui/react";
import { Segment } from "@heroui-pro/react";

import { PageBreadcrumbs } from "@/components/common";
import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";
import TrainingRoutinesFilter from "@/features/student/training/components/TrainingRoutinesFilter";
import { useTrainingRoutines } from "@/features/student/training/hooks/useTrainingRoutines";

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

function formatDayLabel( dayNumber: number ) {
	return `Dia ${ dayNumber }`;
}

function getDayDescription( day: { routines: Array<{ exercise?: { bodyPart?: Parameters<typeof formatBodyPart>[0] | null } | null }> } ) {
	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( ( bodyPart ): bodyPart is Parameters<typeof formatBodyPart>[0] => Boolean( bodyPart ) )
				.map( ( bodyPart ) => formatBodyPart( bodyPart ) ),
		),
	);

	return bodyParts.length > 0 ? bodyParts.join( " + " ) : "Sin ejercicios cargados";
}

function getDayStatusLabel( isFinalized: boolean ) {
	return isFinalized ? "Guardado" : "Sin guardar";
}

function getDayStatusColor( isFinalized: boolean ) {
	return isFinalized ? "success" : "warning";
}

export default function TrainingRoutinesPageContent( {
														 initialMonth = getCurrentMonth(),
														 initialYear = getCurrentYear(),
													 }: TrainingRoutinesPageContentProps ) {
	const [ activeMonth, setActiveMonth ] = useState( initialMonth );
	const [ activeYear, setActiveYear ] = useState( initialYear );
	const [ selectedWeekId, setSelectedWeekId ] = useState<Key | null>( null );

	const { data, error, isError, isLoading, refetch } = useTrainingRoutines( {
		month: activeMonth,
		year: activeYear,
	} );

	const routines = data?.routines ?? EMPTY_ROUTINES;
	const selectedWeekExists = selectedWeekId !== null && routines.some( ( routine ) => routine.id === selectedWeekId );
	const effectiveSelectedWeekId = selectedWeekExists ? selectedWeekId : routines[ 0 ]?.id ?? "";
	const selectedRoutine = useMemo(
		() => routines.find( ( routine ) => routine.id === effectiveSelectedWeekId ) ?? routines[ 0 ] ?? null,
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
				backHref={ "/dashboard" }
				backLabel={ "Volver" }
				crumbs={ [
					{ href: "/dashboard", label: "Inicio" },
					{ label: "Rutina de entrenamiento" },
				] }
			/>

			<TrainingRoutinesFilter
				defaultMonth={ defaultMonth }
				defaultYear={ defaultYear }
				onClear={ handleClear }
				onSearch={ handleSearch }
			/>

			<div className={ "w-full" }>
				<div className={ "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }>
					<Typography type={ "h3" } className={ "font-black" }>Plan Semanal</Typography>

					{ isLoading ? (
						<div className={ "flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted" }>
							Cargando semanas
						</div>
					) : routines.length > 0 ? (
						<div className={ "flex justify-center sm:justify-end" }>
							<Segment
								key={ `${ activeMonth }-${ activeYear }-${ routines[ 0 ]?.id ?? "empty" }` }
								defaultSelectedKey={ routines[ 0 ]?.id }
								onSelectionChange={ setSelectedWeekId }
								size={ "md" }
								className={ "w-full max-w-full sm:w-auto" }
							>
								{ routines.map( ( routine ) => (
									<Segment.Item key={ routine.id } id={ routine.id }>
										<Segment.Separator/>
										<span className={ "text-xs sm:text-sm" }>{ `Semana ${ routine.week }` }</span>
									</Segment.Item>
								) ) }
							</Segment>
						</div>
					) : null }
				</div>
			</div>

			{ isLoading ? (
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando rutina</p>
							<p className={ "text-sm text-muted" }>Consultando tus semanas y dias de entrenamiento.</p>
						</div>
					</Card.Content>
				</Card>
			) : null }

			{ isError ? (
				<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center" }>
						<p className={ "text-base font-semibold text-foreground" }>No se pudieron cargar tus rutinas</p>
						<p className={ "max-w-xl text-sm text-muted" }>{ error instanceof Error ? error.message : "Ocurrio un error inesperado." }</p>
						<Button className={ "mt-1" } onPress={ () => refetch() }>
							Reintentar
						</Button>
					</Card.Content>
				</Card>
			) : null }

			{ !isLoading && !isError ? (
				routines.length === 0 ? (
					<Card className={ "border border-dashed border-border bg-surface" } variant={ "default" }>
						<Card.Content className={ "py-10 text-center" }>
							<p className={ "text-base font-semibold text-foreground" }>No hay rutinas cargadas</p>
							<p className={ "mt-1 text-sm text-muted" }>
								No encontramos rutinas para { String( activeMonth ).padStart( 2, "0" ) }/{ activeYear }.
							</p>
						</Card.Content>
					</Card>
				) : (
					<div className={ "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }>
						{ selectedRoutine?.routineDays.map( ( day ) => (
							<Card
								key={ day.id }
								className={ "w-full border border-accent/90 border-l-4 shadow-sm" }
							>
								<div className={ "flex flex-1 flex-col gap-3" }>
									<Card.Header className={ "gap-1" }>
										<Card.Title className={ "relative pr-8" }>
											<span className={ "text-lg font-bold text-foreground" }>{ formatDayLabel( day.dayNumber ) }</span>
											<Chip
												color={ getDayStatusColor( day.isFinalized ) }
												variant={ "soft" }
												className={ "absolute right-0 top-0 z-10" }
												size={ "md" }
											>
												<CircleCheckFill width={ 12 }/>
												<Chip.Label>{ getDayStatusLabel( day.isFinalized ) }</Chip.Label>
											</Chip>
										</Card.Title>
										<Card.Description>
											{ getDayDescription( day ) }
										</Card.Description>
									</Card.Header>
									<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3" }>
										<Link href={ `/routine?routineDayId=${ day.id }` } className={ "w-full sm:w-auto" }>
											<Button className={ "w-full sm:w-auto" }>
												Ver Rutina
											</Button>
										</Link>
									</Card.Footer>
								</div>
							</Card>
						) ) }
					</div>
				)
			) : null }
		</div>
	);
}
