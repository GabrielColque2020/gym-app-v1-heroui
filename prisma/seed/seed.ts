import bcryptjs from "bcryptjs";

interface SeedAdmin {
    name: string;
    email: string;
    dni: number;
    password: string;
    gender: "F" | "M" | "O";
    role: "ADMIN";
}

interface SeedCoach {
    name: string;
    email: string;
    dni: number;
    password: string;
    gender: "F" | "M" | "O";
    role: "COACH";
}

interface SeedStudent {
    name: string;
    email: string;
    dni: number;
    password: string;
    gender: "F" | "M" | "O";
    role: "STUDENT";
}

interface SeedExercise {
    name: string;
    bodyPart: "CHEST" | "BACK" | "LEGS" | "TRICEPS" | "BICEPS" | "SHOULDERS";
}

interface SeedTrainingRoutine {
    name: string;
    week: number;
    month: number;
    year: number;
    clientId?: string;
}

interface SeedRoutineDay {
    dayNumber: number;
    trainingRoutineId?: string;
}

interface SeedRoutine {
    observation: string;
    reps: string;
    sets: string;
    order: number;
    exerciseId?: string;
    trainingRoutineId?: string;
}

interface SeedMealPlan {
    description: string;
    title: "BREAKFAST" | "LUNCH" | "SNACK" | "DINNER" | "OPTIONGREEN" | "SEVERAL";
    order: number;
}

interface SeedData {
    admin: SeedAdmin;
    coach: SeedCoach;
    students: SeedStudent[];
    exercises: SeedExercise[];
    trainingRoutines: SeedTrainingRoutine[];
    routineDays: SeedRoutineDay[];
    routines: SeedRoutine[];
    mealPlans: SeedMealPlan[];
}

export const InitialData: SeedData = {
    admin: {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcryptjs.hashSync( "Password01" ),
        dni: 111111111,
        gender: "M",
        role: "ADMIN",
    },
    coach: {
        name: "Maxi",
        email: "maxi@gmail.com",
        password: bcryptjs.hashSync( "123456" ),
        dni: 123456789,
        gender: "M",
        role: "COACH",
    },
    students: [
        {
            name: "Gabriel Colque",
            email: "gabriel@gmail.com",
            password: bcryptjs.hashSync( "123456" ),
            dni: 222222222,
            gender: "M",
            role: "STUDENT",
        },
        {
            name: "Samanta Farfan",
            email: "sam@gmail.com",
            password: bcryptjs.hashSync( "123456" ),
            dni: 333333333,
            gender: "F",
            role: "STUDENT",
        },
    ],
    exercises: [
        {
            name: "Press de banca", // Bench press
            bodyPart: "CHEST",
        },
        {
            name: "Dominadas", // Pull-ups
            bodyPart: "BACK",
        },
        {
            name: "Sentadillas", // Squats
            bodyPart: "LEGS",
        },
        {
            name: "Fondos", // Dips
            bodyPart: "TRICEPS",
        },
    ],
    trainingRoutines: [
        {
            name: "Semana 1", // Day 1: Back and biceps
            week: 1,
            month: 9,
            year: 2025,
        },
        {
            name: "Semana 2", // Day 2: Legs
            week: 2,
            month: 9,
            year: 2025,
        },
    ],
    routineDays: [
        {
            dayNumber: 1,
        },
    ],
    routines: [
        {
            observation: "Llegar al fallo", // Go to failure
            reps: "15",
            sets: "4",
            order: 1,
        },
        {
            observation: "Piramidal", // Pyramid set
            reps: "15",
            sets: "4",
            order: 2,
        },
    ],
    mealPlans: [
        {
            description: "3 huevo enteros\n1/2 palta chica o 4 nueces\n1/2 tomate\nTe verde o cafe",
            title: "BREAKFAST",
            order: 1,
        },
        {
            description: "150gr opción proteinas(carne, pollo, pescado) pesado en crudo\n100gr Papa o batata o coreanito\nOpción de verdes libre (ver opciones)",
            title: "LUNCH",
            order: 2,
        },
        {
            description: "3 huevos enteros\n4 nueces o 6 almendras\n1 manzana verde o 150 gr frutos rojos\nTe verde",
            title: "SNACK",
            order: 3,
        },
        {
            description: "150 gr Opción proteínas (carne, pollo, pescado) pesado en crudo\nOpción verdes, hojas verdes libre",
            title: "DINNER",
            order: 4,
        },
        {
            description: "zapallito verde\ncebolla\nchaucha\nespinaca\nlechuga\nrucula\nbrocoli\ncoliflor\npimiento\nberenjena\nespinaca\nzucchini",
            title: "OPTIONGREEN",
            order: 5,
        },
        {
            description: "Edulcorante Estevia\nsal rosa del Himalaya\ngelatina light\nsavora\nVinagre de manzana\nCurcuma\nIncorporar Jengibre\nTomar abundante agua\nConsumir té verde frío o infusiones durante el día",
            title: "SEVERAL",
            order: 6,
        },
    ],
};