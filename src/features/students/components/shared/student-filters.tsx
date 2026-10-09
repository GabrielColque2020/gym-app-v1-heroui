import { Button, Card, Label, ListBox, SearchField, Select } from "@heroui/react";

import { ACTIVE_STATUS, ALL_STATUSES, INACTIVE_STATUS, type StudentStatusFilter, } from "@/features/students/services/student-form";

type StudentFiltersProps = {
	hasFilters: boolean;
	layout: "desktop" | "mobile";
	onClearFilters: () => void;
	onSearchFilterChange: ( value: string ) => void;
	onStatusFilterChange: ( value: StudentStatusFilter ) => void;
	searchFilter: string;
	statusFilter: StudentStatusFilter;
};

export function StudentFilters( {
									hasFilters,
									layout,
									onClearFilters,
									onSearchFilterChange,
									onStatusFilterChange,
									searchFilter,
									statusFilter,
								}: StudentFiltersProps ) {
	const isMobile = layout === "mobile";
	const fieldNamePrefix = isMobile ? "mobile-" : "";

	// En el telefono los filtros van en dos renglones cortos, sin etiquetas ni
	// "Limpiar": el buscador y el estado. Con todo eso ocupaban media pantalla
	// antes del primer estudiante.
	if (isMobile) {
		const statusOptions = [
			{ id: ALL_STATUSES, label: "Todos los estados" },
			{ id: ACTIVE_STATUS, label: "Activos" },
			{ id: INACTIVE_STATUS, label: "Inactivos" },
		] as const;

		return (
			<div className={ "flex w-full min-w-0 flex-col gap-2" }>
				<SearchField
					aria-label={ "Buscar estudiante" }
					className={ "min-w-0" }
					name={ `${ fieldNamePrefix }student-search-filter` }
					value={ searchFilter }
					onChange={ onSearchFilterChange }
				>
					<SearchField.Group className={ "w-full min-w-0 border border-border" }>
						<SearchField.SearchIcon/>
						<SearchField.Input className={ "min-w-0" } placeholder={ "Nombre, email o DNI..." }/>
						<SearchField.ClearButton/>
					</SearchField.Group>
				</SearchField>
				{ /* Un solo desplegable, como en escritorio y como los filtros de
				     ejercicios: tres botones sueltos no se leian como un filtro. */ }
				<Select
					aria-label={ "Filtrar por estado" }
					className={ "min-w-0" }
					name={ `${ fieldNamePrefix }student-status-filter` }
					value={ statusFilter }
					onChange={ ( key ) => onStatusFilterChange( ( key ?? ALL_STATUSES ) as StudentStatusFilter ) }
				>
					<Select.Trigger className={ "w-full min-w-0 border border-border" }>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{ statusOptions.map( ( option ) => (
								<ListBox.Item key={ option.id } id={ option.id } textValue={ option.label }>
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

	return (
		<Card
			className={
				isMobile
					? "grid w-full min-w-0 gap-4 py-0 px-0"
					: "grid gap-3 py-0 px-0 lg:grid-cols-[1fr_260px_auto] lg:items-end"
			}
			variant={ "transparent" }
		>
			<SearchField
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }student-search-filter` }
				value={ searchFilter }
				onChange={ onSearchFilterChange }
			>
				<Label>Buscar</Label>
				<SearchField.Group className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<SearchField.SearchIcon/>
					<SearchField.Input
						className={ isMobile ? "min-w-0" : undefined }
						placeholder={ "Nombre, email o DNI..." }
					/>
					<SearchField.ClearButton/>
				</SearchField.Group>
			</SearchField>

			<Select
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }student-status-filter` }
				value={ statusFilter }
				onChange={ ( key ) => onStatusFilterChange( ( key ?? ALL_STATUSES ) as StudentStatusFilter ) }
			>
				<Label>Estado</Label>
				<Select.Trigger className={ isMobile ? "w-full min-w-0 border border-border" : "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_STATUSES } textValue={ "Todos" }>
							Todos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ ACTIVE_STATUS } textValue={ "Activos" }>
							Activos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						<ListBox.Item id={ INACTIVE_STATUS } textValue={ "Inactivos" }>
							Inactivos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
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
		</Card>
	);
}
