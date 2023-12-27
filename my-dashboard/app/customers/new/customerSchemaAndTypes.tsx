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
  siret: z.string().length(14),
});

export const customerSchema = z.object({
  raisonSociale: z.string().min(2, {
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
