-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;
