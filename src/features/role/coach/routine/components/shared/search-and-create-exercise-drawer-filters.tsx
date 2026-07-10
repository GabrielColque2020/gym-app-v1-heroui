import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

import { SearchAndCreateExerciseDrawerControls } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-controls";
import { SearchAndCreateExerciseDrawerResults } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-results";

type SearchAndCreateExerciseDrawerFiltersProps = {
	addedExerciseIds: Set<string>;
	bodyPartFilter: BodyPartFilter;
	exercisesQuery: {
		isError: boolean;
		isLoading: boolean;
		error: { message: string } | null;
	};
	isSearching: boolean;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
	onBodyPartFilterChangeAction: ( value: BodyPartFilter ) => void;
	onOrderChange: ( value: string ) => void;
	onSearchValueChangeAction: ( value: string ) => void;
	orderValue: string;
	searchValue: string;
	selectedExerciseId: string | null;
	onAddExerciseAction: ( exercise: ExerciseListItem ) => void;
	exercises: ExerciseListItem[];
};

export function SearchAndCreateExerciseDrawerFilters( {
	addedExerciseIds,
	bodyPartFilter,
	exercisesQuery,
	isSearching,
	onRegisterAddButtonRef,
	onBodyPartFilterChangeAction,
	onOrderChange,
	onSearchValueChangeAction,
	orderValue,
	searchValue,
	selectedExerciseId,
	onAddExerciseAction,
	exercises,
}: SearchAndCreateExerciseDrawerFiltersProps ) {
	return (
		<>
			<SearchAndCreateExerciseDrawerControls
				bodyPartFilter={ bodyPartFilter }
				orderValue={ orderValue }
				searchValue={ searchValue }
				onBodyPartFilterChangeAction={ onBodyPartFilterChangeAction }
				onOrderChange={ onOrderChange }
				onSearchValueChangeAction={ onSearchValueChangeAction }
			/>

			<SearchAndCreateExerciseDrawerResults
				addedExerciseIds={ addedExerciseIds }
				exercises={ exercises }
				exercisesQuery={ exercisesQuery }
				isSearching={ isSearching }
				selectedExerciseId={ selectedExerciseId }
				onAddExerciseAction={ onAddExerciseAction }
				onRegisterAddButtonRef={ onRegisterAddButtonRef }
			/>
		</>
	);
}
