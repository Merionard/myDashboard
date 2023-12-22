"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { customerSchema } from "./customerFormSchema";
import { prisma } from "@/prisma/client";

export const newCustomerAction = authenticatedAction(
  customerSchema,
  async (data) => {
    await prisma.customer.create({
      data: {
        businessName: data.raisonSociale,
        Address: data.address
          ? {
              create: {
                addressName: data.address.addressName,
                country: data.address.country,
                number: Number(data.address.addressNumber),
                poCode: Number(data.address.poCode),
              },
            }
          : undefined,

        contact: data.contact
          ? {
              create: {
                name: data.contact?.nom,
                firstName: data.contact.prenom,
                email: data.contact.email,
              },
            }
          : undefined,
      },
    });

    return "le client " + data.raisonSociale + " a été créé avec succès!";
  }
);
