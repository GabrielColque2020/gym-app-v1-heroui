import { Input, Label, TextArea, TextField } from "@heroui/react";
import { twMerge } from "tailwind-merge";

type EditableExerciseFieldProps = {
	ariaLabel: string;
	className?: string;
	inputClassName?: string;
	inputMode?: "numeric" | "text";
	isMultiline?: boolean;
	label?: string;
	name: string;
	onChange: ( value: string ) => void;
	placeholder?: string;
	value: string;
};

export function RoutineDayExerciseField( {
											 ariaLabel,
											 className,
											 inputClassName,
											 inputMode,
											 isMultiline = false,
											 label,
											 name,
											 onChange,
											 placeholder,
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
			{ label ? <Label className={ "text-center text-[11px] leading-4 text-muted" }>{ label }</Label> : null }
			{ isMultiline ? (
				<TextArea className={ twMerge( "border border-border", inputClassName ) } placeholder={ placeholder } rows={ 2 }/>
			) : (
				<Input className={ twMerge( "border border-border", inputClassName ) } inputMode={ inputMode } placeholder={ placeholder }/>
			) }
		</TextField>
	);
}
