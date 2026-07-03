"use client";

import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useExerciseCarouselState() {
	const [ api, setApi ] = useState<EmblaCarouselType>();
	const [ activeExerciseIndex, setActiveExerciseIndex ] = useState( 1 );

	useEffect( () => {
		if (!api) return;

		const syncActiveIndex = () => {
			setActiveExerciseIndex( api.selectedScrollSnap() + 1 );
		};

		syncActiveIndex();
		api.on( "select", syncActiveIndex );
		api.on( "reInit", syncActiveIndex );

		return () => {
			api.off( "select", syncActiveIndex );
			api.off( "reInit", syncActiveIndex );
		};
	}, [ api ] );

	return {
		activeExerciseIndex,
		api,
		setApi,
	};
}
