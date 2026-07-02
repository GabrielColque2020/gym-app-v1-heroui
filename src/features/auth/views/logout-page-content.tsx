"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Spinner, Typography } from "@heroui/react";
import { clearRoutineStateOnLogout } from "@/features/routine/services/routine-logout";

export default function LogoutPageContent() {
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect( () => {
		let isMounted = true;

		async function logout() {
			try {
				await fetch( "/api/auth/logout", {
					method: "POST",
				} );

				clearRoutineStateOnLogout();
				queryClient.clear();
				window.sessionStorage.clear();
			} finally {
				if (isMounted) {
					router.replace( "/login" );
					router.refresh();
				}
			}
		}

		void logout();

		return () => {
			isMounted = false;
		};
	}, [ queryClient, router ] );

	return (
		<main className={ "flex min-h-screen items-center justify-center bg-background px-4 py-6" }>
			<div className={ "flex flex-col items-center gap-3 text-center" }>
				<Spinner color={ "current" } size={ "sm" }/>
				<Typography color={ "muted" } type={ "body-sm" }>
					Cerrando sesión...
				</Typography>
			</div>
		</main>
	);
}
