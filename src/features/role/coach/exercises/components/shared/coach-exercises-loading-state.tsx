import { TableSkeleton } from "@/components/common/skeletons";

export function CoachExercisesLoadingState() {
	return <TableSkeleton columns={ 5 } rows={ 6 }/>;
}
