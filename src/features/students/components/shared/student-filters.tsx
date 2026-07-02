"use client";

import { Button, Label, ListBox, SearchField, Select } from "@heroui/react";

import {
	ACTIVE_STATUS,
	ALL_STATUSES,
	INACTIVE_STATUS,
	type StudentStatusFilter,
} from "@/features/students/services/student-form";

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

	return (
		<div
			className={
				isMobile
					? "grid w-full min-w-0 gap-4 overflow-hidden rounded-2xl border border-border bg-surface-secondary px-4 py-5"
					: "grid gap-3 rounded-xl border border-border bg-surface-secondary p-3 lg:grid-cols-[1fr_220px_auto] lg:items-end"
			}
		>
			<SearchField
				className={ isMobile ? "min-w-0 gap-2" : undefined }
				name={ `${ fieldNamePrefix }student-search-filter` }
				value={ searchFilter }
				onChange={ onSearchFilterChange }
			>
				<Label>Buscar</Label>
				<SearchField.Group className={ isMobile ? "w-full min-w-0" : undefined }>
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
				<Select.Trigger className={ isMobile ? "w-full min-w-0" : undefined }>
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
		</div>
	);
}
