"use server";

import { prisma } from "@/prisma/client";

export const deleteCustomerAction = async (customerId: number) => {
  const customer = await prisma.customer.delete({ where: { id: customerId } });
  return customer;
};
