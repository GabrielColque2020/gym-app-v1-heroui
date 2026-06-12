"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, Button, Card, Chip, Description, Dropdown, Header, Label, ScrollShadow, Typography } from "@heroui/react";
import { RadioButtonGroup } from "@heroui-pro/react";
import { CircleFill, EllipsisVertical, Pencil, Plus, TrashBin } from "@gravity-ui/icons";

const days = [
	{
		id: 1,
		title: "Pecho + Hombros",
		exercises: 5,
		exerciseList: [
			{ name: "Press banca", sets: "4x8" },
			{ name: "Press inclinado", sets: "4x10" },
			{ name: "Aperturas", sets: "3x15" },
			{ name: "Press hombros", sets: "4x8" },
			{ name: "Elevaciones laterales", sets: "3x12" },
		],
	},
	{
		id: 2,
		title: "Espalda + Biceps",
		exercises: 7,
		exerciseList: [
			{ name: "Dominadas", sets: "4x8" },
			{ name: "Remo con barra", sets: "4x10" },
			{ name: "Pullover", sets: "3x12" },
			{ name: "Curl con barra", sets: "4x10" },
			{ name: "Curl martillo", sets: "3x12" },
			{ name: "Curl concentrado", sets: "3x10" },
			{ name: "Remo en polea", sets: "4x12" },
		],
	},
	{
		id: 3,
		title: "Piernas",
		exercises: 4,
		exerciseList: [
			{ name: "Sentadillas", sets: "4x10" },
			{ name: "Prensa", sets: "4x12" },
			{ name: "Peso muerto", sets: "3x8" },
			{ name: "Extensiones", sets: "3x15" },
		],
	},
];

const weeks = [
	{ id: 1, description: "Semana 1", days: 4 },
	{ id: 2, description: "Semana 2", days: 4 },
	{ id: 3, description: "Semana 3", days: 4 },
	{ id: 4, description: "Semana 4", days: 4 },
];

function OptionsMenu( { type }: { type: "week" | "day" } ) {
	const router = useRouter();

	const handleAction = ( key: string | number ) => {
		if (type === "day" && key === "edit") {
			router.push( "/admin/routine" );
		}
	};

	return (
		<Dropdown>
			<Button isIconOnly aria-label={ "Abrir opciones" } className={ "size-8 shrink-0 text-muted" } variant={ "ghost" }>
				<EllipsisVertical className={ "" }/>
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu onAction={ ( key ) => handleAction( key ) }>
					<Dropdown.Section>
						<Header>Opciones</Header>
						{ type === "day" && (
							<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
								<Pencil className={ "size-4 shrink-0 text-warning" }/>
								<Label className={ "text-warning" }>Editar</Label>
							</Dropdown.Item>
						) }
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
							<TrashBin className={ "size-4 shrink-0 text-danger" }/>
							<Label>Eliminar</Label>
						</Dropdown.Item>
					</Dropdown.Section>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}

export function AdminTrainingRoutineCardDesktop() {
	const [ selectedWeek, setSelectedWeek ] = useState( weeks[ 0 ].description );
	const currentWeek = useMemo(
		() => weeks.find( ( week ) => week.description === selectedWeek ) ?? weeks[ 0 ],
		[ selectedWeek ],
	);

	return (
		<div className={ "grid w-full grid-cols-12 gap-4" }>
			<Card className={ "col-span-4 w-full overflow-hidden" }>
				<Card.Header className={ "gap-3 pb-3 pt-2" }>
					<Card.Content className={ "min-w-0" }>
						<Card.Title className={ "text-base font-semibold" }>Rutina del mes</Card.Title>
						<Card.Description className={ "text-sm" }>Gestiona semanas y dias</Card.Description>
						<Chip className={ "shrink-0 w-fit px-2" } color={ "accent" } size={ "sm" } variant={ "soft" }>
							{ weeks.length } semanas
						</Chip>
					</Card.Content>
				</Card.Header>

				<Card.Content className={ "grid gap-3 pb-4" }>
					<div className={ "flex items-center justify-between gap-3" }>
						<Label className={ "text-sm font-semibold" }>Semana</Label>
						<OptionsMenu type={ "week" }/>
					</div>

					<ScrollShadow className={ "max-h-105 pr-1" }>
						<RadioButtonGroup
							className={ "grid gap-2 [--radio-button-group-item-radius:0.75rem] px-0.5 py-1" }
							name={ "routine-week-desktop" }
							value={ selectedWeek }
							variant={ "secondary" }
							onChange={ ( value ) => setSelectedWeek( value as string ) }
						>
							{ weeks.map( ( week ) => (
								<RadioButtonGroup.Item key={ week.id } className={ "w-full gap-2 px-3 py-2.5" } value={ week.description }>
									<RadioButtonGroup.Indicator/>
									<RadioButtonGroup.ItemContent>
										<Label className={ "text-sm" }>{ week.description }</Label>
										<Description className={ "text-xs" }>{ week.days } dias</Description>
									</RadioButtonGroup.ItemContent>
								</RadioButtonGroup.Item>
							) ) }
						</RadioButtonGroup>
					</ScrollShadow>

					<Button
						fullWidth
						variant={ "ghost" }
						className={ "h-10 border border-dashed border-accent/50 bg-accent-foreground text-accent" }
					>
						<Plus className={ "size-4" }/>
						Agregar semana
					</Button>
				</Card.Content>
			</Card>

			<Card className={ "col-span-8 w-full overflow-hidden" }>
				<Card.Header className={ "gap-3 pb-3 pt-2" }>
					<div className={ "flex w-full items-center justify-between gap-3" }>
						<div className={ "flex flex-col gap-1" }>
							<Card.Title className={ "text-base font-semibold" }>{ currentWeek.description } </Card.Title>
							<Card.Description className={ "text-sm" }>Dias de entrenamiento</Card.Description>
						</div>
						<Button
							variant={ "ghost" }
							className={ "h-9 shrink-0 border border-dashed border-accent/50 bg-accent-foreground px-3 text-accent" }
						>
							<Plus className={ "size-4" }/>
							Agregar dia
						</Button>
					</div>
				</Card.Header>

				<Card.Content className={ "pb-4" }>
					<Accordion allowsMultipleExpanded hideSeparator className={ "w-full space-y-2" }>
						{ days.map( ( day ) => (
							<Accordion.Item
								key={ day.id }
							>
								<div className={ "overflow-hidden rounded-xl border border-default bg-surface shadow-sm" }>
									<Accordion.Trigger className={ "group flex w-full  justify-between gap-2 px-3 py-2.5" }>
										<div className={ "flex min-w-0 items-center gap-2" }>
											<div className={ "flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground" }>
												{ day.id }
											</div>
											<div className={ "min-w-0" }>
												<Typography type={ "body-sm" } weight={ "semibold" } truncate>Dia { day.id }</Typography>
												<Typography type={ "body-xs" } color={ "muted" } weight={ "normal" }>{ day.title } </Typography>
											</div>
										</div>
										<div className={ "flex shrink-0 items-center gap-1.5" }>
											<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
												{ day.exercises }
											</Chip>
											<Accordion.Indicator/>
										</div>
									</Accordion.Trigger>

									<Accordion.Panel>
										<Accordion.Body className={ "px-3 pb-3 pt-0" }>
											<div className={ "grid gap-2" }>
												<div className={ "grid grid-cols-2 gap-2 rounded-xl bg-default/40 p-3" }>
													{ day.exerciseList.map( ( exercise, index ) => (
														<div key={ `${ day.id }-${ exercise.name }-${ index }` } className={ "flex min-w-0 items-center gap-2 text-sm" }>
															<CircleFill className={ "size-2 shrink-0 text-accent" }/>
															<span className={ "min-w-0 flex-1 truncate font-medium" }>{ exercise.name }</span>
															<span className={ "shrink-0 text-muted" }>{ exercise.sets }</span>
														</div>
													) ) }
												</div>
												<div className={ "flex justify-end" }>
													<OptionsMenu type={ "day" }/>
												</div>
											</div>
										</Accordion.Body>
									</Accordion.Panel>
								</div>
							</Accordion.Item>
						) ) }
					</Accordion>
				</Card.Content>
			</Card>
		</div>
	);
}
