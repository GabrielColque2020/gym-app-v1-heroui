"use client";
import { MONTH_OPTIONS } from "@/constants/months";
import type { AdminTrainingRoutine } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { ArrowsRotateLeft, Magnifier } from "@gravity-ui/icons";
import { FilterSelect, PageHeader } from "@/components/common";
import { AdminDeleteRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminDeleteRoutineSheet";
import { AdminCreateRoutineSheet } from "@/features/role/admin/training-routine/components/shared/AdminCreateRoutineSheet";

type AdminTrainingRoutineFilterProps = {
	month: number;
	isRefreshing: boolean;
	routineCount: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	studentName: string;
	onRefresh: () => void;
	year: number;
};

export function AdminTrainingRoutineFilter( {
												month,
												isRefreshing,
												routineCount,
												routines,
												studentId,
												studentName,
												onRefresh,
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
		<Card className={ "p-6" }>
			<PageHeader
				title={ "Rutina de Entrenamiento" }
				description={ `Organiza las rutinas semanales y los días de entrenamiento de ${ studentName } creando, editando y copiando rutinas fácilmente.` }
				showSeparator
			/>
			<div className={ " flex flex-col items-end gap-4 md:flex-row" }>
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
						options={ MONTH_OPTIONS }
						placeholder={ "Todos los meses" }
						onSelectionChange={ setSelectedMonth }
					/>
				</div>
				<div className={ "form-control flex flex-row items-end gap-2" }>
					<Button className={ "shadow-sm" } onPress={ handleSearch }>
						<Magnifier/> Buscar
					</Button>
					<Button
						className={ "shadow-sm" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefresh }
					>
						<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
					{ routineCount === 0 ? (
						<AdminCreateRoutineSheet
							month={ Number( selectedMonth ) }
							studentId={ studentId }
							year={ Number( selectedYear ) }
						/>
					) : (
						<AdminDeleteRoutineSheet
							month={ Number( selectedMonth ) }
							routines={ routines }
							studentId={ studentId }
							studentName={ studentName }
							year={ Number( selectedYear ) }
						/>
					) }
				</div>
			</div>
		</Card>
	);
}
