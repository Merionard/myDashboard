"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { InvoiceSchema } from "./invoiceSchema";
import { prisma } from "@/prisma/client";

export const createInvoice = authenticatedAction(
  InvoiceSchema,
  async (data) => {
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
        number: "F_DRAFT",
        lines: {
          createMany: {
            data: data.lines.map(({ ihmId, id, ...line }) => line),
          },
        },
      },
    });

    return newInvoice;
  }
);

export const editInvoice = authenticatedAction(InvoiceSchema, async (data) => {
  const updatedInvoice = await prisma.invoice.update({
    where: { id: data.id },
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
    },
  });

  await prisma.invoiceLine.deleteMany({
    where: {
      id: { in: data.deletedLines },
    },
  });

  for (const l of data.lines) {
    if (l.id == null) {
      const { id, ihmId, ...rest } = l;
      const lineToCreate = { ...rest };
      await prisma.invoiceLine.create({
        data: { ...lineToCreate, invoiceId: lineToCreate.invoiceId as number },
      });
    } else {
      const { id, ihmId, ...rest } = l;
      const lineToUpdate = { ...rest, id };
      await prisma.invoiceLine.update({
        where: { id: l.id },
        data: { ...lineToUpdate },
      });
    }
  }

  return updatedInvoice;
});

export const deleteInvoice = async (invoiceId: number) => {
  const deletedInvoice = await prisma.invoice.delete({
    where: { id: invoiceId },
  });
  return deletedInvoice;
};

export const validateInvoice = async (invoiceId: number, dueDate: Date) => {
  const compteur = await prisma.compteur.findUnique({
    where: { type: "INVOICE" },
  });
  if (!compteur) {
    await prisma.compteur.create({ data: { type: "INVOICE", count: 1 } });
  }
  const invoiceCount = compteur ? compteur.count : 1;
  const validatedInvoice = await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      validateAt: new Date(),
      statut: "VALIDATED",
      number: "F" + invoiceCount.toString().padStart(5, "0"),
      dueDate: dueDate,
    },
  });

  await prisma.compteur.update({
    where: { type: "INVOICE" },
    data: { count: compteur ? compteur.count + 1 : 2 },
  });

  return validatedInvoice;
};

export const payInvoice = async (invoiceId: number, payedAt: Date) => {
  const payedInvoice = await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      payedAt: payedAt,
      statut: "PAYED",
    },
  });
  return payedInvoice;
};
