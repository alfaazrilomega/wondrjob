-- CreateEnum
CREATE TYPE "public"."DraftStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('JOB_APPROVAL_REQUEST', 'JOB_APPROVAL_ACCEPTED', 'JOB_APPROVAL_REJECTED', 'APPLICANT_UPDATE', 'INFO');

-- CreateTable
CREATE TABLE "public"."JobDraft" (
    "id" SERIAL NOT NULL,
    "position_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "submission_start_date" TIMESTAMP(3) NOT NULL,
    "submission_end_date" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "department" TEXT,
    "location" TEXT,
    "jobType" "public"."JobType",
    "salaryMax" INTEGER,
    "salaryMin" INTEGER,
    "workStyle" "public"."WorkStyle",
    "status" "public"."DraftStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "JobDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "senderId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobDraftId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_JobDraftToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JobDraftToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "JobDraft_company_id_idx" ON "public"."JobDraft"("company_id");

-- CreateIndex
CREATE INDEX "JobDraft_status_idx" ON "public"."JobDraft"("status");

-- CreateIndex
CREATE INDEX "Notification_recipientId_idx" ON "public"."Notification"("recipientId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "public"."Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_jobDraftId_idx" ON "public"."Notification"("jobDraftId");

-- CreateIndex
CREATE INDEX "_JobDraftToSkill_B_index" ON "public"."_JobDraftToSkill"("B");

-- AddForeignKey
ALTER TABLE "public"."JobDraft" ADD CONSTRAINT "JobDraft_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_jobDraftId_fkey" FOREIGN KEY ("jobDraftId") REFERENCES "public"."JobDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_JobDraftToSkill" ADD CONSTRAINT "_JobDraftToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."JobDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_JobDraftToSkill" ADD CONSTRAINT "_JobDraftToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
