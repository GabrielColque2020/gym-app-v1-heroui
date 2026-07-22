"use client";

import { Button, Card, Label, ListBox, SearchField, Select } from "@heroui/react";

import { ALL_BODY_PARTS, type BodyPartFilter, BODY_PART_OPTIONS, formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { CoachExerciseSourceFilter } from "@/features/role/coach/exercises/hooks/use-coach-exercise-list";
import { ALL_COACH_EXERCISE_SOURCES } from "@/features/role/coach/exercises/hooks/use-coach-exercise-list";

type ExerciseFiltersProps = {
	bodyParts: readonly ( typeof BODY_PART_OPTIONS )[ number ][];
	bodyPartFilter: BodyPartFilter;
	hasFilters: boolean;
	layout: "desktop" | "mobile";
	nameFilter: string;
	onBodyPartFilterChangeAction: ( value: BodyPartFilter ) => void;
	onClearFiltersAction: () => void;
	onNameFilterChangeAction: ( value: string ) => void;
	onSourceFilterChangeAction: ( value: CoachExerciseSourceFilter ) => void;
	sourceFilter: CoachExerciseSourceFilter;
};

export function ExerciseFilters( {
	bodyParts,
	bodyPartFilter,
	hasFilters,
	layout,
	nameFilter,
	onBodyPartFilterChangeAction,
	onClearFiltersAction,
	onNameFilterChangeAction,
	onSourceFilterChangeAction,
	sourceFilter,
}: ExerciseFiltersProps ) {
	const isMobile = layout === "mobile";
	const fieldNamePrefix = isMobile ? "mobile-" : "";

	return (
		<Card
			className={
				isMobile
					? "grid w-full min-w-0 gap-4 py-0 px-0"
					: "grid gap-3 py-0 px-0 lg:grid-cols-[1fr_260px_240px_auto] lg:items-end"
			}
			variant={ "transparent" }
		>
			<SearchField
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }exercise-name-filter` }
				value={ nameFilter }
				onChange={ onNameFilterChangeAction }
			>
				<Label>Nombre</Label>
				<SearchField.Group className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
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
				name={ `${ fieldNamePrefix }exercise-source-filter` }
				value={ sourceFilter }
				onChange={ ( key ) => onSourceFilterChangeAction( ( key ?? ALL_COACH_EXERCISE_SOURCES ) as CoachExerciseSourceFilter ) }
			>
				<Label>Origen</Label>
				<Select.Trigger className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_COACH_EXERCISE_SOURCES } textValue={ "Todos" }>
							Todos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "GLOBAL" } textValue={ "Globales" }>
							Globales
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "COACH" } textValue={ "Propios" }>
							Propios
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "OVERRIDE" } textValue={ "Editados" }>
							Editados
							<ListBox.ItemIndicator/>
						</ListBox.Item>
					</ListBox>
				</Select.Popover>
			</Select>

			<Select
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }exercise-body-part-filter` }
				value={ bodyPartFilter }
				onChange={ ( key ) => onBodyPartFilterChangeAction( ( key ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
			>
				<Label>Grupo muscular</Label>
				<Select.Trigger className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todos" }>
							Todos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						{ bodyParts.map( ( bodyPart ) => (
							<ListBox.Item key={ bodyPart.value } id={ bodyPart.value } textValue={ bodyPart.label }>
								{ formatBodyPart( bodyPart.value ) }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>

			{ isMobile ? (
				<div className={ "grid gap-2" }>
					<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ onClearFiltersAction }>
						Limpiar
					</Button>
				</div>
			) : (
				<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ onClearFiltersAction }>
					Limpiar
				</Button>
			) }
		</Card>
	);
}
