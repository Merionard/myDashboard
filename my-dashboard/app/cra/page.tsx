import { getRequiredAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import CraTable from "./craTable";

export default async function Page() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const session = await getRequiredAuthSession();
  const customers = await prisma.customer.findMany();

  return (
    <CraTable users={users} userId={session.user.id} customers={customers} />
  );
}
