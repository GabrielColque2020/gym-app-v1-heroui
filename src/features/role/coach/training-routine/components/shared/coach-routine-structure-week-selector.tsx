"use client";

import { Label, Description } from "@heroui/react";
import { CheckboxButtonGroup } from "@heroui-pro/react";

type Option = {
	label: string;
	value: string;
};

type CoachRoutineStructureWeekSelectorProps = {
	onChangeAction: ( value: string[] ) => void;
	selectedWeeks: string[];
	weekOptions: Option[];
};

export function CoachRoutineStructureWeekSelector( {
	onChangeAction,
	selectedWeeks,
	weekOptions,
}: CoachRoutineStructureWeekSelectorProps ) {
	return (
		<div className={ "grid gap-2" }>
			<div>
				<Label className={ "mr-1 text-sm font-semibold" }>Semanas</Label>
				<Description className={ "text-sm" }>Selecciona las semanas activas de la rutina.</Description>
			</div>
			<CheckboxButtonGroup
				className={ "grid-cols-2 gap-3 [--checkbox-button-group-item-radius:0.75rem] px-0.5 md:grid-cols-4" }
				layout={ "grid" }
				value={ selectedWeeks }
				variant={ "secondary" }
				onChange={ ( value ) => onChangeAction( value as string[] ) }
			>
				{ weekOptions.map( ( week ) => (
					<CheckboxButtonGroup.Item key={ week.value } className={ "gap-2 px-4 py-3" } value={ week.value }>
						<CheckboxButtonGroup.Indicator/>
						<CheckboxButtonGroup.ItemContent>
							<Label className={ "text-sm" }>{ week.label }</Label>
						</CheckboxButtonGroup.ItemContent>
					</CheckboxButtonGroup.Item>
				) ) }
			</CheckboxButtonGroup>
		</div>
	);
}
