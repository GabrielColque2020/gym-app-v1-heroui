"use client";

import { useMemo, useState } from "react";
import {
	Button,
	Card,
	Description,
	Dropdown, Header,
	Input,
	Label,
	ListBox,
	Select,
	Separator,
	TextArea,
	TextField
} from "@heroui/react";
import { EllipsisVertical, Grip, Plus, TrashBin } from "@gravity-ui/icons";
import { AdminEditRoutineHeader } from "@/features/admin/routine/components/shared";
import { Sheet } from "@heroui-pro/react";

type Exercise = {
	id: string;
	name: string;
	group: string;
	sets: string;
	reps: string;
	rest: string;
};

const muscleGroups = [ "Pecho", "Hombros", "Espalda", "Bíceps", "Tríceps", "Piernas" ] as const;

const suggestedExercises = [
	{ id: "press-banca", name: "Press banca", group: "Pecho" },
	{ id: "press-inclinado", name: "Press inclinado con mancuernas", group: "Pecho" },
	{ id: "aperturas-polea", name: "Aperturas en polea", group: "Pecho" },
	{ id: "fondos", name: "Fondos en paralelas", group: "Pecho" },
	{ id: "press-militar", name: "Press militar de pie", group: "Hombros" },
];

const defaultExercises: Exercise[] = [
	{ id: "1", name: "Press banca", group: "Pecho", sets: "5", reps: "5", rest: "90" },
	{ id: "2", name: "Press inclinado con mancuernas", group: "Pecho", sets: "4", reps: "8-10", rest: "75" },
	{ id: "3", name: "Aperturas en polea", group: "Pecho", sets: "3", reps: "12-15", rest: "60" },
];

function ExerciseRow( { exercise, index }: { exercise: Exercise; index: number } ) {
	return (
		<Card className={ "border border-border bg-surface p-3" } variant={ "default" }>
			<div className={ "flex flex-col md:flex-row md:items-center gap-1" }>
				<div className={ "flex items-center gap-2 md:min-w-70" }>

					<div className={ "flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground mr-1" }>
						{ index + 1 }
					</div>
					<div className={ "min-w-0" }>
						<p className={ "truncate text-sm font-semibold text-foreground" }>{ exercise.name }</p>
						<p className={ "text-xs text-muted" }>{ exercise.group }</p>
					</div>
				</div>

				<div className={ "grid flex-1 grid-cols-1 gap-2 sm:grid-cols-4" }>
					<TextField name={ `series-${ exercise.id }` }>
						<Label className={ "text-xs text-muted" }>Series</Label>
						<Input defaultValue={ exercise.sets }/>
					</TextField>
					<TextField name={ `reps-${ exercise.id }` }>
						<Label className={ "text-xs text-muted" }>Repeticiones</Label>
						<Input defaultValue={ exercise.reps }/>
					</TextField>
					<TextField name={ `rest-${ exercise.id }` }>
						<Label className={ "text-xs text-muted" }>Descanso (seg)</Label>
						<Input defaultValue={ exercise.rest }/>
					</TextField>
					<TextField name={ `notes-${ exercise.id }` }>
						<Label className={ "text-xs text-muted" }>Notas</Label>
						<Input defaultValue={ exercise.rest }/>
					</TextField>
				</div>

				<div className={ "flex items-center  gap-2 justify-end" }>
					<Dropdown>
						<Button isIconOnly aria-label={ "Opciones del ejercicio" } className={ "size-8" } variant={ "ghost" }>
							<EllipsisVertical className={ "size-4" }/>
						</Button>
						<Dropdown.Popover>
							<Dropdown.Menu>
								<Header>Opciones</Header>
								<Dropdown.Item id={ "delete" } textValue={ "Eliminar" } variant={ "danger" }>
									<TrashBin className={ "size-4 shrink-0 text-danger" }/>
									<Label>Eliminar</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
				</div>
			</div>
		</Card>
	);
}

function RoutineSheet() {
	return (
		<Sheet isDetached placement={ "right" }>
			<Sheet.Trigger>
				<Button
					variant={ "ghost" }
					className={ "h-9 shrink-0 border border-dashed border-accent/50 bg-accent-foreground px-3 text-accent" }
				>
					<Plus className={ "size-4" }/>
					Agregar ejercicio
				</Button>
			</Sheet.Trigger>
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content className={ "w-full max-w-md" }>
					<Sheet.Dialog className={ "flex h-full max-h-screen min-h-0 flex-col" }>
						<RoutineSheetContent/>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	)
}

function RoutineSheetContent() {

	const [ search, setSearch ] = useState( "" );
	const [ filterGroup, setFilterGroup ] = useState( "all" );

	const filteredSuggestions = useMemo( () => {
		return suggestedExercises.filter( ( exercise ) => {
			const matchText = exercise.name.toLowerCase().includes( search.toLowerCase() );
			const matchGroup = filterGroup === "all" || exercise.group === filterGroup;

			return matchText && matchGroup;
		} );
	}, [ filterGroup, search ] );

	return (
		<>
			<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>

			<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Plus className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Sheet.Heading>Agregar ejercicio</Sheet.Heading>
						<Description className={ "mt-1 text-sm" }>
							Agregar o crear ejercicios nuevos a la rutina.
						</Description>
					</div>
				</div>
			</Sheet.Header>

			<Sheet.Body className={ "space-y-4 overflow-y-auto pb-28 pt-4" }>
				<TextField name={ "search-exercise" }>
					<Label>Buscar ejercicio</Label>
					<Input
						placeholder={ "Ej: Press banca" }
						value={ search }
						onChange={ ( event ) => setSearch( event.target.value ) }
					/>
				</TextField>

				<Select
					defaultValue={ "all" }
					name={ "muscle-group-filter" }
					placeholder={ "Filtrar por grupo muscular" }
					value={ filterGroup }
					onSelectionChange={ ( key ) => setFilterGroup( String( key ) ) }
				>
					<Label>Grupo muscular</Label>
					<Select.Trigger>
						<Select.Value/>
						<Select.Indicator/>
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							<ListBox.Item id={ "all" } textValue={ "Todos" }>
								Todos
								<ListBox.ItemIndicator/>
							</ListBox.Item>
							{ muscleGroups.map( ( group ) => (
								<ListBox.Item key={ group } id={ group } textValue={ group }>
									{ group }
									<ListBox.ItemIndicator/>
								</ListBox.Item>
							) ) }
						</ListBox>
					</Select.Popover>
				</Select>

				<div className={ "space-y-2" }>
					{ filteredSuggestions.map( ( exercise ) => (
						<div
							key={ exercise.id }
							className={ "flex items-center justify-between rounded-xl border border-border bg-surface-secondary p-3" }
						>
							<div>
								<p className={ "text-sm font-medium text-foreground" }>{ exercise.name }</p>
								<p className={ "text-xs text-muted" }>{ exercise.group }</p>
							</div>
							<Button
								isIconOnly
								aria-label={ `Agregar ${ exercise.name }` }
								className={ "bg-accent text-accent-foreground" }
								size={ "sm" }
							>
								<Plus className={ "size-4" }/>
							</Button>
						</div>
					) ) }
				</div>

				<Separator/>

				<div className={ "space-y-3" }>
					<h3 className={ "text-sm font-semibold text-foreground" }>O agregar ejercicio personalizado</h3>
					<TextField name={ "custom-name" }>
						<Label>Nombre del ejercicio</Label>
						<Input/>
					</TextField>

					<Select name={ "custom-group" } placeholder={ "Seleccioná un grupo muscular" }>
						<Label>Grupo muscular</Label>
						<Select.Trigger>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{ muscleGroups.map( ( group ) => (
									<ListBox.Item key={ group } id={ group } textValue={ group }>
										{ group }
										<ListBox.ItemIndicator/>
									</ListBox.Item>
								) ) }
							</ListBox>
						</Select.Popover>
					</Select>

					<div className={ "grid grid-cols-1 gap-3 sm:grid-cols-3" }>
						<TextField name={ "custom-sets" }>
							<Label>Series</Label>
							<Input/>
						</TextField>
						<TextField name={ "custom-reps" }>
							<Label>Repeticiones</Label>
							<Input/>
						</TextField>
						<TextField name={ "custom-rest" }>
							<Label>Descanso en segundos</Label>
							<Input/>
						</TextField>
					</div>

					<TextField name={ "custom-notes" }>
						<Label>Notas opcionales</Label>
						<TextArea className={ "min-h-24" }/>
					</TextField>
				</div>
			</Sheet.Body>

			<Sheet.Footer>
				<Button className={ "w-full bg-accent text-accent-foreground" }>Agregar ejercicio</Button>
			</Sheet.Footer>
		</>
	)
}

export default function EditRoutineDayPageContent() {
	const [ exercises ] = useState<Exercise[]>( defaultExercises );

	return (
		<>
			<AdminEditRoutineHeader/>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-row items-center justify-between gap-3" }>
					<div className={ "pl-2" }>
						<p className={ "truncate text-lg font-semibold text-foreground" }>Rutina</p>
						<p className={ "text-sm text-muted" }>Lista de ejercicios</p>
					</div>
					<RoutineSheet/>
				</Card.Header>

				<Card.Content className={ "grid gap-2" }>
					{ exercises.map( ( exercise, index ) => (
						<ExerciseRow key={ exercise.id } exercise={ exercise } index={ index }/>
					) ) }
				</Card.Content>
			</Card>
		</>
	);
}
