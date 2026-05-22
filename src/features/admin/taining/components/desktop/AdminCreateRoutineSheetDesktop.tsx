import { Sheet } from "@heroui-pro/react";
import { Button, Checkbox, CheckboxGroup, Description, Label, Surface } from "@heroui/react";
import { CircleCheck, Plus } from "@gravity-ui/icons";
import React from "react";

const WEEKS_OPTIONS = [
	{ value: "week1", label: "Semana 1" },
	{ value: "week2", label: "Semana 2" },
	{ value: "week3", label: "Semana 3" },
	{ value: "week4", label: "Semana 4" }
];

const DAYS_OPTIONS = [
	{ value: "day1", label: "Dia 1" },
	{ value: "day2", label: "Dia 2" },
	{ value: "day3", label: "Dia 3" },
	{ value: "day4", label: "Dia 4" },
	{ value: "day5", label: "Dia 5" }
];

export function AdminCreateRoutineSheetDesktop() {
	return (
		<Sheet key={ "SheetWeb" } isDetached placement={ "right" }>
			<Sheet.Trigger>
				{ /*className={ "text-accent border-accent" }*/ }
				<Button
					variant={ "outline" }
					className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				>
					<Plus/>
					Crear Rutina
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop>
				<Sheet.Content className={ "w-77.5 " }>
					<Sheet.Dialog className={ "h-full" }>
						<Sheet.Body className={ "flex flex-col gap-4 py-5" }>
							<Sheet.Heading>Crear Rutina</Sheet.Heading>
							<p className={ "text-muted text-sm" }>
								Crea una nueva rutina desde cero, eligiendo las semanas y dias.
							</p>
							<CheckboxGroup name={ "weeks" }>
								<Label>Seleccione </Label>
								<Description>Semanas de la rutina</Description>
								<div className={ "grid grid-cols-2 gap-2" }>
									{ WEEKS_OPTIONS.map( ( week ) => (
										<Checkbox key={ week.value } value={ week.value }>
											<Checkbox.Control>
												<Checkbox.Indicator/>
											</Checkbox.Control>
											<Checkbox.Content>
												<Label>{ week.label }</Label>
											</Checkbox.Content>
										</Checkbox>
									) ) }
								</div>
							</CheckboxGroup>

							<CheckboxGroup name={ "days" } className={ "mt-2" }>
								<Label>Seleccione </Label>
								<Description>Dias de la semana</Description>
								<div className={ "grid grid-cols-2 gap-2" }>
									{ DAYS_OPTIONS.map( ( day ) => (
										<Checkbox key={ day.value } value={ day.value }>
											<Checkbox.Control>
												<Checkbox.Indicator/>
											</Checkbox.Control>
											<Checkbox.Content>
												<Label>{ day.label }</Label>
											</Checkbox.Content>
										</Checkbox>
									) ) }
								</div>
							</CheckboxGroup>

							<Button fullWidth>
								<CircleCheck/>
								Crear Rutina
							</Button>

						</Sheet.Body>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	)
}