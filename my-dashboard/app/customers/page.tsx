import { prisma } from "@/prisma/client";
import { CustomerDataTable } from "./customerDatatable";
import { columns } from "./columnsDatatable";

export default async function CustomersList() {
  const customers = await prisma.customer.findMany();

  return (
    <div className="container mx-auto py-10">
      <CustomerDataTable columns={columns} data={customers} />
    </div>
  );
}
