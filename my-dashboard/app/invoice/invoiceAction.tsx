"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { InvoiceSchema } from "./invoiceSchema";
import { prisma } from "@/prisma/client";

export const createInvoice = authenticatedAction(
  InvoiceSchema,
  async (data) => {
    const compteur = await prisma.compteur.findUnique({
      where: { type: "INVOICE" },
    });
    if (!compteur) {
      await prisma.compteur.create({ data: { type: "INVOICE", count: 1 } });
    }
    const invoiceCount = compteur ? compteur.count : 1;
    const newInvoice = await prisma.invoice.create({
      data: {
        conditionReglement: data.conditionReglement,
        createdAt: new Date(),
        customerAddress: data.customerAddress,
        customerCountry: data.customerCountry,
        customerName: data.customerName,
        modeReglement: data.modeReglement,
        statut: "DRAFT",
        type: "INVOICE",
        customerMail: data.customerMail,
        customerSiren: data.customerSiren,
        customerSociety: data.customerSociety,
        totalHT: data.totalHT,
        totalTTC: data.totalTTC,
        number: "F" + invoiceCount.toString().padStart(5, "0"),
        lines: {
          createMany: {
            data: data.lines.map(({ ihmId, ...line }) => line),
          },
        },
      },
    });

    if (compteur) {
      await prisma.compteur.update({
        where: { type: compteur.type },
        data: { count: compteur.count + 1 },
      });
    }
    return newInvoice;
  }
);
