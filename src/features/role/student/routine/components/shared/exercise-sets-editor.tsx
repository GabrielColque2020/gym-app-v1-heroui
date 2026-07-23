"use client";

import { useMemo, useState } from "react";

import { Button, Card, Input, Label } from "@heroui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { Exercise } from "@/features/routine/types/routine-exercise.types";

type SetUpdates = Partial<{ weight: number | null; reps: number | null; notes: string | null }>;

type ExerciseSetsEditorProps = {
    detailContent: React.ReactNode;
    exercise: Exercise;
    isActive?: boolean;
    onExerciseUpdate: (exerciseId: string, updates: SetUpdates) => void;
};

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

    const targetRepsValues = exercise.sets.map((set) => set.targetReps);
    const sharedTargetReps = getSharedValue<number | null>(targetRepsValues, null);

    if (sharedTargetReps !== null) {
        return `${exercise.sets.length} x ${sharedTargetReps} reps`;
    }

    return `${exercise.sets.length} series`;
}

export function ExerciseSetsEditor({
                                       detailContent,
                                       exercise,
                                       isActive = true,
                                       onExerciseUpdate,
                                   }: ExerciseSetsEditorProps) {
    return (
        <ExerciseSetsEditorContent
            key={ isActive ? "active" : "inactive" }
            detailContent={ detailContent }
            exercise={ exercise }
            onExerciseUpdate={ onExerciseUpdate }
        />
    );
}

function ExerciseSetsEditorContent({
                                       detailContent,
                                       exercise,
                                       onExerciseUpdate,
                                   }: ExerciseSetsEditorProps) {
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

    return (
        <div className={ "space-y-3" }>
            <Card className={ "border border-accent-soft-hover shadow-sm" }>
                <Card.Content className={ "space-y-2 p-3" }>
                    <div className={ "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between" }>
                        <div className={ "space-y-1" }>
                            <p className={ "text-sm font-semibold text-foreground" }>{ buildTargetSummary(exercise) }</p>
                            <p className={ "text-xs text-muted" }>
                                Cargá una sola vez y aplicamos el mismo valor a todas las series.
                            </p>
                            { hasMixedValues ? (
                                <p className={ "text-xs font-medium text-warning" }>
                                    Hay diferencias entre series. Si editás acá, se unifican los valores.
                                </p>
                            ) : null }
                        </div>

                        <Button
                            className={ "self-start" }
                            variant={ "secondary" }
                            onPress={ () => setIsDetailedMode((current) => !current) }
                        >
                            { isDetailedMode ? <ChevronUp className={ "size-4" }/> : <ChevronDown className={ "size-4" }/> }
                            { isDetailedMode ? "Ocultar detalle" : "Editar por serie" }
                        </Button>
                    </div>

                    <div className={ "grid gap-4 md:grid-cols-2 xl:grid-cols-[0.8fr_0.8fr_1.4fr]" }>
                        <div className={ "space-y-2" }>
                            <Label className={ "text-xs font-medium text-muted" }>Reps realizadas</Label>
                            <Input
                                fullWidth
                                className={ "border border-border" }
                                placeholder={ hasMixedValues ? "Valores mixtos" : "Reps" }
                                type={ "number" }
                                value={ unifiedValues.reps?.toString() ?? "" }
                                onChange={ (event) => onExerciseUpdate(exercise.id, { reps: parseNumericInput(event.target.value) }) }
                            />
                        </div>

                        <div className={ "space-y-2" }>
                            <Label className={ "text-xs font-medium text-muted" }>Peso (kg)</Label>
                            <Input
                                fullWidth
                                className={ "border border-border" }
                                placeholder={ hasMixedValues ? "Valores mixtos" : "Peso (kg)" }
                                type={ "number" }
                                value={ unifiedValues.weight?.toString() ?? "" }
                                onChange={ (event) => onExerciseUpdate(exercise.id, { weight: parseNumericInput(event.target.value) }) }
                            />
                        </div>

                        <div className={ "space-y-2" }>
                            <Label className={ "text-xs font-medium text-muted" }>Notas</Label>
                            <Input
                                fullWidth
                                className={ "border border-border" }
                                placeholder={ hasMixedValues ? "Hay notas distintas entre series" : "Opcional" }
                                value={ unifiedValues.notes }
                                onChange={ (event) => onExerciseUpdate(exercise.id, { notes: event.target.value }) }
                            />
                        </div>
                    </div>
                </Card.Content>
            </Card>

            { isDetailedMode ? detailContent : null }
        </div>
    );
}
