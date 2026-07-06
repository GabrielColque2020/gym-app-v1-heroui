import type { Gender, Role } from "@/generated/prisma/enums";
import type { ThemePreference } from "@/generated/prisma/enums";

export interface LoginRequest {
	credential: string;
	password: string;
}

export interface AuthenticatedUser {
	active: boolean;
	dni: number;
	email: string;
	gender: Gender | null;
	id: string;
	name: string;
	role: Role;
	themePreference: ThemePreference;
}

export interface LoginResponse {
	sessionToken: string;
	user: AuthenticatedUser;
}

export interface LoginErrorResponse {
	error: string;
}
