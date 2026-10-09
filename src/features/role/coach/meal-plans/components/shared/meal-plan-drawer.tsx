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
		duplicateNotice,
		handleOpenChange,
		hasUnsavedChanges,
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
						aria-label={ "Editar comida" }
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
						Agregar comida
					</Button>
				)
			) }
			<FeatureDrawerLayout
				hasUnsavedChanges={ hasUnsavedChanges }
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

				{ /* `noValidate`: los errores los marca la app, al lado de cada campo. La validacion del navegador frenaba el envio y su aviso no siempre se ve. */ }
				<form className={ "flex min-h-0 flex-1 flex-col" } noValidate onSubmit={ handleSubmit }>
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
							placeholder={ "Elegí la comida" }
							value={ values.title }
							onChange={ ( value ) => {
								if (value) {
									updateValue( "title", value as MealTimeValue );
								}
							} }
						>
							<Label>Comida</Label>
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

						{ duplicateNotice ? (
							<Alert className={ "border border-warning/20" } status={ "warning" }>
								<Alert.Content>
									<Alert.Description>{ duplicateNotice }</Alert.Description>
								</Alert.Content>
							</Alert>
						) : null }

						<TextField
							isRequired
							fullWidth
							isInvalid={ isDescriptionInvalid }
							name={ "description" }
							value={ values.description }
							onChange={ ( value ) => updateValue( "description", value ) }
						>
							<Label>Qué incluye</Label>
							<TextArea className={ "min-h-32 border border-border" } placeholder={ "Té o café sin azúcar\n2 tostadas integrales con palta\n1 huevo" }/>
							{ /* Cada renglon sale como un item de la lista; sin decirlo, se escribia todo de corrido. */ }
							<Description className={ "text-xs" }>Un alimento por renglón: el estudiante los ve como lista.</Description>
							{ isDescriptionInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
						</TextField>

						<TextField
							fullWidth
							name={ "observations" }
							value={ values.observations }
							onChange={ ( value ) => updateValue( "observations", value ) }
						>
							<Label>Nota (opcional)</Label>
							<TextArea className={ "min-h-16 border border-border" } placeholder={ "Ej: antes de las 9, o se puede cambiar el huevo por queso" } rows={ 2 }/>
							<Description className={ "text-xs" }>El estudiante la ve debajo de la comida.</Description>
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
