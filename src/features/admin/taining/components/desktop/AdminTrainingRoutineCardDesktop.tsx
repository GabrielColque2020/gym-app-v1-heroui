import { Accordion, Alert, Button, Card, Chip, Dropdown, Header, Label } from "@heroui/react";
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
			{ name: "Elevaciones laterales", sets: "3x12" }
		]
	},
	{
		id: 2,
		title: "Espalda + Bíceps",
		exercises: 7,
		exerciseList: [
			{ name: "Dominadas", sets: "4x8" },
			{ name: "Remo con barra", sets: "4x10" },
			{ name: "Pullover", sets: "3x12" },
			{ name: "Curl con barra", sets: "4x10" },
			{ name: "Curl martillo", sets: "3x12" },
			{ name: "Curl concentrado", sets: "3x10" },
			{ name: "Remo en polea", sets: "4x12" }
		]
	},
	{
		id: 3,
		title: "Piernas",
		exercises: 4,
		exerciseList: [
			{ name: "Sentadillas", sets: "4x10" },
			{ name: "Prensa", sets: "4x12" },
			{ name: "Peso muerto", sets: "3x8" },
			{ name: "Extensiones", sets: "3x15" }
		]
	},
];

const weeks = [
	{ id: 1, description: "Semana 1" },
	{ id: 2, description: "Semana 2" },
	{ id: 3, description: "Semana 3" },
	{ id: 4, description: "Semana 4" },
]

export function AdminTrainingRoutineCardDesktop() {

	return (
		<div className={ "w-full grid grid-cols-12 gap-4" }>

			{ /*Left*/ }
			<Card className={ "w-full col-span-3" }>
				<Card.Header>
					<Card.Content>
						<span className={ "text-lg font-bold text-foreground" }>Rutina del Mes</span>
					</Card.Content>
					<Card.Description>Gestiona la rutina del mes seleccionado</Card.Description>
				</Card.Header>
				<Card.Content>
					<RadioButtonGroup
						name={ "plan" }
						variant={ "secondary" }

					>
						{ weeks.map( ( week ) => (
							<RadioButtonGroup.Item
								key={ week.id }
								value={ week.description }
								className={ "custom-radioButtonGroup-item custom-rounded-field shadow-sm" }

							>
								<RadioButtonGroup.ItemContent>
									<div className={ "flex justify-between items-center" }>
										<Label className={ "capitalize font-semibold" }>{ week.description }</Label>
										<Chip color={ "accent" } variant={ "secondary" }>4 dias</Chip>
										<Dropdown>
											<Button isIconOnly variant={ "ghost" }>
												<EllipsisVertical className={ "outline-none size-4" }/>
											</Button>
											<Dropdown.Popover>
												<Dropdown.Menu onAction={ ( key ) => console.log( `Selected: ${ key }` ) }>
													<Dropdown.Section>
														<Header>Opciones</Header>
														<Dropdown.Item id={ "delete-file" } textValue={ "Delete file" } variant={ "danger" }>
															<TrashBin className={ "size-4 shrink-0 text-danger" }/>
															<Label>Eliminar</Label>
														</Dropdown.Item>
													</Dropdown.Section>
												</Dropdown.Menu>
											</Dropdown.Popover>
										</Dropdown>
									</div>
								</RadioButtonGroup.ItemContent>
							</RadioButtonGroup.Item>
						) ) }
					</RadioButtonGroup>
					<Button
						fullWidth
						variant={ "ghost" }
						className={ "bg-accent-foreground border border-dashed border-accent/50 text-accent mt-2" }
					>
						<Plus/> Agregar Semana</Button>

					<Alert status={ "accent" } className={ "mt-4 bg-background shadow-sm" }>
						<Alert.Indicator/>
						<Alert.Content>
							<Alert.Title>Podes crear hasta 4 semanas por mes</Alert.Title>
							<Alert.Description>
								Cada semana puede tener hasta 6 días de entrenamiento
							</Alert.Description>
						</Alert.Content>
					</Alert>

				</Card.Content>

			</Card>

			{ /*Right*/ }
			<Card className={ "w-full col-span-9" }>
				<Card.Header>
					<Card.Title className={ "text-lg font-bold text-foreground" }>Semana 1</Card.Title>
					<Card.Description>Gestiona la rutina del mes seleccionado</Card.Description>
				</Card.Header>
				<Card.Content>
					<Accordion
						allowsMultipleExpanded
						hideSeparator
						className={ "w-full space-y-3" }
					>
						{ days.map( ( day ) => (
							<Accordion.Item
								key={ day.id }
								className={ "overflow-hidden rounded-lg border border-border/80 shadow-sm ring-1 ring-border/40" }
							>
								<Accordion.Trigger className={ "group flex w-full items-center justify-between gap-3" }>
									<div className={ "flex min-w-0 items-center gap-3" }>
										<div
											className={ "flex size-6 shrink-0 items-center justify-center rounded-full border bg-accent text-sm font-bold text-accent-foreground" }>
											{ day.id }
										</div>
										<span className={ "truncate text-base font-semibold text-foreground" }>
											Dia { day.id }
										</span>
									</div>
									<div className={ "flex shrink-0 items-center gap-3" }>
										<Chip color={ "accent" } variant={ "soft" }>
											{ day.exercises } ejercicios
										</Chip>
										<Accordion.Indicator/>
									</div>
								</Accordion.Trigger>

								<Accordion.Panel>
									<Accordion.Body>
										<div className={ "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" }>
											<div className={ "grid grid-cols-1 gap-3 px-4 py-2 sm:grid-cols-2 sm:px-8" }>
												{
													day.exerciseList.map( ( exercise, index ) => (
														<div key={ index } className={ "flex items-center gap-2" }>
															<CircleFill className={ "text-accent shrink-0 size-2" }/>
															<span><strong>{ exercise.name }: </strong>{ exercise.sets }</span>
														</div>
													) )
												}
											</div>
											<Dropdown>
												<Button isIconOnly aria-label={ "Abrir opciones" } variant={ "ghost" }>
													<EllipsisVertical className={ "size-4" }/>
												</Button>
												<Dropdown.Popover>
													<Dropdown.Menu onAction={ ( key ) => console.log( `Selected: ${ key }` ) }>
														<Dropdown.Section>
															<Header>Opciones</Header>
															<Dropdown.Item id={ "edit" } textValue={ "Editar" }>
																<Pencil className={ "shrink-0 text-warning" }/>
																<Label className={ "text-warning" }>Editar</Label>
															</Dropdown.Item>
															<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
																<TrashBin className={ "size-4 shrink-0 text-danger" }/>
																<Label>Eliminar</Label>
															</Dropdown.Item>
														</Dropdown.Section>
													</Dropdown.Menu>
												</Dropdown.Popover>
											</Dropdown>

										</div>
									</Accordion.Body>
								</Accordion.Panel>
							</Accordion.Item>
						) ) }
					</Accordion>
					<Button
						fullWidth
						variant={ "ghost" }
						className={ "bg-accent-foreground border border-dashed border-accent/50 text-accent mt-2" }
					>
						<Plus/><strong> Agregar Dia</strong> (max 6
						por semana)</Button>
				</Card.Content>
			</Card>
		</div>
	)
}
