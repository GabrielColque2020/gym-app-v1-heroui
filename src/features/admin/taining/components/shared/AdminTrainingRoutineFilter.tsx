import React, { useState } from "react";
import { AdminCopyRoutineSheetDesktop, AdminCreateRoutineSheetDesktop } from "../desktop";
import { AdminCopyRoutineSheetMobile, AdminCreateRoutineSheetMobile } from "@/features/admin/taining/components/mobile";
import { Button, Card } from "@heroui/react";
import { FilterSelect, PageHeader } from "@/components/common";
import { Magnifier, } from "@gravity-ui/icons";

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

export function AdminTrainingRoutineFilter() {
	// Opciones para el año (últimos 5 años y próximos 2)
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from( { length: 8 }, ( _, i ) => ( {
		value: ( currentYear - 3 + i ).toString(),
		label: ( currentYear - 3 + i ).toString()
	} ) );

	const [ selectedYear, setSelectedYear ] = useState<string>( "2026" );
	const [ selectedMonth, setSelectedMonth ] = useState<string>( "05" );

	const handleSearch = () => {
		console.log( "Buscar:", { year: selectedYear, month: selectedMonth } );
		// Aquí iría tu lógica de búsqueda
	};

	return (
		<Card>
			<PageHeader
				title={ "Rutina de Entrenamiento" }
				description={ "Organiza las rutinas semanales y los días de entrenamiento para tu alumno." }
			/>

			<div className={ "flex flex-col md:flex-row items-end mt-2 gap-4" }>

				<div className={ "form-control w-full" }>
					<FilterSelect
						label={ "Año" }
						placeholder={ "Todos los años" }
						options={ yearOptions }
						name={ "year" }
						defaultValue={ "2026" }
						onSelectionChange={ setSelectedYear }
					/>
				</div>

				<div className={ "form-control w-full" }>
					<FilterSelect
						label={ "Mes" }
						placeholder={ "Todos los meses" }
						options={ monthOptions }
						name={ "month" }
						defaultValue={ "05" }
						onSelectionChange={ setSelectedMonth }
					/>
				</div>

				<div className={ "form-control flex flex-row items-end gap-2" }>
					<Button onPress={ handleSearch } className={ "shadow-sm" }>
						<Magnifier/>
						Buscar
					</Button>

					<div className={ "hidden md:flex" }>
						<AdminCreateRoutineSheetDesktop/>
					</div>
					<div className={ "flex md:hidden" }>
						<AdminCreateRoutineSheetMobile/>
					</div>

					<div className={ "hidden md:flex" }>
						<AdminCopyRoutineSheetDesktop
							destinationMonth={ selectedMonth }
							destinationYear={ selectedYear }
							destinationWeeksOccupied={ selectedMonth === "05" && selectedYear === "2026" ? 2 : 3 }
							hasActiveRoutine
						/>
					</div>
					<div className={ "flex md:hidden" }>
						<AdminCopyRoutineSheetMobile
							destinationMonth={ selectedMonth }
							destinationYear={ selectedYear }
							destinationWeeksOccupied={ selectedMonth === "05" && selectedYear === "2026" ? 2 : 3 }
							hasActiveRoutine
						/>
					</div>
				</div>
			</div>
		</Card>
	)
}