import { useEffect, useState } from "react";

import { Button, Card } from "@heroui/react";
import { Download, RotateCw } from "lucide-react";

import { PageHeader } from "@/components/common";
import { FilterSelect } from "@/components/common/filter-select";
import { MONTH_OPTIONS_PADDED } from "@/constants/months";

type TrainingRoutinesFilterProps = {
	defaultMonth: string;
	defaultYear: string;
	isPrintDisabled?: boolean;
	isRefreshing?: boolean;
	onPrint: () => void;
	onRefresh: () => void;
	onSearch: ( value: { month: string; year: string } ) => void;
};

export function TrainingRoutinesFilter( {
	defaultMonth,
	defaultYear,
	isPrintDisabled = false,
	isRefreshing = false,
	onPrint,
	onRefresh,
	onSearch,
}: TrainingRoutinesFilterProps ) {
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from( { length: 8 }, ( _, index ) => ( {
		label: String( currentYear - 3 + index ),
		value: String( currentYear - 3 + index ),
	} ) );
	const [ selectedYear, setSelectedYear ] = useState( defaultYear );
	const [ selectedMonth, setSelectedMonth ] = useState( defaultMonth );

	useEffect( () => {
		onSearch( {
			month: selectedMonth,
			year: selectedYear,
		} );
	}, [ onSearch, selectedMonth, selectedYear ] );

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Header className={ "border-b border-border p-3" }>
				<PageHeader
					title={ "Plan de Entrenamiento Personal" }
					description={ "Optimiza tu rendimiento con rutinas adaptadas a tus objetivos de temporada." }
				/>
			</Card.Header>
			<Card.Content className={ "px-3 pb-3" }>
				<div className={ "grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]" }>
					<div className={ "form-control" }>
						<FilterSelect
							defaultValue={ selectedYear }
							label={ "Año" }
							name={ "year" }
							options={ yearOptions }
							placeholder={ "Todos los años" }
							onSelectionChange={ setSelectedYear }
						/>
					</div>
					<div className={ "form-control" }>
						<FilterSelect
							defaultValue={ selectedMonth }
							label={ "Mes" }
							name={ "month" }
							options={ MONTH_OPTIONS_PADDED }
							placeholder={ "Todos los meses" }
							onSelectionChange={ setSelectedMonth }
						/>
					</div>
					<div className={ "form-control flex flex-col gap-2 sm:flex-row sm:items-end" }>
						<Button
							className={ "w-full shadow-sm sm:w-auto sm:flex-1" }
							isDisabled={ isPrintDisabled }
							variant={ "secondary" }
							onPress={ onPrint }
						>
							<Download className={ "size-4" }/>
							Descargar PDF
						</Button>
						<Button
							className={ "w-full shadow-sm sm:w-auto sm:flex-1" }
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ onRefresh }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando" : "Actualizar" }
						</Button>
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
