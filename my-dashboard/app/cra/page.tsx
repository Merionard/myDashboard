import { PrismaClient } from "@prisma/client";
import CraTable from "./craTable";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { getRequiredAuthSession } from "@/lib/auth";
import { create } from "domain";

export default async function Page() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const session = await getRequiredAuthSession();
  const customers = await prisma.customer.findMany();

  return (
    <CraTable users={users} userId={session.user.id} customers={customers} />
  );
}
