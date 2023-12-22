import { z } from "zod";

export const customerFormSchema = z.object({
  raisonSociale: z.string().min(2, {
    message: "raisonSociale must be at least 2 characters.",
  }),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  email: z.string().email().optional(),
  poCode: z.string().optional(),
  country: z.string().optional(),
  addressName: z.string().optional(),
  addressNumber: z.string().optional(),
});

export const customerContactSchema = z.object({
  nom: z.string().min(3),
  prenom: z.string().min(3),
  email: z.string().email(),
});

export const customerAddress = z.object({
  poCode: z.string().min(5),
  country: z.string().min(2),
  addressName: z.string().min(3),
  addressNumber: z.string().min(1),
});

export const customerSchema = z.object({
  raisonSociale: z.string().min(2, {
    message: "raisonSociale must be at least 2 characters.",
  }),
  contact: customerContactSchema.optional(),
  address: customerAddress.optional(),
});
