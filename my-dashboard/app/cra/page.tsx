import { getRequiredAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import CraTable from "./craTable";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const session = await getRequiredAuthSession();
  const customers = await prisma.customer.findMany();

  return (
    <div className="container mt-5">
      <CraTable users={users} userId={session.user.id} customers={customers} />
    </div>
  );
}
