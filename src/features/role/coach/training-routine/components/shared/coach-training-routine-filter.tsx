"use client";

import { useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

import { monthYearLabel } from "@/constants/months";
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

// Encabezado del mes: se pasa de un mes a otro con las flechas, que es como se
// recorre una rutina (el mes anterior, el que viene), en vez de dos selectores.
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

	function goToMonth( offset: -1 | 1 ) {
		const target = new Date( year, month - 1 + offset, 1 );
		const params = new URLSearchParams( {
			month: String( target.getMonth() + 1 ),
			studentId,
			year: String( target.getFullYear() ),
		} );

		router.replace( `/coach/training-routine?${ params.toString() }` );
	}

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "flex flex-row flex-wrap items-center justify-between gap-3 p-3" }>
				<div className={ "flex min-w-0 items-center gap-1" }>
					<Button isIconOnly aria-label={ "Mes anterior" } variant={ "ghost" } onPress={ () => goToMonth( -1 ) }>
						<ChevronLeft className={ "size-5" }/>
					</Button>
					<div className={ "min-w-36 text-center" }>
						<p className={ "text-xl font-black leading-tight text-foreground" }>
							{ monthYearLabel( String( month ), String( year ) ) }
						</p>
						<p className={ "truncate text-xs text-muted" }>Rutina de { studentName }</p>
					</div>
					<Button isIconOnly aria-label={ "Mes siguiente" } variant={ "ghost" } onPress={ () => goToMonth( 1 ) }>
						<ChevronRight className={ "size-5" }/>
					</Button>
				</div>
				<div className={ "flex shrink-0 items-center gap-2" }>
					<Button
						isIconOnly
						aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
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
				{ routineObjective?.trim() ? (
					<p className={ "w-full text-sm text-muted" }>
						<span className={ "font-medium text-foreground" }>Objetivo del mes:</span> { routineObjective }
					</p>
				) : null }
			</Card.Content>
		</Card>
	);
}
