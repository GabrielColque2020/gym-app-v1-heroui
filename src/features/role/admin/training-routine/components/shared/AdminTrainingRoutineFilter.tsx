"use client";
import type { AdminTrainingRoutine } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";
import { FilterSelect, PageHeader } from "@/components/common";
import { AdminDeleteRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminDeleteRoutineSheet";
import { AdminCreateRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminCreateRoutineSheet";
import { AdminCopyRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminCopyRoutineSheet";
import { AdminEditRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminEditRoutineSheet";

type AdminTrainingRoutineFilterProps = {
	month: number;
	routineCount: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

const monthOptions = [
	{ value: "1", label: "Enero" },
	{ value: "2", label: "Febrero" },
	{ value: "3", label: "Marzo" },
	{ value: "4", label: "Abril" },
	{ value: "5", label: "Mayo" },
	{ value: "6", label: "Junio" },
	{ value: "7", label: "Julio" },
	{ value: "8", label: "Agosto" },
	{ value: "9", label: "Septiembre" },
	{ value: "10", label: "Octubre" },
	{ value: "11", label: "Noviembre" },
	{ value: "12", label: "Diciembre" },
];

export function AdminTrainingRoutineFilter( {
												month,
												routineCount,
												routines,
												studentId,
												studentName,
												year,
											}: AdminTrainingRoutineFilterProps ) {
	const router = useRouter();
	const [ selectedYear, setSelectedYear ] = useState( String( year ) );
	const [ selectedMonth, setSelectedMonth ] = useState( String( month ) );
	const yearOptions = useMemo( () => {
		const currentYear = new Date().getFullYear();
		return Array.from( { length: 8 }, ( _, index ) => {
			const optionYear = currentYear - 3 + index;
			return { label: String( optionYear ), value: String( optionYear ) };
		} );
	}, [] );

	function handleSearch() {
		const params = new URLSearchParams( {
			month: selectedMonth,
			studentId,
			year: selectedYear,
		} );
		router.replace( `/admin/trainingRoutine?${ params.toString() }` );
	}

	return (
		<Card>
			<PageHeader
				description={ `Organiza las rutinas semanales y los dias de entrenamiento de ${ studentName }.` }
				title={ "Rutina de Entrenamiento" }
				showSeparator
			/>
			<div className={ "mt-2 flex flex-col items-end gap-4 md:flex-row" }>
				<div className={ "form-control w-full" }>
					<FilterSelect
						defaultValue={ selectedYear }
						label={ "Anio" }
						name={ "year" }
						options={ yearOptions }
						placeholder={ "Todos los anios" }
						onSelectionChange={ setSelectedYear }
					/>
				</div>
				<div className={ "form-control w-full" }>
					<FilterSelect
						defaultValue={ selectedMonth }
						label={ "Mes" }
						name={ "month" }
						options={ monthOptions }
						placeholder={ "Todos los meses" }
						onSelectionChange={ setSelectedMonth }
					/>
				</div>
				<div className={ "form-control flex flex-row items-end gap-2" }>
					<Button className={ "shadow-sm" } onPress={ handleSearch }>
						<Magnifier/> Buscar
					</Button>
					{ routineCount === 0 ? (
						<AdminCreateRoutineSheet
							month={ Number( selectedMonth ) }
							studentId={ studentId }
							year={ Number( selectedYear ) }
						/>
					) : (
						<>
							<AdminEditRoutineSheet
								month={ Number( selectedMonth ) }
								routines={ routines }
								studentId={ studentId }
								year={ Number( selectedYear ) }
							/>
							<AdminCopyRoutineSheet
								destinationMonth={ selectedMonth }
								destinationWeeksOccupied={ routineCount }
								destinationYear={ selectedYear }
								hasActiveRoutine
								studentId={ studentId }
							/>
							<AdminDeleteRoutineSheet
								month={ Number( selectedMonth ) }
								routines={ routines }
								studentId={ studentId }
								studentName={ studentName }
								year={ Number( selectedYear ) }
							/>
						</>
					) }
				</div>
			</div>
		</Card>
	);
}
