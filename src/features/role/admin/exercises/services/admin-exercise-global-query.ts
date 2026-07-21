import type { Prisma } from "@/generated/prisma/client";

import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

export const ADMIN_EXERCISE_GLOBAL_PAGE_SIZE = 8;

export type AdminExerciseGlobalStatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

export type AdminExerciseGlobalQueryParams = {
	categoryFilter?: string;
	page?: number;
	pageSize?: number;
	search?: string;
	statusFilter?: AdminExerciseGlobalStatusFilter;
};

export type AdminExerciseGlobalsResult = {
	currentPage: number;
	items: AdminExerciseGlobalListItem[];
	pageSize: number;
	showingFrom: number;
	showingTo: number;
	totalItems: number;
	totalPages: number;
};

export function normalizeAdminExerciseGlobalSearch( value: string | undefined ) {
	return value
		?.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " ) ?? "";
}

export function buildAdminExerciseGlobalWhereClause( params: AdminExerciseGlobalQueryParams ): Prisma.ExerciseGlobalWhereInput {
	const normalizedSearch = normalizeAdminExerciseGlobalSearch( params.search );
	const categoryFilter = params.categoryFilter?.trim() ?? "ALL";
	const statusFilter = params.statusFilter ?? "ALL";

	return {
		...( statusFilter === "ACTIVE" ? { active: true } : {} ),
		...( statusFilter === "INACTIVE" ? { active: false } : {} ),
		...( categoryFilter !== "ALL" ? { category: categoryFilter } : {} ),
		...( normalizedSearch
			? {
				OR: [
					{ searchName: { contains: normalizedSearch } },
					{ externalId: { contains: normalizedSearch, mode: "insensitive" } },
				],
			}
			: {} ),
	};
}
