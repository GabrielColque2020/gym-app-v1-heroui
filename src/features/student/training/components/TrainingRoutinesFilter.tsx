import { FilterSelect } from "@/components/common/FilterSelect";
import { Button, Card } from "@heroui/react";
import { useState } from "react";

// Opciones para los meses
const monthOptions = [
	{ value: "01", label: "Enero" },
	{ value: "02", label: "Febrero" },
	{ value: "03", label: "Marzo" },
	{ value: "04", label: "Abril" },
	{ value: "05", label: "Mayo" },
	{ value: "06", label: "Junio" },
	{ value: "07", label: "Julio" },
	{ value: "08", label: "Agosto" },
	{ value: "09", label: "Septiembre" },
	{ value: "10", label: "Octubre" },
	{ value: "11", label: "Noviembre" },
	{ value: "12", label: "Diciembre" },
];

export default function TrainingRoutinesFilter() {
	// Opciones para el año (últimos 5 años y próximos 2)
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from( { length: 8 }, ( _, i ) => ( {
		value: ( currentYear - 3 + i ).toString(),
		label: ( currentYear - 3 + i ).toString()
	} ) );

	const [ selectedYear, setSelectedYear ] = useState<string>( "" );
	const [ selectedMonth, setSelectedMonth ] = useState<string>( "" );

	const handleSearch = () => {
		console.log( "Buscar:", { year: selectedYear, month: selectedMonth } );
		// Aquí iría tu lógica de búsqueda
	};

	const handleClear = () => {
		setSelectedYear( "" );
		setSelectedMonth( "" );
	};


	return (
		<Card
			className={ " w-full items-stretch md:flex-row grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-sm" }
			variant={ "secondary" }
		>
			<div className={ "form-control" }>
				<FilterSelect
					label={ "Año" }
					placeholder={ "Todos los años" }
					options={ yearOptions }
					name={ "year" }
					onSelectionChange={ setSelectedYear }
				/>
			</div>

			<div className={ "form-control" }>
				<FilterSelect
					label={ "Mes" }
					placeholder={ "Todos los meses" }
					options={ monthOptions }
					name={ "month" }
					onSelectionChange={ setSelectedMonth }
				/>
			</div>

			<div className={ "form-control flex flex-row items-end gap-2" }>
				<Button className={ "flex-1 shadow-sm" } onPress={ handleSearch }>
					Buscar
				</Button>
				<Button variant={ "ghost" } className={ "shadow-sm bg-surface" } onPress={ handleClear }>
					Limpiar
				</Button>
			</div>
		</Card>
	)
}