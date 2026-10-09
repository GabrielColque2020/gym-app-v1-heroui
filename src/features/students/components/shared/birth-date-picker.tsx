"use client";

import type { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";

import { Calendar, DateField, DatePicker, Label } from "@heroui/react";

function getBirthDateValue( value: string ): DateValue | null {
	const trimmedValue = value.trim();

	if (trimmedValue.length === 0) return null;

	try {
		return parseDate( trimmedValue );
	} catch {
		return null;
	}
}

type BirthDatePickerProps = {
	// Fecha en formato `YYYY-MM-DD`, o vacía si no hay.
	value: string;
	onChange: ( value: string ) => void;
};

// La usan la ficha del estudiante (la carga el entrenador) y "Mi perfil" (la
// corrige cada uno).
export function BirthDatePicker( { onChange, value }: BirthDatePickerProps ) {
	return (
		<DatePicker
			autoComplete={ "off" }
			className={ "w-full" }
			granularity={ "day" }
			name={ "birthDate" }
			shouldForceLeadingZeros
			value={ getBirthDateValue( value ) }
			onChange={ ( date ) => onChange( date ? date.toString() : "" ) }
		>
			<Label>Fecha de nacimiento</Label>
			<DateField.Group fullWidth className={ "border border-border" }>
				<DateField.Input>
					{ (segment) => (
						<DateField.Segment
							className={
								segment.type === "day" || segment.type === "month"
									? "min-w-[2ch] text-center"
									: segment.type === "year"
										? "min-w-[4ch] text-center"
										: undefined
							}
							segment={ segment }
						/>
					) }
				</DateField.Input>
				<DateField.Suffix>
					<DatePicker.Trigger type={ "button" }>
						<DatePicker.TriggerIndicator/>
					</DatePicker.Trigger>
				</DateField.Suffix>
			</DateField.Group>
			<DatePicker.Popover className={ "min-w-68 overflow-visible" }>
				<Calendar aria-label={ "Fecha de nacimiento" } className={ "w-68" }>
					<Calendar.Header>
						<Calendar.YearPickerTrigger>
							<Calendar.YearPickerTriggerHeading/>
							<Calendar.YearPickerTriggerIndicator/>
						</Calendar.YearPickerTrigger>
						<Calendar.NavButton slot={ "previous" }/>
						<Calendar.NavButton slot={ "next" }/>
					</Calendar.Header>
					<Calendar.Grid>
						<Calendar.GridHeader>
							{ ( day ) => <Calendar.HeaderCell>{ day }</Calendar.HeaderCell> }
						</Calendar.GridHeader>
						<Calendar.GridBody>
							{ ( date ) => <Calendar.Cell date={ date }/> }
						</Calendar.GridBody>
					</Calendar.Grid>
					<Calendar.YearPickerGrid>
						<Calendar.YearPickerGridBody>
							{ ( { year } ) => <Calendar.YearPickerCell year={ year }/> }
						</Calendar.YearPickerGridBody>
					</Calendar.YearPickerGrid>
				</Calendar>
			</DatePicker.Popover>
		</DatePicker>
	);
}
