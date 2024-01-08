"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ServiceTypes } from "@/src/enums";
import { Customer } from "@prisma/client";
import { SelectGroup } from "@radix-ui/react-select";
import { ChangeEvent, useState } from "react";
import { Invoice, InvoiceLineSchema } from "../invoiceSchema";
import { InvoiceLineForm } from "./invoiceLineForm";

type Props = {
  customers: Customer[];
};
function initInvoice() {
  const invoice: Invoice = {
    conditionReglement: "30 jours fin de mois",
    customerAddress: "",
    customerCountry: "",
    customerName: "",
    lines: [
      {
        quantity: 0,
        totalHT: 0,
        totalTTC: 0,
        type: "Service",
        unitPrice: 0,
        VatAmount: 0,
        vatRate: 0,
        ihmId: Math.floor(Math.random() * 1000).toString(),
      },
    ],
    modeReglement: "Virement bancaire",
    statut: "DRAFT",
    totalHT: 0,
    totalTTC: 0,
    type: "INVOICE",
  };
  return invoice;
}
export const InvoiceForm = ({ customers }: Props) => {
  const [invoice, setInvoice] = useState<Invoice>(() => initInvoice());

  const onChangeLine = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ihmId: string
  ) => {
    const lines = [...invoice.lines];
    const lineToUpdate = lines.find((i) => i.ihmId === ihmId);
    if (lineToUpdate) {
      const newLine = {
        ...lineToUpdate,
        [e.target.name]: Number(e.target.value),
      };
      lines.splice(
        lines.findIndex((l) => l.ihmId === ihmId),
        1,
        newLine
      );
      setInvoice((prev) => ({ ...prev, lines: lines }));
    }
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Facture</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Destinataire</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner destinataire" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.businessName}>
                    {c.businessName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Articles</Label>
          {invoice.lines.map((line) => (
            <InvoiceLineForm
              key={line.ihmId}
              line={line}
              onChangeLineCallBack={onChangeLine}
            />
          ))}

          <Textarea />
        </CardContent>
      </Card>
    </div>
  );
};
