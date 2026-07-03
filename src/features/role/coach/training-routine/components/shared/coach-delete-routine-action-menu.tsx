"use client";

import { Copy, EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Dropdown, Header, Label } from "@heroui/react";

type CoachDeleteRoutineActionMenuProps = {
	onDelete: () => void;
	onCopy: () => void;
	onEdit: () => void;
};

export function CoachDeleteRoutineActionMenu( {
	onDelete,
	onCopy,
	onEdit,
}: CoachDeleteRoutineActionMenuProps ) {
	return (
		<Dropdown>
			<Button isIconOnly aria-label={ "Menu" } variant={ "outline" } className={ "border border-accent/50 text-accent shadow-s" }>
				<EllipsisVertical/>
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu
					onAction={ ( key ) => {
						if (key === "edit-file") onEdit();
						if (key === "copy-file") onCopy();
						if (key === "delete-file") onDelete();
					} }
				>
					<Dropdown.Section>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "edit-file" } textValue={ "Editar rutina" }>
							<Pencil className={ "size-4 shrink-0 text-warning" }/>
							<Label className={ "text-warning" }>Editar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "copy-file" } textValue={ "Copiar rutina" }>
							<Copy className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Copiar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "delete-file" } textValue={ "Eliminar rutina" } variant={ "danger" }>
							<TrashBin className={ "size-4 shrink-0 text-danger" }/>
							<Label className={ "text-danger" }>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Section>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
