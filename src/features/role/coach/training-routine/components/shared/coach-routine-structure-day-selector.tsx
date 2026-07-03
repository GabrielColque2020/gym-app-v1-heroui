"use client";

import { Description, Label } from "@heroui/react";
import { CheckboxButtonGroup } from "@heroui-pro/react";

type Option = {
	label: string;
	value: string;
};

type CoachRoutineStructureDaySelectorProps = {
	onChange: ( value: string[] ) => void;
	selectedDays: string[];
	dayOptions: Option[];
};

export function CoachRoutineStructureDaySelector( {
	onChange,
	selectedDays,
	dayOptions,
}: CoachRoutineStructureDaySelectorProps ) {
	return (
		<div className={ "grid gap-2" }>
			<div>
				<Label className={ "mr-1 text-sm font-semibold" }>Dias por semana</Label>
				<Description className={ "text-sm" }>
					Los dias seleccionados se aplican a todas las semanas activas.
				</Description>
			</div>
			<CheckboxButtonGroup
				className={ "grid-cols-2 gap-2 [--checkbox-button-group-item-radius:0.75rem] px-0.5 md:grid-cols-3" }
				layout={ "grid" }
				value={ selectedDays }
				variant={ "secondary" }
				onChange={ ( value ) => onChange( value as string[] ) }
			>
				{ dayOptions.map( ( day ) => (
					<CheckboxButtonGroup.Item key={ day.value } className={ "gap-2 px-3 py-2.5" } value={ day.value }>
						<CheckboxButtonGroup.Indicator/>
						<CheckboxButtonGroup.ItemContent>
							<Label className={ "text-sm" }>{ day.label }</Label>
						</CheckboxButtonGroup.ItemContent>
					</CheckboxButtonGroup.Item>
				) ) }
			</CheckboxButtonGroup>
		</div>
	);
}
