"use client";
import { MONTH_OPTIONS } from "@/constants/months";
import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { ArrowsRotateLeft, Magnifier } from "@gravity-ui/icons";
import { FilterSelect, PageHeader } from "@/components/common";
import { CoachDeleteRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-sheet";
import { CoachCreateRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-create-routine-sheet";

type CoachTrainingRoutineFilterProps = {
	month: number;
	isRefreshing: boolean;
	routineCount: number;
	routines: CoachTrainingRoutine[];
	studentId: string;
	studentName: string;
	onRefreshAction: () => void;
	year: number;
};

export function CoachTrainingRoutineFilter( {
												month,
												isRefreshing,
												routineCount,
	routines,
	studentId,
	studentName,
	onRefreshAction,
	year,
}: CoachTrainingRoutineFilterProps ) {
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
		router.replace( `/coach/training-routine?${ params.toString() }` );
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
						onPress={ onRefreshAction }
					>
						<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
					{ routineCount === 0 ? (
						<CoachCreateRoutineSheet
							month={ Number( selectedMonth ) }
							studentId={ studentId }
							year={ Number( selectedYear ) }
						/>
					) : (
						<CoachDeleteRoutineSheet
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
