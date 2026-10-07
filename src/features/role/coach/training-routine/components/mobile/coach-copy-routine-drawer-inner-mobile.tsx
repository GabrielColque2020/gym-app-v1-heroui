"use client";

import { MONTH_OPTIONS_PADDED as MONTH_OPTIONS } from "@/constants/months";
import { CheckboxButtonGroup } from "@heroui-pro/react";
import { Alert, Chip, Description, Drawer, EmptyState, Label, ListBox, Select, Separator, Spinner, Surface, Typography } from "@heroui/react";
import { Copy } from "lucide-react";

import { type CoachCopyRoutineDrawerProps, useCoachCopyRoutineDrawerState, } from "@/features/role/coach/training-routine/components/shared/use-coach-copy-routine-drawer-state";
import { CoachCopyRoutineNotice, CoachCopyRoutineWeekPill } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-elements";
import { CoachCopyRoutineDrawerFooter } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-footer";
import { CoachCopyRoutineDrawerSourceControls } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-source-controls";
import { CoachCopyRoutineDrawerSummaryPanel } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-summary-panel";

export type CoachCopyRoutineDrawerInnerProps = CoachCopyRoutineDrawerProps;

export function CoachCopyRoutineDrawerInnerMobile( props: CoachCopyRoutineDrawerInnerProps ) {
	const {
		assignedDestByOrigin,
		cancelConfirm,
		confirmQuestion,
		copyMonth,
		copyWeeks,
		destChoicesForRow,
		destLabel,
		destinationAffectedLabel,
		destinationNotice,
		handlePrimaryPress,
		isConfirming,
		handleSourceMonthChange,
		handleSourceStudentChange,
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
		sourceStudentId,
		sourceWeeks,
		studentOptions,
		sourceYear,
		willReplace,
		yearOptions,
	} = useCoachCopyRoutineDrawerState( props );

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
							{ props.hasActiveRoutine ? (
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									Rutina activa
								</Chip>
							) : null }
						</div>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<div className={ "grid gap-3" }>
					<CoachCopyRoutineDrawerSourceControls
						handleSourceMonthChangeAction={ handleSourceMonthChange }
						handleSourceStudentChangeAction={ handleSourceStudentChange }
						sourceStudentId={ sourceStudentId }
						studentOptions={ studentOptions }
						handleSourceYearChangeAction={ handleSourceYearChange }
						mode={ mode }
						onModeChangeAction={ setMode }
						padMonthAction={ padMonth }
						sourceMonth={ sourceMonth }
						sourceYear={ sourceYear }
						yearOptions={ yearOptions }
						monthOptions={ MONTH_OPTIONS }
					/>
				</div>

				{ mode === "month" && sameMonth ? <CoachCopyRoutineNotice>No podés copiar desde el mismo mes destino.</CoachCopyRoutineNotice> : null }
				{ destinationNotice ? <CoachCopyRoutineNotice>{ destinationNotice }</CoachCopyRoutineNotice> : null }

				{ sourceQuery.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al consultar origen</Alert.Title>
							<Alert.Description>{ sourceQuery.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ sourceQuery.isLoading ? (
					<Surface className={ "flex min-h-36 items-center justify-center rounded-xl border border-default-hover" }>
						<Spinner size={ "lg" }/>
					</Surface>
				) : source && !source.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<EmptyState className={ "flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-hover px-4 text-center" }>
						<Typography className={ "text-sm font-medium" }>No hay rutina en este origen.</Typography>
						<Description className={ "text-sm" }>Probá con otro mes u otro estudiante.</Description>
					</EmptyState>
				) : source?.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<div className={ "grid gap-3" }>
						{ mode === "month" ? (
							<Surface className={ "rounded-xl border border-default-hover bg-surface p-3" }>
								<div className={ "flex items-start justify-between gap-3" }>
									<div className={ "min-w-0" }>
										<Typography className={ "text-sm font-semibold" }>Rutina completa</Typography>
										<Description className={ "mt-1 block text-xs" }>
											Se copia de { sourceLabel } a { destLabel }.
										</Description>
										<Description className={ "mt-1 block text-xs" }>
											{ source.weekCount } semanas · { source.dayCount } días · { source.exerciseCount } ejercicios
										</Description>
									</div>
									<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
										Completa
									</Chip>
								</div>
								<div className={ "mt-3 flex flex-wrap gap-1.5" }>
									{ source.routineWeeks.map( ( routineWeek ) => (
										<CoachCopyRoutineWeekPill key={ routineWeek.id }>
											S{ routineWeek.week }
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
										{ sourceWeeks.map( ( routineWeek ) => (
											<CheckboxButtonGroup.Item key={ routineWeek.week } className={ "min-h-16 gap-2 px-3 py-2" } value={ String( routineWeek.week ) }>
												<CheckboxButtonGroup.Indicator/>
												<CheckboxButtonGroup.ItemContent>
													<Label className={ "text-sm" }>Semana { routineWeek.week }</Label>
													<Description className={ "line-clamp-1 text-xs" }>
														{ routineWeek.dayCount } días / { routineWeek.exerciseCount } ejercicios
													</Description>
												</CheckboxButtonGroup.ItemContent>
											</CheckboxButtonGroup.Item>
										) ) }
									</CheckboxButtonGroup>
								</div>

								<Separator/>

								{ selectedSorted.length === 0 ? (
									<Surface className={ "rounded-xl border border-default-hover px-4 py-5 text-center" }>
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
											className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
											layout={ "grid" }
											value={ singleDestWeeks }
											variant={ "secondary" }
											onChange={ ( value ) => setSingleDestWeeks( value as string[] ) }
										>
											{ [ "1", "2", "3", "4" ].map( ( week ) => (
												<CheckboxButtonGroup.Item key={ week } className={ "min-h-12 gap-2 px-3 py-2" } value={ week }>
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
										<div className={ "grid gap-3" }>
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
														onChange={ ( key ) => setMultiDestByOrigin( ( current ) => ( { ...current, [ origin ]: key as string } ) ) }
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
									</div>
								) }
							</>
						) }

						{ /* En mes completo la tarjeta de arriba ya dice todo; el resumen repetia los mismos numeros. */ }
						{ mode === "weeks" ? (
							<CoachCopyRoutineDrawerSummaryPanel
								destLabel={ destLabel }
								destinationAffectedLabel={ destinationAffectedLabel }
								mode={ mode }
								selectedSourceRoutineStats={ selectedSourceRoutineStats }
								selectedSourceWeeksLabel={ selectedSourceWeeksLabel }
								sourceLabel={ sourceLabel }
							/>
						) : null }
					</div>
				) : null }
			</Drawer.Body>

			<CoachCopyRoutineDrawerFooter
				confirmQuestion={ confirmQuestion }
				isConfirming={ isConfirming }
				isPending={ copyMonth.isPending || copyWeeks.isPending }
				primaryDisabled={ primaryDisabled }
				primaryLabel={ primaryLabel }
				willReplace={ willReplace }
				onCancelConfirmAction={ cancelConfirm }
				onPrimaryAction={ handlePrimaryPress }
			/>
		</>
	);
}
