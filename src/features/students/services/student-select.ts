import type { Prisma } from "@/generated/prisma/client";

export const studentListSelect = {
	DescriptionStudent: {
		select: {
			birthDate: true,
			height: true,
			id: true,
			objective: true,
			observations: true,
			weight: true,
		},
	},
	active: true,
	createdAt: true,
	dni: true,
	email: true,
	gender: true,
	id: true,
	name: true,
	updatedAt: true,
} satisfies Prisma.UserSelect;
