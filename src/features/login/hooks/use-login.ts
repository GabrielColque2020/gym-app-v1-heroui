"use client";

import { useMutation } from "@tanstack/react-query";

import type { LoginRequest, LoginResponse } from "@/types/auth";

type LoginResult = Pick<LoginResponse, "user">;

async function requestLogin( payload: LoginRequest ): Promise<LoginResult> {
	const response = await fetch( "/api/auth/login", {
		body: JSON.stringify( payload ),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	} );

	const data = await response.json().catch( () => null ) as LoginResult | { error?: string } | null;

	if (!response.ok) {
		const message = data && typeof data === "object" && "error" in data && typeof data.error === "string"
			? data.error
			: "No pudimos iniciar sesión. Probá de nuevo en un momento.";

		throw new Error( message );
	}

	return data as LoginResult;
}

export function useLogin() {
	return useMutation( {
		mutationFn: requestLogin,
	} );
}
