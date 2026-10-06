"use client";

import { Button, Card, Description, Dropdown, Header, Label } from "@heroui/react";
import { Copy } from "lucide-react";

import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

export function EditRoutineDayMainCardEmptyState() {
	const { copyOptions, onCopyFromDay } = useRoutineDayEditorActions();

	return (
		<Card className={ "flex flex-col items-center gap-3 border border-border px-4 py-10 text-center text-sm text-muted" }>
			<p>Este día no tiene ejercicios cargados.</p>
			{ /* Muchos dias repiten otro del mes: se puede arrancar copiandolo en vez de cargar todo de nuevo. */ }
			{ copyOptions.length > 0 ? (
				<Dropdown>
					<Button variant={ "secondary" }>
						<Copy className={ "size-4" }/>
						Copiar ejercicios de otro día
					</Button>
					<Dropdown.Popover>
						<Dropdown.Menu onAction={ ( key ) => onCopyFromDay( String( key ) ) }>
							<Dropdown.Section>
								<Header>Copiar de</Header>
								{ copyOptions.map( ( option ) => (
									<Dropdown.Item key={ option.id } id={ option.id } textValue={ option.label }>
										<div className={ "flex flex-col" }>
											<Label>{ option.label }</Label>
											<Description className={ "text-xs text-muted" }>
												{ option.exerciseCount } { option.exerciseCount === 1 ? "ejercicio" : "ejercicios" }
											</Description>
										</div>
									</Dropdown.Item>
								) ) }
							</Dropdown.Section>
						</Dropdown.Menu>
					</Dropdown.Popover>
				</Dropdown>
			) : null }
		</Card>
	);
}
