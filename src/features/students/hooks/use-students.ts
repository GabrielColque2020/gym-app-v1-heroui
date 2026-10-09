"use client";

import { unwrapped } from "@/lib/action-result";
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

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const createStudent = unwrapped( createStudentAction );
const updateStudent = unwrapped( updateStudentAction );
const deactivateStudent = unwrapped( deactivateStudentAction );
const restoreStudent = unwrapped( restoreStudentAction );

export function useStudents() {
	return useQuery( studentsQueryOptions() );
}

export function useCreateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createStudent,
		onSuccess: ( student ) => {
			prependStudentInCache( queryClient, student );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useUpdateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateStudent,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useDeactivateStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deactivateStudent,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}

export function useRestoreStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: restoreStudent,
		onSuccess: ( updatedStudent ) => {
			replaceStudentInCache( queryClient, updatedStudent );
			refetchStudentsInBackground( queryClient );
		},
	} );
}
