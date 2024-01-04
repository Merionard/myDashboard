"use server";

import { prisma } from "@/prisma/client";
import { WorkDay } from "@prisma/client";

export const createWorkDay = async (date: Date, workLineId: number) => {
  const workDay = prisma.workDay.create({
    data: {
      workPeriodLineId: workLineId,
      date: date,
    },
  });
  return workDay;
};

export const deleteWorkDay = async (wordkDay: WorkDay) => {
  const deletedWorkDay = await prisma.workDay.delete({
    where: { id: wordkDay.id },
  });
  return deletedWorkDay;
};
