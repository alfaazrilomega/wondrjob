-- CreateTable
CREATE TABLE "public"."HRD" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "HRD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HRD_user_id_key" ON "public"."HRD"("user_id");

-- AddForeignKey
ALTER TABLE "public"."HRD" ADD CONSTRAINT "HRD_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HRD" ADD CONSTRAINT "HRD_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
