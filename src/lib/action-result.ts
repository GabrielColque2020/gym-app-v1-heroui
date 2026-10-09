// Lo que devuelve una server action: los datos, o el motivo por el que no se
// pudo. No se tira un error porque en produccion Next esconde el mensaje de los
// errores de una server action (lo cambia por un texto generico en ingles), y el
// motivo es justo lo que la persona tiene que leer.
export type ActionResult<T> =
	| { ok: true; data: T }
	| { ok: false; reason: string };

// Los datos que devuelve una server action envuelta, para tipar lo que llega al
// cliente: `ActionData<typeof getStudentsAction>`.
export type ActionData<Action extends ( ...args: never[] ) => Promise<ActionResult<unknown>>> =
	Extract<Awaited<ReturnType<Action>>, { ok: true }>[ "data" ];

// Del lado del que llama: devuelve los datos o tira un error con el motivo. Ese
// error ya nace en el navegador, asi que su mensaje llega entero a la pantalla
// (React Query lo deja en `error.message`).
export function unwrapAction<T>( result: ActionResult<T> ): T {
	if (!result.ok) {
		throw new Error( result.reason );
	}

	return result.data;
}

// El motivo de un error que vino de `unwrapAction`, para mostrarlo en un aviso.
export function getErrorMessage( error: unknown, fallback: string ) {
	return error instanceof Error && error.message ? error.message : fallback;
}

// La misma action, pero devolviendo los datos o tirando el error: para pasarla
// directo como `queryFn` o `mutationFn`.
//
// Un solo parametro de tipo, la action entera: asi se deduce solo del argumento.
// Con `<Args, T>` TypeScript los deducia del tipo que esperaba `useMutation` y
// perdia los del `onSuccess`.
export function unwrapped<Action extends ( ...args: never[] ) => Promise<ActionResult<unknown>>>( action: Action ) {
	return async ( ...args: Parameters<Action> ): Promise<ActionData<Action>> =>
		unwrapAction( await action( ...args ) ) as ActionData<Action>;
}
