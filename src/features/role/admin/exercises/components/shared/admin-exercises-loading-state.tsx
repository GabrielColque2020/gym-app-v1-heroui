import { TableSkeleton } from "@/components/common/skeletons";

export function AdminExercisesLoadingState() {
	return <TableSkeleton columns={ 5 } rows={ 6 }/>;
}
