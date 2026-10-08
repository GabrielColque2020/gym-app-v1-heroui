import bcrypt from "bcryptjs";

import type { PrismaClient, User } from "@/generated/prisma/client";
import type { ThemePreference } from "@/generated/prisma/enums";
import type { AuthenticatedUser, LoginRequest, LoginResponse } from "@/types/auth";
import { createSessionToken as buildSessionToken, getSessionSecret } from "@/features/login/services/session-token";

export type LoginPrismaTx = {
	user: {
		findFirst: PrismaClient["user"]["findFirst"];
	};
	userLoginHistory: {
		create: PrismaClient["userLoginHistory"]["create"];
		deleteMany: PrismaClient["userLoginHistory"]["deleteMany"];
		findMany: PrismaClient["userLoginHistory"]["findMany"];
	};
};

export type LoginPrismaClient = LoginPrismaTx & {
	$transaction<T>( callback: ( tx: LoginPrismaTx ) => Promise<T> ): Promise<T>;
};

type LoginDependencies = {
	comparePassword?: typeof bcrypt.compare;
	ip?: string | null;
	prismaClient?: LoginPrismaClient;
	secret?: string;
	userAgent?: string | null;
};

export { AUTH_SESSION_COOKIE_NAME, AUTH_SESSION_TTL_SECONDS } from "@/features/login/services/session-token";
export { createSessionToken } from "@/features/login/services/session-token";
export { verifySessionToken } from "@/features/login/services/session-token";
const MAX_LOGIN_HISTORY = 3;
let defaultPrismaClientPromise: Promise<LoginPrismaClient> | null = null;

export function normalizeCredential( credential: string ) {
	return credential.trim();
}

export function parseDniCredential( credential: string ) {
	const normalized = normalizeCredential( credential );

	if (!/^\d+$/.test( normalized )) {
		return null;
	}

	const dni = Number( normalized );

	return Number.isSafeInteger( dni ) ? dni : null;
}

export function toAuthenticatedUser( user: User ): AuthenticatedUser {
	const typedUser = user as User & { themePreference: ThemePreference };

	return {
		active: typedUser.active,
		dni: typedUser.dni,
		email: typedUser.email,
		gender: typedUser.gender ?? null,
		id: typedUser.id,
		name: typedUser.name,
		role: typedUser.role,
		themePreference: typedUser.themePreference,
	};
}

async function getDefaultPrismaClient() {
	if (!defaultPrismaClientPromise) {
		defaultPrismaClientPromise = import( "@/lib/prisma" ).then( ( module ) => module.default as unknown as LoginPrismaClient );
	}

	return defaultPrismaClientPromise;
}

export async function findUserByCredential( prismaClient: LoginPrismaTx, credential: string ) {
	const normalizedCredential = normalizeCredential( credential );
	const dni = parseDniCredential( normalizedCredential );

	return prismaClient.user.findFirst( {
		where: {
			OR: [
				{
					email: {
						equals: normalizedCredential,
						mode: "insensitive",
					},
				},
				...( dni === null ? [] : [ { dni } ] ),
			],
		},
	} );
}

export async function pruneUserLoginHistory( prismaClient: LoginPrismaTx, userId: string ) {
	const loginHistory = await prismaClient.userLoginHistory.findMany( {
		orderBy: [
			{
				loggedAt: "desc",
			},
			{
				id: "desc",
			},
		],
		select: {
			id: true,
		},
		where: {
			userId,
		},
	} );

	const idsToDelete = loginHistory.slice( MAX_LOGIN_HISTORY ).map( ( history ) => history.id );

	if (idsToDelete.length === 0) {
		return 0;
	}

	const result = await prismaClient.userLoginHistory.deleteMany( {
		where: {
			id: {
				in: idsToDelete,
			},
		},
	} );

	return result.count;
}

export async function recordUserLoginHistory(
	prismaClient: LoginPrismaClient,
	userId: string,
	metadata: {
		ip?: string | null;
		userAgent?: string | null;
	},
) {
	return prismaClient.$transaction( async ( tx ) => {
		const createdHistory = await tx.userLoginHistory.create( {
			data: {
				ip: metadata.ip ?? null,
				userAgent: metadata.userAgent ?? null,
				userId,
			},
		} );

		await pruneUserLoginHistory( tx, userId );

		return createdHistory;
	} );
}

// Los unicos motivos de rechazo que se le cuentan a quien intenta entrar.
export const LOGIN_INVALID_CREDENTIALS_MESSAGE = "El DNI, el correo o la contraseña no son correctos.";
export const LOGIN_INACTIVE_ACCOUNT_MESSAGE = "Tu cuenta está desactivada. Pedile a tu entrenador que la vuelva a activar.";

// Hash de una contraseña que nadie tiene. Cuando la cuenta no existe se compara
// igual contra este, para que la respuesta tarde lo mismo que con una cuenta real
// y no se pueda adivinar por el tiempo qué correos o DNI estan registrados.
const UNKNOWN_ACCOUNT_PASSWORD_HASH = "$2b$10$ggPLTxAyJovD80WdY6g3L.Z9w.pSz5C1zlZbZRiCsh.p5f8oUfYle";

export async function loginUser(
	input: LoginRequest,
	dependencies: LoginDependencies = {},
): Promise<LoginResponse> {
	const credential = normalizeCredential( input.credential );
	const password = input.password.trim();

	if (!credential) {
		throw new Error( "Debes ingresar un DNI o correo electrónico." );
	}

	if (!password) {
		throw new Error( "La contraseña es obligatoria." );
	}

	const prismaClient = dependencies.prismaClient ?? await getDefaultPrismaClient();
	const user = await findUserByCredential( prismaClient, credential );
	const comparePassword = dependencies.comparePassword ?? bcrypt.compare;
	const isPasswordValid = await comparePassword( password, user?.password ?? UNKNOWN_ACCOUNT_PASSWORD_HASH )
		.catch( () => false );

	// Cuenta inexistente y contraseña equivocada responden lo mismo: distinguirlas
	// le deja a cualquiera averiguar quien tiene cuenta.
	if (!user || !isPasswordValid) {
		throw new Error( LOGIN_INVALID_CREDENTIALS_MESSAGE );
	}

	// Que la cuenta esta desactivada se dice solo a quien puso bien la contraseña.
	if (!user.active) {
		throw new Error( LOGIN_INACTIVE_ACCOUNT_MESSAGE );
	}

	const authenticatedUser = toAuthenticatedUser( user );
	const sessionToken = await buildSessionToken( authenticatedUser, dependencies.secret ?? getSessionSecret() );

	await recordUserLoginHistory( prismaClient, user.id, {
		ip: dependencies.ip,
		userAgent: dependencies.userAgent,
	} );

	return {
		sessionToken,
		user: authenticatedUser,
	};
}
