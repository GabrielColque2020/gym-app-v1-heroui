"use client";

import React, { useEffect, useMemo, useState } from "react";
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
	Typography,
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
		<div className={ "grid grid-cols-2 gap-2" }>
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
			<Typography className={ "text-sm leading-5" }>{ children }</Typography>
		</Surface>
	);
}

export function AdminCopyRoutineSheetInnerMobile( {
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
	/** Demo: Abril suele ser el origen natural cuando el destino es Mayo. */
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

		const selectedSet = new Set( selectedSorted );
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

		for (const key of Object.keys( next )) {
			if (!selectedSet.has( key )) delete next[ key ];
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
		? "Copiar rutina"
		: caseSingle
			? "Copiar semana"
			: "Copiar semanas";

	return (
		<>
			<Sheet.CloseTrigger className={ "absolute inset-e-3 top-3 z-10" }/>
			<Sheet.Header className={ "border-default-100 relative border-b px-4 pb-3 pt-3" }>
				<div className={ "flex min-w-0 items-center gap-3 pe-8" }>
					<div className={ "flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Copy className={ "size-4" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Sheet.Heading className={ "truncate text-base" }>Copiar rutina</Sheet.Heading>
						<div className={ "mt-1 flex min-w-0 items-center gap-2" }>
							<Typography className={ "truncate text-sm font-medium" }>{ destLabel }</Typography>
							{ hasActiveRoutine && (
								<Chip className={ "shrink-0" } color={ "accent" } size={ "sm" } variant={ "soft" }>
									Activa
								</Chip>
							) }
						</div>
					</div>
				</div>
			</Sheet.Header>

			<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-3" }>
				<Segment
					aria-label={ "Modo de copia" }
					className={ "w-full" }
					selectedKey={ tab }
					size={ "sm" }
					onSelectionChange={ ( key ) => setTab( String( key ) ) }
				>
					<Segment.Item className={ "flex-1" } id={ "month" }>
						Mes completo
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

				{ sameMonth && sourceKey && (
					<Notice tone={ "warning" }>No podes copiar desde el mismo mes destino.</Notice>
				) }

				{ sourceWeeksCount === null && sourceKey && !sameMonth && (
					<EmptyState className={ "flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default-hover px-4 text-center" }>
						<Typography className={ "text-sm font-medium" }>No hay rutina en este origen.</Typography>
						<Description className={ "text-sm" }>Proba con otro mes.</Description>
					</EmptyState>
				) }

				{ sourceWeeksCount != null && !sameMonth && (
					<ScrollShadow className={ "min-h-0 flex-1" }>
						<div className={ "grid gap-3 pb-3" }>
							{ tab === "month" && (
								<>
									<Notice tone={ "success" }>
										Se copiaran { sourceWeeksCount } semana{ sourceWeeksCount === 1 ? "" : "s" } de { sourceLabel } en { destLabel }.
									</Notice>

									<div className={ "grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-default-hover bg-surface px-3 py-3" }>
										<div className={ "grid grid-cols-2 gap-1" }>
											{ Array.from( { length: sourceWeeksCount }, ( _, i ) => (
												<span key={ `origin-${ i }` } className={ "rounded-lg bg-default px-2 py-1 text-center text-xs font-semibold" }>
													S{ i + 1 }
												</span>
											) ) }
										</div>
										<span className={ "text-muted text-sm" } aria-hidden>
											-
										</span>
										<div className={ "grid grid-cols-2 gap-1" }>
											{ Array.from( { length: 4 }, ( _, i ) => (
												<span key={ `dest-${ i }` } className={ "rounded-lg bg-default px-2 py-1 text-center text-xs font-semibold" }>
													S{ i + 1 }
												</span>
											) ) }
										</div>
									</div>

									<div className={ "mb-4" }>

										<Notice tone={ "accent" }>
											El destino puede reemplazar ejercicios ya cargados.
										</Notice>
									</div>
								</>
							) }

							{ tab === "weeks" && originWeekSlots && (
								<>
									<div className={ "grid gap-2 px-1" }>
										<Label className={ "text-sm font-semibold" }>Semanas de origen</Label>
										<CheckboxButtonGroup
											className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
											layout={ "grid" }
											value={ selectedSourceWeeks }
											variant={ "secondary" }
											onChange={ ( v ) => setSelectedSourceWeeks( v as string[] ) }
										>
											{ originWeekSlots.slice( 0, sourceWeeksCount ).map( ( w ) => (
												<CheckboxButtonGroup.Item key={ w.slot } className={ "gap-2 px-3 py-2.5" } value={ String( w.slot ) }>
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
										<Surface className={ "rounded-xl border border-default-hover px-4 py-5 text-center" }>
											<Description className={ "text-sm" }>Selecciona al menos una semana.</Description>
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
												className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem]" }
												layout={ "grid" }
												value={ singleDestWeeks }
												variant={ "secondary" }
												onChange={ ( v ) => setSingleDestWeeks( v as string[] ) }
											>
												{ destWeeks.map( ( w ) => (
													<CheckboxButtonGroup.Item key={ w.slot } className={ "gap-2 px-3 py-2.5" } value={ String( w.slot ) }>
														<CheckboxButtonGroup.Indicator/>
														<CheckboxButtonGroup.ItemContent>
															<Label className={ "text-sm" }>Semana { w.slot }</Label>
															<Description className={ "text-xs" }>{ w.rangeLabel }</Description>
														</CheckboxButtonGroup.ItemContent>
													</CheckboxButtonGroup.Item>
												) ) }
											</CheckboxButtonGroup>

											{ singleDestWeeks.length > 0 && (
												<Notice tone={ "accent" }>
													S{ selectedSorted[ 0 ] } se copiara
													en { singleDestWeeks.sort( ( a, b ) => Number( a ) - Number( b ) ).map( ( s ) => `S${ s }` ).join( ", " ) }.
												</Notice>
											) }
										</div>
									) }

									{ caseMulti && destWeeks && (
										<div className={ "grid gap-2" }>
											<Label className={ "text-sm font-semibold" }>Asignar destino</Label>
											<div className={ "grid gap-2" }>
												{ selectedSorted.map( ( orig ) => {
													const allowed = destChoicesForRow( orig );

													return (
														<Surface key={ orig }
														         className={ "" }>
															<div className={ "ml-2 pb-2" }>
																<Typography className={ "text-sm font-medium" }>S{ orig } </Typography>
																<Description className={ "text-xs" }>Origen</Description>
															</div>
															<Select
																placeholder={ "Destino" }
																value={ assignedDestByOrigin[ orig ] ?? "" }
																variant={ "secondary" }
																onChange={ ( k ) =>
																	setMultiDestByOrigin( ( prev ) => ( { ...prev, [ orig ]: k as string } ) )
																}
															>
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

									{ !caseNone && (
										<div className={ "mb-4" }>
											<Notice tone={ "warning" }>
												Las semanas destino seleccionadas seran reemplazadas.
											</Notice>
										</div>
									) }
								</>
							) }
						</div>
					</ScrollShadow>
				) }
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 bg-background grid shrink-0 grid-cols-2 gap-2 border-t px-4 py-3" }>
				<Sheet.Close>
					<Button className={ "w-full" } variant={ "secondary" }>
						Cancelar
					</Button>
				</Sheet.Close>
				<Button
					className={ "w-full" }
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
