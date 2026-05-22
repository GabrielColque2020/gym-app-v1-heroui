import type { Exercise, WorkoutSession } from '../types/routine.types';

export const mockBenchPress: Exercise = {
	id: "ex-1",
	name: "Bench Press",
	equipment: "Barra Olímpica",
	muscleGroup: "Pecho",
	restTime: 120,
	notes: "Mantener escápulas retraídas",
	sets: [
		{
			id: "set-1",
			setNumber: 1,
			previousWeight: 80,
			previousReps: 8,
			targetReps: 8,
			currentWeight: null,
			currentReps: null,
			completed: false
		},
		{
			id: "set-2",
			setNumber: 2,
			previousWeight: 80,
			previousReps: 8,
			targetReps: 8,
			currentWeight: null,
			currentReps: null,
			completed: false
		},
		{
			id: "set-3",
			setNumber: 3,
			previousWeight: 80,
			previousReps: 7,
			targetReps: 8,
			currentWeight: null,
			currentReps: null,
			completed: false
		},
		{
			id: "set-4",
			setNumber: 4,
			previousWeight: 80,
			previousReps: 6,
			targetReps: 8,
			currentWeight: null,
			currentReps: null,
			completed: false
		}
	]
};

export const mockInclinePress: Exercise = {
	id: "ex-2",
	name: "Incline Dumbbell Press",
	equipment: "Mancuernas",
	muscleGroup: "Pecho Superior",
	restTime: 90,
	sets: [
		{
			id: "set-5",
			setNumber: 1,
			previousWeight: 30,
			previousReps: 10,
			targetReps: 10,
			currentWeight: null,
			currentReps: null,
			completed: false
		},
		{
			id: "set-6",
			setNumber: 2,
			previousWeight: 30,
			previousReps: 9,
			targetReps: 10,
			currentWeight: null,
			currentReps: null,
			completed: false
		},
		{
			id: "set-7",
			setNumber: 3,
			previousWeight: 30,
			previousReps: 8,
			targetReps: 10,
			currentWeight: null,
			currentReps: null,
			completed: false
		}
	]
};

export const mockWorkoutSession: WorkoutSession = {
	id: "session-1",
	dayNumber: 1,
	date: new Date(),
	title: "Pecho y Tríceps",
	exercises: [ mockBenchPress, mockInclinePress ],
	completed: false
};