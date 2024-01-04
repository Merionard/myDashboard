"use server";

import { prisma } from "@/prisma/client";

export const createWorkDay = async (date: Date, workLineId: number) => {
  const workDay = prisma.workDay.create({
    data: {
      workPeriodLineId: workLineId,
      date: date,
    },
  });
  return workDay;
};
