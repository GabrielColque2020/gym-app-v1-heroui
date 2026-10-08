"use client";

import type { Key } from "@heroui/react";

import { Button, Dropdown, Header, Label } from "@heroui/react";
import { Timer } from "lucide-react";

import { formatRestSeconds, REST_SECONDS_OPTIONS } from "@/features/routine/services/rest-seconds";

type RoutineRestSelectProps = {
	ariaLabel: string;
	// Con rotulo cuando hay lugar (el drawer de agregar); sin el, solo el reloj y el tiempo.
	showLabel?: boolean;
	value: number | null;
	onChangeAction: ( value: number | null ) => void;
};

const NONE_KEY = "none";

// Descanso entre series de un ejercicio. Es opcional y se elige de una lista
// corta: escribir segundos a mano es mas lento y da valores raros.
export function RoutineRestSelect( { ariaLabel, onChangeAction, showLabel = false, value }: RoutineRestSelectProps ) {
	function handleAction( key: Key ) {
		onChangeAction( key === NONE_KEY ? null : Number( key ) );
	}

	return (
		<Dropdown>
			<Button
				aria-label={ value === null ? `${ ariaLabel }: sin definir` : `${ ariaLabel }: ${ formatRestSeconds( value ) }` }
				className={ `h-8 min-w-0 shrink-0 gap-1 px-1.5 tabular-nums ${ value === null ? "text-muted" : "text-accent" }` }
				size={ "sm" }
				variant={ "ghost" }
			>
				<Timer className={ "size-4 shrink-0" }/>
				{ value === null ? ( showLabel ? "Descanso" : null ) : formatRestSeconds( value ) }
			</Button>
			<Dropdown.Popover placement={ "bottom end" }>
				<Dropdown.Menu onAction={ handleAction }>
					<Header>Descanso entre series</Header>
					<Dropdown.Item id={ NONE_KEY } textValue={ "Sin definir" }>
						<Label className={ value === null ? "font-semibold" : undefined }>Sin definir</Label>
					</Dropdown.Item>
					{ REST_SECONDS_OPTIONS.map( ( seconds ) => (
						<Dropdown.Item key={ seconds } id={ String( seconds ) } textValue={ formatRestSeconds( seconds ) }>
							<Label className={ value === seconds ? "font-semibold tabular-nums text-accent" : "tabular-nums" }>
								{ formatRestSeconds( seconds ) }
							</Label>
						</Dropdown.Item>
					) ) }
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}
