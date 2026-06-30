"use client";

import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { Carousel } from "@heroui-pro/react";

import type { StudentHistoryRoutine } from "@/features/role/student/history-routines/actions/get-history-routines-by-student";
import { HistoryRoutineExerciseCard } from "@/features/role/student/history-routines/components/shared/HistoryRoutineExerciseCard";

type HistoryRoutineExerciseCarouselProps = {
	exercises: StudentHistoryRoutine["exercises"];
};

export function HistoryRoutineExerciseCarousel( { exercises }: HistoryRoutineExerciseCarouselProps ) {
	const [ api, setApi ] = useState<EmblaCarouselType>();
	const [ viewport, setViewport ] = useState<"mobile" | "desktop" | "wide">( "mobile" );

	useEffect( () => {
		if (typeof window === "undefined") return;

		const updateViewport = () => {
			if (window.matchMedia( "(min-width: 1536px)" ).matches) {
				setViewport( "wide" );
				return;
			}

			if (window.matchMedia( "(min-width: 768px)" ).matches) {
				setViewport( "desktop" );
				return;
			}

			setViewport( "mobile" );
		};

		updateViewport();

		const desktopQuery = window.matchMedia( "(min-width: 768px)" );
		const wideQuery = window.matchMedia( "(min-width: 1536px)" );

		desktopQuery.addEventListener( "change", updateViewport );
		wideQuery.addEventListener( "change", updateViewport );

		return () => {
			desktopQuery.removeEventListener( "change", updateViewport );
			wideQuery.removeEventListener( "change", updateViewport );
		};
	}, [] );

	if (exercises.length === 0) {
		return (
			<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
				No hay ejercicios para mostrar en este dia.
			</div>
		);
	}

	return (
		<div className={ "relative flex flex-col gap-3 px-0 sm:px-4" }>
			<div className={ "min-w-0" }>
				<Carousel key={ viewport } opts={ { align: "start", loop: false } } setApi={ setApi }>
					<Carousel.Content>
						{ exercises.map( ( exercise ) => (
							<Carousel.Item key={ exercise.id } className={ "basis-full md:basis-1/2 2xl:basis-1/3" }>
								<div className={ "h-full px-1" }>
									<HistoryRoutineExerciseCard exercise={ exercise }/>
								</div>
							</Carousel.Item>
						) ) }
					</Carousel.Content>
					<Carousel.Dots/>
				</Carousel>
			</div>

			<Button
				isIconOnly
				aria-label={ "Ejercicio anterior" }
				className={ "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-border bg-surface shadow-sm ml-2 sm:ml-4" }
				variant={ "secondary" }
				onPress={ () => api?.scrollPrev() }
			>
				<ArrowLeft className={ "size-4" }/>
			</Button>

			<Button
				isIconOnly
				aria-label={ "Ejercicio siguiente" }
				className={ "absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 border border-border bg-surface shadow-sm mr-2 sm:mr-4" }
				variant={ "secondary" }
				onPress={ () => api?.scrollNext() }
			>
				<ArrowRight className={ "size-4" }/>
			</Button>
		</div>
	);
}
