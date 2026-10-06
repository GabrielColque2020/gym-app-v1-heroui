import { Play } from "lucide-react";

import { AsyncMedia } from "@/components/common";

type ExerciseExecutionTriggerProps = {
	className: string;
	exerciseName: string;
	imageUrl?: string | null;
	onPressAction: () => void;
};

// La imagen del ejercicio abre como se hace (video e instrucciones). Es donde el
// estudiante toca primero cuando duda; antes solo estaba dentro del menu.
export function ExerciseExecutionTrigger( {
	className,
	exerciseName,
	imageUrl,
	onPressAction,
}: ExerciseExecutionTriggerProps ) {
	return (
		<button
			aria-label={ `Ver cómo se hace ${ exerciseName }` }
			className={ `relative shrink-0 overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent ${ className }` }
			type={ "button" }
			onClick={ onPressAction }
		>
			<AsyncMedia
				alt={ `Imagen de ${ exerciseName }` }
				className={ "h-full w-full bg-transparent" }
				emptyLabel={ "Sin imagen" }
				mediaClassName={ "bg-transparent" }
				spinnerLabel={ `Cargando imagen de ${ exerciseName }` }
				src={ imageUrl }
			/>
			<span className={ "absolute bottom-1 right-1 flex size-6 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm" }>
				<Play className={ "size-3" }/>
			</span>
		</button>
	);
}
