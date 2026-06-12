"use client";

import React, { useMemo, useState } from "react";
import { CheckboxButtonGroup, Sheet } from "@heroui-pro/react";
import { Button, Chip, Description, Label, ScrollShadow, Separator, Surface, Typography } from "@heroui/react";
import { CircleCheck, Plus } from "@gravity-ui/icons";

const WEEKS_OPTIONS = [
	{ value: "week1", label: "Semana 1" },
	{ value: "week2", label: "Semana 2" },
	{ value: "week3", label: "Semana 3" },
	{ value: "week4", label: "Semana 4" },
];

const DAYS_OPTIONS = [
	{ value: "day1", label: "Dia 1" },
	{ value: "day2", label: "Dia 2" },
	{ value: "day3", label: "Dia 3" },
	{ value: "day4", label: "Dia 4" },
	{ value: "day5", label: "Dia 5" },
];

function SummaryRow( { label, value }: { label: string; value: React.ReactNode } ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-muted text-sm" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}

function SelectionPill( { children }: { children: React.ReactNode } ) {
	return (
		<span className={ "rounded-lg bg-default px-2.5 py-1 text-xs font-semibold" }>
			{ children }
		</span>
	);
}

export function AdminCreateRoutineSheetDesktop() {
	const [ selectedWeeks, setSelectedWeeks ] = useState<string[]>( [] );
	const [ selectedDays, setSelectedDays ] = useState<string[]>( [] );

	const isCreateDisabled = selectedWeeks.length === 0 || selectedDays.length === 0;
	const summaryLabel = useMemo( () => {
		if (isCreateDisabled) return "Pendiente";

		return `${ selectedWeeks.length } semana${ selectedWeeks.length === 1 ? "" : "s" } / ${ selectedDays.length } dia${ selectedDays.length === 1 ? "" : "s" }`;
	}, [ isCreateDisabled, selectedDays.length, selectedWeeks.length ] );

	return (
		<Sheet isDetached placement={ "right" }>
			<Sheet.Trigger>
				<Button
					variant={ "outline" }
					className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				>
					<Plus className={ "size-4" }/>
					Crear Rutina
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content>
					<Sheet.Dialog className={ "flex h-full min-h-0 flex-col" }>
						<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>

						<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
							<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
								<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
									<Plus className={ "size-5" }/>
								</div>
								<div className={ "min-w-0 flex-1" }>
									<Sheet.Heading>Crear rutina</Sheet.Heading>
									<Description className={ "mt-1 text-sm" }>
										Configura semanas y dias de entrenamiento para crear la base de la rutina.
									</Description>
								</div>
							</div>
						</Sheet.Header>

						<Sheet.Body className={ "flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-5" }>
							<div className={ "grid min-h-0 flex-1 grid-cols-[1fr_240px] gap-4" }>
								<ScrollShadow className={ "min-h-0" }>
									<div className={ "grid gap-4 pb-2" }>
										<div className={ "grid gap-2" }>
											<div>
												<Label className={ "text-sm font-semibold mr-1" }>Semanas</Label>
												<Description className={ "text-sm" }>Selecciona las semanas que tendra la rutina.</Description>
											</div>
											<CheckboxButtonGroup
												className={ "grid-cols-2 gap-3 [--checkbox-button-group-item-radius:0.75rem] px-0.5" }
												layout={ "grid" }
												value={ selectedWeeks }
												variant={ "secondary" }
												onChange={ ( value ) => setSelectedWeeks( value as string[] ) }
											>
												{ WEEKS_OPTIONS.map( ( week ) => (
													<CheckboxButtonGroup.Item key={ week.value } className={ "gap-2 px-4 py-3" } value={ week.value }>
														<CheckboxButtonGroup.Indicator/>
														<CheckboxButtonGroup.ItemContent>
															<Label className={ "text-sm" }>{ week.label }</Label>
														</CheckboxButtonGroup.ItemContent>
													</CheckboxButtonGroup.Item>
												) ) }
											</CheckboxButtonGroup>
										</div>

										<Separator/>

										<div className={ "grid gap-2" }>
											<div>
												<Label className={ "text-sm font-semibold mr-1" }>Dias</Label>
												<Description className={ "text-sm" }>Selecciona los dias de entrenamiento por semana.</Description>
											</div>
											<CheckboxButtonGroup
												className={ "grid-cols-3 gap-3 [--checkbox-button-group-item-radius:0.75rem] px-0.5" }
												layout={ "grid" }
												value={ selectedDays }
												variant={ "secondary" }
												onChange={ ( value ) => setSelectedDays( value as string[] ) }
											>
												{ DAYS_OPTIONS.map( ( day ) => (
													<CheckboxButtonGroup.Item key={ day.value } className={ "gap-2 px-4 py-3" } value={ day.value }>
														<CheckboxButtonGroup.Indicator/>
														<CheckboxButtonGroup.ItemContent>
															<Label className={ "text-sm" }>{ day.label }</Label>
														</CheckboxButtonGroup.ItemContent>
													</CheckboxButtonGroup.Item>
												) ) }
											</CheckboxButtonGroup>
										</div>
									</div>
								</ScrollShadow>

								<Surface className={ "flex min-h-0 flex-col gap-3 rounded-xl border border-default-hover bg-surface p-4" }>
									<div className={ "flex items-start justify-between gap-3" }>
										<div>
											<Typography className={ "text-sm font-semibold" }>Resumen</Typography>
											<Description className={ "mt-1 text-xs" }>Nueva rutina</Description>
										</div>
										<Chip color={ isCreateDisabled ? "default" : "accent" } size={ "sm" } variant={ "soft" }>
											{ summaryLabel }
										</Chip>
									</div>

									<Separator/>

									<div className={ "grid gap-2" }>
										<SummaryRow label={ "Semanas" } value={ selectedWeeks.length || "-" }/>
										<SummaryRow label={ "Dias" } value={ selectedDays.length || "-" }/>
									</div>

									{ selectedWeeks.length > 0 && (
										<div className={ "grid gap-2" }>
											<Description className={ "text-xs" }>Semanas seleccionadas</Description>
											<div className={ "flex flex-wrap gap-1.5" }>
												{ selectedWeeks.map( ( value ) => {
													const week = WEEKS_OPTIONS.find( ( item ) => item.value === value );

													return <SelectionPill key={ value }>{ week?.label.replace( "Semana ", "S" ) ?? value }</SelectionPill>;
												} ) }
											</div>
										</div>
									) }

									{ selectedDays.length > 0 && (
										<div className={ "grid gap-2" }>
											<Description className={ "text-xs" }>Dias seleccionados</Description>
											<div className={ "flex flex-wrap gap-1.5" }>
												{ selectedDays.map( ( value ) => {
													const day = DAYS_OPTIONS.find( ( item ) => item.value === value );

													return <SelectionPill key={ value }>{ day?.label.replace( "Dia ", "D" ) ?? value }</SelectionPill>;
												} ) }
											</div>
										</div>
									) }

									<Surface className={ "mt-auto rounded-xl border border-accent-soft bg-accent-soft/40 px-3 py-2.5" }>
										<Typography className={ "text-sm leading-5" }>
											La rutina se crea vacia para cargar ejercicios despues.
										</Typography>
									</Surface>
								</Surface>
							</div>
						</Sheet.Body>

						<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
							<Sheet.Close>
								<Button variant={ "secondary" }>
									Cancelar
								</Button>
							</Sheet.Close>
							<Button
								isDisabled={ isCreateDisabled }
								onPress={ () => {
									// Integrar API: crear rutina.
								} }
							>
								<CircleCheck className={ "size-4" }/>
								Crear rutina
							</Button>
						</Sheet.Footer>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
