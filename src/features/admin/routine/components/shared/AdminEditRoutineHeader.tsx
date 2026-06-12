import { PageHeader } from "@/components/common";
import { Button } from "@heroui/react";
import { FloppyDisk } from "@gravity-ui/icons";

export function AdminEditRoutineHeader() {
	return (
		<header className={ "flex flex-col gap-3 md:flex-row md:items-end md:justify-between" }>
			<PageHeader
				title={ "Editar Día 1" }
				description={ "Semana 1 · Mayo 2026" }
			/>
			<Button className={ "bg-accent text-accent-foreground" }><FloppyDisk/>Guardar cambios</Button>
		</header>
	)
}