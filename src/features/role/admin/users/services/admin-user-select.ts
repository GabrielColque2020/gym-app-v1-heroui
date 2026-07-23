import type { Prisma } from "@/generated/prisma/client";

export const adminUserSelect = {
	DescriptionStudent: {
		select: {
			height: true,
			id: true,
			objective: true,
			observations: true,
			weight: true,
		},
	},
	active: true,
	birthDate: true,
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
