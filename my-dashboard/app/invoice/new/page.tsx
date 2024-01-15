import { prisma } from "@/prisma/client";
import { InvoiceForm } from "./invoiceForm";
import { Prisma } from "@prisma/client";

export type CustomerWithAddressAndContact = Prisma.CustomerGetPayload<{
  include: { contact: true; address: true };
}>;

export default async function NewInvoice() {
  const customers = await prisma.customer.findMany({
    include: { contact: true, address: true },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <InvoiceForm customers={customers} />
    </div>
  );
}
