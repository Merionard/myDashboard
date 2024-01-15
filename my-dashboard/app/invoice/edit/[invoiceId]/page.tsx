import { prisma } from "@/prisma/client";
import { Invoice, InvoiceLine } from "../../invoiceSchema";
import {
  ConditionsReglementType,
  ModeReglementType,
  ServiceType,
} from "@/src/enums";
import { InvoiceForm } from "../../new/invoiceForm";

export default async function EditInvoice({
  params,
}: {
  params: { invoiceId: string };
}) {
  const customers = await prisma.customer.findMany({
    include: { contact: true, address: true },
    orderBy: { id: "desc" },
  });
  const prismaInvoice = await prisma.invoice.findUnique({
    where: {
      id: Number(params.invoiceId),
    },
    include: { lines: true },
  });
  if (!prismaInvoice) {
    throw new Error("Cette facture n'existe pas!");
  }
  const condition: ConditionsReglementType =
    prismaInvoice.conditionReglement as ConditionsReglementType;
  const modeReglement: ModeReglementType =
    prismaInvoice.modeReglement as ModeReglementType;

  const invoiceFormLines: InvoiceLine[] = prismaInvoice.lines.map((l) => {
    const type: ServiceType = l.type as ServiceType;
    return {
      ...l,
      ihmId: Math.floor(Math.random() * 1000).toString(),
      type: type,
    };
  });

  const invoice: Invoice = {
    ...prismaInvoice,
    conditionReglement: condition,
    modeReglement: modeReglement,
    lines: invoiceFormLines,
  };
  return <InvoiceForm customers={customers} invoiceToEdit={invoice} />;
}
