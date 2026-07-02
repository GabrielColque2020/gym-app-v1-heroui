"use client";

import { useMutation } from "@tanstack/react-query";

import type { LoginRequest, LoginResponse } from "@/types/auth";

async function requestLogin( payload: LoginRequest ): Promise<LoginResponse> {
	const response = await fetch( "/api/auth/login", {
		body: JSON.stringify( payload ),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	} );

	const data = await response.json().catch( () => null ) as LoginResponse | { error?: string } | null;

	if (!response.ok) {
		const message = data && typeof data === "object" && "error" in data && typeof data.error === "string"
			? data.error
			: "No se pudo iniciar sesión.";

		throw new Error( message );
	}

	return data as LoginResponse;
}

export function useLogin() {
	return useMutation( {
		mutationFn: requestLogin,
	} );
}
