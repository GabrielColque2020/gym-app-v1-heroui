"use client";

import { useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

import { monthYearLabel } from "@/constants/months";
import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
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
				{ /* En el telefono el mes ocupa todo el renglon, con las flechas en las
				     puntas; las acciones bajan a un renglon propio. */ }
				<div className={ `flex min-w-0 items-center gap-1 sm:w-auto sm:flex-none ${ routineCount === 0 ? "flex-1" : "w-full" }` }>
					<Button isIconOnly aria-label={ "Mes anterior" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => goToMonth( -1 ) }>
						<ChevronLeft className={ "size-5" }/>
					</Button>
					<div className={ "min-w-0 flex-1 text-center sm:min-w-36 sm:flex-none" }>
						<p className={ "whitespace-nowrap text-base font-black leading-tight text-foreground sm:text-xl" }>
							{ monthYearLabel( String( month ), String( year ) ) }
						</p>
						<p className={ "truncate text-xs text-muted" }>Rutina de { studentName }</p>
					</div>
					<Button isIconOnly aria-label={ "Mes siguiente" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => goToMonth( 1 ) }>
						<ChevronRight className={ "size-5" }/>
					</Button>
				</div>
				{ /* Sin rutina solo queda "Actualizar": va en el mismo renglon que el mes. */ }
				<div className={ `flex items-center gap-2 sm:w-auto sm:shrink-0 ${ routineCount === 0 ? "shrink-0" : "w-full" }` }>
					<Button
						isIconOnly
						aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					</Button>
					{ /* Sin rutina no hay boton de crear aca: el aviso de abajo ya ofrece
					     copiar o crear, y repetirlo arriba eran dos caminos para lo mismo. */ }
					{ routineCount === 0 ? null : (
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
