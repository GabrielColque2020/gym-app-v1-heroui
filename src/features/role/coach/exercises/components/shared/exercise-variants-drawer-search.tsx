import {
	Input,
	Label,
	ListBox,
	Select,
	Spinner,
	TextField,
} from "@heroui/react";

import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	type BodyPartFilter,
} from "@/features/exercises/services/exercise-form";

import { ExerciseCandidateRow } from "./exercise-candidate-row";
import type { ExerciseVariantsTarget } from "./exercise-variants-drawer.types";

type ExerciseVariantsDrawerSearchProps = {
	bodyPartFilter: BodyPartFilter;
	candidateExercises: ExerciseVariantsTarget[];
	hasCandidateFilters: boolean;
	isLoading: boolean;
	isPending: boolean;
	isSearching: boolean;
	onAddVariantAction: ( candidate: ExerciseVariantsTarget ) => void;
	onBodyPartFilterChangeAction: ( value: BodyPartFilter ) => void;
	onSearchValueChangeAction: ( value: string ) => void;
	searchValue: string;
};

export function ExerciseVariantsDrawerSearch( {
	bodyPartFilter,
	candidateExercises,
	hasCandidateFilters,
	isLoading,
	isPending,
	isSearching,
	onAddVariantAction,
	onBodyPartFilterChangeAction,
	onSearchValueChangeAction,
	searchValue,
}: ExerciseVariantsDrawerSearchProps ) {
	return (
		<section className={ "space-y-4" }>
			<div>
				<h3 className={ "text-sm font-semibold text-foreground" }>Buscar ejercicio</h3>
				<p className={ "text-sm text-muted" }>Localiza un ejercicio existente para sumarlo al borrador.</p>
			</div>

			<TextField name={ "variant-search" }>
				<Label>Buscar por nombre</Label>
				<Input
					aria-label={ "Buscar ejercicio" }
					autoComplete={ "off" }
					placeholder={ "Ej: press inclinado" }
					value={ searchValue }
					onChange={ ( event ) => onSearchValueChangeAction( event.target.value ) }
				/>
			</TextField>

			<Select
				name={ "variant-body-part-filter" }
				placeholder={ "Todas las partes del cuerpo" }
				value={ bodyPartFilter }
				onChange={ ( value ) => {
					if (value) {
						onBodyPartFilterChangeAction( value as BodyPartFilter );
					}
				} }
			>
				<Label>Parte del cuerpo</Label>
				<Select.Trigger aria-label={ "Filtrar por parte del cuerpo" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todas" }>
							Todas
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

			<div className={ "space-y-3" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<p className={ "text-sm font-medium text-foreground" }>Resultados</p>
					{ isSearching ? (
						<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
							<Spinner size={ "sm" }/>
							Buscando...
						</div>
					) : null }
				</div>

				{ !hasCandidateFilters ? (
					<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-6 text-sm text-muted" }>
						Empieza a escribir un nombre o ajusta el filtro de parte del cuerpo para ver sugerencias.
					</div>
				) : isLoading ? (
					<div className={ "flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-secondary p-4 text-sm text-muted" }>
						<Spinner size={ "sm" }/>
						Cargando catalogo
					</div>
				) : candidateExercises.length === 0 ? (
					<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-6 text-sm text-muted" }>
						No hay ejercicios disponibles para asociar con estos filtros.
					</div>
				) : (
					<div className={ "space-y-2" }>
						{ candidateExercises.map( ( candidate ) => (
							<ExerciseCandidateRow
								key={ candidate.id }
								candidate={ candidate }
								isDisabled={ isPending }
								onAdd={ onAddVariantAction }
							/>
						) ) }
					</div>
				) }
			</div>
		</section>
	);
}
