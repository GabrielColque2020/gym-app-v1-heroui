"use client";

import type { FormEvent } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Card, Description, FieldError, Input, Label, Spinner, TextField, toast } from "@heroui/react";
import { Ruler, UserRound } from "lucide-react";

import { updateOwnProfileAction } from "@/features/profile/actions/profile-mutations";
import type { ProfileFormValues } from "@/features/profile/services/profile-form";
import { BirthDatePicker } from "@/features/students/components/shared/birth-date-picker";
import { GenderSelect } from "@/features/students/components/shared/gender-select";
import { isValidEmail } from "@/features/students/services/student-form";

import { ProfileCardHeader } from "./profile-card-header";

type ProfileDataFormProps = {
	initialValues: ProfileFormValues;
	// Solo el estudiante ve y corrige sus medidas y su objetivo.
	isStudent: boolean;
};

const DECIMAL_PATTERN = /^\d*([.,]\d*)?$/;

export function ProfileDataForm( { initialValues, isStudent }: ProfileDataFormProps ) {
	const router = useRouter();
	// Lo guardado: contra esto se mira si hay cambios y si cambia el ingreso.
	const [ savedValues, setSavedValues ] = useState( initialValues );
	const [ values, setValues ] = useState( initialValues );
	const [ currentPassword, setCurrentPassword ] = useState( "" );
	const [ isPending, setIsPending ] = useState( false );

	function updateValue<Key extends keyof ProfileFormValues>( key: Key, value: ProfileFormValues[ Key ] ) {
		setValues( ( current ) => ( { ...current, [ key ]: value } ) );
	}

	const normalizedEmail = values.email.trim().toLowerCase();
	const normalizedDni = values.dni.trim();
	// La contraseña aparece recién cuando cambia algo con lo que se entra: ahí se
	// entiende sola por qué se pide. Cambiar el nombre o el peso no la pide.
	const isLoginChanging = normalizedEmail !== savedValues.email || normalizedDni !== savedValues.dni;
	const hasChanges = ( Object.keys( values ) as ( keyof ProfileFormValues )[] )
		.some( ( key ) => values[ key ].trim() !== savedValues[ key ].trim() );

	const isNameInvalid = values.name.trim().length < 2;
	const isEmailInvalid = !isValidEmail( normalizedEmail );
	const isDniInvalid = !/^\d+$/.test( normalizedDni ) || Number( normalizedDni ) <= 0;
	const isHeightInvalid = !DECIMAL_PATTERN.test( values.height.trim() );
	const isWeightInvalid = !DECIMAL_PATTERN.test( values.weight.trim() );
	const canSubmit = !isPending
		&& hasChanges
		&& !isNameInvalid
		&& !isEmailInvalid
		&& !isDniInvalid
		&& !( isStudent && ( isHeightInvalid || isWeightInvalid ) )
		&& ( !isLoginChanging || currentPassword.length > 0 );

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (!canSubmit) return;

		setIsPending( true );

		try {
			const result = await updateOwnProfileAction( { ...values, currentPassword } );

			if (!result.ok) {
				toast.danger( "No se pudo guardar", { description: result.reason } );
				return;
			}

			setSavedValues( result.data );
			setValues( result.data );
			setCurrentPassword( "" );
			toast.success( "Datos actualizados", {
				description: isLoginChanging
					? "Desde ahora entrás con el email o el DNI nuevos."
					: "Tus cambios quedaron guardados.",
			} );
			// El nombre de la barra lateral sale del layout del servidor: sin
			// refrescar, seguiría mostrando el anterior.
			router.refresh();
		} catch {
			toast.danger( "No pudimos conectarnos", { description: "Revisá tu conexión y probá de nuevo." } );
		} finally {
			setIsPending( false );
		}
	}

	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "p-4 sm:p-5" }>
				<form className={ "space-y-6" } onSubmit={ handleSubmit }>
					<section className={ "space-y-4" }>
						<ProfileCardHeader
							description={ "El email y el DNI son con lo que entrás a la app." }
							icon={ <UserRound className={ "size-4" }/> }
							title={ "Tus datos" }
						/>

						<TextField
							fullWidth
							isInvalid={ isNameInvalid }
							isRequired
							name={ "name" }
							value={ values.name }
							onChange={ ( value ) => updateValue( "name", value ) }
						>
							<Label>Nombre</Label>
							<Input autoComplete={ "name" } className={ "border border-border" }/>
							{ isNameInvalid ? <FieldError>Debe tener al menos 2 caracteres.</FieldError> : null }
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
								<Input autoComplete={ "email" } className={ "border border-border" } type={ "email" }/>
								{ isEmailInvalid ? <FieldError>Ingresa un email válido.</FieldError> : null }
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
								<Input autoComplete={ "off" } className={ "border border-border" } inputMode={ "numeric" }/>
								{ isDniInvalid ? <FieldError>Debe ser numérico.</FieldError> : null }
							</TextField>
						</div>

						<div className={ "grid gap-4 sm:grid-cols-2" }>
							<GenderSelect value={ values.gender } onChange={ ( value ) => updateValue( "gender", value ) }/>
							<BirthDatePicker value={ values.birthDate } onChange={ ( value ) => updateValue( "birthDate", value ) }/>
						</div>
					</section>

					{ isStudent ? (
						<section className={ "space-y-4 border-t border-border pt-5" }>
							<ProfileCardHeader
								description={ "Las usa tu entrenador para armarte la rutina y el plan." }
								icon={ <Ruler className={ "size-4" }/> }
								title={ "Medidas y objetivo" }
							/>

							<div className={ "grid gap-4 sm:grid-cols-2" }>
								<TextField
									fullWidth
									isInvalid={ isHeightInvalid }
									name={ "height" }
									value={ values.height }
									onChange={ ( value ) => updateValue( "height", value ) }
								>
									<Label>Altura (cm)</Label>
									<Input className={ "border border-border" } inputMode={ "decimal" } placeholder={ "175" }/>
									{ isHeightInvalid ? <FieldError>Debe ser un número.</FieldError> : null }
								</TextField>

								<TextField
									fullWidth
									isInvalid={ isWeightInvalid }
									name={ "weight" }
									value={ values.weight }
									onChange={ ( value ) => updateValue( "weight", value ) }
								>
									<Label>Peso (kg)</Label>
									<Input className={ "border border-border" } inputMode={ "decimal" } placeholder={ "72" }/>
									{ isWeightInvalid ? <FieldError>Debe ser un número.</FieldError> : null }
								</TextField>
							</div>

							<TextField
								fullWidth
								name={ "objective" }
								value={ values.objective }
								onChange={ ( value ) => updateValue( "objective", value ) }
							>
								<Label>Objetivo</Label>
								<Input className={ "border border-border" } placeholder={ "Ej: Ganar masa muscular" }/>
							</TextField>
						</section>
					) : null }

					{ isLoginChanging ? (
						<TextField
							fullWidth
							isRequired
							name={ "currentPassword" }
							value={ currentPassword }
							onChange={ setCurrentPassword }
						>
							<Label>Tu contraseña actual</Label>
							<Input autoComplete={ "current-password" } className={ "border border-border" } type={ "password" }/>
							<Description>Para cambiar el email o el DNI con el que entrás.</Description>
						</TextField>
					) : null }

					<div className={ "flex justify-end" }>
						<Button isDisabled={ !canSubmit } isPending={ isPending } type={ "submit" }>
							{ ( { isPending: pending } ) => (
								<>
									{ pending ? <Spinner color={ "current" } size={ "sm" }/> : null }
									{ pending ? "Guardando..." : "Guardar cambios" }
								</>
							) }
						</Button>
					</div>
				</form>
			</Card.Content>
		</Card>
	);
}
