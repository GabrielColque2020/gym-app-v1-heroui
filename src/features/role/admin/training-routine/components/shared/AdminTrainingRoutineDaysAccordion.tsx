"use client";

import type { AdminTrainingRoutineDay } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";

import { Accordion, Button, Chip, Description, Dropdown, Header, Label, Typography } from "@heroui/react";
import { CircleFill, EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type AdminTrainingRoutineDaysAccordionProps = {
	days: AdminTrainingRoutineDay[];
	exerciseGridClassName?: string;
	month: number;
	studentId: string;
	year: number;
};

function formatExerciseMeta( sets: string, reps: string ) {
	if (sets.trim().length === 0) return reps;
	if (reps.trim().length === 0) return sets;
	return `${ sets } x ${ reps }`;
}

function getDayTitle( day: AdminTrainingRoutineDay ) {
	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( Boolean ),
		),
	);

	if (bodyParts.length === 0) return "Sin ejercicios cargados";

	return bodyParts.join( " + " );
}

type DayOptionsMenuProps = {
	month: number;
	routineDayId: string;
	studentId: string;
	year: number;
};

function DayOptionsMenu( { month, routineDayId, studentId, year }: DayOptionsMenuProps ) {
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement | null>( null );
	const [ isOpen, setIsOpen ] = useState( false );

	function handleEdit() {
		const params = new URLSearchParams( {
			month: String( month ),
			routineDayId,
			studentId,
			year: String( year ),
		} );

		router.push( `/admin/routine?${ params.toString() }` );
		setIsOpen( false );
	}

	return (
		<div ref={ menuRef } className={ "relative" }>
			<Dropdown>
				<Button isIconOnly aria-label={ "Menu" } variant={ "outline" } className={ "border border-accent/50 text-accent shadow-s" }>
					<EllipsisVertical/>
				</Button>
				<Dropdown.Popover>
					<Dropdown.Menu onAction={ ( key ) => {
						if (key === "edit-day") {
							setIsOpen( ( current ) => !current );
						}
					} }>
						<Dropdown.Section>
							<Header>Opciones</Header>
							<Dropdown.Item id={ "edit-day" } textValue={ "Editar Dia" } variant={ "default" }>
								<TrashBin className={ "size-4 shrink-0 text-warning" }/>

								<Label className={ "text-warning" }>Editar</Label>

							</Dropdown.Item>
						</Dropdown.Section>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			{ isOpen ? (
				<div
					className={
						"absolute right-0 top-9 z-50 w-48 rounded-xl border border-border bg-surface p-1 shadow-lg"
					}
					role={ "menu" }
				>
					<button
						className={
							"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-warning hover:bg-warning/10"
						}
						type={ "button" }
						onClick={ handleEdit }
					>
						<Pencil className={ "size-4 shrink-0" }/>
						<Label className={ "text-warning" }>Editar</Label>
					</button>
				</div>
			) : null }
		</div>
	);
}

export function AdminTrainingRoutineDaysAccordion( {
													   days,
													   exerciseGridClassName = "grid gap-2 rounded-xl bg-default/40 p-3",
													   month,
													   studentId,
													   year,
												   }: AdminTrainingRoutineDaysAccordionProps ) {
	if (days.length === 0) {
		return (
			<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
				No hay dias de entrenamiento cargados para esta semana.
			</div>
		);
	}

	return (
		<Accordion allowsMultipleExpanded hideSeparator className={ "w-full space-y-2" }>
			{ days.map( ( day ) => (
				<Accordion.Item key={ day.id }>
					<div className={ "overflow-hidden rounded-xl border border-default bg-surface shadow-sm" }>
						<Accordion.Trigger className={ "group flex w-full items-center justify-between gap-2 px-3 py-2.5" }>
							<div className={ "flex min-w-0 items-center gap-2" }>
								<div className={ "flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground" }>
									{ day.dayNumber }
								</div>
								<div className={ "min-w-0" }>
									<Typography className={ "truncate text-sm font-semibold" }>Dia { day.dayNumber }</Typography>
									<Description className={ "truncate text-xs" }>{ getDayTitle( day ) }</Description>
								</div>
							</div>
							<div className={ "flex shrink-0 items-center gap-1.5" }>
								<Chip color={ day.isFinalized ? "success" : "accent" } size={ "sm" } variant={ "soft" }>
									{ day.isFinalized ? "Finalizado" : day.routines.length }
								</Chip>
								<Accordion.Indicator/>
							</div>
						</Accordion.Trigger>
						<Accordion.Panel>
							<Accordion.Body className={ "px-3 pb-3 pt-0" }>
								<div className={ "grid gap-2" }>
									{ day.routines.length === 0 ? (
										<div className={ "rounded-xl bg-default/40 p-3 text-sm text-muted" }>
											Este dia no tiene ejercicios cargados.
										</div>
									) : (
										<div className={ exerciseGridClassName }>
											{ day.routines.map( ( routine ) => (
												<div key={ routine.id } className={ "grid min-w-0 gap-1 text-sm" }>
													<div className={ "flex min-w-0 items-center gap-2" }>
														<CircleFill className={ "size-2 shrink-0 text-accent" }/>
														<span className={ "min-w-0 flex-1 truncate font-medium" }>
															{ routine.exercise?.name ?? "Ejercicio sin nombre" }
														</span>
														<span className={ "shrink-0 text-muted" }>
															{ formatExerciseMeta( routine.sets, routine.reps ) }
														</span>
													</div>
													{ routine.observation ? (
														<p className={ "pl-4 text-xs text-muted" }>{ routine.observation }</p>
													) : null }
												</div>
											) ) }
										</div>
									) }
									<div className={ "flex justify-end" }>
										<DayOptionsMenu
											month={ month }
											routineDayId={ day.id }
											studentId={ studentId }
											year={ year }
										/>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Panel>
					</div>
				</Accordion.Item>
			) ) }
		</Accordion>
	);
}
