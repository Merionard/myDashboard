import { DataTable } from "@/components/dataTable";
import { prisma } from "@/prisma/client";
import { columnsInvoice } from "./columnsDatatableInvoice";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InvoiceDatatalbe() {
  const invoices = await prisma.invoice.findMany({ orderBy: { id: "desc" } });

  return (
    <div className="container mx-auto py-10">
      <Link href="/invoice/new" className="flex justify-end">
        <Button>
          <PlusCircle size={"sm"} className="mr-2" />
          Nouvelle facture
        </Button>
      </Link>
      <DataTable
        columns={columnsInvoice}
        data={invoices}
        filter="number"
        filterName="Numéro de facture"
      />
    </div>
  );
}
