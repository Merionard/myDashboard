"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { userSchema } from "./userSchema";
import { prisma } from "@/prisma/client";

export const editUser = authenticatedAction(userSchema, async (user) => {
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...user },
  });
  return updatedUser;
});
