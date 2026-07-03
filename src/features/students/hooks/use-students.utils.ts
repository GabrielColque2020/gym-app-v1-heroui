"use client";

import type { QueryClient } from "@tanstack/react-query";

import type { Students } from "@/features/students/services/students-query";
import { STUDENTS_QUERY_KEY } from "@/features/students/services/students-query";
import { TRAINING_ROUTINES_STUDENTS_QUERY_KEY } from "@/features/students/services/training-routines-students-query";

export function refetchStudentsInBackground( queryClient: QueryClient ) {
	void queryClient.invalidateQueries( { queryKey: STUDENTS_QUERY_KEY } );
	void queryClient.invalidateQueries( { queryKey: TRAINING_ROUTINES_STUDENTS_QUERY_KEY } );
}

export function replaceStudentInCache( queryClient: QueryClient, updatedStudent: Students[ number ] ) {
	queryClient.setQueryData<Students>( STUDENTS_QUERY_KEY, ( currentStudents ) => {
		if (!currentStudents) return currentStudents;

		return currentStudents.map( ( student ) =>
			student.id === updatedStudent.id ? updatedStudent : student,
		);
	} );
}

export function prependStudentInCache( queryClient: QueryClient, student: Students[ number ] ) {
	queryClient.setQueryData<Students>( STUDENTS_QUERY_KEY, ( currentStudents ) => {
		if (!currentStudents) return [ student ];

		return [ student, ...currentStudents ];
	} );
}
