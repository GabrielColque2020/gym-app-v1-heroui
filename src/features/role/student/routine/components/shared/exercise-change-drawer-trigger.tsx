import { Button, Dropdown, Header, Label } from "@heroui/react";
import { ArrowLeftRight, EllipsisVertical, Eye } from "lucide-react";

type ExerciseChangeDrawerTriggerProps = {
	hasVariants: boolean;
	onOpen: () => void;
	onViewExecution: () => void;
};

export function ExerciseChangeDrawerTrigger( {
	hasVariants,
	onOpen,
	onViewExecution,
}: ExerciseChangeDrawerTriggerProps ) {
	return (
		<Dropdown>
			<Button isIconOnly aria-label={ "Opciones del ejercicio" } variant={ "ghost" }>
				<EllipsisVertical className={ "size-5" }/>
			</Button>
			<Dropdown.Popover placement={ "bottom start" }>
				<Dropdown.Menu
					onAction={ ( key ) => {
						if (key === "change-exercise") onOpen();
						if (key === "view-execution") onViewExecution();
					} }
				>
					<Header>Opciones</Header>
					<Dropdown.Item id={ "change-exercise" } textValue={ "Cambiar ejercicio" } isDisabled={ !hasVariants }>
						<ArrowLeftRight className={ "size-4 shrink-0 text-accent" }/>
						<Label className={ "text-accent" }>Cambiar ejercicio</Label>
					</Dropdown.Item>
					<Dropdown.Item id={ "view-execution" } textValue={ "Ver ejecucion" }>
						<Eye className={ "size-4 shrink-0" }/>
						<Label>Ver ejecucion</Label>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
