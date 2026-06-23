import { InitialData } from "./seed";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'

const adapter = new PrismaPg( {
	connectionString: process.env.DATABASE_URL,
} )

const prisma = new PrismaClient( {
	adapter,
} );

async function deleteAll() {
	await prisma.mealPlan.deleteMany();
	await prisma.routineExerciseVariant.deleteMany();
	await prisma.routine.deleteMany();
	await prisma.routineDay.deleteMany();
	await prisma.trainingRoutine.deleteMany();
	await prisma.studentExercise.deleteMany();
	await prisma.exerciseProgress.deleteMany();
	await prisma.exercise.deleteMany();
	await prisma.descriptionStudent.deleteMany();
	await prisma.user.deleteMany();
}

async function main(): Promise<void> {

	await deleteAll();

	const { admin, coach, students, exercises, trainingRoutines, routineDays, routines, mealPlans } = InitialData;

	// crear un admin
	await prisma.user.create( {
		data: admin,
	} );

	// crear un coach
	const createdCoach = await prisma.user.create( {
		data: coach,
	} );

	// Create the clients
	await prisma.user.createMany( {
		data: students.map( client => ( {
			...client,
			coachId: createdCoach.id,
		} ) ),
	} );

	// Get the first created client
	const firstStudent = await prisma.user.findFirst( { where: { email: "gabriel@gmail.com" } } );

	// Create the exercises
	await prisma.exercise.createMany( { data: exercises.map( exercise => ( { ...exercise, coachId: createdCoach.id } ) ) } )
	//
	// Create the Training Routine
	await prisma.trainingRoutine.createMany( {
		data: trainingRoutines.map( trainingRoutine => ( {
			...trainingRoutine,
			studentId: firstStudent?.id
		} ) )
	} )

	// Get the first created trainingRoutine
	const firstTrainingRoutine = await prisma.trainingRoutine.findFirst();

	// Create the Routine Days
	await prisma.routineDay.createMany( {
		data: routineDays.map( routineDay => ( {
			...routineDay,
			trainingRoutineId: firstTrainingRoutine?.id ?? ''
		} ) )
	} )

	const firstRoutineDay = await prisma.routineDay.findFirst();

	// Get the created exercises
	const exercisesDB = await prisma.exercise.findMany();

	routines[ 0 ].exerciseId = exercisesDB[ 0 ].id;
	routines[ 1 ].exerciseId = exercisesDB[ 1 ].id;

	// Create the routines
	await prisma.routine.createMany( {
		data: routines.map( routine => ( {
			...routine,
			routineDayId: firstRoutineDay?.id ?? ''
		} ) )
	} )


	await prisma.studentExercise.createMany( {
		data: exercisesDB.map( exercise => ( {
			exerciseId: exercise.id,
			studentId: firstStudent?.id ?? ""
		} ) ),
	} )

	// Create MealPlans
	await prisma.mealPlan.createMany( {
		data: mealPlans.map( m => ( {
			...m,
			studentId: firstStudent?.id ? firstStudent.id : "0"
		} ) )
	} )

	console.log( "Seed executed successfully" );
}

( async () => {
	try {
		if (process.env.NODE_ENV === "production") return;
		await main();
	} catch (error) {
		console.error( "Error executing seed:", error );
		process.exit( 1 );
	}
} )();
