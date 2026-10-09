"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Alert, Button, Card, FieldError, Input, Label, Spinner, TextField, Typography, } from "@heroui/react";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { LEAVE_SESSION_REASON_PARAM } from "@/features/auth/services/leave-session";
import { useLogin } from "@/features/login/hooks/use-login";
import { persistThemePreference, themePreferenceToUiThemePreference, } from "@/features/theme/theme-preference";

export default function LoginPageContent() {
	const searchParams = useSearchParams();
	const loginMutation = useLogin();
	const [ credential, setCredential ] = useState( "" );
	const [ password, setPassword ] = useState( "" );
	const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );
	// Entre que el ingreso se acepta y carga la pantalla siguiente.
	const [ isRedirecting, setIsRedirecting ] = useState( false );
	// Por que la app saco a la persona hasta aca, si fue eso lo que paso.
	const leaveReason = searchParams.get( LEAVE_SESSION_REASON_PARAM );
	const leaveNotice = leaveReason === "inactive"
		? { description: "Pedile a tu entrenador que la vuelva a activar.", title: "Tu cuenta fue desactivada" }
		: leaveReason === "expired"
			? { description: "Ingresá de nuevo para seguir donde estabas. Lo que no se llegó a guardar sigue en este dispositivo.", title: "Tu sesión terminó" }
			: null;

	const isCredentialInvalid = credential.trim().length > 0 && credential.trim().length < 3;
	const isPasswordInvalid = password.length === 0;
	const isSubmitDisabled = isCredentialInvalid || isPasswordInvalid || loginMutation.isPending || isRedirecting;

	function getDefaultRedirectPath( role: string ) {
		if (role === "ADMIN") {
			return "/admin/dashboard";
		}

		return role === "COACH" ? "/coach/dashboard" : "/student/dashboard";
	}

	// La seccion de cada rol. Volver a "donde estabas" solo vale dentro de la
	// propia: si en este navegador la ultima cuenta fue de otro rol (un
	// entrenador que presta el telefono a un estudiante), esa direccion no es
	// de quien entra ahora.
	function isPathAllowedForRole( pathname: string, role: string ) {
		const ownSection = role === "ADMIN" ? "/admin" : role === "COACH" ? "/coach" : "/student";

		return pathname === ownSection || pathname.startsWith( `${ ownSection }/` ) || pathname === "/faq";
	}

	function getSafeRedirectPath( nextPath: string | null, role: string ) {
		if (!nextPath) {
			return getDefaultRedirectPath( role );
		}

		try {
			const url = new URL( nextPath, window.location.origin );

			if (url.origin !== window.location.origin) {
				return getDefaultRedirectPath( role );
			}

			if (url.pathname.startsWith( "/api" ) || url.pathname.startsWith( "/_next" ) || url.pathname === "/login") {
				return getDefaultRedirectPath( role );
			}

			if (url.pathname === "/dashboard" || !isPathAllowedForRole( url.pathname, role )) {
				return getDefaultRedirectPath( role );
			}

			return `${ url.pathname }${ url.search }${ url.hash }`;
		} catch {
			return getDefaultRedirectPath( role );
		}
	}

	async function handleSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();

		if (isSubmitDisabled) return;

		try {
			const result = await loginMutation.mutateAsync( {
				credential,
				password,
			} );

			persistThemePreference( themePreferenceToUiThemePreference( result.user.themePreference ) );
			// Carga completa: si queda algo de la sesion anterior en memoria, una
			// navegacion interna podia fallar en silencio y dejar esta pantalla
			// como si el boton no hubiera hecho nada.
			setIsRedirecting( true );
			window.location.replace( getSafeRedirectPath( searchParams.get( "next" ), result.user.role ) );
		} catch {
			// La UI ya lee el estado de error de la mutacion.
		}
	}

	return (
		<main
			className={
				"relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-6 " +
				"before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--accent)_10%,transparent),transparent_38%),linear-gradient(135deg,color-mix(in_oklch,var(--accent)_8%,transparent),transparent_34%,var(--background)_70%)] " +
				"before:opacity-70 sm:px-6"
			}
		>
			<div
				aria-hidden={ "true" }
				className={ "pointer-events-none absolute -left-28 -top-24 size-72 rounded-full bg-accent/15 blur-3xl sm:size-96" }
			/>
			<div
				aria-hidden={ "true" }
				className={ "pointer-events-none absolute -bottom-32 -right-24 size-80 rounded-full bg-accent/10 blur-3xl sm:size-112" }
			/>
			<div
				aria-hidden={ "true" }
				className={
					"pointer-events-none absolute left-6 top-8 h-28 w-28 opacity-[0.16] " +
					"bg-[radial-gradient(var(--accent)_1px,transparent_1px)] bg-size-[14px_14px] sm:left-14 sm:top-16 sm:h-40 sm:w-40"
				}
			/>
			<div
				aria-hidden={ "true" }
				className={
					"pointer-events-none absolute bottom-8 right-6 h-32 w-32 opacity-[0.12] " +
					"bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] [background-size:18px_18px] sm:bottom-14 sm:right-16 sm:h-44 sm:w-44"
				}
			/>

			<Card className={ "relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface shadow-sm" } variant={ "default" }>
				<Card.Content className={ "space-y-6 px-5 py-6 sm:px-8 sm:py-8" }>
					<div className={ "space-y-2 text-center" }>
						<div className={ "mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-surface-secondary p-2 shadow-sm" }>
							<Image
								alt={ "Gym App icon" }
								className={ "size-12" }
								height={ 48 }
								priority
								src={ "/app-icon.svg" }
								width={ 48 }
							/>
						</div>
						<div className={ "space-y-1" }>
							<Typography className={ "font-semibold tracking-normal" } type={ "h4" }>
								Gym App
							</Typography>
							<Typography color={ "muted" } type={ "body-sm" }>
								Accedé a tu cuenta para gestionar tus rutinas.
							</Typography>
						</div>
					</div>

					{ /* Se va cuando hay un error de ingreso, para no mostrar dos avisos. */ }
					{ leaveNotice && !loginMutation.isError ? (
						<Alert className={ "border border-warning/20" } status={ "warning" }>
							<Alert.Content>
								<Alert.Title>{ leaveNotice.title }</Alert.Title>
								<Alert.Description>{ leaveNotice.description }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					{ loginMutation.isError ? (
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>No pudimos iniciar sesión</Alert.Title>
								{ /* El servidor ya manda un texto pensado para mostrar: datos
								     incorrectos, cuenta desactivada o una falla nuestra. */ }
								<Alert.Description>{ loginMutation.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					<form className={ "space-y-4" } onSubmit={ handleSubmit }>
						<TextField
							fullWidth
							isRequired
							name={ "credential" }
							autoComplete={ "username" }
							value={ credential }
							onChange={ setCredential }
						>
							<Label>DNI o correo electrónico</Label>
							<Input
								placeholder={ "Ej: 12345678 o usuario@mail.com" }
								variant={ "secondary" }
							/>
							{ isCredentialInvalid ? <FieldError>Ingresá un DNI o correo válido.</FieldError> : null }
						</TextField>

						<TextField
							fullWidth
							isRequired
							name={ "password" }
							autoComplete={ "current-password" }
							value={ password }
							onChange={ setPassword }
						>
							<Label>Contraseña</Label>
							<div className={ "relative" }>
								<Input
									className={ "pr-11" }
									placeholder={ "Ingresá tu contraseña" }
									type={ isPasswordVisible ? "text" : "password" }
									variant={ "secondary" }
								/>
								<Button
									aria-label={ isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña" }
									className={ "absolute inset-y-1 right-1 z-10 size-8 min-w-8 text-muted" }
									isIconOnly
									size={ "sm" }
									type={ "button" }
									variant={ "ghost" }
									onPress={ () => setIsPasswordVisible( ( current ) => !current ) }
								>
									{ isPasswordVisible ? <EyeOff className={ "size-4" }/> : <Eye className={ "size-4" }/> }
								</Button>
							</div>
							{ isPasswordInvalid ? <FieldError>La contraseña es obligatoria.</FieldError> : null }
						</TextField>

						<Button
							className={ "w-full bg-accent text-accent-foreground" }
							isDisabled={ isSubmitDisabled }
							isPending={ loginMutation.isPending || isRedirecting }
							size={ "lg" }
							type={ "submit" }
						>
							{ ( { isPending } ) => (
								<>
									{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : null }
									{ isPending ? null : <LogIn className={ "size-4" }/> }
									{ isPending ? "Ingresando..." : "Iniciar sesión" }
								</>
							) }
						</Button>
						{ /* No hay recuperacion por correo: la contraseña la cambia el entrenador. */ }
						<p className={ "text-center text-xs leading-5 text-muted" }>
							¿Olvidaste tu contraseña? Pedile a tu entrenador que te la cambie.
						</p>
					</form>
				</Card.Content>
			</Card>
		</main>
	);
}
