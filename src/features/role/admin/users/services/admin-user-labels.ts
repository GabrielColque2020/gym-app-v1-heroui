import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";

// Los roles con el nombre que usa el resto de la app, no el de la base de datos.
export function getAdminRoleLabel( role: AdminUserListItem["role"] ) {
	return role === "ADMIN" ? "Administrador" : role === "COACH" ? "Entrenador" : "Estudiante";
}

// Solo los estudiantes tienen entrenador: para el resto no hay nada que mostrar.
export function getAdminCoachLabel( user: AdminUserListItem ) {
	if (user.role !== "STUDENT") {
		return "—";
	}

	return user.coach ? user.coach.name : "Sin entrenador";
}
