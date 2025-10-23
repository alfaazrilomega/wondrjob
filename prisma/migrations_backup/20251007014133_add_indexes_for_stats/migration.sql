-- CreateIndex
CREATE INDEX "AvailablePosition_company_id_idx" ON "public"."AvailablePosition"("company_id");

-- CreateIndex
CREATE INDEX "PositionApplied_available_position_id_idx" ON "public"."PositionApplied"("available_position_id");

-- CreateIndex
CREATE INDEX "PositionApplied_status_idx" ON "public"."PositionApplied"("status");
