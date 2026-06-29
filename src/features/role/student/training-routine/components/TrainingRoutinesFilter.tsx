import { PageHeader } from "@/components/common";
import { FilterSelect } from "@/components/common/FilterSelect";
import { MONTH_OPTIONS_PADDED } from "@/constants/months";
import { Button, Card } from "@heroui/react";
import { useState } from "react";

type TrainingRoutinesFilterProps = {
	defaultMonth: string;
	defaultYear: string;
	onClear: () => void;
	onSearch: ( value: { month: string; year: string } ) => void;
};

export default function TrainingRoutinesFilter( {
	defaultMonth,
	defaultYear,
	onClear,
	onSearch,
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
			<div className={ "grid w-full grid-cols-1 gap-4 md:grid-cols-3" }>
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
				<div className={ "form-control flex flex-row items-end gap-2" }>
					<Button className={ "flex-1 shadow-sm" } onPress={ handleSearch }>
						Buscar
					</Button>
					<Button
						className={ "shadow-sm bg-surface border border-accent/50 text-accent" }
						variant={ "ghost" }
						onPress={ handleClear }
					>
						Limpiar
					</Button>
				</div>
			</div>
		</Card>
	);
}
