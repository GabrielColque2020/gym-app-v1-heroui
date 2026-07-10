"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { Button, Checkbox, Description, Drawer, FieldError, Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { CheckCircle2, Plus, UserPlus } from "lucide-react";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useCreateCoach } from "@/features/role/admin/users/hooks/use-admin-users";
import { type AdminUserFormValues, getDefaultAdminUserFormValues } from "@/features/role/admin/users/services/admin-user-form";

type AdminCoachDrawerProps = {
	triggerLabel?: string;
};

export function AdminCoachDrawer( { triggerLabel = "Crear coach" }: AdminCoachDrawerProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ values, setValues ] = useState<AdminUserFormValues>( () => getDefaultAdminUserFormValues() );
	const mutation = useCreateCoach();
	const wasOpenRef = useRef( false );

	useEffect( () => {
		if (!isOpen) {
			wasOpenRef.current = false;
			return;
		}

		if (wasOpenRef.current) return;

		setValues( getDefaultAdminUserFormValues() );
		mutation.reset();
		wasOpenRef.current = true;
	}, [ isOpen, mutation ] );

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen) {
			setValues( getDefaultAdminUserFormValues() );
			mutation.reset();
			wasOpenRef.current = false;
		}

		setIsOpen( nextIsOpen );
	}

	function updateValue<Key extends keyof AdminUserFormValues>( key: Key, value: AdminUserFormValues[ Key ] ) {
		setValues( ( current ) => ( {
			...current,
			[ key ]: value,
		} ) );
	}

	const isNameInvalid = values.name.trim().length > 0 && values.name.trim().length < 2;
	const isEmailInvalid = values.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( values.email.trim() );
	const isDniInvalid = values.dni.trim().length > 0 && !/^\d+$/.test( values.dni.trim() );
	const isPasswordInvalid = values.password.trim().length > 0 && values.password.trim().length < 6;
	const isSubmitDisabled = isNameInvalid || isEmailInvalid || isDniInvalid || isPasswordInvalid || mutation.isPending;

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			await mutation.mutateAsync( values );
			toast.success( "Coach creado", {
				description: "La cuenta quedo disponible en el listado de usuarios.",
			} );
			handleOpenChange( false );
		} catch {
			toast.danger( "Error al crear coach", {
				description: "No se pudo crear la cuenta.",
			} );
		}
	}

	return (
		<>
			<Button variant={ "secondary" } onPress={ () => setIsOpen( true ) }>
				<UserPlus className={ "size-4" }/>
				{ triggerLabel }
			</Button>
			<FeatureDrawerLayout
				isDismissable={ false }
				isOpen={ isOpen }
				placement={ "right" }
				rightContentClassName={ "w-120 px-5 pt-5 pb-4" }
				onOpenChangeAction={ handleOpenChange }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<Plus className={ "size-5" }/>
						</div>
						<div>
							<Drawer.Heading>Crear coach</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								Alta de cuentas para entrenamiento y gestión operativa.
							</Description>
						</div>
					</div>
				</Drawer.Header>

				<form autoComplete={ "off" } className={ "flex min-h-0 flex-1 flex-col" } onSubmit={ handleSubmit }>
					<Drawer.Body className={ "min-h-0 flex-1 space-y-5 overflow-y-auto py-3" }>
						{ mutation.isError ? (
							<div className={ "rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm text-danger" }>
								{ mutation.error.message }
							</div>
						) : null }

						<TextField fullWidth isRequired name={ "name" } value={ values.name } onChange={ ( value ) => updateValue( "name", value ) }>
							<Label>Nombre</Label>
							<Input autoComplete={ "off" } placeholder={ "Ej: Juan Perez" } className={ "border border-border" }/>
							{ isNameInvalid ? <FieldError>El nombre debe tener al menos 2 caracteres.</FieldError> : null }
						</TextField>

						<TextField fullWidth isRequired name={ "dni" } value={ values.dni } onChange={ ( value ) => updateValue( "dni", value ) }>
							<Label>DNI</Label>
							<Input autoComplete={ "off" } placeholder={ "12345678" } className={ "border border-border" }/>
							{ isDniInvalid ? <FieldError>El DNI debe ser numerico.</FieldError> : null }
						</TextField>

						<TextField fullWidth isRequired name={ "email" } value={ values.email } onChange={ ( value ) => updateValue( "email", value ) }>
							<Label>Email</Label>
							<Input autoComplete={ "off" } placeholder={ "coach@mail.com" } className={ "border border-border" }/>
							{ isEmailInvalid ? <FieldError>Ingresa un email valido.</FieldError> : null }
						</TextField>

						<TextField fullWidth isRequired name={ "password" } value={ values.password } onChange={ ( value ) => updateValue( "password", value ) }>
							<Label>Contraseña</Label>
							<Input autoComplete={ "new-password" } placeholder={ "Al menos 6 caracteres" } type={ "password" } className={ "border border-border" }/>
							{ isPasswordInvalid ? <FieldError>La contraseña debe tener al menos 6 caracteres.</FieldError> : null }
						</TextField>

						<Checkbox isSelected={ values.active } onChange={ ( isSelected ) => updateValue( "active", isSelected ) }>
							<Checkbox.Control>
								<Checkbox.Indicator/>
							</Checkbox.Control>
							<Checkbox.Content>Crear cuenta activa</Checkbox.Content>
						</Checkbox>
					</Drawer.Body>

					<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
						<Button slot={ "close" } isDisabled={ mutation.isPending } variant={ "secondary" }>
							Cancelar
						</Button>
						<Button isDisabled={ isSubmitDisabled } isPending={ mutation.isPending } type={ "submit" }>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CheckCircle2 className={ "size-4" }/> }
									{ isPending ? "Creando..." : "Crear coach" }
								</>
							) }
						</Button>
					</Drawer.Footer>
				</form>
			</FeatureDrawerLayout>
		</>
	);
}
