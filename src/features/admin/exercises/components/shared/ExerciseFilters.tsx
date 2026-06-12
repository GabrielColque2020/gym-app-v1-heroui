"use client";

import { Button, Label, ListBox, SearchField, Select } from "@heroui/react";

import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	type BodyPartFilter,
} from "@/features/admin/exercises/services/exercise-form";

type ExerciseFiltersProps = {
	bodyPartFilter: BodyPartFilter;
	hasFilters: boolean;
	layout: "desktop" | "mobile";
	nameFilter: string;
	onBodyPartFilterChange: ( value: BodyPartFilter ) => void;
	onClearFilters: () => void;
	onNameFilterChange: ( value: string ) => void;
};

export function ExerciseFilters( {
									 bodyPartFilter,
									 hasFilters,
									 layout,
									 nameFilter,
									 onBodyPartFilterChange,
									 onClearFilters,
									 onNameFilterChange,
								 }: ExerciseFiltersProps ) {
	const isMobile = layout === "mobile";
	const fieldNamePrefix = isMobile ? "mobile-" : "";

	return (
		<div
			className={
				isMobile
					? "grid w-full min-w-0 gap-4 overflow-hidden rounded-2xl border border-border bg-surface-secondary px-4 py-5"
					: "grid gap-3 rounded-xl border border-border bg-surface-secondary p-3 lg:grid-cols-[1fr_260px_auto] lg:items-end"
			}
		>
			<SearchField
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }exercise-name-filter` }
				value={ nameFilter }
				onChange={ onNameFilterChange }
			>
				<Label>Nombre</Label>
				<SearchField.Group className={ isMobile ? "w-full min-w-0" : undefined }>
					<SearchField.SearchIcon/>
					<SearchField.Input
						className={ isMobile ? "min-w-0" : undefined }
						placeholder={ "Buscar ejercicio..." }
					/>
					<SearchField.ClearButton/>
				</SearchField.Group>
			</SearchField>

			<Select
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }exercise-body-part-filter` }
				value={ bodyPartFilter }
				onChange={ ( key ) => onBodyPartFilterChange( ( key ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
			>
				<Label>Tipo de ejercicio</Label>
				<Select.Trigger className={ isMobile ? "w-full min-w-0" : undefined }>
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

			{ isMobile ? (
				<div className={ "grid gap-2" }>
					<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ onClearFilters }>
						Limpiar
					</Button>
				</div>
			) : (
				<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ onClearFilters }>
					Limpiar
				</Button>
			) }
		</div>
	);
}
