import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma/client";
import {
  ConditionsReglementType,
  ModeReglementType,
  ServiceType,
} from "@/src/enums";
import clsx from "clsx";
import { Invoice, InvoiceLine } from "../../invoiceSchema";

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
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="bg-primary-foreground">
          <CardTitle>Facture {prismaInvoice.number}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-5 mt-5">
            <div className="w-1/2 space-y-1">
              <Typography variant={"h3"} className="mb-3">
                Destinataire
              </Typography>

              <div className="flex border-b justify-between">
                <div className="flex-1 ">Destinataire</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerName}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Société</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerSociety}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Siren</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerSiren}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Numéro TVA</div>
                <div className="flex-[2_2_0%]">TODO</div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Adresse</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerAddress}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Pays</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerCountry}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">mail</div>
                <div className="flex-[2_2_0%]">
                  {prismaInvoice.customerMail}
                </div>
              </div>
            </div>
            <div className="w-1/2  space-y-1">
              <Typography variant={"h3"} className="mb-3">
                Conditions
              </Typography>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Conditions règlement</div>
                <div className="flex-[2]">
                  {prismaInvoice.conditionReglement}
                </div>
              </div>
              <div className="flex border-b justify-between">
                <div className="flex-1 ">Mode règlement</div>
                <div className="flex-[2]">{prismaInvoice.modeReglement}</div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Typography variant={"h3"}>Détails</Typography>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Prix unitaire HT</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead>TVA</TableHead>
                  <TableHead className="text-right">Total HT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prismaInvoice.lines.map((l, index) => (
                  <TableRow
                    key={l.id}
                    className={clsx({
                      "bg-primary-foreground": index % 2 === 0,
                    })}
                  >
                    <TableCell>{l.type}</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell className="text-right">
                      {l.unitPrice.toFixed(2)}€
                    </TableCell>
                    <TableCell className="text-right">{l.quantity}</TableCell>
                    <TableCell>{l.vatRate}%</TableCell>
                    <TableCell className="text-right">
                      {l.totalHT.toFixed(2)}€
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-5">
            <div className="flex gap-5">
              <div>
                <p>Total HT</p>
                <p>TVA</p>
                <p className="font-bold text-lg">Total TTC</p>
              </div>
              <div>
                <p>{prismaInvoice.totalHT.toFixed(2)}€</p>
                <p>
                  {(prismaInvoice.totalTTC - prismaInvoice.totalHT).toFixed(2)}€
                </p>
                <p className="font-bold text-lg">
                  {prismaInvoice.totalTTC.toFixed(2)}€
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
