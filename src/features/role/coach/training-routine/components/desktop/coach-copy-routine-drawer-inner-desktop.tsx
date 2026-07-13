"use client";

import { MONTH_OPTIONS_PADDED as MONTH_OPTIONS } from "@/constants/months";
import { CheckboxButtonGroup } from "@heroui-pro/react";
import { Alert, Button, Chip, Description, Drawer, EmptyState, Label, ListBox, ScrollShadow, Select, Separator, Spinner, Surface, Typography } from "@heroui/react";
import { Copy } from "lucide-react";

import { type CoachCopyRoutineDrawerProps, useCoachCopyRoutineDrawerState, } from "@/features/role/coach/training-routine/components/shared/use-coach-copy-routine-drawer-state";
import { CoachCopyRoutineNotice, CoachCopyRoutineWeekPill } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-elements";
import { CoachCopyRoutineDrawerSourceControls } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-source-controls";
import { CoachCopyRoutineDrawerSummaryPanel } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-summary-panel";

export type CoachCopyRoutineDrawerInnerProps = CoachCopyRoutineDrawerProps;

export function CoachCopyRoutineDrawerInnerDesktop( {
														hasActiveRoutine = true,
														...props
													}: CoachCopyRoutineDrawerInnerProps ) {
	const {
		assignedDestByOrigin,
		copyMonth,
		copyWeeks,
		destChoicesForRow,
		destLabel,
		destinationAffectedLabel,
		handleCopy,
		handleSourceMonthChange,
		handleSourceYearChange,
		isSingleWeek,
		mode,
		padMonth,
		primaryDisabled,
		primaryLabel,
		sameMonth,
		selectedSorted,
		selectedSourceRoutineStats,
		selectedSourceWeeks,
		selectedSourceWeeksLabel,
		setMode,
		setMultiDestByOrigin,
		setSelectedSourceWeeks,
		setSingleDestWeeks,
		singleDestWeeks,
		singleWeekPreview,
		source,
		sourceLabel,
		sourceMonth,
		sourceQuery,
		sourceWeeks,
		sourceYear,
		yearOptions,
	} = useCoachCopyRoutineDrawerState( {
		...props,
		hasActiveRoutine,
	} );

	return (
		<>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent sm:size-10" }>
						<Copy className={ "size-4 sm:size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Drawer.Heading>Copiar rutina</Drawer.Heading>
						<div className={ "mt-1 flex min-w-0 flex-wrap items-center gap-2" }>
							<Typography className={ "text-sm text-muted" }>Destino</Typography>
							<Typography className={ "text-sm font-semibold" }>{ destLabel }</Typography>
							{ hasActiveRoutine ? (
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									Rutina activa
								</Chip>
							) : null }
						</div>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<CoachCopyRoutineDrawerSourceControls
					handleSourceMonthChangeAction={ handleSourceMonthChange }
					handleSourceYearChangeAction={ handleSourceYearChange }
					mode={ mode }
					onModeChangeAction={ setMode }
					padMonthAction={ padMonth }
					sourceMonth={ sourceMonth }
					sourceYear={ sourceYear }
					yearOptions={ yearOptions }
					monthOptions={ MONTH_OPTIONS }
				/>

				{ mode === "month" && sameMonth ? (
					<CoachCopyRoutineNotice tone={ "warning" }>No podes copiar desde el mismo mes destino.</CoachCopyRoutineNotice>
				) : null }

				{ hasActiveRoutine ? (
					<CoachCopyRoutineNotice tone={ "warning" }>
						{ destLabel } ya tiene una rutina configurada. La copia puede reemplazar contenido existente.
					</CoachCopyRoutineNotice>
				) : null }

				{ sourceQuery.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al consultar origen</Alert.Title>
							<Alert.Description>{ sourceQuery.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ sourceQuery.isLoading ? (
					<Surface className={ "flex min-h-48 items-center justify-center rounded-xl border border-default-hover" }>
						<Spinner size={ "lg" }/>
					</Surface>
				) : source && !source.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<EmptyState className={ "flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-hover px-4 text-center" }>
						<Typography className={ "text-sm font-medium" }>No hay rutina en este origen.</Typography>
						<Description className={ "text-sm" }>Proba con otro mes para continuar.</Description>
					</EmptyState>
				) : source?.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<div className={ "grid min-h-0 gap-3 md:flex-1 md:grid-cols-[1fr_260px] md:gap-4" }>
						<ScrollShadow className={ "min-h-0 overflow-y-auto px-2" } visibility={ "none" }>
							<div className={ "grid gap-3 pb-2 sm:gap-4" }>
								{ mode === "month" ? (
									<Surface className={ "rounded-xl border border-default-hover bg-surface p-3 sm:p-4" }>
										<div className={ "flex items-start justify-between gap-3" }>
											<div className={ "min-w-0" }>
												<Typography className={ "text-sm font-semibold" }>Rutina completa</Typography>
												<Description className={ "mt-1 line-clamp-1 text-xs sm:text-sm" }>
													Se copiara la rutina completa de { sourceLabel }.
												</Description>
												<Description className={ "mt-1 text-xs sm:text-sm" }>
													{ source.weekCount } semanas · { source.dayCount } dias · { source.exerciseCount } ejercicios
												</Description>
											</div>
											<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
												Completa
											</Chip>
										</div>
										<div className={ "mt-3 flex flex-wrap gap-1.5 sm:grid sm:grid-cols-4 sm:gap-2" }>
											{ source.routines.map( ( routine ) => (
												<CoachCopyRoutineWeekPill key={ routine.id }>
													S{ routine.week }
												</CoachCopyRoutineWeekPill>
											) ) }
										</div>
									</Surface>
								) : (
									<>
										<div className={ "grid gap-2" }>
											<Label className={ "text-sm font-semibold" }>Semanas de origen</Label>
											<CheckboxButtonGroup
												className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
												layout={ "grid" }
												value={ selectedSourceWeeks }
												variant={ "secondary" }
												onChange={ ( value ) => setSelectedSourceWeeks( value as string[] ) }
											>
												{ sourceWeeks.map( ( routine ) => (
													<CheckboxButtonGroup.Item
														key={ routine.week }
														className={ "min-h-16 gap-2 px-3 py-2 sm:min-h-0 sm:py-3" }
														value={ String( routine.week ) }
													>
														<CheckboxButtonGroup.Indicator/>
														<CheckboxButtonGroup.ItemContent>
															<Label className={ "text-sm" }>Semana { routine.week }</Label>
															<Description className={ "line-clamp-1 text-xs" }>
																{ routine.dayCount } dias / { routine.exerciseCount } ejercicios
															</Description>
														</CheckboxButtonGroup.ItemContent>
													</CheckboxButtonGroup.Item>
												) ) }
											</CheckboxButtonGroup>
										</div>

										<Separator/>

										{ selectedSorted.length === 0 ? (
											<Surface className={ "rounded-xl border border-default-hover px-4 py-5 text-center sm:py-8" }>
												<Description className={ "text-sm" }>Seleccioná al menos una semana para ver los destinos.</Description>
											</Surface>
										) : isSingleWeek ? (
											<div className={ "grid gap-3" }>
												<div>
													<Label className={ "text-sm font-semibold pr-1" }>Copiar en:</Label>
													<Description className={ "mt-1 text-sm" }>
														Ideal para repetir una misma semana en varias semanas del mes actual.
													</Description>
												</div>
												<CheckboxButtonGroup
													className={ "grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
													layout={ "grid" }
													value={ singleDestWeeks }
													variant={ "secondary" }
													onChange={ ( value ) => setSingleDestWeeks( value as string[] ) }
												>
													{ [ "1", "2", "3", "4" ].map( ( week ) => (
														<CheckboxButtonGroup.Item
															key={ week }
															className={ "min-h-12 gap-2 px-3 py-2 sm:min-h-0 sm:py-3" }
															value={ week }
														>
															<CheckboxButtonGroup.Indicator/>
															<CheckboxButtonGroup.ItemContent>
																<Label className={ "text-sm" }>Semana { week }</Label>
															</CheckboxButtonGroup.ItemContent>
														</CheckboxButtonGroup.Item>
													) ) }
												</CheckboxButtonGroup>
												<CoachCopyRoutineNotice tone={ "success" }>{ singleWeekPreview }</CoachCopyRoutineNotice>
											</div>
										) : (
											<div className={ "grid gap-3" }>
												<Label className={ "text-sm font-semibold" }>Asignar destinos</Label>
												<div className={ "grid gap-3 sm:grid-cols-2" }>
													{ selectedSorted.map( ( origin ) => (
														<Surface key={ origin } className={ "rounded-xl border border-default-hover bg-surface p-3" }>
															<div className={ "mb-2" }>
																<Typography className={ "text-sm font-medium" }>Semana { origin }</Typography>
																<Description className={ "text-xs" }>Origen</Description>
															</div>
															<Select
																placeholder={ "Destino" }
																value={ assignedDestByOrigin[ origin ] ?? "" }
																variant={ "secondary" }
																onChange={ ( key ) =>
																	setMultiDestByOrigin( ( current ) => ( { ...current, [ origin ]: key as string } ) )
																}
															>
																<Select.Trigger className={ "h-10 rounded-xl" }>
																	<Select.Value/>
																	<Select.Indicator/>
																</Select.Trigger>
																<Select.Popover>
																	<ListBox>
																		{ destChoicesForRow( origin ).map( ( week ) => (
																			<ListBox.Item key={ week } id={ week } textValue={ `Semana ${ week }` }>
																				Semana { week }
																				<ListBox.ItemIndicator/>
																			</ListBox.Item>
																		) ) }
																	</ListBox>
																</Select.Popover>
															</Select>
														</Surface>
													) ) }
												</div>
												<CoachCopyRoutineNotice tone={ "warning" }>
													Las semanas destino seran reemplazadas con el contenido seleccionado.
												</CoachCopyRoutineNotice>
											</div>
										) }
									</>
								) }
							</div>
						</ScrollShadow>

						<CoachCopyRoutineDrawerSummaryPanel
							destLabel={ destLabel }
							destinationAffectedLabel={ destinationAffectedLabel }
							mode={ mode }
							selectedSourceRoutineStats={ selectedSourceRoutineStats }
							selectedSourceWeeksLabel={ selectedSourceWeeksLabel }
							sourceLabel={ sourceLabel }
						/>
					</div>
				) : null }
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } className={ "flex-1 sm:flex-none" } isDisabled={ copyMonth.isPending || copyWeeks.isPending } variant={ "secondary" }>
					Cancelar
				</Button>
				<Button
					className={ "min-w-0 flex-1 sm:flex-none" }
					isDisabled={ primaryDisabled }
					isPending={ copyMonth.isPending || copyWeeks.isPending }
					onPress={ handleCopy }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Copy className={ "size-4" }/> }
							<span className={ "truncate" }>{ isPending ? "Copiando..." : primaryLabel }</span>
						</>
					) }
				</Button>
			</Drawer.Footer>
		</>
	);
}

