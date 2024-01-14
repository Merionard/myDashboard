import { DataTable } from "@/components/dataTable";
import { prisma } from "@/prisma/client";
import { columnsInvoice } from "./columnsDatatableInvoice";

export default async function InvoiceDatatalbe() {
  const invoices = await prisma.invoice.findMany();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columnsInvoice}
        data={invoices}
        filter="number"
        filterName="Numéro de facture"
      />
    </div>
  );
}
