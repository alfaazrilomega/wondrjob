-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'SOCIETY', 'COMPANY', 'HRD');

-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "public"."WorkStyle" AS ENUM ('ON_SITE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'SOCIETY',
    "phone" TEXT,
    "address" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "profile_picture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HRD" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "HRD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Society" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "user_id" TEXT NOT NULL,
    "location" TEXT,
    "headline" TEXT,
    "about" TEXT,
    "profile_picture" TEXT,
    "available_dates" TIMESTAMP(3)[],
    "occupation" TEXT,
    "social_media_url" TEXT,
    "working_papers_url" TEXT,
    "most_memorable_tip" TEXT,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "logo" TEXT,
    "tagline" TEXT,
    "companyCertificateUrl" TEXT,
    "website" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyMonthlyStats" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "successRate" DOUBLE PRECISION NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netIncome" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "CompanyMonthlyStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvailablePosition" (
    "id" SERIAL NOT NULL,
    "position_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "submission_start_date" TIMESTAMP(3) NOT NULL,
    "submission_end_date" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "jobType" "public"."JobType",
    "salaryMax" INTEGER,
    "salaryMin" INTEGER,
    "workStyle" "public"."WorkStyle",

    CONSTRAINT "AvailablePosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Portofolio" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "society_id" INTEGER NOT NULL,

    CONSTRAINT "Portofolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PositionApplied" (
    "id" SERIAL NOT NULL,
    "available_position_id" INTEGER NOT NULL,
    "society_id" INTEGER NOT NULL,
    "apply_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "resume" TEXT,
    "coverLetter" TEXT,
    "earliestStartDate" TIMESTAMP(3),
    "expectedSalary" INTEGER,
    "referral" TEXT,
    "workPermit" BOOLEAN,

    CONSTRAINT "PositionApplied_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobEmbedding" (
    "id" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "embedding" JSONB NOT NULL,
    "skills" TEXT[],
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PortfolioEmbedding" (
    "id" TEXT NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "embedding" JSONB NOT NULL,
    "skills" TEXT[],
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Setting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "public"."RolePermission" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Follow" (
    "id" SERIAL NOT NULL,
    "followerId" TEXT NOT NULL,
    "followedUserId" TEXT,
    "followedCompanyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_AvailablePositionToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AvailablePositionToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_SkillToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SkillToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_id_key" ON "public"."Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HRD_user_id_key" ON "public"."HRD"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Society_user_id_key" ON "public"."Society"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_id_key" ON "public"."Company"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMonthlyStats_companyId_month_year_key" ON "public"."CompanyMonthlyStats"("companyId", "month", "year");

-- CreateIndex
CREATE INDEX "AvailablePosition_company_id_idx" ON "public"."AvailablePosition"("company_id");

-- CreateIndex
CREATE INDEX "PositionApplied_available_position_id_idx" ON "public"."PositionApplied"("available_position_id");

-- CreateIndex
CREATE INDEX "PositionApplied_status_idx" ON "public"."PositionApplied"("status");

-- CreateIndex
CREATE UNIQUE INDEX "JobEmbedding_jobId_key" ON "public"."JobEmbedding"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioEmbedding_portfolioId_key" ON "public"."PortfolioEmbedding"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "public"."Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_permission_key" ON "public"."RolePermission"("role", "permission");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "public"."Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followedUserId_idx" ON "public"."Follow"("followedUserId");

-- CreateIndex
CREATE INDEX "Follow_followedCompanyId_idx" ON "public"."Follow"("followedCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followedUserId_key" ON "public"."Follow"("followerId", "followedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followedCompanyId_key" ON "public"."Follow"("followerId", "followedCompanyId");

-- CreateIndex
CREATE INDEX "_AvailablePositionToSkill_B_index" ON "public"."_AvailablePositionToSkill"("B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "public"."_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HRD" ADD CONSTRAINT "HRD_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HRD" ADD CONSTRAINT "HRD_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Society" ADD CONSTRAINT "Society_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyMonthlyStats" ADD CONSTRAINT "CompanyMonthlyStats_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AvailablePosition" ADD CONSTRAINT "AvailablePosition_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Portofolio" ADD CONSTRAINT "Portofolio_society_id_fkey" FOREIGN KEY ("society_id") REFERENCES "public"."Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PositionApplied" ADD CONSTRAINT "PositionApplied_available_position_id_fkey" FOREIGN KEY ("available_position_id") REFERENCES "public"."AvailablePosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PositionApplied" ADD CONSTRAINT "PositionApplied_society_id_fkey" FOREIGN KEY ("society_id") REFERENCES "public"."Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobEmbedding" ADD CONSTRAINT "JobEmbedding_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."AvailablePosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PortfolioEmbedding" ADD CONSTRAINT "PortfolioEmbedding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portofolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_followedCompanyId_fkey" FOREIGN KEY ("followedCompanyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AvailablePositionToSkill" ADD CONSTRAINT "_AvailablePositionToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."AvailablePosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AvailablePositionToSkill" ADD CONSTRAINT "_AvailablePositionToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
