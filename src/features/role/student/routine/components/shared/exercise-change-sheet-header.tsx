import { CircleLink } from "@gravity-ui/icons";
import { Description } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

export function ExerciseChangeSheetHeader() {
	return (
		<Sheet.Header className={ "border-default-100 border-b pb-4" }>
			<div className={ "flex items-start gap-3" }>
				<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
					<CircleLink className={ "size-5" }/>
				</div>
				<div className={ "min-w-0" }>
					<Sheet.Heading>Cambiar ejercicio</Sheet.Heading>
					<Description className={ "mt-1 text-sm" }>
						Selecciona una variante disponible para esta rutina.
					</Description>
				</div>
			</div>
		</Sheet.Header>
	);
}
