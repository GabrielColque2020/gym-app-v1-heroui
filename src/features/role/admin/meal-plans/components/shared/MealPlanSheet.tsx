"use client";

import type React from "react";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Description,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	Spinner,
	TextArea,
	TextField,
	toast,
} from "@heroui/react";
import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import type { AdminMealPlan } from "@/features/mealPlans/types/meal-plans.types";
import { useCreateMealPlan, useUpdateMealPlan } from "@/features/mealPlans/hooks/useMealPlanMutations";
import {
	MEAL_TIME_OPTIONS,
	type MealPlanFormValues,
	type MealTimeValue,
} from "@/features/mealPlans/services/meal-plans-form";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type MealPlanSheetProps =
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan?: never;
		mode: "create";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	}
	| {
		hideTrigger?: boolean;
		isOpen?: boolean;
		mealPlan: AdminMealPlan;
		mode: "edit";
		onOpenChange?: ( isOpen: boolean ) => void;
		placement?: "bottom" | "right";
		studentId: string;
		triggerClassName?: string;
		triggerVariant?: "button" | "icon";
	};

const DEFAULT_VALUES: MealPlanFormValues = {
	description: "",
	title: "BREAKFAST",
};

function getDefaultValues(): MealPlanFormValues {
	return { ...DEFAULT_VALUES };
}

function getInitialValues( mealPlan?: AdminMealPlan ): MealPlanFormValues {
	if (!mealPlan) return getDefaultValues();

	return {
		description: mealPlan.description,
		title: mealPlan.title as MealTimeValue,
	};
}

export function MealPlanSheet( props: MealPlanSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ values, setValues ] = useState<MealPlanFormValues>( () => getInitialValues( props.mealPlan ) );
	const createMealPlan = useCreateMealPlan();
	const updateMealPlan = useUpdateMealPlan();
	const wasOpenRef = useRef( false );

	const isEditMode = props.mode === "edit";
	const activeMutation = isEditMode ? updateMealPlan : createMealPlan;
	const isDescriptionInvalid = values.description.trim().length > 0 && values.description.trim().length < 2;
	const isSubmitDisabled = values.description.trim().length < 2 || activeMutation.isPending;
	const title = isEditMode ? "Editar plan alimenticio" : "Nuevo plan alimenticio";
	const description = isEditMode
		? "Actualiza el tipo de comida y la descripcion del plan."
		: "Carga un nuevo plan alimenticio para el estudiante.";
	const submitLabel = isEditMode ? "Guardar cambios" : "Crear plan";
	const showEditTriggerLabel = props.triggerVariant === "button";
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const responsivePlacement = useResponsiveSheetPlacement();
	const placement = props.placement ?? responsivePlacement;

	const resetFormState = useCallback( () => {
		setValues( getInitialValues( props.mealPlan ) );
		createMealPlan.reset();
		updateMealPlan.reset();
	}, [ createMealPlan, props.mealPlan, updateMealPlan ] );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;

			return;
		}

		if (wasOpenRef.current) return;

		resetFormState();
		wasOpenRef.current = true;
	}, [ isOpen, resetFormState ] );

	function openSheet() {
		resetFormState();
		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			resetFormState();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof MealPlanFormValues>( key: Key, value: MealPlanFormValues[ Key ] ) {
		setValues( ( currentValues ) => ( {
			...currentValues,
			[ key ]: value,
		} ) );
	}

	async function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			if (isEditMode) {
				await updateMealPlan.mutateAsync( {
					...values,
					id: props.mealPlan.id,
					studentId: props.studentId,
				} );
				toast.success( "Plan alimenticio actualizado", {
					description: "Los cambios se guardaron correctamente.",
				} );
			} else {
				await createMealPlan.mutateAsync( {
					...values,
					studentId: props.studentId,
				} );
				setValues( getDefaultValues() );
				toast.success( "Plan alimenticio creado", {
					description: "Se agrego al listado del estudiante.",
				} );
			}

			setIsOpen( false );
		} catch {
			toast.danger( isEditMode ? "Error al actualizar" : "Error al crear", {
				description: isEditMode
					? "No se pudieron guardar los cambios."
					: "No se pudo crear el plan alimenticio.",
			} );
		}
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				isEditMode ? (
					<Button
						isIconOnly={ !showEditTriggerLabel }
						aria-label={ `Editar plan ${ props.mealPlan.description }` }
						className={ props.triggerClassName }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ openSheet }
					>
						<Pencil className={ "size-4 text-warning" }/>
						{ showEditTriggerLabel ? "Editar" : null }
					</Button>
				) : (
					<Button className={ props.triggerClassName } onPress={ openSheet }>
						<Plus className={ "size-4" }/>
						Nuevo plan
					</Button>
				)
			) }
			<FeatureSheetLayout
				isOpen={ isOpen }
				placement={ placement }
				rightContentClassName={ "w-[34rem]" }
				onOpenChange={ handleOpenChange }
			>
				<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							{ isEditMode ? <Pencil className={ "size-5" }/> : <Plus className={ "size-5" }/> }
						</div>
						<div>
							<Sheet.Heading>{ title }</Sheet.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Sheet.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
						{ activeMutation.isError ? (
							<Alert className={ "border border-danger/20" } status={ "danger" }>
								<Alert.Content>
									<Alert.Title>Error al guardar</Alert.Title>
									<Alert.Description>{ activeMutation.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						) : null }

						<Select
							name={ "meal-plan-time" }
							placeholder={ "Selecciona tipo de comida" }
							value={ values.title }
							onChange={ ( value ) => {
								if (value) {
									updateValue( "title", value as MealTimeValue );
								}
							} }
						>
							<Label>Tipo de comida</Label>
							<Select.Trigger>
								<Select.Value/>
								<Select.Indicator/>
							</Select.Trigger>
							<Select.Popover>
								<ListBox>
									{ MEAL_TIME_OPTIONS.map( ( option ) => (
										<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
											{ option.label }
											<ListBox.ItemIndicator/>
										</ListBox.Item>
									) ) }
								</ListBox>
							</Select.Popover>
						</Select>

						<TextField
							isRequired
							fullWidth
							isInvalid={ isDescriptionInvalid }
							name={ "description" }
							value={ values.description }
							onChange={ ( value ) => updateValue( "description", value ) }
						>
							<Label>Descripcion</Label>
							<TextArea className={ "min-h-32" } placeholder={ "Escribe aqui la descripcion del plan alimenticio." }/>
							{ isDescriptionInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
						</TextField>
					</Sheet.Body>

					<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
						<Sheet.Close>
							<Button isDisabled={ activeMutation.isPending } variant={ "secondary" }>
								Cancelar
							</Button>
						</Sheet.Close>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CircleCheck className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Sheet.Footer>
				</form>
			</FeatureSheetLayout>
		</>
	);
}


