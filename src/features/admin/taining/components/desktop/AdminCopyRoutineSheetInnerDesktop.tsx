"use client";

import React, { useMemo, useState } from "react";
import { CheckboxButtonGroup, Segment, Sheet } from "@heroui-pro/react";
import {
	Button,
	Chip,
	Description,
	EmptyState,
	Label,
	ListBox,
	ScrollShadow,
	Select,
	Separator,
	Surface,
	Text,
} from "@heroui/react";
import { Copy } from "@gravity-ui/icons";
import {
	buildWeekSlots,
	DEMO_ROUTINE_WEEKS_BY_MONTH,
	demoDaysForWeek,
	monthYearLabel,
	MONTH_OPTIONS,
	padMonth,
	ymKey,
} from "../shared/adminCopyRoutineConstants";

export type AdminCopyRoutineSheetInnerProps = {
	destinationYear: string;
	destinationMonth: string;
	/** Si el mes destino tiene rutina (badge en tarjeta). */
	hasActiveRoutine?: boolean;
	/** Semanas ocupadas en destino (1-4). El resto son vacantes para fusionar. */
	destinationWeeksOccupied?: number;
};

function buildYearOptions() {
	const currentYear = new Date().getFullYear();

	return Array.from( { length: 8 }, ( _, i ) => ( {
		value: ( currentYear - 3 + i ).toString(),
		label: ( currentYear - 3 + i ).toString(),
	} ) );
}

function getDemoSourceWeeks( key: string ) {
	if (!key) return null;
	const n = DEMO_ROUTINE_WEEKS_BY_MONTH[ key ];

	return n === undefined ? null : n;
}

type OriginPickerProps = {
	yearOptions: ReturnType<typeof buildYearOptions>;
	sourceMonth: string;
	sourceYear: string;
	onMonthChange: ( value: string ) => void;
	onYearChange: ( value: string ) => void;
};

function OriginPicker( {
						   yearOptions,
						   sourceMonth,
						   sourceYear,
						   onMonthChange,
						   onYearChange,
					   }: OriginPickerProps ) {
	return (
		<div className={ "grid grid-cols-2 gap-3" }>
			<Select
				className={ "min-w-0" }
				placeholder={ "Anio" }
				value={ sourceYear }
				variant={ "secondary" }
				onChange={ ( k ) => onYearChange( k as string ) }
			>
				<Label>Anio origen</Label>
				<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{ yearOptions.map( ( y ) => (
							<ListBox.Item key={ y.value } id={ y.value } textValue={ y.label }>
								{ y.label }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>

			<Select
				className={ "min-w-0" }
				placeholder={ "Mes" }
				value={ padMonth( sourceMonth ) }
				variant={ "secondary" }
				onChange={ ( k ) => onMonthChange( k as string ) }
			>
				<Label>Mes origen</Label>
				<Select.Trigger className={ "h-10 rounded-xl shadow-sm" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{ MONTH_OPTIONS.map( ( m ) => (
							<ListBox.Item key={ m.value } id={ m.value } textValue={ m.label }>
								{ m.label }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>
		</div>
	);
}

type NoticeProps = {
	tone: "accent" | "success" | "warning";
	children: React.ReactNode;
};

function Notice( { tone, children }: NoticeProps ) {
	const toneClass = {
		accent: "border-accent-soft bg-accent-soft/40",
		success: "border-success-soft bg-success-soft/50",
		warning: "border-warning-soft bg-warning-soft/60",
	}[ tone ];

	return (
		<Surface className={ `${ toneClass } rounded-xl border px-3 py-2.5` }>
			<Text className={ "text-sm leading-5" }>{ children }</Text>
		</Surface>
	);
}

function WeekPill( { children }: { children: React.ReactNode } ) {
	return (
		<span className={ "rounded-lg bg-default px-2.5 py-1 text-center text-xs font-semibold" }>
			{ children }
		</span>
	);
}

export function AdminCopyRoutineSheetInnerDesktop( {
													   destinationYear,
													   destinationMonth,
													   hasActiveRoutine = true,
												   }: AdminCopyRoutineSheetInnerProps ) {
	const yearOptions = useMemo( () => buildYearOptions(), [] );
	const destKey = ymKey( destinationYear, destinationMonth );
	const destLabel = monthYearLabel( destinationMonth, destinationYear );
	const destWeeks = buildWeekSlots( destinationYear, destinationMonth );

	const [ tab, setTab ] = useState( "month" );
	const [ sourceYear, setSourceYear ] = useState( destinationYear || "2026" );
	const [ sourceMonth, setSourceMonth ] = useState( () =>
		padMonth( destinationMonth ) === "05" && destinationYear ? "04" : padMonth( destinationMonth ) || "04",
	);

	const [ selectedSourceWeeks, setSelectedSourceWeeks ] = useState<string[]>( [] );
	const [ singleDestWeeks, setSingleDestWeeks ] = useState<string[]>( [] );
	const [ multiDestByOrigin, setMultiDestByOrigin ] = useState<Record<string, string>>( {} );

	const sourceKey = ymKey( sourceYear, sourceMonth );
	const sourceLabel = monthYearLabel( sourceMonth, sourceYear );
	const sourceWeeksCount = sourceKey ? getDemoSourceWeeks( sourceKey ) : null;
	const originWeekSlots = buildWeekSlots( sourceYear, sourceMonth );
	const sameMonth = Boolean( destKey && sourceKey && destKey === sourceKey );

	const selectedSorted = useMemo(
		() => [ ...selectedSourceWeeks ].sort( ( a, b ) => Number( a ) - Number( b ) ),
		[ selectedSourceWeeks ],
	);

	const caseSingle = selectedSorted.length === 1;
	const caseMulti = selectedSorted.length > 1 && selectedSorted.length < 4;
	const caseAllFour = selectedSorted.length === 4;
	const caseNone = selectedSorted.length === 0;

	const assignedDestByOrigin = useMemo( () => {
		if (selectedSorted.length < 2 || selectedSorted.length >= 4) return {};

		const used = new Set<string>();
		const next: Record<string, string> = {};

		for (const origin of selectedSorted) {
			const stored = multiDestByOrigin[ origin ];

			if (stored && !used.has( stored )) {
				next[ origin ] = stored;
				used.add( stored );
				continue;
			}

			if (!used.has( origin )) {
				next[ origin ] = origin;
				used.add( origin );
				continue;
			}

			const fallback = [ "1", "2", "3", "4" ].find( ( slot ) => !used.has( slot ) );

			if (fallback) {
				next[ origin ] = fallback;
				used.add( fallback );
			}
		}

		return next;
	}, [ multiDestByOrigin, selectedSorted ] );

	function clearWeekSelection() {
		setSelectedSourceWeeks( [] );
		setSingleDestWeeks( [] );
		setMultiDestByOrigin( {} );
	}

	function handleSourceYearChange( value: string ) {
		setSourceYear( value );
		clearWeekSelection();
	}

	function handleSourceMonthChange( value: string ) {
		setSourceMonth( value );
		clearWeekSelection();
	}

	function destChoicesForRow( originSlot: string ) {
		const others = new Set(
			Object.entries( assignedDestByOrigin )
				.filter( ( [ k ] ) => k !== originSlot )
				.map( ( [ , v ] ) => v ),
		);

		return [ "1", "2", "3", "4" ].filter( ( s ) => !others.has( s ) || assignedDestByOrigin[ originSlot ] === s );
	}

	const monthPrimaryDisabled =
		!destKey ||
		!sourceKey ||
		sameMonth ||
		sourceWeeksCount === null;

	const weeksPrimaryDisabled =
		!destKey ||
		!sourceKey ||
		sameMonth ||
		sourceWeeksCount === null ||
		caseNone ||
		( caseSingle && singleDestWeeks.length === 0 ) ||
		( caseMulti && selectedSorted.some( ( s ) => !assignedDestByOrigin[ s ] ) );

	const primaryDisabled = tab === "month" ? monthPrimaryDisabled : weeksPrimaryDisabled;
	const primaryLabel = tab === "month"
		? "Copiar rutina completa"
		: caseSingle
			? "Copiar semana seleccionada"
			: "Copiar semanas asignadas";

	return (
		<>
			<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
			<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Copy className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Sheet.Heading>Copiar rutina</Sheet.Heading>
						<div className={ "mt-1 flex min-w-0 flex-wrap items-center gap-2" }>
							<Text className={ "text-sm text-muted" }>Destino</Text>
							<Text className={ "text-sm font-semibold" }>{ destLabel }</Text>
							{ hasActiveRoutine && (
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									Rutina activa
								</Chip>
							) }
						</div>
					</div>
				</div>
			</Sheet.Header>

			<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-6 py-5" }>
				<div className={ "grid grid-cols-[240px_1fr] gap-4" }>
					<Segment
						aria-label={ "Modo de copia" }
						className={ "w-full" }
						selectedKey={ tab }
						onSelectionChange={ ( key: any ) => setTab( String( key ) ) }
					>
						<Segment.Item className={ "flex-1" } id={ "month" }>
							Mes
						</Segment.Item>
						<Segment.Item className={ "flex-1" } id={ "weeks" }>
							Semanas
						</Segment.Item>
					</Segment>

					<OriginPicker
						sourceMonth={ sourceMonth }
						sourceYear={ sourceYear }
						yearOptions={ yearOptions }
						onMonthChange={ handleSourceMonthChange }
						onYearChange={ handleSourceYearChange }
					/>
				</div>

				{ sameMonth && sourceKey && (
					<Notice tone={ "warning" }>No podes copiar desde el mismo mes destino.</Notice>
				) }

				{ sourceWeeksCount === null && sourceKey && !sameMonth && (
					<EmptyState className={ "flex min-h-72 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-hover px-4 text-center" }>
						<Text className={ "text-sm font-medium" }>No hay rutina en este origen.</Text>
						<Description className={ "text-sm" }>Proba con otro mes para continuar.</Description>
					</EmptyState>
				) }

				{ sourceWeeksCount != null && !sameMonth && (
					<div className={ "grid min-h-0 flex-1 grid-cols-[1fr_260px] gap-4" }>
						<ScrollShadow className={ "min-h-0" }>
							<div className={ "grid gap-4 pb-2" }>
								{ tab === "month" && (
									<>
										<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
											<div className={ "mb-4 flex items-start justify-between gap-4" }>
												<div>
													<Text className={ "text-sm font-semibold" }>Rutina completa</Text>
													<Description className={ "mt-1 text-sm" }>
														Copia todas las semanas disponibles del mes origen.
													</Description>
												</div>
												<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
													{ sourceWeeksCount } semana{ sourceWeeksCount === 1 ? "" : "s" }
												</Chip>
											</div>

											<div className={ "grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl bg-default/50 p-3" }>
												<div className={ "grid grid-cols-2 gap-2" }>
													{ Array.from( { length: sourceWeeksCount }, ( _, i ) => (
														<WeekPill key={ `origin-${ i }` }>S{ i + 1 }</WeekPill>
													) ) }
												</div>
												<span className={ "text-muted text-sm" } aria-hidden>
													a
												</span>
												<div className={ "grid grid-cols-2 gap-2" }>
													{ Array.from( { length: 4 }, ( _, i ) => (
														<WeekPill key={ `dest-${ i }` }>S{ i + 1 }</WeekPill>
													) ) }
												</div>
											</div>
										</Surface>

										<Notice tone={ "success" }>
											Se copiaran { sourceWeeksCount } semana{ sourceWeeksCount === 1 ? "" : "s" } de { sourceLabel } en { destLabel }.
										</Notice>
									</>
								) }

								{ tab === "weeks" && originWeekSlots && (
									<>
										<div className={ "grid gap-2" }>
											<Label className={ "text-sm font-semibold" }>Semanas de origen</Label>
											<CheckboxButtonGroup
												className={ "grid-cols-4 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
												layout={ "grid" }
												value={ selectedSourceWeeks }
												variant={ "secondary" }
												onChange={ ( v: string[] ) => setSelectedSourceWeeks( v as string[] ) }
											>
												{ originWeekSlots.slice( 0, sourceWeeksCount ).map( ( w ) => (
													<CheckboxButtonGroup.Item key={ w.slot } className={ "gap-2 px-3 py-3" } value={ String( w.slot ) }>
														<CheckboxButtonGroup.Indicator/>
														<CheckboxButtonGroup.ItemContent>
															<Label className={ "text-sm" }>Semana { w.slot }</Label>
															<Description className={ "text-xs" }>
																{ demoDaysForWeek( sourceKey, w.slot ) } dias
															</Description>
														</CheckboxButtonGroup.ItemContent>
													</CheckboxButtonGroup.Item>
												) ) }
											</CheckboxButtonGroup>
										</div>

										<Separator/>

										{ caseNone && (
											<Surface className={ "rounded-xl border border-default-hover px-4 py-8 text-center" }>
												<Description className={ "text-sm" }>Selecciona al menos una semana para ver los destinos.</Description>
											</Surface>
										) }

										{ caseAllFour && (
											<Notice tone={ "success" }>
												Se reemplazaran las 4 semanas con mapeo automatico S1 a S4.
											</Notice>
										) }

										{ caseSingle && destWeeks && (
											<div className={ "grid gap-2" }>
												<Label className={ "text-sm font-semibold" }>Copiar en</Label>
												<CheckboxButtonGroup
													className={ "grid-cols-4 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
													layout={ "grid" }
													value={ singleDestWeeks }
													variant={ "secondary" }
													onChange={ ( v: string[] ) => setSingleDestWeeks( v as string[] ) }
												>
													{ destWeeks.map( ( w ) => (
														<CheckboxButtonGroup.Item key={ w.slot } className={ "gap-2 px-3 py-3" } value={ String( w.slot ) }>
															<CheckboxButtonGroup.Indicator/>
															<CheckboxButtonGroup.ItemContent>
																<Label className={ "text-sm" }>Semana { w.slot }</Label>
																<Description className={ "text-xs" }>{ w.rangeLabel }</Description>
															</CheckboxButtonGroup.ItemContent>
														</CheckboxButtonGroup.Item>
													) ) }
												</CheckboxButtonGroup>
											</div>
										) }

										{ caseMulti && destWeeks && (
											<div className={ "grid gap-2" }>
												<Label className={ "text-sm font-semibold" }>Asignar destino</Label>
												<div className={ "grid grid-cols-2 gap-3" }>
													{ selectedSorted.map( ( orig ) => {
														const allowed = destChoicesForRow( orig );

														return (
															<Surface key={ orig } className={ "rounded-xl border border-default-hover bg-surface p-3" }>
																<div className={ "mb-2 flex items-center justify-between gap-3" }>
																	<div>
																		<Text className={ "text-sm font-medium" }>Semana { orig }</Text>
																		<Description className={ "text-xs" }>Origen</Description>
																	</div>
																	<WeekPill>S{ orig }</WeekPill>
																</div>
																<Select
																	placeholder={ "Destino" }
																	value={ assignedDestByOrigin[ orig ] ?? "" }
																	variant={ "secondary" }
																	onChange={ ( k ) =>
																		setMultiDestByOrigin( ( prev ) => ( { ...prev, [ orig ]: k as string } ) )
																	}
																>
																	<Label className={ "sr-only" }>Destino para semana { orig }</Label>
																	<Select.Trigger className={ "h-10 rounded-xl" }>
																		<Select.Value/>
																		<Select.Indicator/>
																	</Select.Trigger>
																	<Select.Popover>
																		<ListBox>
																			{ allowed.map( ( id ) => {
																				const dw = destWeeks.find( ( w ) => String( w.slot ) === id );

																				return (
																					<ListBox.Item key={ id } id={ id } textValue={ `Semana ${ id }` }>
																						Semana { id }{ dw ? ` (${ dw.rangeLabel })` : "" }
																						<ListBox.ItemIndicator/>
																					</ListBox.Item>
																				);
																			} ) }
																		</ListBox>
																	</Select.Popover>
																</Select>
															</Surface>
														);
													} ) }
												</div>
											</div>
										) }
									</>
								) }
							</div>
						</ScrollShadow>

						<Surface className={ "flex min-h-0 flex-col gap-3 rounded-xl border border-default-hover bg-surface p-4" }>
							<div>
								<Text className={ "text-sm font-semibold" }>Resumen</Text>
								<Description className={ "mt-1 text-xs" }>{ sourceLabel } a { destLabel }</Description>
							</div>

							<Separator/>

							<div className={ "grid gap-2 text-sm" }>
								<div className={ "flex items-center justify-between gap-3" }>
									<Text className={ "text-muted text-sm" }>Modo</Text>
									<Text className={ "text-sm font-medium" }>{ tab === "month" ? "Mes completo" : "Semanas" }</Text>
								</div>
								<div className={ "flex items-center justify-between gap-3" }>
									<Text className={ "text-muted text-sm" }>Origen</Text>
									<Text className={ "text-sm font-medium" }>{ sourceWeeksCount } semana{ sourceWeeksCount === 1 ? "" : "s" }</Text>
								</div>
								{ tab === "weeks" && (
									<div className={ "flex items-center justify-between gap-3" }>
										<Text className={ "text-muted text-sm" }>Seleccionadas</Text>
										<Text className={ "text-sm font-medium" }>{ selectedSorted.length || "-" }</Text>
									</div>
								) }
							</div>

							{ tab === "weeks" && selectedSorted.length > 0 && (
								<div className={ "flex flex-wrap gap-1.5" }>
									{ selectedSorted.map( ( slot ) => (
										<WeekPill key={ slot }>S{ slot }</WeekPill>
									) ) }
								</div>
							) }

							<div className={ "mt-auto" }>
								<Notice tone={ "warning" }>
									El destino puede reemplazar ejercicios ya cargados.
								</Notice>
							</div>
						</Surface>
					</div>
				) }
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Sheet.Close>
					<Button variant={ "secondary" }>
						Cancelar
					</Button>
				</Sheet.Close>
				<Button
					isDisabled={ primaryDisabled }
					onPress={ () => {
						// Integrar API: copiar mes completo o semanas.
					} }
				>
					{ primaryLabel }
				</Button>
			</Sheet.Footer>
		</>
	);
}
