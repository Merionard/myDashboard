"use server";

import { prisma } from "@/prisma/client";
import { WorkDay } from "@prisma/client";

export const createWorkDay = async (
  date: Date,
  workLineId: number,
  duration: number
) => {
  const workDay = prisma.workDay.create({
    data: {
      workPeriodLineId: workLineId,
      date: date,
      duration: duration,
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

export const updateWorkDay = async (wordkDay: WorkDay, duration: number) => {
  const workDay = prisma.workDay.update({
    where: { id: wordkDay.id },
    data: {
      duration: duration,
    },
  });
  return workDay;
};
