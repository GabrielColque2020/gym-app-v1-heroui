"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createStudentAction,
	deactivateStudentAction,
	restoreStudentAction,
	updateStudentAction,
} from "@/features/students/actions/student-mutations";
import {
	prependStudentInCache,
	refetchStudentsInBackground,
	replaceStudentInCache,
} from "@/features/students/hooks/use-students.utils";
import { studentsQueryOptions } from "@/features/students/services/students-query";

export function useStudents() {
	return useQuery( studentsQueryOptions() );
}

export function useCreateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createStudentAction,
		onSuccess: ( student ) => {
			prependStudentInCache( queryClient, student );
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
