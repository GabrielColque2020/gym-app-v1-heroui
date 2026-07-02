import { PageHeader } from "@/components/common";
import { FilterSelect } from "@/components/common/filter-select";
import { MONTH_OPTIONS_PADDED } from "@/constants/months";
import { Button, Card } from "@heroui/react";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { useState } from "react";

type TrainingRoutinesFilterProps = {
	defaultMonth: string;
	defaultYear: string;
	onClear: () => void;
	onSearch: ( value: { month: string; year: string } ) => void;
	onRefresh: () => void;
	isRefreshing?: boolean;
};

export default function TrainingRoutinesFilter( {
													defaultMonth,
													defaultYear,
													onClear,
													onSearch,
													onRefresh,
													isRefreshing = false,
												}: TrainingRoutinesFilterProps ) {
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from( { length: 8 }, ( _, i ) => ( {
		label: String( currentYear - 3 + i ),
		value: String( currentYear - 3 + i ),
	} ) );
	const [ selectedYear, setSelectedYear ] = useState<string>( defaultYear );
	const [ selectedMonth, setSelectedMonth ] = useState<string>( defaultMonth );
	const [ resetVersion, setResetVersion ] = useState( 0 );

	const handleSearch = () => {
		onSearch( {
			month: selectedMonth,
			year: selectedYear,
		} );
	};

	const handleClear = () => {
		setSelectedYear( defaultYear );
		setSelectedMonth( defaultMonth );
		setResetVersion( ( current ) => current + 1 );
		onClear();
	};

	return (
		<Card className={ "p-5" }>
			<PageHeader
				description={ "Optimiza tu rendimiento con rutinas adaptadas a tus objetivos de temporada." }
				showSeparator
				title={ "Plan de Entrenamiento Personal" }
			/>
			<div className={ "grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)]" }>
				<div className={ "form-control" }>
					<FilterSelect
						key={ `year-${ resetVersion }` }
						defaultValue={ defaultYear }
						label={ "Ano" }
						name={ "year" }
						options={ yearOptions }
						placeholder={ "Todos los anos" }
						onSelectionChange={ setSelectedYear }
					/>
				</div>
				<div className={ "form-control" }>
					<FilterSelect
						key={ `month-${ resetVersion }` }
						defaultValue={ defaultMonth }
						label={ "Mes" }
						name={ "month" }
						options={ MONTH_OPTIONS_PADDED }
						placeholder={ "Todos los meses" }
						onSelectionChange={ setSelectedMonth }
					/>
				</div>
				<div className={ "form-control flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end" }>
					<Button className={ "w-full shadow-sm sm:w-auto sm:flex-1" } onPress={ handleSearch }>
						Buscar
					</Button>
					<Button
						className={ "w-full shadow-sm sm:w-auto sm:flex-1" }
						isDisabled={ isRefreshing }
						onPress={ onRefresh }
						variant={ "secondary" }
					>
						<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando" : "Actualizar" }
					</Button>
					<Button
						className={ "w-full shadow-sm sm:w-auto" }
						variant={ "secondary" }
						onPress={ handleClear }
					>
						Limpiar
					</Button>
				</div>
			</div>
		</Card>
	);
}
