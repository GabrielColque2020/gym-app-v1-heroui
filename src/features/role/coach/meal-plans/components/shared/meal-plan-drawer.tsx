"use client";

import { Alert, Button, Description, Drawer, FieldError, Label, ListBox, Select, Spinner, TextArea, TextField } from "@heroui/react";
import { CheckCircle2, Pencil, Plus } from "lucide-react";

import { MEAL_TIME_OPTIONS, type MealTimeValue } from "@/features/meal-plans/services/meal-plans-form";
import type { MealPlanDrawerProps } from "@/features/role/coach/meal-plans/components/shared/meal-plan-drawer.types";
import { useMealPlanDrawerState } from "@/features/role/coach/meal-plans/components/shared/use-meal-plan-drawer-state";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";

export function MealPlanDrawer( props: MealPlanDrawerProps ) {
	const {
		activeMutation,
		description,
		handleOpenChange,
		handleSubmit,
		isDescriptionInvalid,
		isEditMode,
		isOpen,
		isSubmitDisabled,
		openDrawer,
		placement,
		showEditTriggerLabel,
		submitLabel,
		title,
		updateValue,
		values,
	} = useMealPlanDrawerState( props );

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
						onPress={ openDrawer }
					>
						<Pencil className={ "size-4 text-warning" }/>
						{ showEditTriggerLabel ? "Editar" : null }
					</Button>
				) : (
					<Button className={ props.triggerClassName } onPress={ openDrawer } fullWidth={ placement === "bottom" }>
						<Plus className={ "size-4" }/>
						Nuevo plan
					</Button>
				)
			) }
			<FeatureDrawerLayout
				isOpen={ isOpen }
				placement={ placement }
				rightContentClassName={ "w-[34rem]" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							{ isEditMode ? <Pencil className={ "size-5" }/> : <Plus className={ "size-5" }/> }
						</div>
						<div>
							<Drawer.Heading>{ title }</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>{ description }</Description>
						</div>
					</div>
				</Drawer.Header>

				<form className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
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
							<Select.Trigger className={ "border border-border" }>
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
							<TextArea className={ "min-h-32 border border-border" } placeholder={ "Escribe aqui la descripcion del plan alimenticio." }/>
							{ isDescriptionInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
						</TextField>
					</Drawer.Body>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ activeMutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ activeMutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? ( isEditMode ? "Actualizando..." : "Guardando..." ) : submitLabel }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
