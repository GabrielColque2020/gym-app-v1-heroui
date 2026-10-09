"use client";

import type { FormEvent } from "react";

import { useState } from "react";

import { Button, Card, Description, FieldError, Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { changeOwnPasswordAction } from "@/features/profile/actions/profile-mutations";
import { MIN_PASSWORD_LENGTH } from "@/features/profile/services/profile-form";

import { ProfileCardHeader } from "./profile-card-header";

type ProfilePasswordFormProps = {
	isStudent: boolean;
};

export function ProfilePasswordForm( { isStudent }: ProfilePasswordFormProps ) {
	const [ currentPassword, setCurrentPassword ] = useState( "" );
	const [ newPassword, setNewPassword ] = useState( "" );
	const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );
	const [ isPending, setIsPending ] = useState( false );

	const isTooShort = newPassword.length > 0 && newPassword.trim().length < MIN_PASSWORD_LENGTH;
	const canSubmit = !isPending && currentPassword.length > 0 && newPassword.trim().length >= MIN_PASSWORD_LENGTH;

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (!canSubmit) return;

		setIsPending( true );

		try {
			const result = await changeOwnPasswordAction( { currentPassword, newPassword } );

			if (!result.ok) {
				toast.danger( "No se pudo cambiar", { description: result.reason } );
				return;
			}

			setCurrentPassword( "" );
			setNewPassword( "" );
			toast.success( "Contraseña cambiada", { description: "La próxima vez que entres, usá la nueva." } );
		} catch {
			toast.danger( "No pudimos conectarnos", { description: "Revisá tu conexión y probá de nuevo." } );
		} finally {
			setIsPending( false );
		}
	}

	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-4 sm:p-5" }>
				<ProfileCardHeader
					description={ "Para cambiarla te pedimos la que usás hoy." }
					icon={ <KeyRound className={ "size-4" }/> }
					title={ "Contraseña" }
				/>

				<form className={ "space-y-4" } onSubmit={ handleSubmit }>
					<TextField
						fullWidth
						isRequired
						name={ "currentPassword" }
						value={ currentPassword }
						onChange={ setCurrentPassword }
					>
						<Label>Contraseña actual</Label>
						<Input autoComplete={ "current-password" } className={ "border border-border" } type={ "password" }/>
					</TextField>

					<TextField
						fullWidth
						isInvalid={ isTooShort }
						isRequired
						name={ "newPassword" }
						value={ newPassword }
						onChange={ setNewPassword }
					>
						<Label>Contraseña nueva</Label>
						<div className={ "relative" }>
							<Input
								autoComplete={ "new-password" }
								className={ "border border-border pr-11" }
								placeholder={ `Mínimo ${ MIN_PASSWORD_LENGTH } caracteres` }
								type={ isPasswordVisible ? "text" : "password" }
							/>
							<IconButton
								className={ "absolute inset-y-1 right-1 z-10 size-8 min-w-8 text-muted" }
								label={ isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña" }
								size={ "sm" }
								type={ "button" }
								variant={ "ghost" }
								onPress={ () => setIsPasswordVisible( ( current ) => !current ) }
							>
								{ isPasswordVisible ? <EyeOff className={ "size-4" }/> : <Eye className={ "size-4" }/> }
							</IconButton>
						</div>
						{ isTooShort
							? <FieldError>Debe tener al menos { MIN_PASSWORD_LENGTH } caracteres.</FieldError>
							: <Description>Si no te acordás de la actual, pedile { isStudent ? "a tu entrenador" : "al administrador" } que te ponga una nueva.</Description> }
					</TextField>

					<div className={ "flex justify-end" }>
						<Button isDisabled={ !canSubmit } isPending={ isPending } type={ "submit" }>
							{ ( { isPending: pending } ) => (
								<>
									{ pending ? <Spinner color={ "current" } size={ "sm" }/> : null }
									{ pending ? "Guardando..." : "Cambiar contraseña" }
								</>
							) }
						</Button>
					</div>
				</form>
			</Card.Content>
		</Card>
	);
}
