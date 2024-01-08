import { prisma } from "@/prisma/client";
import { InvoiceForm } from "./new/invoiceForm";

export default async function InvoicePage() {
  const customers = await prisma.customer.findMany();
  return (
    <div>
      <InvoiceForm customers={customers} />
    </div>
  );
}
