"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Spinner, Typography } from "@heroui/react";

export default function LogoutPageContent() {
	const router = useRouter();

	useEffect( () => {
		let isMounted = true;

		async function logout() {
			try {
				await fetch( "/api/auth/logout", {
					method: "POST",
				} );
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
	}, [ router ] );

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
