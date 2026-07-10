import { Button } from "@heroui/react";
import { Link2 } from "lucide-react";

import type { ExerciseVariantsTarget } from "./exercise-variants-drawer.types";

type ExerciseVariantsDrawerTriggerProps = {
	className?: string;
	exercise: ExerciseVariantsTarget;
	isDisabled?: boolean;
	onPress: () => void;
	showLabel: boolean;
};

// Renderiza el boton disparador que abre el panel de variantes.
export function ExerciseVariantsDrawerTrigger( {
												   className,
												   exercise,
												   isDisabled,
												   onPress,
												   showLabel,
											   }: ExerciseVariantsDrawerTriggerProps ) {
	return (
		<Button
			isIconOnly={ !showLabel }
			aria-label={ `Gestionar variantes de ${ exercise.name }` }
			className={ className }
			isDisabled={ isDisabled }
			size={ "sm" }
			variant={ "ghost" }
			onPress={ onPress }
		>
			<Link2 className={ "size-4" }/>
			{ showLabel ? "Variantes" : null }
		</Button>
	);
}
