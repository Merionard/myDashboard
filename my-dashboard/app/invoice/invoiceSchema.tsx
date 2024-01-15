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
  customerSociety: z.string().optional(),
  customerSiren: z.string().optional(),
  customerVatNumber: z.string().optional(),
  customerAddress: z.string(),
  customerCountry: z.string(),
  customerMail: z.string().optional(),
  conditionReglement: z.enum(ConditionsReglement),
  modeReglement: z.enum(ModeReglement),
  createdAt: z.date().optional(),
  payedAt: z.date().optional(),
  validateAt: z.date().optional(),
  totalHT: z.number(),
  totalTTC: z.number(),
  lines: z.array(InvoiceLineSchema),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoiceLine = z.infer<typeof InvoiceLineSchema>;
