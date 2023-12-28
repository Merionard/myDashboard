import { z } from "zod";

export const customerContactSchema = z.object({
  name: z.string().min(3),
  firstName: z.string().min(3),
  email: z.string().email(),
});

export const customerAddressSchema = z.object({
  poCode: z.string().min(5),
  country: z.string().min(2),
  addressName: z.string().min(3),
  number: z.string().min(1),
  siret: z.string().length(14).optional(),
});

export const customerSchema = z.object({
  businessName: z.string().min(2, {
    message: "raisonSociale must be at least 2 characters.",
  }),
  siren: z.string().length(9).optional(),
  contact: customerContactSchema.optional(),
  address: customerAddressSchema.optional(),
});

export type Etablissement = {
  siren: string;
  nom_complet: string;
  code_postal: string;
  adresse: string;
  libelle_commune: string;
  siret: string;
};
