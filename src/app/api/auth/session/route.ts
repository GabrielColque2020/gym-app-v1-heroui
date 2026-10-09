import { NextResponse } from "next/server";

import { getSessionStatus } from "@/features/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Le dice a la app abierta si su sesion sigue valiendo. Las pantallas no se
// vuelven a pedir al servidor mientras se navega dentro de la app, asi que sin
// esto una cuenta desactivada seguia viendo la app (con errores y datos viejos)
// hasta recargar la pagina.
export async function GET() {
	const status = await getSessionStatus();

	return NextResponse.json(
		{ status },
		{
			headers: { "Cache-Control": "no-store" },
			status: status === "active" ? 200 : 401,
		},
	);
}
