"use client";

import { Input, Label, TextArea, TextField } from "@heroui/react";

type EditableExerciseFieldProps = {
	ariaLabel: string;
	className?: string;
	inputClassName?: string;
	isMultiline?: boolean;
	label?: string;
	name: string;
	onChange: ( value: string ) => void;
	value: string;
};

export function RoutineDayExerciseField( {
	ariaLabel,
	className,
	inputClassName,
	isMultiline = false,
	label,
	name,
	onChange,
	value,
}: EditableExerciseFieldProps ) {
	return (
		<TextField
			aria-label={ ariaLabel }
			className={ className }
			name={ name }
			value={ value }
			onChange={ onChange }
		>
			{ label ? <Label className={ "text-xs text-muted" }>{ label }</Label> : null }
			{ isMultiline ? (
				<TextArea className={ inputClassName } rows={ 2 } variant={ "secondary" }/>
			) : (
				<Input className={ inputClassName } variant={ "secondary" }/>
			) }
		</TextField>
	);
}
