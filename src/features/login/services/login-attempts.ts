import prisma from "@/lib/prisma";

// Con cinco contraseñas equivocadas seguidas para el mismo usuario, se deja de
// probar por un rato. El tope por direccion es mucho mas alto: en un gimnasio
// varios estudiantes entran desde la misma red y alguno siempre se equivoca.
export const LOGIN_MAX_FAILURES_PER_CREDENTIAL = 5;
export const LOGIN_MAX_FAILURES_PER_IP = 30;
export const LOGIN_FAILURE_WINDOW_MINUTES = 15;

export const LOGIN_TOO_MANY_ATTEMPTS_MESSAGE =
	`Demasiados intentos fallidos. Esperá ${ LOGIN_FAILURE_WINDOW_MINUTES } minutos y probá de nuevo, o pedile a tu entrenador que te cambie la contraseña.`;

// Los intentos mas viejos que esto ya no sirven para nada y se borran.
const ATTEMPT_RETENTION_MS = 24 * 60 * 60 * 1000;

type LoginAttemptScope = {
	credential: string;
	ip: string | null;
};

// "Juan@Mail.com" y "juan@mail.com " son el mismo usuario.
function normalizeAttemptCredential( credential: string ) {
	return credential.trim().toLowerCase().slice( 0, 200 );
}

function getWindowStart() {
	return new Date( Date.now() - LOGIN_FAILURE_WINDOW_MINUTES * 60 * 1000 );
}

// Si ya hubo demasiados intentos fallidos hace poco, no se prueba la contraseña:
// se rechaza aunque esta vez sea la correcta. Si no, quien prueba contraseñas
// seguiria pudiendo acertar durante el bloqueo.
export async function isLoginBlocked( { credential, ip }: LoginAttemptScope ) {
	const createdAt = { gte: getWindowStart() };
	const [ credentialFailures, ipFailures ] = await Promise.all( [
		prisma.loginAttempt.count( {
			where: {
				createdAt,
				credential: normalizeAttemptCredential( credential ),
			},
		} ),
		ip
			? prisma.loginAttempt.count( {
				where: {
					createdAt,
					ip,
				},
			} )
			: Promise.resolve( 0 ),
	] );

	return credentialFailures >= LOGIN_MAX_FAILURES_PER_CREDENTIAL || ipFailures >= LOGIN_MAX_FAILURES_PER_IP;
}

export async function recordFailedLogin( { credential, ip }: LoginAttemptScope ) {
	await prisma.loginAttempt.create( {
		data: {
			credential: normalizeAttemptCredential( credential ),
			ip,
		},
	} );
	// De paso se limpia lo viejo, para que la tabla no crezca sin fin.
	await prisma.loginAttempt.deleteMany( {
		where: {
			createdAt: {
				lt: new Date( Date.now() - ATTEMPT_RETENTION_MS ),
			},
		},
	} );
}

// Al entrar bien, los errores anteriores de ese usuario dejan de contar.
export async function clearFailedLogins( credential: string ) {
	await prisma.loginAttempt.deleteMany( {
		where: {
			credential: normalizeAttemptCredential( credential ),
		},
	} );
}
