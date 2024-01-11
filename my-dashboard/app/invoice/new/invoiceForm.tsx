"use client";

import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { Invoice, InvoiceLine } from "../invoiceSchema";
import { CustomerWithAddressAndContact } from "../page";
import { InvoiceLineForm } from "./invoiceLineForm";
import SelectCustomer from "./selectCustomer";
import { Button } from "@/components/ui/button";

type Props = {
  customers: CustomerWithAddressAndContact[];
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
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerWithAddressAndContact | null>(null);

  const onChangeLine = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ihmId: string
  ) => {
    setInvoice((prev) => {
      const updatedLines = prev.lines.map((line) => {
        if (line.ihmId === ihmId) {
          const updatedLine = {
            ...line,
            [e.target.name]: Number(e.target.value),
          };
          return {
            ...updatedLine,
            totalHT: Number(
              (updatedLine.quantity * updatedLine.unitPrice).toFixed(2)
            ),
            totalTTC: Number(
              (
                updatedLine.quantity *
                updatedLine.unitPrice *
                (1 + updatedLine.vatRate / 100)
              ).toFixed(2)
            ),
          };
        }
        return line;
      });

      return { ...prev, lines: updatedLines };
    });
  };

  const duplicateLine = (ihmId: string) => {
    const lineToDuplicate = invoice.lines.find((l) => l.ihmId === ihmId);
    if (lineToDuplicate) {
      setInvoice((prev) => ({
        ...prev,
        lines: [
          ...prev.lines,
          {
            ...lineToDuplicate,
            ihmId: Math.floor(Math.random() * 1000).toString(),
          },
        ],
      }));
    }
  };

  const deleteLine = (ihmId: string) => {
    const indexToDelete = invoice.lines.findIndex((i) => i.ihmId === ihmId);
    const updatedLines = [...invoice.lines];
    updatedLines.splice(indexToDelete, 1);
    setInvoice((prev) => ({ ...prev, lines: updatedLines }));
  };

  const onSelectType = (
    ihmId: string,
    type: "Acompte" | "Heures" | "Jours" | "Produit" | "Service"
  ) => {
    const updatedLines = invoice.lines.map((line) => {
      if (line.ihmId === ihmId) {
        const updatedLine = { ...line, type: type };
        return updatedLine;
      }
      return line;
    });
    setInvoice((prev) => ({ ...prev, lines: updatedLines }));
  };

  const addLine = () => {
    const newLine: InvoiceLine = {
      quantity: 0,
      totalHT: 0,
      totalTTC: 0,
      type: "Service",
      unitPrice: 0,
      VatAmount: 0,
      vatRate: 0,
      ihmId: Math.floor(Math.random() * 1000).toString(),
    };
    setInvoice((prev) => ({ ...prev, lines: [...prev.lines, newLine] }));
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Facture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <SelectCustomer
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
            />
          </div>
          <Typography variant={"h3"} className="mt-3">
            Articles
          </Typography>
          {invoice.lines.map((line) => (
            <InvoiceLineForm
              key={line.ihmId}
              line={line}
              onChangeLineCallBack={onChangeLine}
              deleteLine={deleteLine}
              duplicateLine={duplicateLine}
              onSelectType={onSelectType}
            />
          ))}
          <Button onClick={addLine} className="mt-2">
            Ajouter une ligne
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
