"use client";

import { TableSkeleton } from "@/components/common/skeletons";

export function CoachHistoryRoutinesLoadingState() {
	return <TableSkeleton columns={ 4 } rows={ 4 }/>;
}
