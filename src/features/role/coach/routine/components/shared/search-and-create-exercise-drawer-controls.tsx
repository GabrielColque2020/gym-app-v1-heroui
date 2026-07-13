import { Input, Label, ListBox, Select, TextField } from "@heroui/react";

import { ALL_BODY_PARTS, BODY_PART_OPTIONS, type BodyPartFilter } from "@/features/exercises/services/exercise-form";

type SearchAndCreateExerciseDrawerControlsProps = {
	bodyPartFilter: BodyPartFilter;
	onBodyPartFilterChangeAction: ( value: BodyPartFilter ) => void;
	onOrderChange: ( value: string ) => void;
	onSearchValueChangeAction: ( value: string ) => void;
	orderValue: string;
	searchValue: string;
};

export function SearchAndCreateExerciseDrawerControls( {
														   bodyPartFilter,
														   onBodyPartFilterChangeAction,
														   onOrderChange,
														   onSearchValueChangeAction,
														   orderValue,
														   searchValue,
													   }: SearchAndCreateExerciseDrawerControlsProps ) {
	return (
		<>
			<TextField name={ "search-exercise" }>
				<Label>Buscar ejercicio</Label>
				<Input
					aria-label={ "Buscar ejercicio" }
					autoComplete={ "off" }
					placeholder={ "Buscar ejercicio..." }
					value={ searchValue }
					onChange={ ( event ) => onSearchValueChangeAction( event.target.value ) }
					className={ "border border-border" }
				/>
			</TextField>

			<Select
				name={ "body-part-filter" }
				placeholder={ "Todos los grupos musculares" }
				value={ bodyPartFilter }
				onChange={ ( value ) => onBodyPartFilterChangeAction( String( value ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
			>
				<Label>Grupo muscular</Label>
				<Select.Trigger aria-label={ "Filtrar por grupo muscular" } className={ "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todos" }>
							Todos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						{ BODY_PART_OPTIONS.map( ( option ) => (
							<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
								{ option.label }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>

			<TextField name={ "exercise-order" } value={ orderValue } onChange={ onOrderChange }>
				<Label>Orden</Label>
				<Input
					aria-label={ "Orden del ejercicio en la rutina" }
					inputMode={ "numeric" }
					placeholder={ "1" }
					className={ "border border-border" }
				/>
			</TextField>
		</>
	);
}
