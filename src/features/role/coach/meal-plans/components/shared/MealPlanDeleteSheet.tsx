"use client";

import type React from "react";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Description,
	Spinner,
	Surface,
	Typography,
	toast,
} from "@heroui/react";
import { CircleFill, TrashBin } from "@gravity-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CoachMealPlan } from "@/features/mealPlans/types/meal-plans.types";
import { useDeleteMealPlan } from "@/features/mealPlans/hooks/useMealPlanMutations";
import { formatMealPlanDescriptionLines, formatMealTime } from "@/features/mealPlans/services/meal-plan-formatters";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";

type MealPlanDeleteSheetProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	mealPlan: CoachMealPlan;
	onOpenChange?: ( isOpen: boolean ) => void;
	studentId: string;
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};

function SummaryRow( { label, value }: { label: string; value: React.ReactNode } ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}

export function MealPlanDeleteSheet( {
	hideTrigger,
	isOpen: externalIsOpen,
	mealPlan,
	onOpenChange,
	studentId,
	triggerClassName,
	triggerVariant,
}: MealPlanDeleteSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const deleteMealPlan = useDeleteMealPlan();
	const wasOpenRef = useRef( false );

	const isOpen = externalIsOpen ?? internalIsOpen;
	const setIsOpen = onOpenChange ?? setInternalIsOpen;
	const showTriggerLabel = triggerVariant === "button";

	const resetState = useCallback( () => {
		deleteMealPlan.reset();
	}, [ deleteMealPlan ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		resetState();
		wasOpenRef.current = true;
	}, [ isOpen, resetState ] );

	function openSheet() {
		resetState();
		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetState();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	async function handleDelete() {
		try {
			await deleteMealPlan.mutateAsync( {
				id: mealPlan.id,
				studentId,
			} );
			toast.success( "Plan alimenticio eliminado", {
				description: "El plan se elimino correctamente.",
			} );
			setIsOpen( false );
		} catch {
			toast.danger( "Error al eliminar plan", {
				description: "No se pudo eliminar el plan alimenticio.",
			} );
		}
	}

	return (
		<>
			{ hideTrigger ? null : (
				<Button
					isIconOnly={ !showTriggerLabel }
					aria-label={ `Eliminar plan ${ formatMealTime( mealPlan.title ) }` }
					className={ triggerClassName ?? "text-danger" }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ openSheet }
				>
					<TrashBin className={ "size-4" }/>
					{ showTriggerLabel ? "Eliminar" : null }
				</Button>
			) }

			<FeatureSheetLayout
				isOpen={ isOpen }
				placement={ "right" }
				rightContentClassName={ "w-[32rem]" }
				onOpenChange={ handleOpenChange }
			>
				<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
					<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
							<TrashBin className={ "size-5" }/>
						</div>
						<div className={ "min-w-0 flex-1" }>
							<Sheet.Heading>Eliminar plan alimenticio</Sheet.Heading>
							<Description className={ "mt-1 text-sm" }>
								Esta accion no se puede deshacer.
							</Description>
						</div>
					</div>
				</Sheet.Header>

				<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5" }>
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Accion irreversible</Alert.Title>
							<Alert.Description>
								Se eliminara el plan alimenticio seleccionado del estudiante.
							</Alert.Description>
						</Alert.Content>
					</Alert>

					{ deleteMealPlan.isError ? (
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>Error al eliminar</Alert.Title>
								<Alert.Description>{ deleteMealPlan.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
						<div className={ "grid gap-3" }>
							<SummaryRow label={ "Tipo" } value={ formatMealTime( mealPlan.title ) }/>
							<div className={ "grid gap-2" }>
								<Typography className={ "text-sm text-muted" }>Descripcion</Typography>
								<div className={ "space-y-2 text-sm leading-6 text-foreground" }>
									{ formatMealPlanDescriptionLines( mealPlan.description ).map( ( line, index ) => (
										<div key={ `${ mealPlan.id }-${ index }` } className={ "flex gap-2" }>
											<span className={ "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" }>
												<CircleFill className={ "size-2" }/>
											</span>
											<p className={ "min-w-0 flex-1 whitespace-pre-wrap" }>{ line }</p>
										</div>
									) ) }
								</div>
							</div>
						</div>
					</Surface>
				</Sheet.Body>

				<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
					<Button isDisabled={ deleteMealPlan.isPending } variant={ "secondary" } onPress={ () => setIsOpen( false ) }>
						Cancelar
					</Button>
					<Button
						className={ "bg-danger text-danger-foreground" }
						isDisabled={ deleteMealPlan.isPending }
						isPending={ deleteMealPlan.isPending }
						onPress={ handleDelete }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <TrashBin className={ "size-4" }/> }
								{ isPending ? "Eliminando..." : "Eliminar plan" }
							</>
						) }
					</Button>
				</Sheet.Footer>
			</FeatureSheetLayout>
		</>
	);
}


