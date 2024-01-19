import { prisma } from "@/prisma/client";
import { Invoice, InvoiceLine } from "../../invoiceSchema";
import {
  ConditionsReglementType,
  ModeReglementType,
  ServiceType,
} from "@/src/enums";
import { InvoiceForm } from "../../new/invoiceForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ViewInvoice({
  params,
}: {
  params: { invoiceId: string };
}) {
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
      invoiceId: l.invoiceId,
    };
  });

  const invoice: Invoice = {
    ...prismaInvoice,
    conditionReglement: condition,
    modeReglement: modeReglement,
    lines: invoiceFormLines,
    deletedLines: [],
  };
  return (
    <div className="container">
      <Card>
        <CardHeader className="bg-primary-foreground">
          <CardTitle>Facture {prismaInvoice.number}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
