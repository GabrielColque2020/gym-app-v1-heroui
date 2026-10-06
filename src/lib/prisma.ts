import {createPrismaClient} from "./prisma-client";

type PrismaClientBase = ReturnType<typeof createPrismaClient>;
type PrismaClientInstance = PrismaClientBase & {
    exerciseCoach: PrismaClientBase extends { exercise: infer ExerciseDelegate } ? ExerciseDelegate : any;
};

type PrismaGlobal = typeof globalThis & {
    prisma?: PrismaClientInstance;
};

const globalForPrisma = globalThis as PrismaGlobal;
const prismaClient = globalForPrisma.prisma ?? createPrismaClient();

export const prisma = prismaClient;
export type {PrismaClientInstance};

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
