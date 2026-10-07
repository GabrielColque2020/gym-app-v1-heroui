"use client";

import { Button, Card, Label, ListBox, SearchField, Select } from "@heroui/react";

import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	type BodyPartFilter,
	formatBodyPart
} from "@/features/exercises/services/exercise-form";
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
					? "grid w-full min-w-0 grid-cols-2 gap-2 py-0 px-0"
					: "grid gap-3 py-0 px-0 lg:grid-cols-[1fr_260px_240px_auto] lg:items-end"
			}
			variant={ "transparent" }
		>
			<SearchField
				aria-label={ "Buscar ejercicio" }
				className={ isMobile ? "col-span-2 min-w-0" : undefined }
				name={ `${ fieldNamePrefix }exercise-name-filter` }
				value={ nameFilter }
				onChange={ onNameFilterChangeAction }
			>
				{ isMobile ? null : <Label>Nombre</Label> }
				<SearchField.Group className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<SearchField.SearchIcon/>
					<SearchField.Input
						className={ isMobile ? "min-w-0" : undefined }
						placeholder={ "Buscar por nombre, músculo o equipo" }
					/>
					<SearchField.ClearButton/>
				</SearchField.Group>
			</SearchField>

			<Select
				aria-label={ "Origen" }
				className={ isMobile ? "min-w-0" : undefined }
				name={ `${ fieldNamePrefix }exercise-source-filter` }
				value={ sourceFilter }
				onChange={ ( key ) => onSourceFilterChangeAction( ( key ?? ALL_COACH_EXERCISE_SOURCES ) as CoachExerciseSourceFilter ) }
			>
				{ isMobile ? null : <Label>Origen</Label> }
				<Select.Trigger className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{ /* Sin rotulo arriba, "Todos" solo no dice de que: se aclara en la opcion. */ }
						<ListBox.Item id={ ALL_COACH_EXERCISE_SOURCES } textValue={ isMobile ? "Todo origen" : "Todos" }>
							{ isMobile ? "Todo origen" : "Todos" }
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "GLOBAL" } textValue={ "Catálogo" }>
							Catálogo
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "OVERRIDE" } textValue={ "Catálogo, editado" }>
							Catálogo, editado
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ "COACH" } textValue={ "Propio" }>
							Propio
							<ListBox.ItemIndicator/>
						</ListBox.Item>
					</ListBox>
				</Select.Popover>
			</Select>

			<Select
				aria-label={ "Grupo muscular" }
				className={ isMobile ? "min-w-0" : undefined }
				name={ `${ fieldNamePrefix }exercise-body-part-filter` }
				value={ bodyPartFilter }
				onChange={ ( key ) => onBodyPartFilterChangeAction( ( key ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
			>
				{ isMobile ? null : <Label>Grupo muscular</Label> }
				<Select.Trigger className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ isMobile ? "Todo grupo" : "Todos" }>
							{ isMobile ? "Todo grupo" : "Todos" }
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
				// Solo aparece cuando hay algo que limpiar.
				hasFilters ? (
					<Button className={ "col-span-2" } size={ "sm" } variant={ "secondary" } onPress={ onClearFiltersAction }>
						Limpiar filtros
					</Button>
				) : null
			) : (
				<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ onClearFiltersAction }>
					Limpiar
				</Button>
			) }
		</Card>
	);
}
