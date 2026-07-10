import type { Prisma } from "@/generated/prisma/client";

export const adminUserSelect = {
	active: true,
	coach: {
		select: {
			active: true,
			id: true,
			name: true,
			role: true,
		},
	},
	coachId: true,
	createdAt: true,
	dni: true,
	email: true,
	gender: true,
	id: true,
	name: true,
	role: true,
	updatedAt: true,
} satisfies Prisma.UserSelect;
