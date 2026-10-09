"use client";

import type { ExerciseProgressDetail, ExerciseProgressListItem } from "@/features/exercise-progress/services/exercise-progress";

import { Label, ListBox, Select, Spinner } from "@heroui/react";

import { ErrorAlert } from "@/components/common";
import { ExerciseProgressView } from "@/features/exercise-progress/components/exercise-progress-view";

type ExerciseProgressPanelProps = {
	// Que decir cuando el estudiante todavia no cargo ninguna serie.
	emptyDescription: string;
	exercises: ExerciseProgressListItem[];
	isError: boolean;
	isLoading: boolean;
	isRetrying?: boolean;
	progress: {
		data: ExerciseProgressDetail | null | undefined;
		isError: boolean;
		isFetching?: boolean;
		isLoading: boolean;
		refetch?: () => unknown;
	};
	selectedExerciseId: string | null;
	onRetryAction?: () => void;
	onSelectAction: ( exerciseId: string ) => void;
};

// El selector de ejercicio y su progreso. Lo comparten la pantalla del
// estudiante y la del entrenador: cambia de donde salen los datos, no lo que se ve.
export function ExerciseProgressPanel( {
	emptyDescription,
	exercises,
	isError,
	isLoading,
	isRetrying = false,
	progress,
	selectedExerciseId,
	onRetryAction,
	onSelectAction,
}: ExerciseProgressPanelProps ) {
	if (isLoading) {
		return (
			<div className={ "flex justify-center py-10" }>
				<Spinner aria-label={ "Cargando el progreso" }/>
			</div>
		);
	}

	if (isError) {
		return (
			<ErrorAlert
				isRetrying={ isRetrying }
				message={ "Revisá la conexión y probá de nuevo." }
				title={ "No se pudo cargar el progreso" }
				onRetryAction={ onRetryAction }
			/>
		);
	}

	if (exercises.length === 0) {
		return (
			<div className={ "mx-auto max-w-md py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>Todavía no hay nada para mostrar</p>
				<p className={ "mt-1 text-sm leading-6 text-muted" }>{ emptyDescription }</p>
			</div>
		);
	}

	return (
		<>
			<Select
				fullWidth
				value={ selectedExerciseId }
				onChange={ ( key ) => {
					if (key !== null) onSelectAction( String( key ) );
				} }
			>
				<Label>Ejercicio</Label>
				<Select.Trigger className={ "border border-border" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						{ exercises.map( ( exercise ) => (
							<ListBox.Item key={ exercise.exerciseId } id={ exercise.exerciseId } textValue={ exercise.name }>
								<span className={ "min-w-0 flex-1" }>{ exercise.name }</span>
								{ /* El punto separa el nombre de la cantidad cuando se ven en un
								     solo renglon, en el campo cerrado. El margen le deja lugar a la
								     marca del elegido, que si no tapaba la cantidad. */ }
								<span className={ "me-5 shrink-0 text-xs text-muted" }>
									{ " · " }{ exercise.sessionCount === 1 ? "1 sesión" : `${ exercise.sessionCount } sesiones` }
								</span>
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>

			{ progress.isLoading ? (
				<div className={ "flex justify-center py-10" }>
					<Spinner aria-label={ "Cargando el ejercicio" }/>
				</div>
			) : progress.isError ? (
				<ErrorAlert
					isRetrying={ progress.isFetching }
					message={ "Revisá la conexión y probá de nuevo." }
					title={ "No se pudo cargar este ejercicio" }
					onRetryAction={ progress.refetch ? () => void progress.refetch?.() : undefined }
				/>
			) : progress.data ? (
				<ExerciseProgressView detail={ progress.data }/>
			) : (
				<p className={ "py-10 text-center text-sm text-muted" }>Ese ejercicio ya no existe. Elegí otro de la lista.</p>
			) }
		</>
	);
}
