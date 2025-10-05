-- AlterTable
ALTER TABLE "public"."PositionApplied" ADD COLUMN     "earliestStartDate" TIMESTAMP(3),
ADD COLUMN     "expectedSalary" INTEGER,
ADD COLUMN     "referral" TEXT,
ADD COLUMN     "workPermit" BOOLEAN;
