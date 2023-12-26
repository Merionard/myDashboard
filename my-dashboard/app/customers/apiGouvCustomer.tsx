import { useRef } from "react";
import { z } from "zod";

const API_CUSTOMER_URL = "https://recherche-entreprises.api.gouv.fr/search";

const etablissement = z.object({
  code_postal: z.string(),
  adresse: z.string(),
  libelle_commune: z.string(),
  siret: z.string().length(14),
});

const customerFromApiSchema = z.array(
  z.object({
    etat_administratif: z.string(),
    nom_complet: z.string(),
    siren: z.string().max(9),
    matching_etablissements: z.array(etablissement),
  })
);

export type CustomerFromApi = z.infer<typeof customerFromApiSchema>;

export const fetchCustomers = async (
  search: string
): Promise<CustomerFromApi> => {
  if (search === "") return [];
  const result = await fetch(API_CUSTOMER_URL + "?q=" + search);
  const data = await result.json();

  const customers = customerFromApiSchema.parse(data.results);
  console.log(customers);
  return customers as CustomerFromApi;
};
