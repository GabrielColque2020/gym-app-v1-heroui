"use client";

import { useState } from "react";
import { Button as AriaButton, Dialog, DialogTrigger, Popover } from "react-aria-components";

import { Button } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { MONTH_OPTIONS, monthYearLabel } from "@/constants/months";
import { routineMonthKey } from "@/features/training-routine/services/routine-month-key";

type MonthJumpPickerProps = {
	// De donde salen los meses que tienen rutina, para marcarlos con un punto.
	loadedMonthsQueryFn: () => Promise<string[]>;
	loadedMonthsQueryKey: readonly unknown[];
	month: number;
	// Renglon chico debajo del mes ("Rutina de Juan", "Tu rutina del mes").
	subtitle: string;
	year: number;
	onSelectAction: ( month: number, year: number ) => void;
};

// El titulo del mes, que ademas abre un selector para saltar a cualquier mes.
// Las flechas del encabezado sirven para el mes de al lado; para ir diez meses
// atras eran diez toques y diez cargas. Aca se elige el año y se toca el mes.
export function MonthJumpPicker( {
	loadedMonthsQueryFn,
	loadedMonthsQueryKey,
	month,
	onSelectAction,
	subtitle,
	year,
}: MonthJumpPickerProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	// El año que se esta mirando en el selector, que puede no ser el de la pantalla.
	const [ viewYear, setViewYear ] = useState( year );
	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();
	const isShowingCurrentMonth = month === currentMonth && year === currentYear;
	// Los meses con rutina se piden recien al abrir el selector, no al entrar a la
	// pantalla: quien solo usa las flechas no paga la consulta. Vienen todos los
	// años juntos, asi cambiar de año adentro del selector no vuelve a consultar.
	// Al reabrir se muestran los guardados y se refrescan por detras.
	const { data: loadedMonths } = useQuery( {
		enabled: isOpen,
		queryFn: loadedMonthsQueryFn,
		queryKey: loadedMonthsQueryKey,
		refetchOnWindowFocus: false,
		staleTime: 0,
	} );
	const loadedMonthSet = new Set( loadedMonths ?? [] );

	function handleOpenChange( nextIsOpen: boolean ) {
		// Siempre abre en el año que se esta viendo, no en el que quedo la vez anterior.
		if (nextIsOpen) setViewYear( year );

		setIsOpen( nextIsOpen );
	}

	function select( nextMonth: number, nextYear: number ) {
		setIsOpen( false );

		if (nextMonth !== month || nextYear !== year) onSelectAction( nextMonth, nextYear );
	}

	return (
		<DialogTrigger isOpen={ isOpen } onOpenChange={ handleOpenChange }>
			<AriaButton
				aria-label={ `${ monthYearLabel( String( month ), String( year ) ) }. Elegir otro mes` }
				className={ "min-w-0 flex-1 cursor-pointer rounded-xl px-2 py-1 text-center outline-none transition hover:bg-default/60 focus-visible:ring-2 focus-visible:ring-accent sm:min-w-36" }
			>
				<span className={ "flex items-center justify-center gap-1 whitespace-nowrap text-base font-black leading-tight text-foreground sm:text-xl" }>
					{ monthYearLabel( String( month ), String( year ) ) }
					<ChevronDown aria-hidden className={ `size-4 shrink-0 text-muted transition-transform ${ isOpen ? "rotate-180" : "" }` }/>
				</span>
				<span className={ "block truncate text-xs font-normal text-muted" }>{ subtitle }</span>
			</AriaButton>
			<Popover
				className={ "z-[60] w-72 max-w-[92vw] rounded-2xl border border-border bg-surface p-3 shadow-xl" }
				offset={ 8 }
				placement={ "bottom" }
			>
				<Dialog aria-label={ "Elegir mes" } className={ "space-y-3 outline-none" }>
					<div className={ "flex items-center justify-between gap-2" }>
						<Button isIconOnly aria-label={ "Año anterior" } size={ "sm" } variant={ "ghost" } onPress={ () => setViewYear( viewYear - 1 ) }>
							<ChevronLeft className={ "size-4" }/>
						</Button>
						<p aria-live={ "polite" } className={ "text-base font-black tabular-nums text-foreground" }>{ viewYear }</p>
						<Button isIconOnly aria-label={ "Año siguiente" } size={ "sm" } variant={ "ghost" } onPress={ () => setViewYear( viewYear + 1 ) }>
							<ChevronRight className={ "size-4" }/>
						</Button>
					</div>
					<div className={ "grid grid-cols-3 gap-1.5" }>
						{ MONTH_OPTIONS.map( ( option ) => {
							const optionMonth = Number( option.value );
							const isSelected = optionMonth === month && viewYear === year;
							const isCurrent = optionMonth === currentMonth && viewYear === currentYear;
							const isLoaded = loadedMonthSet.has( routineMonthKey( optionMonth, viewYear ) );

							return (
								<Button
									key={ option.value }
									aria-label={ `${ option.label } ${ viewYear }${ isCurrent ? ", mes actual" : "" }${ isLoaded ? ", con rutina" : "" }` }
									aria-pressed={ isSelected }
									// El mes actual queda marcado con un borde aunque se este viendo otro.
									className={ `relative h-10 w-full min-w-0 px-1 ${ isCurrent && !isSelected ? "border border-accent text-accent" : "" }` }
									size={ "sm" }
									variant={ isSelected ? "primary" : "ghost" }
									onPress={ () => select( optionMonth, viewYear ) }
								>
									{ option.label.slice( 0, 3 ) }
									{ isLoaded ? (
										<span
											aria-hidden
											className={ `absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full ${ isSelected ? "bg-accent-foreground" : "bg-accent" }` }
										/>
									) : null }
								</Button>
							);
						} ) }
					</div>
					<p className={ "flex items-center justify-center gap-1.5 text-xs text-muted" }>
						<span aria-hidden className={ "size-1.5 rounded-full bg-accent" }/>
						Mes con rutina cargada
					</p>
					{ isShowingCurrentMonth ? null : (
						<Button fullWidth size={ "sm" } variant={ "secondary" } onPress={ () => select( currentMonth, currentYear ) }>
							Volver al mes actual
						</Button>
					) }
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
}
