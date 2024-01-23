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

export const addLine = async (workPeriodId: number, customerId: number) => {
  const newLine = await prisma.workPeriodLine.create({
    data: {
      workPeriodId: workPeriodId,
      customerId: customerId,
      nbDaysWorked: 0,
    },
  });
  return newLine;
};

export const deleteLine = async (lineId: number) => {
  const deletedLine = await prisma.workPeriodLine.delete({
    where: { id: lineId },
  });
  return deletedLine;
};
