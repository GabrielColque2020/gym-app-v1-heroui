"use client";

import type { StudentFormValues } from "@/features/students/services/student-form";

import {
	FieldError,
	Input,
	Label,
	TextArea,
	TextField,
} from "@heroui/react";

type StudentSheetDetailsSectionProps = {
	isHeightInvalid: boolean;
	isWeightInvalid: boolean;
	updateValue: <Key extends keyof StudentFormValues>( key: Key, value: StudentFormValues[ Key ] ) => void;
	values: StudentFormValues;
};

export function StudentSheetDetailsSection( {
	isHeightInvalid,
	isWeightInvalid,
	updateValue,
	values,
}: StudentSheetDetailsSectionProps ) {
	return (
		<section className={ "space-y-4 border-t border-border pt-5" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Detalles y Objetivos</h3>
				<p className={ "text-sm text-muted" }>Medidas, objetivo y observaciones internas.</p>
			</div>

			<div className={ "grid gap-4 sm:grid-cols-2" }>
				<TextField
					fullWidth
					isInvalid={ isHeightInvalid }
					name={ "height" }
					value={ values.height }
					onChange={ ( value ) => updateValue( "height", value ) }
				>
					<Label>Altura</Label>
					<Input inputMode={ "decimal" } placeholder={ "175" }/>
					{ isHeightInvalid ? <FieldError>Debe ser mayor o igual a 0.</FieldError> : null }
				</TextField>

				<TextField
					fullWidth
					isInvalid={ isWeightInvalid }
					name={ "weight" }
					value={ values.weight }
					onChange={ ( value ) => updateValue( "weight", value ) }
				>
					<Label>Peso</Label>
					<Input inputMode={ "decimal" } placeholder={ "72" }/>
					{ isWeightInvalid ? <FieldError>Debe ser mayor o igual a 0.</FieldError> : null }
				</TextField>
			</div>

			<TextField
				fullWidth
				name={ "objective" }
				value={ values.objective }
				onChange={ ( value ) => updateValue( "objective", value ) }
			>
				<Label>Objetivo</Label>
				<Input placeholder={ "Ej: Ganar masa muscular" }/>
			</TextField>

			<TextField
				fullWidth
				name={ "observations" }
				value={ values.observations }
				onChange={ ( value ) => updateValue( "observations", value ) }
			>
				<Label>Observaciones</Label>
				<TextArea className={ "min-h-28" } placeholder={ "Notas de seguimiento o consideraciones." }/>
			</TextField>
		</section>
	);
}
