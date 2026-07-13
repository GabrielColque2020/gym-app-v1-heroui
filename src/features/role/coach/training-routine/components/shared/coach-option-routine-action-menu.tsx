"use client";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { Copy, MoreVertical, PencilLine, Trash2 } from "lucide-react";

type CoachDeleteRoutineActionMenuProps = {
	onDeleteAction: () => void;
	onCopyAction: () => void;
	onEditAction: () => void;
};

export function CoachOptionRoutineActionMenu( {
												  onDeleteAction,
												  onCopyAction,
												  onEditAction,
											  }: CoachDeleteRoutineActionMenuProps ) {
	return (
		<Dropdown>
			<Button isIconOnly aria-label={ "Menu" } variant={ "secondary" }>
				<MoreVertical/>
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu
					onAction={ ( key ) => {
						if (key === "edit-file") onEditAction();
						if (key === "copy-file") onCopyAction();
						if (key === "delete-file") onDeleteAction();
					} }
				>
					<Dropdown.Section>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit-file" } textValue={ "Editar rutina" }>
							<PencilLine className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "copy-file" } textValue={ "Copiar rutina" }>
							<Copy className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Copiar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete-file" } textValue={ "Eliminar rutina" } variant={ "danger" }>
							<Trash2 className={ "size-4 shrink-0 text-danger" }/>
							<Label className={ "text-danger" }>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Section>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
