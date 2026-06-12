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

export function AdminCreateRoutineSheetMobile() {
	const [ selectedWeeks, setSelectedWeeks ] = useState<string[]>( [] );
	const [ selectedDays, setSelectedDays ] = useState<string[]>( [] );

	const isCreateDisabled = selectedWeeks.length === 0 || selectedDays.length === 0;
	const summaryLabel = useMemo( () => {
		if (selectedWeeks.length === 0 && selectedDays.length === 0) return "Sin seleccion";

		return `${ selectedWeeks.length } semana${ selectedWeeks.length === 1 ? "" : "s" } / ${ selectedDays.length } dia${ selectedDays.length === 1 ? "" : "s" }`;
	}, [ selectedDays.length, selectedWeeks.length ] );

	return (
		<Sheet isDetached placement={ "bottom" }>
			<Sheet.Trigger>
				<Button
					variant={ "outline" }
					className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				>
					<Plus className={ "size-4" }/>

				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "blur" }>
				<Sheet.Content className={ "mx-auto flex max-h-[92vh] w-full max-w-115 flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl" }>
					<Sheet.Handle/>
					<Sheet.Dialog className={ "flex min-h-0 flex-1 flex-col" }>
						<Sheet.CloseTrigger className={ "absolute inset-e-3 top-3 z-10" }/>
						<Sheet.Header className={ "border-default-100 relative border-b px-4 pb-3 pt-3" }>
							<div className={ "flex min-w-0 items-center gap-3 pe-8" }>
								<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
									<Plus className={ "size-4" }/>
								</div>
								<div className={ "min-w-0 flex-1" }>
									<Sheet.Heading className={ "truncate text-base" }>Crear rutina</Sheet.Heading>
									<Description className={ "mt-1 text-sm" }>
										Elegi semanas y dias para armar la base.
									</Description>
								</div>
							</div>
						</Sheet.Header>

						<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-3" }>
							<Surface className={ "rounded-xl border border-default-hover bg-surface px-3 py-2.5" }>
								<div className={ "flex items-center justify-between gap-3" }>
									<Typography className={ "text-sm font-medium" }>Resumen</Typography>
									<Chip color={ isCreateDisabled ? "default" : "accent" } size={ "sm" } variant={ "soft" }>
										{ summaryLabel }
									</Chip>
								</div>
							</Surface>

							<ScrollShadow className={ "min-h-0 flex-1" }>
								<div className={ "grid gap-4 pb-6" }>
									<div className={ "grid gap-2 pl-0.5 pr-2" }>
										<div>
											<Label className={ "text-sm font-semibold mr-1" }>Semanas</Label>
											<Description className={ "text-sm" }>Selecciona las semanas de la rutina.</Description>
										</div>
										<CheckboxButtonGroup
											className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
											layout={ "grid" }
											value={ selectedWeeks }
											variant={ "secondary" }
											onChange={ ( value ) => setSelectedWeeks( value as string[] ) }
										>
											{ WEEKS_OPTIONS.map( ( week ) => (
												<CheckboxButtonGroup.Item key={ week.value } className={ "gap-2 px-3 py-2.5" } value={ week.value }>
													<CheckboxButtonGroup.Indicator/>
													<CheckboxButtonGroup.ItemContent>
														<Label className={ "text-sm" }>{ week.label }</Label>
													</CheckboxButtonGroup.ItemContent>
												</CheckboxButtonGroup.Item>
											) ) }
										</CheckboxButtonGroup>
									</div>

									<Separator/>

									<div className={ "grid gap-2 pl-0.5 pr-2" }>
										<div>
											<Label className={ "text-sm font-semibold mr-1" }>Dias</Label>
											<Description className={ "text-sm" }>Selecciona los dias de entrenamiento.</Description>
										</div>
										<CheckboxButtonGroup
											className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
											layout={ "grid" }
											value={ selectedDays }
											variant={ "secondary" }
											onChange={ ( value ) => setSelectedDays( value as string[] ) }
										>
											{ DAYS_OPTIONS.map( ( day ) => (
												<CheckboxButtonGroup.Item key={ day.value } className={ "gap-2 px-3 py-2.5" } value={ day.value }>
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
						</Sheet.Body>

						<Sheet.Footer className={ "border-default-100 bg-background grid shrink-0 grid-cols-2 gap-2 border-t px-4 py-3" }>
							<Sheet.Close>
								<Button className={ "w-full" } variant={ "secondary" }>
									Cancelar
								</Button>
							</Sheet.Close>
							<Button
								className={ "w-full" }
								isDisabled={ isCreateDisabled }
								onPress={ () => {
									// Integrar API: crear rutina.
								} }
							>
								<CircleCheck className={ "size-4" }/>
								Crear
							</Button>
						</Sheet.Footer>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
