"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { FilterSelect, PageHeader } from "@/components/common";
import { MONTH_OPTIONS } from "@/constants/months";
import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { CoachCreateRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-create-routine-drawer";
import { CoachOptionRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-option-routine-drawer";

type CoachTrainingRoutineFilterProps = {
	isRefreshing: boolean;
	month: number;
	onRefreshAction: () => void;
	routineCount: number;
	routineObjective?: string | null;
	routineWeeks: CoachTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

export function CoachTrainingRoutineFilter( {
	isRefreshing,
	month,
	onRefreshAction,
	routineCount,
	routineObjective,
	routineWeeks,
	studentId,
	studentName,
	year,
}: CoachTrainingRoutineFilterProps ) {
	const router = useRouter();
	const yearOptions = useMemo( () => {
		const currentYear = new Date().getFullYear();

		return Array.from( { length: 8 }, ( _, index ) => {
			const optionYear = currentYear - 3 + index;

			return { label: String( optionYear ), value: String( optionYear ) };
		} );
	}, [] );

	function updateRoute( nextMonth: string, nextYear: string ) {
		const params = new URLSearchParams( {
			month: nextMonth,
			studentId,
			year: nextYear,
		} );

		router.replace( `/coach/training-routine?${ params.toString() }` );
	}

	function handleMonthChange( nextMonth: string ) {
		updateRoute( nextMonth, String( year ) );
	}

	function handleYearChange( nextYear: string ) {
		updateRoute( String( month ), nextYear );
	}

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Header className={ "gap-3 border-b border-border p-3" }>
				<PageHeader
					description={ `Organiza las rutinas semanales y los días de entrenamiento de ${ studentName } creando, editando y copiando rutinas facilmente.` }
					title={ "Rutina de Entrenamiento" }
				/>
			</Card.Header>
			<Card.Content className={ "space-y-4 p-3" }>
				<div className={ "flex flex-col items-end gap-4 md:flex-row" }>
					<div className={ "form-control w-full" }>
						<FilterSelect
							defaultValue={ String( year ) }
							label={ "Año" }
							name={ "year" }
							options={ yearOptions }
							placeholder={ "Todos los años" }
							onSelectionChange={ handleYearChange }
						/>
					</div>
					<div className={ "form-control w-full" }>
						<FilterSelect
							defaultValue={ String( month ) }
							label={ "Mes" }
							name={ "month" }
							options={ MONTH_OPTIONS }
							placeholder={ "Todos los meses" }
							onSelectionChange={ handleMonthChange }
						/>
					</div>
					<div className={ "form-control flex flex-row items-end gap-2" }>
						<Button
							className={ "shadow-sm" }
							isDisabled={ isRefreshing }
							variant={ "secondary" }
							onPress={ onRefreshAction }
						>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						{ routineCount === 0 ? (
							<CoachCreateRoutineDrawer
								month={ month }
								studentId={ studentId }
								year={ year }
							/>
						) : (
							<CoachOptionRoutineDrawer
								month={ month }
								routineObjective={ routineObjective }
								routineWeeks={ routineWeeks }
								studentId={ studentId }
								studentName={ studentName }
								year={ year }
							/>
						) }
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
