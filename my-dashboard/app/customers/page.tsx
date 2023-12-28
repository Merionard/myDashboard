import { prisma } from "@/prisma/client";
import { DataTable } from "../../components/dataTable";
import { columns } from "./columnsDatatable";

export default async function CustomersList() {
  const customers = await prisma.customer.findMany();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
