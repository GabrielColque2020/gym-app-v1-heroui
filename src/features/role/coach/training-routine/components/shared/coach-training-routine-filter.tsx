"use client";

import { unwrapped } from "@/lib/action-result";
import { useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

import { MonthJumpPicker } from "@/components/common/month-jump-picker";
import { getRoutineMonthsWithContentAction } from "@/features/role/coach/training-routine/actions/get-routine-months-with-content";
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
// Para ir mas lejos, el titulo abre un selector de mes.
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

	function goToMonth( targetMonth: number, targetYear: number ) {
		const params = new URLSearchParams( {
			month: String( targetMonth ),
			studentId,
			year: String( targetYear ),
		} );

		router.replace( `/coach/training-routine?${ params.toString() }` );
	}

	function stepMonth( offset: -1 | 1 ) {
		const target = new Date( year, month - 1 + offset, 1 );

		goToMonth( target.getMonth() + 1, target.getFullYear() );
	}

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "@container flex flex-row flex-wrap items-center justify-between gap-3 p-3" }>
				{ /* Cuando el mes y las acciones no entran en un renglon, el mes ocupa todo
				     el ancho, con las flechas en las puntas, y las acciones bajan a un
				     renglon propio. Se decide por el ancho de la tarjeta y no por el de la
				     pantalla: con el menu lateral abierto la tarjeta es mucho mas angosta. */ }
				<div className={ `flex min-w-0 items-center gap-1 @xl:w-auto @xl:flex-none ${ routineCount === 0 ? "flex-1" : "w-full" }` }>
					<Button isIconOnly aria-label={ "Mes anterior" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => stepMonth( -1 ) }>
						<ChevronLeft className={ "size-5" }/>
					</Button>
					<MonthJumpPicker
						loadedMonthsQueryFn={ () => unwrapped( getRoutineMonthsWithContentAction )( studentId ) }
						loadedMonthsQueryKey={ [ "coach-routine-months", studentId ] }
						month={ month }
						subtitle={ `Rutina de ${ studentName }` }
						year={ year }
						onSelectAction={ goToMonth }
					/>
					<Button isIconOnly aria-label={ "Mes siguiente" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => stepMonth( 1 ) }>
						<ChevronRight className={ "size-5" }/>
					</Button>
				</div>
				{ /* Sin rutina solo queda "Actualizar": va en el mismo renglon que el mes. */ }
				<div className={ `flex items-center gap-2 @xl:w-auto @xl:shrink-0 ${ routineCount === 0 ? "shrink-0" : "w-full" }` }>
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
