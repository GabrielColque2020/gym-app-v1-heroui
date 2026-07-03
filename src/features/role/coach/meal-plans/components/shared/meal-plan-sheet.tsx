"use client";

import { Sheet } from "@heroui-pro/react";
import { Alert, Button, Description, FieldError, Label, ListBox, Select, Spinner, TextArea, TextField } from "@heroui/react";
import { CircleCheck, Pencil, Plus } from "@gravity-ui/icons";

import { MEAL_TIME_OPTIONS, type MealTimeValue } from "@/features/meal-plans/services/meal-plans-form";
import type { MealPlanSheetProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-sheet.types";
import { useMealPlanSheetState } from "@/features/role/coach/meal-plans/components/shared/use-meal-plan-sheet-state";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

export function MealPlanSheet( props: MealPlanSheetProps ) {
	const {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		isDescriptionInvalid,
		isEditMode,
		isOpen,
		isSubmitDisabled,
		openSheet,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	} = useMealPlanSheetState( props );

	return (
		<>
			{ props.hideTrigger ? null : (
				isEditMode ? (
					<Button
						isIconOnly={ !showEditTriggerLabel }
						aria-label={ `Editar plan ${ props.mode === "edit" ? props.mealPlan.description : "alimenticio" }` }
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
