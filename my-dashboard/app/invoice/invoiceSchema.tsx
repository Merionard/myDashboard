import {
  ConditionsReglement,
  InvoiceStatus,
  InvoiceType,
  ModeReglement,
  ServiceTypes,
} from "@/src/enums";
import { z } from "zod";

export const InvoiceLineSchema = z.object({
  id: z.number().optional(),
  ihmId: z.string(),
  invoiceId: z.number().optional(),
  type: z.enum(ServiceTypes),
  unitPrice: z.number(),
  quantity: z.number(),
  vatRate: z.number(),
  totalHT: z.number(),
  totalTTC: z.number(),
  VatAmount: z.number(),
});
export const InvoiceSchema = z.object({
  id: z.number().optional(),
  type: z.enum(InvoiceType),
  statut: z.enum(InvoiceStatus),
  customerName: z.string().min(1),
  customerSociety: z.string().optional().nullable(),
  customerSiren: z.string().optional().nullable(),
  customerVatNumber: z.string().optional().nullable(),
  customerAddress: z.string(),
  customerCountry: z.string(),
  customerMail: z.string().optional().nullable(),
  conditionReglement: z.enum(ConditionsReglement),
  modeReglement: z.enum(ModeReglement),
  createdAt: z.date().optional(),
  payedAt: z.date().optional().nullable(),
  validateAt: z.date().optional().nullable(),
  totalHT: z.number(),
  totalTTC: z.number(),
  lines: z.array(InvoiceLineSchema),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoiceLine = z.infer<typeof InvoiceLineSchema>;
