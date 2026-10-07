"use client";

import { Button, Drawer, Spinner, Typography } from "@heroui/react";
import { Copy } from "lucide-react";

type CoachCopyRoutineDrawerFooterProps = {
	// Texto de la pregunta final; solo se usa cuando la copia pisa algo.
	confirmQuestion: string;
	isConfirming: boolean;
	isPending: boolean;
	onCancelConfirmAction: () => void;
	onPrimaryAction: () => void;
	primaryDisabled: boolean;
	primaryLabel: string;
	willReplace: boolean;
};

// Pie del drawer de copiar. Si la copia reemplaza rutina que ya existe, el primer
// toque no copia: pide confirmar, porque lo reemplazado no se recupera.
export function CoachCopyRoutineDrawerFooter( {
	confirmQuestion,
	isConfirming,
	isPending,
	onCancelConfirmAction,
	onPrimaryAction,
	primaryDisabled,
	primaryLabel,
	willReplace,
}: CoachCopyRoutineDrawerFooterProps ) {
	return (
		<Drawer.Footer className={ "border-default-100 shrink-0 flex-col items-stretch gap-2 border-t pt-4" }>
			{ isConfirming ? (
				<Typography className={ "text-sm font-medium text-danger" } role={ "alert" }>
					{ confirmQuestion }
				</Typography>
			) : null }
			<div className={ "flex justify-end gap-2" }>
				{ isConfirming ? (
					<Button className={ "flex-1 sm:flex-none" } isDisabled={ isPending } variant={ "secondary" } onPress={ onCancelConfirmAction }>
						Volver
					</Button>
				) : (
					<Button slot={ "close" } className={ "flex-1 sm:flex-none" } isDisabled={ isPending } variant={ "secondary" }>
						Cancelar
					</Button>
				) }
				<Button
					className={ `min-w-0 flex-1 sm:flex-none ${ willReplace ? "bg-danger text-danger-foreground" : "" }` }
					isDisabled={ primaryDisabled }
					isPending={ isPending }
					onPress={ onPrimaryAction }
				>
					{ ( { isPending: isButtonPending } ) => (
						<>
							{ isButtonPending ? <Spinner color={ "current" } size={ "sm" }/> : <Copy className={ "size-4" }/> }
							<span className={ "truncate" }>{ isButtonPending ? "Copiando..." : primaryLabel }</span>
						</>
					) }
				</Button>
			</div>
		</Drawer.Footer>
	);
}
