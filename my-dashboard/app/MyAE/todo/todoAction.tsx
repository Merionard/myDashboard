"use server";

import { prisma } from "@/prisma/client";
import { Task, TaskStatus } from "@prisma/client";

export const createTheme = async (title: string, userId: string) => {
  const theme = await prisma.todoList.findUnique({
    where: { title: title.trim().toUpperCase() },
  });
  if (!theme) {
    const newList = await prisma.todoList.create({
      data: {
        title: title.trim().toUpperCase(),
        userId: userId,
      },
    });
    return { data: newList };
  }
  return { error: "cette liste existe déjà" };
};

export const addTask = async (
  listTitle: string,
  title: string,
  description: string | undefined,
  order: number
) => {
  const newTask = await prisma.task.create({
    data: {
      order: order,
      status: "OPEN",
      title: title,
      description: description,
      listTitle: listTitle,
      createdAt: new Date(),
    },
  });
  return newTask;
};

export const changePriorityTask = async (order: number, taskId: number) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { order: order },
  });
  return updatedTask;
};

export const changeStatutTask = async (status: TaskStatus, taskId: number) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { status: status },
  });
  return updatedTask;
};

export const deleteTask = async (taskId: number) => {
  const deletedTask = await prisma.task.delete({ where: { id: taskId } });
  return deletedTask;
};

export const deleteTodoList = async (title: string) => {
  const deletedList = await prisma.todoList.delete({ where: { title: title } });
  return deletedList;
};

export const reorderTask = async (tasks: Task[]) => {
  for (const task of tasks) {
    await prisma.task.update({
      where: { id: task.id },
      data: { order: task.order },
    });
  }
  return "liste mise à jour avec succès";
};
