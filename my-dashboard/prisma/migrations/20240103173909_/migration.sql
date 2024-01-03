-- CreateTable
CREATE TABLE "WorkDay" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "workPeriodLineId" INTEGER NOT NULL,

    CONSTRAINT "WorkDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_workPeriodLineId_fkey" FOREIGN KEY ("workPeriodLineId") REFERENCES "WorkPeriodLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
