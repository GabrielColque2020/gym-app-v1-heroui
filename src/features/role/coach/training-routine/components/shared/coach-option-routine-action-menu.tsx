"use client";

import { Dropdown, Header, Label } from "@heroui/react";
import { BookmarkCheck, BookmarkPlus, Copy, Download, RotateCw, Trash2 } from "lucide-react";
import { MoreActionsButton } from "@/features/shared/components/more-actions-button";

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
			<MoreActionsButton
				ariaLabel={ "Más opciones de la rutina" }
				className={ "h-10 px-3 text-sm" }
				variant={ "secondary" }
			/>
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
							<Copy className={ "size-4 shrink-0 text-foreground" }/>
							<Label>Copiar</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "use-template" } textValue={ "Usar una plantilla" }>
							<BookmarkCheck className={ "size-4 shrink-0 text-foreground" }/>
							<Label>Usar una plantilla</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "save-template" } textValue={ "Guardar como plantilla" }>
							<BookmarkPlus className={ "size-4 shrink-0 text-foreground" }/>
							<Label>Guardar como plantilla</Label>
						</Dropdown.Item>
						<Dropdown.Item id={ "print-file" } textValue={ "Descargar rutina PDF" }>
							{ isDownloading ? <RotateCw className={ "size-4 shrink-0 animate-spin text-foreground" }/> : <Download className={ "size-4 shrink-0 text-foreground" }/> }
							<Label>{ isDownloading ? "Descargando..." : "Descargar PDF" }</Label>
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
