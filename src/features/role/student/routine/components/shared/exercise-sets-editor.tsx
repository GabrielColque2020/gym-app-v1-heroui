"use client";

import { useMemo, useState } from "react";

import { Button, Card, Input, Label } from "@heroui/react";
import { ChevronDown, ChevronUp, History, MessageSquarePlus, Minus, Plus } from "lucide-react";

import { useIsRoutineSessionLocked } from "@/features/role/student/routine/components/shared/routine-session-lock-context";
import { getExerciseLastSession, parseWeightInput } from "@/features/role/student/routine/views/routine-page-content.utils";
import { formatTargetReps } from "@/features/routine/services/routine-session";
import type { Exercise } from "@/features/routine/types/routine-exercise.types";

type SetUpdates = Partial<{ weight: number | null; reps: number | null; notes: string | null }>;

type ExerciseSetsEditorProps = {
    detailContent: React.ReactNode;
    exercise: Exercise;
    isActive?: boolean;
    onExerciseUpdate: (exerciseId: string, updates: SetUpdates) => void;
    onRepeatLastSession?: () => void;
};

// Las mancuernas y discos suben de a 2,5 kg; las repeticiones, de a una.
const WEIGHT_STEP = 2.5;
const REPS_STEP = 1;

function parseNumericInput(value: string) {
    const nextValue = value.trim() === "" ? null : Number.parseInt(value, 10);

    return Number.isNaN(nextValue) ? null : nextValue;
}

function getSharedValue<T>(values: T[], emptyValue: T) {
    if (values.length === 0) return emptyValue;

    const firstValue = values[0];
    const allEqual = values.every((value) => value === firstValue);

    return allEqual ? firstValue : emptyValue;
}

function buildTargetSummary(exercise: Exercise) {
    if (exercise.sets.length === 0) return "Sin series configuradas";

    const targetRepsValues = exercise.sets.map((set) => formatTargetReps(set));
    const sharedTargetReps = getSharedValue<string | null>(targetRepsValues, null);

    if (sharedTargetReps !== null) {
        return `${exercise.sets.length} x ${sharedTargetReps}`;
    }

    return `${exercise.sets.length} series`;
}

type StepperFieldProps = {
    inputMode: "decimal" | "numeric";
    isLocked: boolean;
    // A alguna serie le falta este dato: el otro ya esta cargado.
    isMissing: boolean;
    label: string;
    onChange: (value: number | null) => void;
    parse: (value: string) => number | null;
    placeholder: string;
    step: number;
    value: number | null;
};

// Campo numerico con botones de menos y mas: en el gimnasio, con el telefono en
// una mano, ajustar con dos toques es mas comodo que abrir el teclado.
function StepperField({ inputMode, isLocked, isMissing, label, onChange, parse, placeholder, step, value }: StepperFieldProps) {
    return (
        // Una fila por campo: de a dos por fila, en el telefono el numero no entra.
        <div className={ "flex items-center gap-3" }>
            <Label className={ "w-16 shrink-0 text-sm font-medium text-muted" }>{ label }</Label>
            <div className={ "flex min-w-0 flex-1 items-center gap-2" }>
                <Button
                    isIconOnly
                    aria-label={ `Bajar ${label.toLowerCase()}` }
                    className={ "size-10 shrink-0" }
                    isDisabled={ isLocked || value === null || value <= 0 }
                    variant={ "secondary" }
                    onPress={ () => onChange(Math.max(0, (value ?? 0) - step)) }
                >
                    <Minus className={ "size-4" }/>
                </Button>
                <Input
                    fullWidth
                    aria-label={ label }
                    className={ `min-w-0 border px-1 text-center ${ isMissing ? "border-warning" : "border-border" }` }
                    disabled={ isLocked }
                    inputMode={ inputMode }
                    placeholder={ placeholder }
                    step={ "any" }
                    type={ "number" }
                    value={ value?.toString() ?? "" }
                    onChange={ (event) => onChange(parse(event.target.value)) }
                />
                <Button
                    isIconOnly
                    aria-label={ `Subir ${label.toLowerCase()}` }
                    className={ "size-10 shrink-0" }
                    isDisabled={ isLocked }
                    variant={ "secondary" }
                    onPress={ () => onChange((value ?? 0) + step) }
                >
                    <Plus className={ "size-4" }/>
                </Button>
            </div>
        </div>
    );
}

export function ExerciseSetsEditor({
                                       detailContent,
                                       exercise,
                                       isActive = true,
                                       onExerciseUpdate,
                                       onRepeatLastSession,
                                   }: ExerciseSetsEditorProps) {
    return (
        <ExerciseSetsEditorContent
            key={ isActive ? "active" : "inactive" }
            detailContent={ detailContent }
            exercise={ exercise }
            onExerciseUpdate={ onExerciseUpdate }
            onRepeatLastSession={ onRepeatLastSession }
        />
    );
}

function ExerciseSetsEditorContent({
                                       detailContent,
                                       exercise,
                                       onExerciseUpdate,
                                       onRepeatLastSession,
                                   }: ExerciseSetsEditorProps) {
    const isLocked = useIsRoutineSessionLocked();
    const [ isDetailedMode, setIsDetailedMode ] = useState(false);
    const unifiedValues = useMemo(() => ({
        notes: getSharedValue(exercise.sets.map((set) => set.notes ?? ""), ""),
        reps: getSharedValue<number | null>(exercise.sets.map((set) => set.currentReps), null),
        weight: getSharedValue<number | null>(exercise.sets.map((set) => set.currentWeight), null),
    }), [ exercise.sets ]);
    const hasMixedValues = useMemo(
        () => exercise.sets.some((set) =>
            set.currentReps !== unifiedValues.reps
            || set.currentWeight !== unifiedValues.weight
            || (set.notes ?? "") !== unifiedValues.notes,
        ),
        [ exercise.sets, unifiedValues.notes, unifiedValues.reps, unifiedValues.weight ],
    );
    // Las notas son opcionales: quedan plegadas salvo que ya haya algo escrito.
    const [ isNotesOpen, setIsNotesOpen ] = useState(() => exercise.sets.some((set) => set.notes?.trim()));
    const hasLastSession = Boolean(getExerciseLastSession(exercise)?.sets.length);
    const isWeightMissing = exercise.sets.some((set) => !set.completed && set.currentWeight === null && set.currentReps !== null);

    return (
        <div className={ "space-y-3" }>
            <Card className={ "border border-accent-soft-hover p-0 shadow-sm" }>
                <Card.Content className={ "space-y-4 p-3" }>
                    <div className={ "flex flex-wrap items-center justify-between gap-2" }>
                        <div className={ "min-w-0" }>
                            <p className={ "text-xs font-medium text-muted" }>Objetivo</p>
                            <p className={ "text-base font-semibold text-foreground" }>{ buildTargetSummary(exercise) }</p>
                        </div>
                        { hasLastSession && onRepeatLastSession && !isLocked ? (
                            <Button size={ "sm" } variant={ "secondary" } onPress={ onRepeatLastSession }>
                                <History className={ "size-4" }/>
                                Repetir última vez
                            </Button>
                        ) : null }
                    </div>

                    <div className={ "grid gap-4 lg:grid-cols-2" }>
                        <StepperField
                            inputMode={ "numeric" }
                            isLocked={ isLocked }
                            isMissing={ exercise.sets.some((set) => !set.completed && set.currentReps === null && set.currentWeight !== null) }
                            label={ "Reps" }
                            parse={ parseNumericInput }
                            placeholder={ hasMixedValues ? "Varias" : "0" }
                            step={ REPS_STEP }
                            value={ unifiedValues.reps }
                            onChange={ (reps) => onExerciseUpdate(exercise.id, { reps }) }
                        />
                        <StepperField
                            inputMode={ "decimal" }
                            isLocked={ isLocked }
                            isMissing={ isWeightMissing }
                            label={ "Peso (kg)" }
                            parse={ parseWeightInput }
                            placeholder={ hasMixedValues ? "Varios" : "0" }
                            step={ WEIGHT_STEP }
                            value={ unifiedValues.weight }
                            onChange={ (weight) => onExerciseUpdate(exercise.id, { weight }) }
                        />
                    </div>

                    { /* El peso es requerido: sin el, la serie no se guarda. */ }
                    { isWeightMissing && !isLocked ? (
                        <p className={ "text-xs font-medium text-warning" }>
                            Falta el peso. Si es con el peso del cuerpo, poné 0.
                        </p>
                    ) : null }

                    { /* Bloqueado no hay nada que explicar sobre como se edita. */ }
                    { isLocked ? null : (
                        <p className={ hasMixedValues ? "text-xs font-medium text-warning" : "text-xs text-muted" }>
                            { hasMixedValues
                                ? "Las series tienen valores distintos. Si editás acá, se igualan todas."
                                : "Se aplica a todas las series. Si alguna fue distinta, editala por serie." }
                        </p>
                    ) }

                    { isNotesOpen ? (
                        <div className={ "space-y-2" }>
                            <Label className={ "text-xs font-medium text-muted" }>Notas</Label>
                            <Input
                                fullWidth
                                className={ "border border-border" }
                                disabled={ isLocked }
                                placeholder={ hasMixedValues ? "Hay notas distintas entre series" : "Opcional" }
                                value={ unifiedValues.notes }
                                onChange={ (event) => onExerciseUpdate(exercise.id, { notes: event.target.value }) }
                            />
                        </div>
                    ) : null }

                    <div className={ "flex flex-wrap items-center justify-between gap-2" }>
                        <Button size={ "sm" } variant={ "secondary" } onPress={ () => setIsDetailedMode((current) => !current) }>
                            { isDetailedMode ? <ChevronUp className={ "size-4" }/> : <ChevronDown className={ "size-4" }/> }
                            { isDetailedMode ? "Ocultar series" : isLocked ? "Ver por serie" : "Editar por serie" }
                        </Button>
                        { isNotesOpen || isLocked ? null : (
                            <Button size={ "sm" } variant={ "ghost" } onPress={ () => setIsNotesOpen(true) }>
                                <MessageSquarePlus className={ "size-4" }/>
                                Agregar nota
                            </Button>
                        ) }
                    </div>
                </Card.Content>
            </Card>

            { isDetailedMode ? detailContent : null }
        </div>
    );
}
