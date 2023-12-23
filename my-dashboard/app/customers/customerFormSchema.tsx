import { z } from "zod";

export const customerContactSchema = z.object({
  nom: z.string().min(3),
  prenom: z.string().min(3),
  email: z.string().email(),
});

export const customerAddressSchema = z.object({
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
  address: customerAddressSchema.optional(),
});
