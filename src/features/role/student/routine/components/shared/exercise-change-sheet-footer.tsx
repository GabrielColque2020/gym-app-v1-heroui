import { Button } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

type ExerciseChangeSheetFooterProps = {
	placement: "bottom" | "right";
};

export function ExerciseChangeSheetFooter( {
	placement,
}: ExerciseChangeSheetFooterProps ) {
	return (
		<Sheet.Footer
			className={
				placement === "right"
					? "border-default-100 flex shrink-0 justify-end gap-2 border-t px-6 py-4"
					: "border-default-100 flex shrink-0 justify-end gap-2 border-t px-4 py-4"
			}
		>
			<Sheet.Close>
				<Button variant={ "secondary" }>
					Cerrar
				</Button>
			</Sheet.Close>
		</Sheet.Footer>
	);
}
