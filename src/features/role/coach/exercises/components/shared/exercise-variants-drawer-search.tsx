import { Card, Input, ListBox, Select, Spinner, TextField, } from "@heroui/react";

import { ALL_BODY_PARTS, BODY_PART_OPTIONS, type BodyPartFilter, } from "@/features/exercises/services/exercise-form";

import { ExerciseCandidateRow } from "./exercise-candidate-row";
import type { ExerciseVariantsTarget } from "./exercise-variants-drawer.types";

type ExerciseVariantsDrawerSearchProps = {
	bodyPartFilter: BodyPartFilter;
	candidateExercises: ExerciseVariantsTarget[];
	isLoading: boolean;
	isPending: boolean;
	isSearching: boolean;
	onAddVariantAction: ( candidate: ExerciseVariantsTarget ) => void | Promise<void>;
	onBodyPartFilterChangeAction: ( value: BodyPartFilter ) => void;
	onSearchValueChangeAction: ( value: string ) => void;
	searchValue: string;
	totalCount: number;
};

export function ExerciseVariantsDrawerSearch( {
	bodyPartFilter,
	candidateExercises,
	isLoading,
	isPending,
	isSearching,
												  onAddVariantAction,
												  onBodyPartFilterChangeAction,
												  onSearchValueChangeAction,
												  searchValue,
												  totalCount,
											  }: ExerciseVariantsDrawerSearchProps ) {
	return (
		<section className={ "space-y-3" }>
			<h3 className={ "text-sm font-semibold text-foreground" }>Agregar una variante</h3>

			<TextField name={ "variant-search" }>
				<Input
					aria-label={ "Buscar ejercicio" }
					autoComplete={ "off" }
					placeholder={ "Buscar por nombre, músculo o equipo" }
					value={ searchValue }
					onChange={ ( event ) => onSearchValueChangeAction( event.target.value ) }
					className={ "border border-border" }
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
				<Select.Trigger aria-label={ "Filtrar por grupo muscular" } className={ "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todos los grupos" }>
							Todos los grupos
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
					<p className={ "text-xs text-muted" }>
						{ totalCount === 1 ? "1 ejercicio" : `${ totalCount } ejercicios` } · primero los del mismo músculo
					</p>
					{ isSearching ? (
						<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
							<Spinner size={ "sm" }/>
							Buscando...
						</div>
					) : null }
				</div>

				{ isLoading ? (
					<Card className={ "flex items-center justify-center gap-2 border border-border p-8 text-sm text-muted" }>
						<Spinner size={ "sm" }/>
						Cargando catálogo
					</Card>
				) : candidateExercises.length === 0 ? (
					<Card className={ "border border-border p-8 text-sm text-muted" }>
						No hay ejercicios con esa búsqueda. Probá con otro grupo muscular.
					</Card>
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
