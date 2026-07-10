import type { Prisma } from "@/generated/prisma/client";

export const adminCoachSelect = {
	active: true,
	dni: true,
	email: true,
	id: true,
	name: true,
	role: true,
} satisfies Prisma.UserSelect;
