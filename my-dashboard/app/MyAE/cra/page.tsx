import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import CraTable from "./craTable";
import { redirect } from "next/navigation";

export default async function Page() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const customers = await prisma.customer.findMany();

  const session = await getAuthSession();

  if (session == null || !session.user.id) {
    return redirect("/");
  }

  return (
    <div className="container mt-5">
      <CraTable users={users} userId={session.user.id} customers={customers} />
    </div>
  );
}
