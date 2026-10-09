import { unwrapped } from "@/lib/action-result";
import { Button, Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, Download, RotateCw } from "lucide-react";

import { MonthJumpPicker } from "@/components/common/month-jump-picker";
import { getRoutineMonthsWithContentAction } from "@/features/role/student/training-routine/actions/get-routine-months-with-content";

type TrainingRoutinesMonthHeaderProps = {
	isDownloadDisabled: boolean;
	isDownloading: boolean;
	isRefreshing: boolean;
	month: number;
	objective?: string | null;
	onChangeMonthAction: ( offset: -1 | 1 ) => void;
	onDownloadAction: () => void;
	onRefreshAction: () => void;
	onSelectMonthAction: ( month: number, year: number ) => void;
	year: number;
};

// Encabezado del mes: se pasa de un mes a otro con las flechas, igual que en la
// pantalla del entrenador. Reemplaza al titulo y a los selectores de año y mes,
// que en el telefono ocupaban la primera pantalla antes de mostrar un solo dia.
// Para ir mas lejos, el titulo abre un selector de mes.
export function TrainingRoutinesMonthHeader( {
	isDownloadDisabled,
	isDownloading,
	isRefreshing,
	month,
	objective,
	onChangeMonthAction,
	onDownloadAction,
	onRefreshAction,
	onSelectMonthAction,
	year,
}: TrainingRoutinesMonthHeaderProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "flex flex-row flex-wrap items-center justify-between gap-2 p-3" }>
				<div className={ "flex min-w-0 flex-1 items-center gap-1 sm:flex-none" }>
					<Button isIconOnly aria-label={ "Mes anterior" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => onChangeMonthAction( -1 ) }>
						<ChevronLeft className={ "size-5" }/>
					</Button>
					<MonthJumpPicker
						loadedMonthsQueryFn={ unwrapped( getRoutineMonthsWithContentAction ) }
						loadedMonthsQueryKey={ [ "student-routine-months" ] }
						month={ month }
						subtitle={ "Tu rutina del mes" }
						year={ year }
						onSelectAction={ onSelectMonthAction }
					/>
					<Button isIconOnly aria-label={ "Mes siguiente" } className={ "h-8 w-8 min-w-8 sm:h-10 sm:w-10" } variant={ "ghost" } onPress={ () => onChangeMonthAction( 1 ) }>
						<ChevronRight className={ "size-5" }/>
					</Button>
				</div>
				<div className={ "flex shrink-0 items-center gap-2" }>
					{ /* En el telefono no entra junto al mes sin partir el titulo, y no hace
					     falta: la pantalla ya pide lo ultimo cada vez que se abre. */ }
					<Button
						isIconOnly
						aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
						className={ "hidden sm:inline-flex" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					</Button>
					<Button
						isIconOnly
						aria-label={ isDownloading ? "Descargando" : "Descargar la rutina en PDF" }
						isDisabled={ isDownloadDisabled }
						variant={ "secondary" }
						onPress={ onDownloadAction }
					>
						{ isDownloading ? <RotateCw className={ "size-4 animate-spin" }/> : <Download className={ "size-4" }/> }
					</Button>
				</div>
				{ objective?.trim() ? (
					<p className={ "w-full text-sm text-muted" }>
						<span className={ "font-medium text-foreground" }>Objetivo del mes:</span> { objective }
					</p>
				) : null }
			</Card.Content>
		</Card>
	);
}
