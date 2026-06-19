import bcrypt from "bcryptjs";

import type { PrismaClient, User } from "@/generated/prisma/client";
import type { AuthenticatedUser, LoginRequest, LoginResponse } from "@/types/auth";
import { createSessionToken as buildSessionToken, getSessionSecret } from "@/features/login/services/session-token";

type LoginPrismaTx = {
	user: {
		findFirst: PrismaClient["user"]["findFirst"];
	};
	userLoginHistory: {
		create: PrismaClient["userLoginHistory"]["create"];
		deleteMany: PrismaClient["userLoginHistory"]["deleteMany"];
		findMany: PrismaClient["userLoginHistory"]["findMany"];
	};
};

type LoginPrismaClient = LoginPrismaTx & {
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
	return {
		active: user.active,
		dni: user.dni,
		email: user.email,
		gender: user.gender ?? null,
		id: user.id,
		name: user.name,
		role: user.role,
	};
}

async function getDefaultPrismaClient() {
	if (!defaultPrismaClientPromise) {
		defaultPrismaClientPromise = import( "@/lib/prisma" ).then( ( module ) => module.default as LoginPrismaClient );
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

	if (!user) {
		throw new Error( "No encontramos una cuenta con esas credenciales." );
	}

	if (!user.active) {
		throw new Error( "La cuenta se encuentra inactiva." );
	}

	const comparePassword = dependencies.comparePassword ?? bcrypt.compare;
	const isPasswordValid = await comparePassword( password, user.password );

	if (!isPasswordValid) {
		throw new Error( "La contraseña es incorrecta." );
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
