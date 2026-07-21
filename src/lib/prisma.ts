import {PrismaClient} from "@/generated/prisma/client";
import {withAccelerate} from "@prisma/extension-accelerate";

type PrismaClientBase = ReturnType<typeof createPrismaClient>;
type PrismaClientInstance = PrismaClientBase & {
    exerciseCoach: PrismaClientBase extends { exercise: infer ExerciseDelegate } ? ExerciseDelegate : any;
};

type PrismaGlobal = typeof globalThis & {
    prisma?: PrismaClientInstance;
};

function createPrismaClient() {
    const accelerateUrl = process.env.DATABASE_URL;

    if (!accelerateUrl) {
        throw new Error("DATABASE_URL is required to initialize Prisma Accelerate.");
    }

    return new PrismaClient({
        accelerateUrl,
    }).$extends(withAccelerate());
}

const globalForPrisma = globalThis as PrismaGlobal;
const prismaClient = globalForPrisma.prisma ?? createPrismaClient();

export const prisma = prismaClient;
export type {PrismaClientInstance};

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
