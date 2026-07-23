"use client";

import { useMemo } from "react";

import type { Exercise, ExerciseSessionHistory } from "@/features/routine/types/routine-exercise.types";

export function useExerciseCardState( exercise: Exercise ) {
	const variantOptions = useMemo( () => exercise.variantOptions ?? [], [ exercise.variantOptions ] );
	const originalVariant = useMemo(
		() => variantOptions.find( ( variant ) => variant.id === exercise.originalVariantExerciseId ) ?? null,
		[ exercise.originalVariantExerciseId, variantOptions ],
	);
	const selectedVariant = useMemo(
		() => variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId ) ?? null,
		[ exercise.variantExerciseId, variantOptions ],
	);
	const isVariantOverridden = useMemo(
		() => ( exercise.variantExerciseId ?? null ) !== ( exercise.originalVariantExerciseId ?? null ),
		[ exercise.originalVariantExerciseId, exercise.variantExerciseId ],
	);
	const displayedSessionHistory = useMemo<ExerciseSessionHistory | null>(
		() => selectedVariant?.lastSession ?? exercise.lastSession,
		[ exercise.lastSession, selectedVariant ],
	);
	const completedSetsSummary = useMemo( () => {
		const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;

		return {
			completedSets,
			totalSets: exercise.sets.length,
		};
	}, [ exercise.sets ] );

	return {
		completedSetsSummary,
		displayedExerciseName: selectedVariant?.name ?? exercise.name,
		displayedSessionHistory,
		hasCompletedSets: completedSetsSummary.completedSets > 0,
		hasSessionHistory: Boolean( displayedSessionHistory?.sets.length ),
		hasVariants: variantOptions.length > 0,
		isVariantOverridden,
		originalVariant,
		selectedVariant,
		variantOptions,
	};
}

