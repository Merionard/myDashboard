"use server";

import { prisma } from "@/prisma/client";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const createTheme = async (themeName: string, userId: string) => {
  const theme = await prisma.todoList.findUnique({
    where: { theme: themeName.trim().toUpperCase() },
  });
  if (!theme) {
    const newTheme = await prisma.todoList.create({
      data: {
        theme: themeName.trim().toUpperCase(),
        userId: userId,
      },
    });
    return { data: newTheme };
  }
  return { error: "ce thème existe déjà" };
};

export const addTask = async (
  theme: string,
  title: string,
  description: string | undefined
) => {
  const newTask = await prisma.task.create({
    data: {
      priority: "MAJOR",
      status: "OPEN",
      title: title,
      description: description,
      theme: theme,
    },
  });
  return newTask;
};

export const changePriorityTask = async (
  priority: TaskPriority,
  taskId: number
) => {
  const updatedTask = prisma.task.update({
    where: { id: taskId },
    data: { priority: priority },
  });
  return updatedTask;
};

export const changeStatutTask = async (status: TaskStatus, taskId: number) => {
  const updatedTask = prisma.task.update({
    where: { id: taskId },
    data: { status: status },
  });
  return updatedTask;
};
