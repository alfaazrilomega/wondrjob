-- AlterTable
ALTER TABLE "public"."Society" ADD COLUMN     "available_dates" TIMESTAMP(3)[],
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "social_media_url" TEXT,
ADD COLUMN     "working_papers_url" TEXT;
