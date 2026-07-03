import { CircleLink } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import type { ExerciseVariantsTarget } from "./exercise-variants-sheet.types";

type ExerciseVariantsTriggerProps = {
	className?: string;
	exercise: ExerciseVariantsTarget;
	isDisabled?: boolean;
	onPress: () => void;
	showLabel: boolean;
};

// Renderiza el boton disparador que abre el panel de variantes.
export function ExerciseVariantsTrigger( {
	className,
	exercise,
	isDisabled,
	onPress,
	showLabel,
}: ExerciseVariantsTriggerProps ) {
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
			<CircleLink className={ "size-4" }/>
			{ showLabel ? "Variantes" : null }
		</Button>
	);
}
