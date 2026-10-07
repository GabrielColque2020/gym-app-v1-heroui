"use client";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { BookmarkCheck, BookmarkPlus, Copy, Download, MoreVertical, RotateCw, Trash2 } from "lucide-react";

type CoachDeleteRoutineActionMenuProps = {
	onDeleteAction: () => void;
	onCopyAction: () => void;
	onPrintAction: () => void;
	onSaveTemplateAction: () => void;
	onUseTemplateAction: () => void;
	isDownloading?: boolean;
};

export function CoachOptionRoutineActionMenu( {
												  onDeleteAction,
												  onCopyAction,
												  onPrintAction,
												  onSaveTemplateAction,
												  onUseTemplateAction,
												  isDownloading = false,
											  }: CoachDeleteRoutineActionMenuProps ) {
	return (
		<Dropdown>
			<Button isIconOnly aria-label={ "Más opciones de la rutina" } variant={ "secondary" }>
				<MoreVertical/>
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu
					onAction={ ( key ) => {
							if (key === "copy-file") onCopyAction();
						if (key === "use-template") onUseTemplateAction();
						if (key === "save-template") onSaveTemplateAction();
						if (key === "print-file") onPrintAction();
						if (key === "delete-file") onDeleteAction();
					} }
				>
					<Dropdown.Section>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "copy-file" } textValue={ "Copiar rutina" }>
							<Copy className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Copiar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "use-template" } textValue={ "Usar una plantilla" }>
							<BookmarkCheck className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Usar una plantilla</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "save-template" } textValue={ "Guardar como plantilla" }>
							<BookmarkPlus className={ "size-4 shrink-0 text-accent" }/>
							<Label className={ "text-accent" }>Guardar como plantilla</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "print-file" } textValue={ "Descargar rutina PDF" }>
							{ isDownloading ? <RotateCw className={ "size-4 shrink-0 animate-spin text-primary" }/> : <Download className={ "size-4 shrink-0 text-primary" }/> }
							<Label className={ "text-primary" }>{ isDownloading ? "Descargando..." : "Descargar PDF" }</Label>
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
