"use client";

import { EllipsisVertical, Pencil } from "@gravity-ui/icons";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type CoachTrainingRoutineDayOptionsMenuProps = {
	month: number;
	routineDayId: string;
	studentId: string;
	year: number;
};

export function CoachTrainingRoutineDayOptionsMenu( {
	month,
	routineDayId,
	studentId,
	year,
}: CoachTrainingRoutineDayOptionsMenuProps ) {
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement | null>( null );

	function handleEdit() {
		const params = new URLSearchParams( {
			month: String( month ),
			routineDayId,
			studentId,
			year: String( year ),
		} );

		router.push( `/coach/routine?${ params.toString() }` );
	}

	return (
		<div ref={ menuRef } className={ "relative" }>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ "Menu" }
					variant={ "outline" }
					className={ "border border-accent/50 text-accent shadow-s" }
				>
					<EllipsisVertical/>
				</Button>
				<Dropdown.Popover>
					<Dropdown.Menu onAction={ ( key ) => {
						if (key === "edit-day") {
							handleEdit();
						}
					} }>
						<Dropdown.Section>
							<Header>Opciones</Header>
							<Dropdown.Item id={ "edit-day" } textValue={ "Editar Dia" } variant={ "default" }>
								<Pencil className={ "size-4 shrink-0 text-warning" }/>
								<Label className={ "text-warning" }>Editar</Label>
							</Dropdown.Item>
						</Dropdown.Section>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>
		</div>
	);
}
