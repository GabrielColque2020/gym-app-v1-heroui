"use client";

import type { DateValue } from "@internationalized/date";
import type { FormEvent } from "react";

import { parseDate } from "@internationalized/date";
import { useEffect, useRef, useState } from "react";

import {
	Button,
	Calendar,
	Checkbox,
	DateField,
	DatePicker,
	Description,
	Drawer,
	FieldError,
	Input,
	Label,
	ListBox,
	Select,
	Spinner,
	TextField,
	toast,
} from "@heroui/react";
import { CheckCircle2, Eye, EyeOff, PencilLine } from "lucide-react";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { useUpdateAdminUser } from "@/features/role/admin/users/hooks/use-admin-users";
import {
	type AdminUserFormValues,
	getInitialAdminUserFormValues,
	isValidEmail,
} from "@/features/role/admin/users/services/admin-user-form";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import { GENDER_OPTIONS, NO_GENDER, type GenderFormValue } from "@/features/students/services/student-form";

type AdminUserDrawerProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	user: AdminUserListItem;
};

function getBirthDateValue( value: string ): DateValue | null {
	const trimmedValue = value.trim();

	if (trimmedValue.length === 0) return null;

	try {
		return parseDate( trimmedValue );
	} catch {
		return null;
	}
}

function getRoleLabel( role: AdminUserListItem["role"] ) {
	return role === "ADMIN" ? "admin" : "coach";
}

export function AdminUserDrawer( {
	hideTrigger = false,
	isOpen: controlledIsOpen,
	onOpenChangeAction,
	user,
}: AdminUserDrawerProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );
	const [ values, setValues ] = useState<AdminUserFormValues>( () => getInitialAdminUserFormValues( user ) );
	const mutation = useUpdateAdminUser();
	const wasOpenRef = useRef( false );
	const open = controlledIsOpen ?? internalIsOpen;
	const setOpen = onOpenChangeAction ?? setInternalIsOpen;
	const placement = useResponsiveDrawerPlacement();
	const birthDateValue = getBirthDateValue( values.birthDate );
	const roleLabel = getRoleLabel( user.role );

	useEffect( () => {
		if (!open) {
			wasOpenRef.current = false;
			return;
		}

		if (wasOpenRef.current) return;

		setValues( getInitialAdminUserFormValues( user ) );
		setIsPasswordVisible( false );
		mutation.reset();
		wasOpenRef.current = true;
	}, [ mutation, open, user ] );

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setValues( getInitialAdminUserFormValues( user ) );
			setIsPasswordVisible( false );
			mutation.reset();
			wasOpenRef.current = false;
		}

		setOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof AdminUserFormValues>( key: Key, value: AdminUserFormValues[ Key ] ) {
		setValues( ( current ) => ( {
			...current,
			[ key ]: value,
		} ) );
	}

	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isEmailInvalid = values.email.trim().length > 0 && !isValidEmail( values.email.trim() );
	const isDniInvalid = values.dni.trim().length > 0 && !/^\d+$/.test( values.dni.trim() );
	const isPasswordInvalid = values.password.trim().length > 0 && values.password.trim().length < 6;
	const isSubmitDisabled = isNameInvalid
		|| isEmailInvalid
		|| isDniInvalid
		|| isPasswordInvalid
		|| mutation.isPending;

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			await mutation.mutateAsync( {
				...values,
				id: user.id,
			} );
			toast.success( "Usuario actualizado", {
				description: "Los cambios quedaron reflejados en la tabla.",
			} );
			handleOpenChange( false );
		} catch {
			toast.danger( "Error al editar usuario", {
				description: "No se pudieron guardar los cambios.",
			} );
		}
	}

	return (
		<>
			{ hideTrigger ? null : (
				<Button isIconOnly aria-label={ "Editar usuario" } size={ "sm" } variant={ "ghost" } onPress={ () => setOpen( true ) }>
					<PencilLine className={ "size-4" }/>
				</Button>
			) }
			<FeatureDrawerLayout
				isDismissable={ false }
				isOpen={ open }
				placement={ placement }
				rightContentClassName={ "w-135 px-5 pt-5 pb-4" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<PencilLine className={ "size-5" }/>
						</div>
						<div>
							<Drawer.Heading>{ `Editar ${ roleLabel }` }</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								{ `Modifica los datos del ${ roleLabel } sin tocar sus relaciones operativas.` }
							</Description>
						</div>
					</div>
				</Drawer.Header>

				<form autoComplete={ "off" } className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
						{ mutation.isError ? (
							<div className={ "rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm text-danger" }>
								{ mutation.error.message }
							</div>
						) : null }

						<section className={ "space-y-4" }>
							<div>
								<h3 className={ "text-sm font-semibold text-foreground" }>{ `Perfil del ${ roleLabel }` }</h3>
								<p className={ "text-sm text-muted" }>Datos de acceso e identificacion.</p>
							</div>

							<TextField
								fullWidth
								isInvalid={ isNameInvalid }
								isRequired
								name={ "name" }
								value={ values.name }
								onChange={ ( value ) => updateValue( "name", value ) }
							>
								<Label>Nombre</Label>
								<Input autoComplete={ "off" } className={ "border border-border" } placeholder={ "Nombre completo" }/>
								{ isNameInvalid ? <FieldError>El nombre debe tener al menos 2 caracteres.</FieldError> : null }
							</TextField>

							<div className={ "grid gap-4 sm:grid-cols-2" }>
								<TextField
									fullWidth
									isInvalid={ isEmailInvalid }
									isRequired
									name={ "email" }
									value={ values.email }
									onChange={ ( value ) => updateValue( "email", value ) }
								>
									<Label>Email</Label>
									<Input autoComplete={ "off" } className={ "border border-border" } placeholder={ "usuario@mail.com" } type={ "email" }/>
									{ isEmailInvalid ? <FieldError>Ingresa un email valido.</FieldError> : null }
								</TextField>

								<TextField
									fullWidth
									isInvalid={ isDniInvalid }
									isRequired
									name={ "dni" }
									value={ values.dni }
									onChange={ ( value ) => updateValue( "dni", value ) }
								>
									<Label>DNI</Label>
									<Input autoComplete={ "off" } className={ "border border-border" } inputMode={ "numeric" } placeholder={ "12345678" }/>
									{ isDniInvalid ? <FieldError>El DNI debe ser numerico.</FieldError> : null }
								</TextField>
							</div>

							<TextField
								fullWidth
								isInvalid={ isPasswordInvalid }
								name={ "password" }
								value={ values.password }
								onChange={ ( value ) => updateValue( "password", value ) }
							>
								<Label>Contraseña</Label>
								<div className={ "relative" }>
									<Input
										autoComplete={ "new-password" }
										className={ "border border-border pr-11" }
										placeholder={ "Dejar vacia para conservar la actual" }
										type={ isPasswordVisible ? "text" : "password" }
									/>
									<Button
										aria-label={ isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña" }
										className={ "absolute inset-y-1.5 right-1.5 z-10 size-8 min-w-8 text-muted" }
										isIconOnly
										size={ "sm" }
										type={ "button" }
										variant={ "ghost" }
										onPress={ () => setIsPasswordVisible( ( current ) => !current ) }
									>
										{ isPasswordVisible ? <EyeOff className={ "size-4" }/> : <Eye className={ "size-4" }/> }
									</Button>
								</div>
								{ isPasswordInvalid ? <FieldError>La contraseña debe tener al menos 6 caracteres.</FieldError> : null }
							</TextField>

							<div className={ "grid gap-4 sm:grid-cols-2" }>
								<Select
									autoComplete={ "off" }
									className={ "w-full" }
									fullWidth
									name={ "gender" }
									placeholder={ "Seleccione genero" }
									value={ values.gender }
									onChange={ ( value ) => updateValue( "gender", ( value ?? NO_GENDER ) as GenderFormValue ) }
								>
									<Label>Genero</Label>
									<Select.Trigger className={ "border border-border" }>
										<Select.Value/>
										<Select.Indicator/>
									</Select.Trigger>
									<Select.Popover>
										<ListBox>
											<ListBox.Item id={ NO_GENDER } textValue={ "Sin especificar" }>
												Sin especificar
												<ListBox.ItemIndicator/>
											</ListBox.Item>
											{ GENDER_OPTIONS.map( ( option ) => (
												<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
													{ option.label }
													<ListBox.ItemIndicator/>
												</ListBox.Item>
											) ) }
										</ListBox>
									</Select.Popover>
								</Select>

								<DatePicker
									autoComplete={ "off" }
									className={ "w-full" }
									granularity={ "day" }
									name={ "birthDate" }
									shouldForceLeadingZeros
									value={ birthDateValue }
									onChange={ ( value ) => updateValue( "birthDate", value ? value.toString() : "" ) }
								>
									<Label>Fecha de nacimiento</Label>
									<DateField.Group fullWidth className={ "border border-border" }>
										<DateField.Input>
											{ ( segment ) => (
												<DateField.Segment
													className={
														segment.type === "day" || segment.type === "month"
															? "min-w-[2ch] text-center"
															: segment.type === "year"
																? "min-w-[4ch] text-center"
																: undefined
													}
													segment={ segment }
												/>
											) }
										</DateField.Input>
										<DateField.Suffix>
											<DatePicker.Trigger type={ "button" }>
												<DatePicker.TriggerIndicator/>
											</DatePicker.Trigger>
										</DateField.Suffix>
									</DateField.Group>
									<DatePicker.Popover className={ "min-w-68 overflow-visible" }>
										<Calendar aria-label={ "Fecha de nacimiento" } className={ "w-68" }>
											<Calendar.Header>
												<Calendar.YearPickerTrigger>
													<Calendar.YearPickerTriggerHeading/>
													<Calendar.YearPickerTriggerIndicator/>
												</Calendar.YearPickerTrigger>
												<Calendar.NavButton slot={ "previous" }/>
												<Calendar.NavButton slot={ "next" }/>
											</Calendar.Header>
											<Calendar.Grid>
												<Calendar.GridHeader>
													{ ( day ) => <Calendar.HeaderCell>{ day }</Calendar.HeaderCell> }
												</Calendar.GridHeader>
												<Calendar.GridBody>
													{ ( date ) => <Calendar.Cell date={ date }/> }
												</Calendar.GridBody>
											</Calendar.Grid>
											<Calendar.YearPickerGrid>
												<Calendar.YearPickerGridBody>
													{ ( { year } ) => <Calendar.YearPickerCell year={ year }/> }
												</Calendar.YearPickerGridBody>
											</Calendar.YearPickerGrid>
										</Calendar>
									</DatePicker.Popover>
								</DatePicker>
							</div>

							<Checkbox
								className={ "flex-1 flex-row" }
								isSelected={ values.active }
								onChange={ ( isSelected ) => updateValue( "active", isSelected ) }
							>
								<Checkbox.Control>
									<Checkbox.Indicator/>
								</Checkbox.Control>
								<Checkbox.Content>Cuenta activa</Checkbox.Content>
							</Checkbox>
						</section>
					</Drawer.Body>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ mutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ mutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? "Guardando..." : "Guardar cambios" }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
