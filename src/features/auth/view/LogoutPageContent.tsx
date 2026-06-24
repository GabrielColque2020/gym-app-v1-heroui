"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Spinner, Typography } from "@heroui/react";
import { useRoutineDayDraftStore } from "@/features/admin/routine/stores/useRoutineDayDraftStore";
import { useRoutineSessionStore } from "@/features/student/routine/stores/useRoutineSessionStore";

const ROUTINE_SESSION_STORAGE_KEY = "routineExerciseProgress-storage";
const ROUTINE_DAY_DRAFT_STORAGE_KEY = "admin-routine-day-drafts";

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

				useRoutineSessionStore.getState().clearAll();
				useRoutineDayDraftStore.getState().clearAllDrafts();
				queryClient.clear();

				window.localStorage.removeItem( ROUTINE_SESSION_STORAGE_KEY );
				window.localStorage.removeItem( ROUTINE_DAY_DRAFT_STORAGE_KEY );
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
