"use client";

import type React from "react";

import { CheckboxButtonGroup, Segment, Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Chip,
	Description,
	EmptyState,
	Label,
	ListBox,
	Select,
	Separator,
	Spinner,
	Surface,
	Typography,
} from "@heroui/react";
import { Calendar, Copy, Layers } from "@gravity-ui/icons";

import { MONTH_OPTIONS } from "@/features/role/admin/training-routine/components/shared/adminCopyRoutineConstants";
import {
	type AdminCopyRoutineSheetProps,
	useAdminCopyRoutineSheetState,
} from "@/features/role/admin/training-routine/components/shared/useAdminCopyRoutineSheetState";

export type AdminCopyRoutineSheetInnerProps = AdminCopyRoutineSheetProps;

function Notice( { children }: { children: React.ReactNode } ) {
	return (
		<Surface className={ "rounded-xl border border-warning-soft bg-warning-soft/60 px-3 py-2" }>
			<Typography className={ "text-sm leading-5" }>{ children }</Typography>
		</Surface>
	);
}

function SummaryRow( { label, value }: { label: string; value: React.ReactNode } ) {
	return (
		<div className={ "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3" }>
			<Typography className={ "min-w-0 whitespace-normal break-words text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "min-w-0 whitespace-normal break-words text-right text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}

function WeekPill( { children }: { children: React.ReactNode } ) {
	return (
		<span className={ "rounded-lg bg-default px-2.5 py-1 text-center text-xs font-semibold" }>
			{ children }
		</span>
	);
}

export function AdminCopyRoutineSheetInnerMobile( props: AdminCopyRoutineSheetInnerProps ) {
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
	} = useAdminCopyRoutineSheetState( props );

	return (
		<>
			<Sheet.Header className={ "border-default-100 relative border-b px-4 pb-3 pt-3" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Copy className={ "size-4" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Sheet.Heading>Copiar rutina</Sheet.Heading>
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
			</Sheet.Header>

			<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-24 pt-3" }>
				<div className={ "grid gap-3" }>
					<div className={ "grid gap-1.5" }>
						<Label className={ "text-xs font-semibold uppercase text-muted" }>Modo de copia</Label>
						<Segment
							aria-label={ "Modo de copia" }
							className={ "w-full" }
							selectedKey={ mode }
							size={ "sm" }
							onSelectionChange={ ( key ) => setMode( String( key ) === "weeks" ? "weeks" : "month" ) }
						>
							<Segment.Item className={ "flex-1" } id={ "month" }>
								{ ( { isSelected } ) => (
									<span className={ `flex items-center justify-center gap-1.5 ${ isSelected ? "font-semibold text-accent" : "text-muted" }` }>
										<Calendar className={ "size-3.5" }/>
										Mes
									</span>
								) }
							</Segment.Item>
							<Segment.Item className={ "flex-1" } id={ "weeks" }>
								{ ( { isSelected } ) => (
									<span className={ `flex items-center justify-center gap-1.5 ${ isSelected ? "font-semibold text-accent" : "text-muted" }` }>
										<Layers className={ "size-3.5" }/>
										Semanas
									</span>
								) }
							</Segment.Item>
						</Segment>
					</div>

					<div className={ "grid grid-cols-2 gap-3" }>
						<Select value={ sourceYear } variant={ "secondary" } onChange={ ( key ) => handleSourceYearChange( key as string ) }>
							<Label>Anio origen</Label>
							<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
								<Select.Value/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									{ yearOptions.map( ( year ) => (
										<ListBox.Item key={ year.value } id={ year.value } textValue={ year.label }>
											{ year.label }
											<ListBox.ItemIndicator/>
										</ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>

						<Select value={ padMonth( sourceMonth ) } variant={ "secondary" } onChange={ ( key ) => handleSourceMonthChange( key as string ) }>
							<Label>Mes origen</Label>
							<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
								<Select.Value/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									{ MONTH_OPTIONS.map( ( month ) => (
										<ListBox.Item key={ month.value } id={ month.value } textValue={ month.label }>
											{ month.label }
											<ListBox.ItemIndicator/>
										</ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>
					</div>
				</div>

				{ mode === "month" && sameMonth ? <Notice>No podes copiar desde el mismo mes destino.</Notice> : null }
				{ props.hasActiveRoutine ? (
					<Notice>
						{ destLabel } ya tiene una rutina configurada. La copia puede reemplazar contenido existente.
					</Notice>
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
					<Surface className={ "flex min-h-36 items-center justify-center rounded-xl border border-default-hover" }>
						<Spinner size={ "lg" }/>
					</Surface>
				) : source && !source.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<EmptyState className={ "flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-hover px-4 text-center" }>
						<Typography className={ "text-sm font-medium" }>No hay rutina en este origen.</Typography>
						<Description className={ "text-sm" }>Proba con otro mes para continuar.</Description>
					</EmptyState>
				) : source?.hasRoutine && !( mode === "month" && sameMonth ) ? (
					<div className={ "grid gap-3" }>
						{ mode === "month" ? (
							<Surface className={ "rounded-xl border border-default-hover bg-surface p-3" }>
								<div className={ "flex items-start justify-between gap-3" }>
									<div className={ "min-w-0" }>
										<Typography className={ "text-sm font-semibold" }>Rutina completa</Typography>
										<Description className={ "mt-1 line-clamp-1 text-xs" }>
											Se copiara la rutina completa de { sourceLabel }.
										</Description>
										<Description className={ "mt-1 text-xs" }>
											{ source.weekCount } semanas · { source.dayCount } dias · { source.exerciseCount } ejercicios
										</Description>
									</div>
									<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
										Completa
									</Chip>
								</div>
								<div className={ "mt-3 flex flex-wrap gap-1.5" }>
									{ source.routines.map( ( routine ) => (
										<WeekPill key={ routine.id }>S{ routine.week }</WeekPill>
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
											<CheckboxButtonGroup.Item key={ routine.week } className={ "min-h-16 gap-2 px-3 py-2" } value={ String( routine.week ) }>
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
									<Surface className={ "rounded-xl border border-default-hover px-4 py-5 text-center" }>
										<Description className={ "text-sm" }>Selecciona al menos una semana para ver los destinos.</Description>
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
										<Surface className={ "rounded-xl border border-success-soft bg-success-soft/50 px-3 py-2" }>
											<Typography className={ "text-sm leading-5" }>{ singleWeekPreview }</Typography>
										</Surface>
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
										<Notice>Las semanas destino seran reemplazadas con el contenido seleccionado.</Notice>
									</div>
								) }
							</>
						) }

						<Surface className={ "min-w-0 rounded-xl border border-default-hover bg-surface p-4" }>
							<div className={ "grid gap-1" }>
								<Typography className={ "text-sm font-semibold" }>Resumen</Typography>
								<Description className={ "min-w-0 truncate text-sm" }>{ sourceLabel } a { destLabel }</Description>
							</div>
							<Separator className={ "my-3" }/>
							<div className={ "grid gap-4" }>
								<SummaryRow label={ "Modo" } value={ mode === "month" ? "Mes completo" : "Semanas" }/>
								<SummaryRow label={ "Mes origen" } value={ sourceLabel }/>
								<SummaryRow label={ "Semanas origen" } value={ selectedSourceWeeksLabel }/>
								<SummaryRow label={ "Dias origen" } value={ selectedSourceRoutineStats.dayCount || "-" }/>
								<SummaryRow label={ "Ejercicios" } value={ selectedSourceRoutineStats.exerciseCount || "-" }/>
								<SummaryRow label={ "Destinos afectados" } value={ destinationAffectedLabel }/>
							</div>
						</Surface>
					</div>
				) : null }
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-4 py-3" }>
				<Sheet.Close>
					<Button className={ "flex-1" } isDisabled={ copyMonth.isPending || copyWeeks.isPending } variant={ "secondary" }>
						Cancelar
					</Button>
				</Sheet.Close>
				<Button
					className={ "min-w-0 flex-1" }
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
			</Sheet.Footer>
		</>
	);
}
