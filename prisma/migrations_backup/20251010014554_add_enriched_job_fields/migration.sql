-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "public"."WorkStyle" AS ENUM ('ON_SITE', 'HYBRID', 'REMOTE');

-- AlterTable
ALTER TABLE "public"."AvailablePosition" ADD COLUMN     "jobType" "public"."JobType",
ADD COLUMN     "salaryMax" INTEGER,
ADD COLUMN     "salaryMin" INTEGER,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "workStyle" "public"."WorkStyle";
