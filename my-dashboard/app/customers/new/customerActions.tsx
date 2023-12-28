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
        address: data.firstAddress
          ? {
              create: {
                addressName: data.firstAddress.addressName,
                country: data.firstAddress.country,
                number: data.firstAddress.number,
                poCode: data.firstAddress.poCode,
                siret: data.firstAddress.siret,
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
  async (data) => {
    if (data.id) {
      await prisma.customer.update({
        where: {
          id: data.id,
        },
        data: {
          businessName: data.businessName,
          siren: data.siren,
          contact: data.contact
            ? data.contact.id
              ? {
                  update: {
                    data: { ...data.contact },
                  },
                }
              : {
                  create: {
                    name: data.contact.name,
                    firstName: data.contact.firstName,
                    email: data.contact.email,
                  },
                }
            : undefined,
        },
      });
    }
    return "le client " + data.businessName + " a été mis à jour avec succès!";
  }
);
