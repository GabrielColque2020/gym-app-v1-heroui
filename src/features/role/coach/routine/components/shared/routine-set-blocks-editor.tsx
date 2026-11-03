"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { parseSetBlocks, REPS_PER_SET_SEPARATOR, serializeSetBlocks, type SetBlock } from "@/features/routine/services/reps-per-set";

type RoutineSetBlocksEditorProps = {
	exerciseName: string;
	// Se intento guardar o agregar con algo vacio: se marca lo que falta.
	isMissingShown?: boolean;
	// Vuelve a "las mismas en todas" con el total de series y las repeticiones del primero.
	onDisableAction: ( value: SetBlock ) => void;
	onChangeAction: ( value: SetBlock ) => void;
	reps: string;
	sets: string;
};

// Al activar "Series diferentes" sobre "3 × 10": la primera queda aparte (la
// top set, lo mas comun) y el resto en otro bloque, listas para cambiar.
function buildInitialBlocks( sets: string, reps: string ): SetBlock[] {
	const parsed = parseSetBlocks( sets, reps );

	if (parsed) return parsed;

	const setCount = Number.parseInt( sets, 10 ) || 0;

	return setCount >= 2
		? [ { reps, sets: "1" }, { reps, sets: String( setCount - 1 ) } ]
		: [ { reps, sets: "1" }, { reps: "", sets: "1" } ];
}

function onlyDigits( value: string ) {
	return value.replace( /\D/g, "" ).slice( 0, 2 );
}

// Series diferentes: bloques de "N series × repeticiones" (1 × 5, 2 × 6...). Se
// guardan en las mismas series y repeticiones de siempre (`serializeSetBlocks`),
// asi que el estudiante, el historial y las copias no cambian.
export function RoutineSetBlocksEditor( {
	exerciseName,
	isMissingShown = false,
	onChangeAction,
	onDisableAction,
	reps,
	sets,
}: RoutineSetBlocksEditorProps ) {
	const [ blocks, setBlocks ] = useState<SetBlock[]>( () => buildInitialBlocks( sets, reps ) );
	// Lo ultimo que se mando. Si llega otra cosa (deshacer, actualizar), los
	// bloques se rearman con eso; lo que mandaron estos mismos bloques no los toca,
	// asi un bloque a medio cargar no se pierde.
	const [ pushed, setPushed ] = useState<SetBlock>( { reps, sets } );

	if (pushed.sets !== sets || pushed.reps !== reps) {
		setPushed( { reps, sets } );

		if (sets.trim() && reps.trim()) setBlocks( parseSetBlocks( sets, reps ) ?? [ { reps, sets } ] );
	}

	function update( nextBlocks: SetBlock[] ) {
		const value = serializeSetBlocks( nextBlocks );

		setBlocks( nextBlocks );
		setPushed( value );
		onChangeAction( value );
	}

	function updateBlock( index: number, patch: Partial<SetBlock> ) {
		update( blocks.map( ( block, blockIndex ) => blockIndex === index ? { ...block, ...patch } : block ) );
	}

	const totalSets = blocks.reduce( ( total, block ) => total + ( Number.parseInt( block.sets, 10 ) || 0 ), 0 );
	const missingClassName = "border-warning";

	return (
		<div className={ "space-y-2 rounded-lg border border-border bg-surface p-2" }>
			<ol aria-label={ `Series diferentes de ${ exerciseName }` } className={ "space-y-1.5" }>
				{ blocks.map( ( block, index ) => (
					// Sin id propio: los bloques solo se agregan al final y se quitan de a uno.
					<li key={ index } className={ "flex items-end gap-1.5" }>
						<RoutineDayExerciseField
							ariaLabel={ `Series del bloque ${ index + 1 } de ${ exerciseName }` }
							className={ "w-14 gap-0.5" }
							inputClassName={ `w-full px-1 text-center ${ isMissingShown && !block.sets.trim() ? missingClassName : "" }` }
							inputMode={ "numeric" }
							label={ index === 0 ? "Series" : undefined }
							name={ `set-block-sets-${ index }` }
							placeholder={ "1" }
							value={ block.sets }
							onChange={ ( value ) => updateBlock( index, { sets: onlyDigits( value ) } ) }
						/>
						<span aria-hidden className={ "pb-2 text-sm text-muted" }>×</span>
						<RoutineDayExerciseField
							ariaLabel={ `Repeticiones del bloque ${ index + 1 } de ${ exerciseName }` }
							className={ "w-20 gap-0.5" }
							inputClassName={ `w-full px-1 text-center ${ isMissingShown && !block.reps.trim() ? missingClassName : "" }` }
							label={ index === 0 ? "Repeticiones" : undefined }
							name={ `set-block-reps-${ index }` }
							placeholder={ index === 0 ? "5" : "6" }
							value={ block.reps }
							// La barra es como se guardan por dentro: escrita a mano partiria el bloque.
							onChange={ ( value ) => updateBlock( index, { reps: value.replaceAll( REPS_PER_SET_SEPARATOR, "" ) } ) }
						/>
						{ blocks.length > 1 ? (
							<Button
								isIconOnly
								aria-label={ `Quitar el bloque ${ index + 1 } de ${ exerciseName }` }
								className={ "size-8 text-muted" }
								variant={ "ghost" }
								onPress={ () => update( blocks.filter( ( _, blockIndex ) => blockIndex !== index ) ) }
							>
								<Trash2 className={ "size-4" }/>
							</Button>
						) : null }
					</li>
				) ) }
			</ol>
			<div className={ "flex flex-wrap items-center justify-between gap-2" }>
				<Button size={ "sm" } variant={ "secondary" } onPress={ () => update( [ ...blocks, { reps: "", sets: "1" } ] ) }>
					<Plus className={ "size-4" }/>
					Agregar bloque
				</Button>
				<span className={ "text-xs text-muted" }>
					{ `Total: ${ totalSets } ${ totalSets === 1 ? "serie" : "series" }` }
				</span>
				<Button
					size={ "sm" }
					variant={ "ghost" }
					onPress={ () => onDisableAction( { reps: blocks[ 0 ]?.reps ?? "", sets: totalSets > 0 ? String( totalSets ) : "" } ) }
				>
					Las mismas en todas
				</Button>
			</div>
		</div>
	);
}
