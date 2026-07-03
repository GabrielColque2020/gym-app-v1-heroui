import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

import { SearchAndCreateExerciseSheetControls } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-controls";
import { SearchAndCreateExerciseSheetResults } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-results";

type SearchAndCreateExerciseSheetFiltersProps = {
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

export function SearchAndCreateExerciseSheetFilters( {
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
}: SearchAndCreateExerciseSheetFiltersProps ) {
	return (
		<>
			<SearchAndCreateExerciseSheetControls
				bodyPartFilter={ bodyPartFilter }
				orderValue={ orderValue }
				searchValue={ searchValue }
				onBodyPartFilterChangeAction={ onBodyPartFilterChangeAction }
				onOrderChange={ onOrderChange }
				onSearchValueChangeAction={ onSearchValueChangeAction }
			/>

			<SearchAndCreateExerciseSheetResults
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
