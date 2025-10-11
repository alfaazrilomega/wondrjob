/*
  Warnings:

  - You are about to drop the column `skills` on the `AvailablePosition` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Society` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AvailablePosition" DROP COLUMN "skills";

-- AlterTable
ALTER TABLE "public"."Society" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Skill_name_key" ON "public"."Skill"("name");

-- CreateIndex
CREATE INDEX "_AvailablePositionToSkill_B_index" ON "public"."_AvailablePositionToSkill"("B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "public"."_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."_AvailablePositionToSkill" ADD CONSTRAINT "_AvailablePositionToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."AvailablePosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AvailablePositionToSkill" ADD CONSTRAINT "_AvailablePositionToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
