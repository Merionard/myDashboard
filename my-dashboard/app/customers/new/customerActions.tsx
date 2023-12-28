"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { customerSchema } from "./customerSchemaAndTypes";
import { prisma } from "@/prisma/client";

export const newCustomerAction = authenticatedAction(
  customerSchema,
  async (data) => {
    await prisma.customer.create({
      data: {
        businessName: data.businessName,
        siren: data.siren,
        address: data.address
          ? {
              create: {
                addressName: data.address.addressName,
                country: data.address.country,
                number: Number(data.address.number),
                poCode: Number(data.address.poCode),
                siret: data.address.siret,
              },
            }
          : undefined,

        contact: data.contact
          ? {
              create: {
                name: data.contact?.name,
                firstName: data.contact.firstName,
                email: data.contact.email,
              },
            }
          : undefined,
      },
    });

    return "le client " + data.businessName + " a été créé avec succès!";
  }
);

export const updateCustomerAction = authenticatedAction(
  customerSchema,
  async (data) => {}
);
