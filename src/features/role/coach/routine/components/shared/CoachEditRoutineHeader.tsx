import { FloppyDisk } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

import { PageHeader } from "@/components/common";

type CoachEditRoutineHeaderProps = {
	description: string;
	isSaveDisabled?: boolean;
	isSaving?: boolean;
	onSave: () => void;
	title: string;
};

export function CoachEditRoutineHeader( {
	description,
	isSaveDisabled = false,
	isSaving = false,
	onSave,
	title,
}: CoachEditRoutineHeaderProps ) {
	return (
		<header className={ "flex flex-col gap-3 md:flex-row md:items-end md:justify-between" }>
			<div className={ "flex min-w-0 flex-col gap-3" }>
				<PageHeader title={ title } description={ description }/>
			</div>
			<Button
				className={ "bg-accent text-accent-foreground" }
				isDisabled={ isSaveDisabled }
				isPending={ isSaving }
				onPress={ onSave }
			>
				{ isSaving ? <Spinner color={ "current" } size={ "sm" }/> : <FloppyDisk className={ "size-4" }/> }
				{ isSaving ? "Guardando..." : "Guardar cambios" }
			</Button>
		</header>
	);
}
