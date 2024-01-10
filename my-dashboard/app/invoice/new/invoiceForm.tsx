"use client";

import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Customer } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Invoice } from "../invoiceSchema";
import { InvoiceLineForm } from "./invoiceLineForm";
import { CustomerWithAddressAndContact } from "../page";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Facture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <Typography variant={"h3"}>Destinataire</Typography>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="min-w-[200px] justify-between"
                >
                  {value != "" ? value : "Sélectionner un destinataire..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandEmpty>Aucun client trouvé</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer.id}
                        value={customer.businessName}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setSelectedCustomer(customer);
                        }}
                      >
                        {customer.businessName}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === customer.businessName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex gap-5">
              <div>
                <p className="h-6 min-h-6">Société:</p>
                <p className="h-6 min-h-6">Nom:</p>
                <p className="h-6 min-h-6">Adresse</p>
                <p className="h-6 min-h-6">Pays:</p>
                <p className="h-6 min-h-6">Numéro d entreprise:</p>
                <p className="h-6 min-h-6">Numéro de TVA:</p>
                <p className="h-6 min-h-6">Adresse email:</p>
              </div>
              <div className="">
                <p className="h-6 min-h-6">{selectedCustomer?.businessName}</p>
                <p className="h-6 min-h-6">
                  {selectedCustomer?.contact?.firstName}
                </p>
                <p className="h-6 min-h-6">
                  {selectedCustomer?.address[0].addressName}
                </p>
                <p className="h-6 min-h-6">
                  {selectedCustomer?.address[0].country}
                </p>
                <p className="h-6 min-h-6">{selectedCustomer?.siren}</p>
                <p className="h-6 min-h-6">{selectedCustomer?.siren}</p>
                <p className="h-6 min-h-6">
                  {selectedCustomer?.contact?.email}
                </p>
              </div>
            </div>
          </div>
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
