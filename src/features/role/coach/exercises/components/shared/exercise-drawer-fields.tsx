"use client";

import type { Key } from "react";
import { useMemo } from "react";
import {
	Checkbox,
	Description,
	Drawer,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	TextArea,
	TextField
} from "@heroui/react";

import { ExerciseMediaField } from "@/features/exercise-media/components/exercise-media-field";
import { BODY_PART_OPTIONS, formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import type { CoachExerciseFormValues } from "@/features/role/coach/exercises/services/coach-exercise-form";
import { useCoachExercises } from "@/features/role/coach/exercises/hooks/use-coach-exercises";

type ExerciseDrawerFieldsProps = {
	isCategoryInvalid: boolean;
	isNameInvalid: boolean;
	// El ejercicio sale del catalogo general: la imagen y el video que se ven
	// son los del catalogo hasta que el entrenador suba los suyos.
	isFromCatalog?: boolean;
	isSaving?: boolean;
	onUploadingChangeAction: ( isUploading: boolean ) => void;
	updateValue: <Key extends keyof CoachExerciseFormValues>( key: Key, value: CoachExerciseFormValues[ Key ] ) => void;
	values: CoachExerciseFormValues;
};

const OPTION_FIELDS = [ "equipment", "muscleGroup", "target" ] as const;

type OptionField = ( typeof OPTION_FIELDS )[ number ];

// El id de la opcion que deja el campo vacio: un desplegable no admite un id vacio.
const NONE_KEY = "__none__";

function capitalize( value: string ) {
	return value.charAt( 0 ).toLocaleUpperCase( "es" ) + value.slice( 1 );
}

function normalizeSelectValue( value: Key | null ) {
	return value === null ? "" : String( value );
}

// Las opciones salen del catalogo que el entrenador ya tiene cargado y no de una
// lista fija: asi el formulario ofrece los musculos y equipos que existen,
// escritos igual que en el resto de los ejercicios (con sus acentos), y un
// ejercicio propio se puede filtrar junto con los del catalogo general.
function useCoachExerciseOptions( values: CoachExerciseFormValues ) {
	const { data: exercises } = useCoachExercises();
	const catalogValues = useMemo( () => {
		const byField: Record<OptionField, Map<string, string>> = {
			equipment: new Map(),
			muscleGroup: new Map(),
			target: new Map(),
		};

		for (const exercise of exercises ?? []) {
			for (const field of OPTION_FIELDS) {
				const value = exercise[ field ]?.trim();

				// Sin distinguir mayusculas: "Polea" y "polea" son la misma opcion.
				if (value && !byField[ field ].has( value.toLocaleLowerCase( "es" ) )) {
					byField[ field ].set( value.toLocaleLowerCase( "es" ), value );
				}
			}
		}

		return byField;
	}, [ exercises ] );

	function buildOptions( field: OptionField ) {
		const stored = new Map( catalogValues[ field ] );
		const currentValue = values[ field ].trim();

		// Lo que el ejercicio ya tiene guardado se ofrece aunque no este en el catalogo.
		if (currentValue && !stored.has( currentValue.toLocaleLowerCase( "es" ) )) {
			stored.set( currentValue.toLocaleLowerCase( "es" ), currentValue );
		}

		return [ ...stored.values() ]
			.sort( ( left, right ) => left.localeCompare( right, "es", { sensitivity: "base" } ) )
			.map( ( value ) => ( { label: capitalize( value ), value } ) );
	}

	return {
		equipment: buildOptions( "equipment" ),
		muscleGroup: buildOptions( "muscleGroup" ),
		target: buildOptions( "target" ),
	};
}

type OptionalSelectProps = {
	label: string;
	name: string;
	onChangeAction: ( value: string ) => void;
	options: Array<{ label: string; value: string }>;
	value: string;
};

// Desplegable de un dato opcional: se puede dejar sin elegir y volver a vaciarlo.
function OptionalSelect( { label, name, onChangeAction, options, value }: OptionalSelectProps ) {
	// El valor guardado puede diferir en mayusculas del de la lista.
	const selectedValue = options.find(
		( option ) => option.value.toLocaleLowerCase( "es" ) === value.trim().toLocaleLowerCase( "es" ),
	)?.value ?? null;

	return (
		<div className={ "grid gap-2" }>
			<Label>{ label } <span className={ "font-normal text-muted" }>(opcional)</span></Label>
			<Select
				fullWidth
				aria-label={ label }
				name={ name }
				placeholder={ "Sin especificar" }
				value={ selectedValue }
				onChange={ ( key ) => {
					const nextValue = normalizeSelectValue( key );

					onChangeAction( nextValue === NONE_KEY ? "" : nextValue );
				} }
			>
				<Select.Trigger className={ "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ NONE_KEY } textValue={ "Sin especificar" }>
							<span className={ "text-muted" }>Sin especificar</span>
						</ListBox.Item>
						{ options.map( ( option ) => (
							<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
								{ option.label }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>
		</div>
	);
}

export function ExerciseDrawerFields( {
	isCategoryInvalid,
	isNameInvalid,
	isFromCatalog = false,
	isSaving = false,
	onUploadingChangeAction,
	updateValue,
	values,
}: ExerciseDrawerFieldsProps ) {
	const options = useCoachExerciseOptions( values );

	return (
		<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
			<div className={ "grid gap-2" }>
				<TextField
					isRequired
					fullWidth
					isInvalid={ isNameInvalid }
					name={ "name" }
					value={ values.name }
					onChange={ ( value ) => updateValue( "name", value ) }
				>
					<Label>Nombre</Label>
					<Input className={ "border border-border" } placeholder={ "Ej: Press banca" }/>
					{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
				</TextField>
			</div>

			<div className={ "grid gap-2" }>
				<Label>Grupo muscular</Label>
				<Select
					fullWidth
					isInvalid={ isCategoryInvalid }
					name={ "bodyPart" }
					value={ values.bodyPart }
					onChange={ ( value ) => {
						const nextBodyPart = normalizeSelectValue( value ) as CoachExerciseFormValues["bodyPart"];

						updateValue( "bodyPart", nextBodyPart );
						updateValue( "category", formatBodyPart( nextBodyPart ) );
					} }
				>
					<Select.Trigger className={ "border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ BODY_PART_OPTIONS.map( ( option ) => (
								<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
									{ option.label }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>
				{ isCategoryInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
			</div>

			{ /* Primero el musculo que mas trabaja y despues el que acompaña. */ }
			<div className={ "grid gap-4 md:grid-cols-2" }>
				<OptionalSelect
					label={ "Músculo objetivo" }
					name={ "target" }
					options={ options.target }
					value={ values.target }
					onChangeAction={ ( value ) => updateValue( "target", value ) }
				/>
				<OptionalSelect
					label={ "Músculo secundario" }
					name={ "muscleGroup" }
					options={ options.muscleGroup }
					value={ values.muscleGroup }
					onChangeAction={ ( value ) => updateValue( "muscleGroup", value ) }
				/>
			</div>

			<OptionalSelect
				label={ "Equipamiento" }
				name={ "equipment" }
				options={ options.equipment }
				value={ values.equipment }
				onChangeAction={ ( value ) => updateValue( "equipment", value ) }
			/>

			<TextField
				fullWidth
				name={ "instructions" }
				value={ values.instructions }
				onChange={ ( value ) => updateValue( "instructions", value ) }
			>
				<Label>Instrucciones</Label>
				<TextArea
					className={ "min-h-32 border border-border" }
					placeholder={ "Indicaciones técnicas, errores comunes o recomendaciones." }
				/>
			</TextField>

			{ /* La imagen y el video se suben aca. Se guardan con el ejercicio al
			     tocar el boton de abajo. */ }
			<div className={ "space-y-2" }>
				<div className={ "grid gap-4 md:grid-cols-2" }>
					<ExerciseMediaField
						exerciseName={ values.name }
						isDisabled={ isSaving }
						slot={ "image" }
						value={ values.imageUrl }
						onChangeAction={ ( url ) => updateValue( "imageUrl", url ) }
						onUploadingChangeAction={ onUploadingChangeAction }
					/>
					<ExerciseMediaField
						exerciseName={ values.name }
						isDisabled={ isSaving }
						slot={ "video" }
						value={ values.videoUrl }
						onChangeAction={ ( url ) => updateValue( "videoUrl", url ) }
						onUploadingChangeAction={ onUploadingChangeAction }
					/>
				</div>
				{ isFromCatalog ? (
					<p className={ "text-xs text-muted" }>
						Este ejercicio viene del catálogo. Si quitás tu imagen o tu video, vuelven a verse los del catálogo.
					</p>
				) : null }
			</div>

			<div>
				<Checkbox
					className={ "flex-1 flex-row" }
					isSelected={ values.active }
					onChange={ (isSelected) => updateValue("active", isSelected) }
				>
					<Checkbox.Control>
						<Checkbox.Indicator/>
					</Checkbox.Control>
					<Checkbox.Content>
						<Label>Ejercicio activo</Label>
					</Checkbox.Content>
				</Checkbox>
				<Description className={ "text-sm" }>
					Los ejercicios inactivos quedan ocultos para nuevas rutinas, pero se conservan en el historial.
				</Description>

			</div>
		</Drawer.Body>
	);
}
