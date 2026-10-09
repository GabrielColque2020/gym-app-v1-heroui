"use client";

import { Button, Spinner } from "@heroui/react";
import { EllipsisVertical } from "lucide-react";

type MoreActionsButtonProps = {
	// A quien pertenecen las opciones, para quien usa lector de pantalla.
	ariaLabel: string;
	className?: string;
	isDisabled?: boolean;
	// Hay una accion del menu en curso.
	isPending?: boolean;
	variant?: "ghost" | "secondary";
};

// Los tres puntos que abren el menu de opciones de una fila o tarjeta. Un solo
// boton para todos los menus, asi se ven y se comportan igual. Lo que mas se usa
// ("Abrir", "Ver", "Editar") no va aca adentro: tiene su propio boton a la vista.
// Va dentro de un `Dropdown`, que lo toma como disparador.
export function MoreActionsButton( {
	ariaLabel,
	className,
	isDisabled = false,
	isPending = false,
	variant = "ghost",
}: MoreActionsButtonProps ) {
	return (
		<Button
			isIconOnly
			aria-label={ ariaLabel }
			className={ `size-8 shrink-0 text-foreground ${ className ?? "" }` }
			isDisabled={ isDisabled }
			size={ "sm" }
			variant={ variant }
		>
			{ isPending ? (
				<Spinner color={ "current" } size={ "sm" }/>
			) : (
				<EllipsisVertical aria-hidden className={ "size-4" }/>
			) }
		</Button>
	);
}
