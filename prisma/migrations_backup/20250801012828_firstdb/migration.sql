-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'SOCIETY', 'COMPANY');

-- CreateEnum
CREATE TYPE "public"."PositionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'SOCIETY',
    "phone" TEXT,
    "address" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Society" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
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
    "status" "public"."PositionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PositionApplied_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_id_key" ON "public"."Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Society_user_id_key" ON "public"."Society"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_id_key" ON "public"."Company"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Society" ADD CONSTRAINT "Society_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AvailablePosition" ADD CONSTRAINT "AvailablePosition_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Portofolio" ADD CONSTRAINT "Portofolio_society_id_fkey" FOREIGN KEY ("society_id") REFERENCES "public"."Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PositionApplied" ADD CONSTRAINT "PositionApplied_available_position_id_fkey" FOREIGN KEY ("available_position_id") REFERENCES "public"."AvailablePosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PositionApplied" ADD CONSTRAINT "PositionApplied_society_id_fkey" FOREIGN KEY ("society_id") REFERENCES "public"."Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
