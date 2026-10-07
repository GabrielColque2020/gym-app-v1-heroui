-- AlterTable
ALTER TABLE "User" ADD COLUMN "birthDate" TIMESTAMP(3);

-- Copy existing student birth dates to User
UPDATE "User"
SET "birthDate" = "DescriptionStudent"."birthDate"
FROM "DescriptionStudent"
WHERE "DescriptionStudent"."studentId" = "User"."id"
  AND "DescriptionStudent"."birthDate" IS NOT NULL;

-- AlterTable
ALTER TABLE "DescriptionStudent" DROP COLUMN "birthDate";
