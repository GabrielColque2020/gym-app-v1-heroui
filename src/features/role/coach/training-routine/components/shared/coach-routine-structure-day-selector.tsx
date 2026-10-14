"use client";

import { Description, Label } from "@heroui/react";
import { CheckboxButtonGroup } from "@heroui-pro/react";

type Option = {
	label: string;
	value: string;
};

type CoachRoutineStructureDaySelectorProps = {
	onChangeAction: ( value: string[] ) => void;
	selectedDays: string[];
	dayOptions: Option[];
};

export function CoachRoutineStructureDaySelector( {
	onChangeAction,
	selectedDays,
	dayOptions,
}: CoachRoutineStructureDaySelectorProps ) {
	return (
		<div className={ "grid gap-2" }>
			<div>
				<Label className={ "mr-1 text-sm font-semibold" }>Días por semana</Label>
				<Description className={ "text-sm" }>
					Los días seleccionados se aplican a todas las semanas activas.
				</Description>
			</div>
			{ /* Adentro de cada casilla va un <span> con el estilo de Label y no un
			     <Label>: el grupo le pasa su id a todo Label de adentro, y las seis
			     casillas terminaban con el mismo id y el grupo se anunciaba "Día 1".
			     El nombre del grupo va en `aria-label`. Igual en semanas y en copiar. */ }
			<CheckboxButtonGroup
				aria-label={ "Días por semana" }
				className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem] px-0.5 md:grid-cols-3" }
				layout={ "grid" }
				value={ selectedDays }
				variant={ "secondary" }
				onChange={ ( value ) => onChangeAction( value as string[] ) }
			>
				{ dayOptions.map( ( day ) => (
					<CheckboxButtonGroup.Item key={ day.value } aria-label={ day.label } className={ "gap-2 px-3 py-2.5" } value={ day.value }>
						<CheckboxButtonGroup.Indicator/>
						<CheckboxButtonGroup.ItemContent>
							<span className={ "label text-sm" }>{ day.label }</span>
						</CheckboxButtonGroup.ItemContent>
					</CheckboxButtonGroup.Item>
				) ) }
			</CheckboxButtonGroup>
		</div>
	);
}
