"use client";

import { parseDate } from "@internationalized/date";
import { Button, Calendar, DateField, DatePicker, Label } from "@heroui/react";

import { shiftAppDateKey, toAppDateKey } from "@/lib/app-date";

// Hasta cuanto para atras: lo mismo que acepta el servidor.
export const TRAINED_ON_MAX_DAYS_AGO = 60;

type TrainedOnChoice = "other" | "today" | "yesterday";

// La opcion que corresponde a una fecha ("AAAA-MM-DD").
export function getTrainedOnChoice( value: string ): TrainedOnChoice {
	const today = toAppDateKey();

	if (value === today) return "today";
	if (value === shiftAppDateKey( today, -1 )) return "yesterday";

	return "other";
}

// El dia que se propone: el de la primera serie que cargo en este dia, si es de
// antes de hoy (cargo ayer y termina hoy). Si no, hoy.
export function getDefaultTrainedOn( dayStartDate: Date | null ) {
	const today = toAppDateKey();
	const oldest = shiftAppDateKey( today, -TRAINED_ON_MAX_DAYS_AGO );

	if (!dayStartDate) return today;

	const start = toAppDateKey( dayStartDate );

	return start > today ? today : start < oldest ? oldest : start;
}

type RoutineTrainedOnPickerProps = {
	// "AAAA-MM-DD"
	value: string;
	choice: TrainedOnChoice;
	onChangeAction: ( value: string, choice: TrainedOnChoice ) => void;
};

// "¿Cuándo lo entrenaste?" al terminar el dia. Las series se guardan con la
// fecha en que se cargan: si cargo tarde, el progreso quedaba corrido de dia.
export function RoutineTrainedOnPicker( { choice, onChangeAction, value }: RoutineTrainedOnPickerProps ) {
	const today = toAppDateKey();
	const yesterday = shiftAppDateKey( today, -1 );
	const options = [
		{ choice: "today", label: "Hoy", value: today },
		{ choice: "yesterday", label: "Ayer", value: yesterday },
		// "Otra fecha" arranca en anteayer: hoy y ayer ya tienen su boton.
		{ choice: "other", label: "Otra fecha", value: choice === "other" ? value : shiftAppDateKey( today, -2 ) },
	] as const;

	return (
		<div className={ "space-y-3" }>
			<div>
				<p className={ "text-sm font-semibold text-foreground" } id={ "trained-on-label" }>¿Cuándo lo entrenaste?</p>
				<p className={ "text-xs text-muted" }>Es la fecha que se ve en tu progreso.</p>
			</div>
			<div aria-labelledby={ "trained-on-label" } className={ "grid grid-cols-3 gap-2" } role={ "group" }>
				{ options.map( ( option ) => (
					<Button
						key={ option.choice }
						aria-pressed={ choice === option.choice }
						className={ "w-full min-w-0" }
						size={ "sm" }
						variant={ choice === option.choice ? "primary" : "secondary" }
						onPress={ () => onChangeAction( option.value, option.choice ) }
					>
						<span className={ "truncate" }>{ option.label }</span>
					</Button>
				) ) }
			</div>
			{ choice === "other" ? (
				<DatePicker
					className={ "w-full" }
					granularity={ "day" }
					maxValue={ parseDate( today ) }
					minValue={ parseDate( shiftAppDateKey( today, -TRAINED_ON_MAX_DAYS_AGO ) ) }
					shouldForceLeadingZeros
					value={ parseDate( value ) }
					onChange={ ( date ) => {
						// Sigue en "Otra fecha" aunque elija hoy o ayer: si no, el
						// calendario desapareceria mientras lo usa.
						if (date) onChangeAction( date.toString(), "other" );
					} }
				>
					<Label>Fecha</Label>
					<DateField.Group fullWidth className={ "border border-border" }>
						<DateField.Input>
							{ ( segment ) => (
								<DateField.Segment
									className={ segment.type === "year" ? "min-w-[4ch] text-center" : segment.type === "literal" ? undefined : "min-w-[2ch] text-center" }
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
						<Calendar aria-label={ "Día que entrenaste" } className={ "w-68" }>
							<Calendar.Header>
								<Calendar.Heading/>
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
						</Calendar>
					</DatePicker.Popover>
				</DatePicker>
			) : null }
		</div>
	);
}
