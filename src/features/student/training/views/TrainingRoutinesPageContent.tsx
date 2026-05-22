"use client";

import type { Key } from "react-aria-components/Breadcrumbs";
import { Button, Card, Chip } from "@heroui/react";
import { CircleCheckFill } from "@gravity-ui/icons";
import { PageHeader } from "src/components/common/PageHeader";
import { Segment } from "@heroui-pro/react";
import { useState } from "react";
import TrainingRoutinesFilter from "../components/TrainingRoutinesFilter";
import Link from "next/link";

const tabs = [
	{ id: "semana1", label: "Semana 1" },
	{ id: "semana2", label: "Semana 2" },
	{ id: "semana3", label: "Semana 3" },
	{ id: "semana4", label: "Semana 4" },
];


export default function TrainingRoutinesPageContent() {

	const [ selected, setSelected ] = useState<Key>( "semana1" );


	return (
		<>
			<PageHeader
				title={ "Plan de Entrenamiento Personal" }
				description={ "Optimiza tu rendimiento con rutinas adaptadas a tus objetivos de temporada." }
			/>

			{ /*Filtro*/ }
			<TrainingRoutinesFilter/>

			{ /*Tabla de rutinas*/ }
			{ /* Sección de Tabs de Semanas */ }
			<div className={ "items-start w-full mt-4" }>
				<div className={ "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }>
					<h2 className={ "text-lg font-black sm:truncate sm:text-2xl sm:tracking-tight" }>
						Plan Semanal
					</h2>

					<div className={ "flex justify-center sm:justify-end" }>
						<Segment
							selectedKey={ selected }
							onSelectionChange={ setSelected }
							size={ "md" }
							className={ "w-full sm:w-auto max-w-full" }
						>
							{ tabs.map( ( tab ) => (
								<Segment.Item key={ tab.id } id={ tab.id }>
									<Segment.Separator/>
									<span className={ "text-xs sm:text-sm" }>{ tab.label }</span>
								</Segment.Item>
							) ) }
						</Segment>
					</div>
				</div>
			</div>

			<Card
				className={ "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 " }
				variant={ "secondary" }
			>
				<Card className={ "w-full items-stretch md:flex-row border-l-4 border-accent shadow-sm" }>
					<div className={ "flex flex-1 flex-col gap-3" }>
						<Card.Header className={ "gap-1 " }>
							<Card.Title className={ "pr-8" }>
								<strong className={ "text-foreground text-lg" }>Dia 1</strong>
								<Chip
									color={ "success" }
									variant={ "soft" }
									className={ "absolute top-2 right-4 z-10" }
									size={ "md" }
								>
									<CircleCheckFill width={ 12 }/>
									<Chip.Label>Guardado</Chip.Label>
								</Chip>
							</Card.Title>
							<Card.Description>
								Musculo Trabajado:
							</Card.Description>
						</Card.Header>
						<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 " }>
							<Link href={ `/routine` } passHref>
								<Button className={ "w-full sm:w-auto" }>
									Ver Rutina
								</Button>
							</Link>
						</Card.Footer>
					</div>
				</Card>
				<Card className={ "w-full items-stretch md:flex-row border-l-4 border-accent shadow-sm" }>
					<div className={ "flex flex-1 flex-col gap-3" }>
						<Card.Header className={ "gap-1" }>
							<Card.Title className={ "pr-8" }>
								<strong className={ "text-foreground text-lg" }>Dia 2</strong>
								<Chip
									color={ "success" }
									variant={ "soft" }
									className={ "absolute top-2 right-4 z-10" }
									size={ "md" }
								>
									<CircleCheckFill width={ 12 }/>
									<Chip.Label>Guardado</Chip.Label>
								</Chip>
							</Card.Title>
							<Card.Description>
								Musculo Trabajado:
							</Card.Description>
						</Card.Header>
						<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 " }>
							<Button className={ "w-full sm:w-auto" }>Ver Rutina</Button>
						</Card.Footer>
					</div>
				</Card>
				<Card className={ "w-full items-stretch md:flex-row border-l-4 border-accent" }>
					<div className={ "flex flex-1 flex-col gap-3" }>
						<Card.Header className={ "gap-1" }>
							<Card.Title className={ "pr-8" }>
								<strong className={ "text-foreground text-lg" }>Dia 3</strong>
								<Chip
									color={ "success" }
									variant={ "soft" }
									className={ "absolute top-2 right-4 z-10" }
									size={ "md" }
								>
									<CircleCheckFill width={ 12 }/>
									<Chip.Label>Guardado</Chip.Label>
								</Chip>
							</Card.Title>
							<Card.Description>
								Musculo Trabajado:
							</Card.Description>
						</Card.Header>
						<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 " }>
							<Button className={ "w-full sm:w-auto" }>Ver Rutina</Button>
						</Card.Footer>
					</div>
				</Card>
				<Card className={ "w-full items-stretch md:flex-row border-l-4 border-accent" }>
					<div className={ "flex flex-1 flex-col gap-3" }>
						<Card.Header className={ "gap-1" }>
							<Card.Title className={ "pr-8" }>
								<strong className={ "text-foreground text-lg" }>Dia 4</strong>
								<Chip
									color={ "success" }
									variant={ "soft" }
									className={ "absolute top-2 right-4 z-10" }
									size={ "md" }
								>
									<CircleCheckFill width={ 12 }/>
									<Chip.Label>Guardado</Chip.Label>
								</Chip>
							</Card.Title>
							<Card.Description>
								Musculo Trabajado:
							</Card.Description>
						</Card.Header>
						<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 " }>
							<Button className={ "w-full sm:w-auto" }>Ver Rutina</Button>
						</Card.Footer>
					</div>
				</Card>
				<Card className={ "w-full items-stretch md:flex-row border-l-4 border-accent shadow-sm" }>
					<div className={ "flex flex-1 flex-col gap-3" }>
						<Card.Header className={ "gap-1" }>
							<Card.Title className={ "pr-8" }>
								<strong className={ "text-foreground text-lg" }>Dia 5</strong>
								<Chip
									color={ "success" }
									variant={ "soft" }
									className={ "absolute top-2 right-4 z-10" }
									size={ "md" }
								>
									<CircleCheckFill width={ 12 }/>
									<Chip.Label>Guardado</Chip.Label>
								</Chip>
							</Card.Title>
							<Card.Description>
								Musculo Trabajado:
							</Card.Description>
						</Card.Header>
						<Card.Footer className={ "mt-auto flex w-full flex-col items-end gap-3 " }>
							<Button className={ "w-full sm:w-auto" }>Ver Rutina</Button>
						</Card.Footer>
					</div>
				</Card>
			</Card>
		</>
	)
}