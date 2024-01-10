import { prisma } from "@/prisma/client";
import { InvoiceForm } from "./new/invoiceForm";
import { Prisma } from "@prisma/client";

export type CustomerWithAddressAndContact = Prisma.CustomerGetPayload<{
  include: { contact: true; address: true };
}>;

export default async function InvoicePage() {
  const customers = await prisma.customer.findMany({
    include: { contact: true, address: true },
  });

  return (
    <div>
      <InvoiceForm customers={customers} />
    </div>
  );
}
