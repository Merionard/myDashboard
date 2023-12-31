import { PrismaClient } from "@prisma/client";
import CraTable from "./craTable";

export default async function Page() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const datesOfCurrentMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    datesOfCurrentMonth.push(date);
  }

  const columns = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columns.push(<th key={i}>{i}</th>);
  }
  columns.unshift(<th key={0}></th>);

  return <CraTable users={users} />;
}
