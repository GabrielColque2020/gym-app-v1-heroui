import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthenticatedSession } from "@/features/auth/session";
import ProfilePageContent from "@/features/profile/views/profile-page-content";
import { formatDateInputValue } from "@/features/students/services/student-form";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Mi perfil" };

export default async function ProfilePage() {
	const session = await getAuthenticatedSession();

	if (!session) {
		redirect( "/login" );
	}

	// El administrador no tiene "Mi perfil": sus datos los maneja desde Usuarios.
	if (session.role === "ADMIN") {
		redirect( "/admin/dashboard" );
	}

	const user = await prisma.user.findUnique( {
		select: {
			birthDate: true,
			dni: true,
			email: true,
			gender: true,
			name: true,
			DescriptionStudent: {
				select: { height: true, objective: true, weight: true },
			},
		},
		where: { id: session.sub },
	} );

	if (!user) {
		redirect( "/login" );
	}

	return (
		<ProfilePageContent
			initialValues={ {
				birthDate: formatDateInputValue( user.birthDate ),
				dni: String( user.dni ),
				email: user.email,
				gender: user.gender ?? "NONE",
				height: String( user.DescriptionStudent?.height ?? 0 ),
				name: user.name,
				objective: user.DescriptionStudent?.objective ?? "",
				weight: String( user.DescriptionStudent?.weight ?? 0 ),
			} }
			role={ session.role }
		/>
	);
}
