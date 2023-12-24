import { z } from "zod";

const API_CUSTOMER_URL = "https://recherche-entreprises.api.gouv.fr/search";

const etablissement = z.object({
  code_postal: z.string(),
  adresse: z.string(),
  libelle_commune: z.string(),
  siret: z.string().length(14),
});

const customerFromApi = z.array(
  z.object({
    etat_administratif: z.string(),
    nom_complet: z.string(),
    siren: z.string().max(9),
    matching_etablissements: z.array(etablissement),
  })
);

export const fetchCustomers = async (customerName: string) => {
  const result = await fetch(API_CUSTOMER_URL + "?q=" + customerName);
  const data = await result.json();

  const customers = customerFromApi.parse(data.results);
  return customers;
};
