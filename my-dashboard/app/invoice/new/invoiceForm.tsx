"use client";

import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { TableRow } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Invoice, InvoiceLine } from "../invoiceSchema";
import { CustomerWithAddressAndContact } from "../page";
import Conditions from "./conditionsReglement";
import { InvoiceLineForm } from "./invoiceLineForm";
import SelectCustomer from "./selectCustomer";
import Total from "./total";
import { createInvoice } from "../invoiceAction";
import { toast } from "sonner";

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

  const onSelectCustomer = (customer: CustomerWithAddressAndContact) => {
    setSelectedCustomer(customer);
    setInvoice((prev) => {
      const updatedInvoice = { ...prev };
      if (customer.address.length > 0) {
        updatedInvoice.customerAddress = customer.address[0].addressName;
        updatedInvoice.customerCountry = customer.address[0].country;
      }
      updatedInvoice.customerName = customer.businessName;
      updatedInvoice.customerSociety = customer.businessName;
      if (customer.siren) {
        updatedInvoice.customerSiren = customer.siren;
      }

      if (customer.contact) {
        updatedInvoice.customerMail = customer.contact.email;
      }
      return updatedInvoice;
    });
  };

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
            VatAmount: Number(
              (
                (updatedLine.quantity *
                  updatedLine.unitPrice *
                  updatedLine.vatRate) /
                100
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

  const linesGroupByTaxRate: Array<{ vatRate: number; total: number }> = [];
  invoice.lines
    .filter((l) => l.vatRate > 0)
    .forEach((line) => {
      const groupLineIndex = linesGroupByTaxRate.findIndex(
        (groupLine) => groupLine.vatRate === line.vatRate
      );
      if (groupLineIndex === -1) {
        linesGroupByTaxRate.push({
          vatRate: line.vatRate,
          total: line.VatAmount,
        });
      } else {
        const updateGroupLine = {
          ...linesGroupByTaxRate[groupLineIndex],
          total: linesGroupByTaxRate[groupLineIndex].total + line.VatAmount,
        };
        linesGroupByTaxRate.splice(groupLineIndex, 1, updateGroupLine);
      }
    });

  const total = invoice.lines
    .map((l) => ({
      totalHT: l.totalHT,
      totalTTC: l.totalTTC,
      totalVAT: l.VatAmount,
    }))
    .reduce(
      (t1, t2) => ({
        totalHT: t1.totalHT + t2.totalHT,
        totalTTC: t1.totalTTC + t2.totalTTC,
        totalVAT: t1.totalVAT + t2.totalVAT,
      }),
      { totalHT: 0, totalTTC: 0, totalVAT: 0 }
    );

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

  const saveNewInvoice = async () => {
    const { data, serverError, validationError } = await createInvoice(invoice);
    if (data) {
      toast.success("facture " + data.number + " créée avec succès");
    } else {
      toast.error("oups");
    }
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Facture</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectCustomer
            customers={customers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={onSelectCustomer}
          />

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

          <Table className="w-1/4 mt-5">
            <TableHeader>
              <TableRow>
                <TableHead className="border text-center">
                  TAUX DE TAXE
                </TableHead>
                <TableHead className="border text-center">
                  TAXE TOTALE
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linesGroupByTaxRate.map((l) => (
                <TableRow key={l.vatRate}>
                  <TableCell className="text-right border">
                    {l.vatRate}%
                  </TableCell>
                  <TableCell className="text-right border">
                    {l.total} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-end mt-3">
            <Conditions
              invoice={invoice}
              updateInvoiceConditionReg={(val) =>
                setInvoice((prev) => ({ ...prev, conditionReglement: val }))
              }
              updateInvoiceModeReg={(val) =>
                setInvoice((prev) => ({ ...prev, modeReglement: val }))
              }
            />
            <Total
              totalHT={total.totalHT}
              totalTTC={total.totalTTC}
              totalVAT={total.totalVAT}
            />
          </div>
          <div className="flex justify-between mt-3">
            <Link href={"/"}>
              <Button variant={"destructive"}>Annuler</Button>
            </Link>
            <Button onClick={saveNewInvoice}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
