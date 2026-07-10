"use client";

import { useQuery } from "@tanstack/react-query";

import { adminCoachesQueryOptions } from "@/features/role/admin/users/services/admin-coaches-query";

export function useAdminCoaches() {
	return useQuery( adminCoachesQueryOptions() );
}
