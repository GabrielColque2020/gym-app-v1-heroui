"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Students } from "@/features/admin/user/student/services/students-query";

import {
	createStudentAction,
	deactivateStudentAction,
	restoreStudentAction,
	updateStudentAction,
} from "@/features/admin/user/student/actions/student-mutations";
import {
	STUDENTS_QUERY_KEY,
	studentsQueryOptions,
} from "@/features/admin/user/student/services/students-query";

export function useStudents() {
	return useQuery( studentsQueryOptions() );
}

function refetchStudentsInBackground( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: STUDENTS_QUERY_KEY } );
}

function replaceStudentInCache( queryClient: ReturnType<typeof useQueryClient>, updatedStudent: Students[ number ] ) {
	queryClient.setQueryData<Students>( STUDENTS_QUERY_KEY, ( currentStudents ) => {
		if (!currentStudents) return currentStudents;

		return currentStudents.map( ( student ) =>
			student.id === updatedStudent.id ? updatedStudent : student
		);
	} );
}

export function useCreateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createStudentAction,
		onSuccess: ( student ) => {
			queryClient.setQueryData<Students>( STUDENTS_QUERY_KEY, ( currentStudents ) => {
				if (!currentStudents) return [ student ];

				return [ student, ...currentStudents ];
			} );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useUpdateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateStudentAction,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useDeactivateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deactivateStudentAction,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useRestoreStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: restoreStudentAction,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}
