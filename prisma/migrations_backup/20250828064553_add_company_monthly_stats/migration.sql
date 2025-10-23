-- CreateTable
CREATE TABLE "public"."CompanyMonthlyStats" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "successRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CompanyMonthlyStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMonthlyStats_companyId_month_year_key" ON "public"."CompanyMonthlyStats"("companyId", "month", "year");

-- AddForeignKey
ALTER TABLE "public"."CompanyMonthlyStats" ADD CONSTRAINT "CompanyMonthlyStats_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
