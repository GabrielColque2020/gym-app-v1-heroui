"use client";

import type { GenderFormValue } from "@/features/students/services/student-form";
import { GENDER_OPTIONS, NO_GENDER } from "@/features/students/services/student-form";

import { Label, ListBox, Select } from "@heroui/react";

type GenderSelectProps = {
	value: GenderFormValue;
	onChange: ( value: GenderFormValue ) => void;
};

export function GenderSelect( { onChange, value }: GenderSelectProps ) {
	return (
		<Select
			autoComplete={ "off" }
			className={ "w-full" }
			fullWidth
			name={ "gender" }
			placeholder={ "Seleccione género" }
			value={ value }
			onChange={ ( key ) => onChange( ( key ?? NO_GENDER ) as GenderFormValue ) }
		>
			<Label>Género</Label>
			<Select.Trigger className={ "border border-border" }>
				<Select.Value/>
				<Select.Indicator/>
			</Select.Trigger>
			<Select.Popover>
				<ListBox>
					<ListBox.Item id={ NO_GENDER } textValue={ "Sin especificar" }>
						Sin especificar
						<ListBox.ItemIndicator/>
					</ListBox.Item>
					{ GENDER_OPTIONS.map( ( option ) => (
						<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
							{ option.label }
							<ListBox.ItemIndicator/>
						</ListBox.Item>
					) ) }
				</ListBox>
			</Select.Popover>
		</Select>
	);
}
