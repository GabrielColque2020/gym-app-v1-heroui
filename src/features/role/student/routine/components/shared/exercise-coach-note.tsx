import { Lightbulb } from "lucide-react";

type ExerciseCoachNoteProps = {
	note?: string | null;
};

// La nota que el entrenador escribio para este ejercicio. Va en la tarjeta del
// ejercicio y no arriba de la pantalla: asi se lee junto a lo que se esta por hacer
// y cada ejercicio muestra la suya.
export function ExerciseCoachNote( { note }: ExerciseCoachNoteProps ) {
	const trimmedNote = note?.trim();

	if (!trimmedNote) return null;

	return (
		<div className={ "flex gap-2.5 rounded-xl border border-warning/30 bg-warning/5 px-3 py-2.5" }>
			<Lightbulb className={ "mt-0.5 size-4 shrink-0 text-warning" }/>
			<div className={ "min-w-0" }>
				<p className={ "text-xs font-semibold text-foreground" }>Nota del entrenador</p>
				<p className={ "whitespace-pre-line text-sm font-normal text-muted" }>{ trimmedNote }</p>
			</div>
		</div>
	);
}
