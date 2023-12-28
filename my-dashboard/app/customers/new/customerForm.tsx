"use client";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { CustomerAddressForm } from "./customerAddressForm";
import { CustomerContactForm } from "./customerContactForm";
import { Etablissement, customerSchema } from "./customerSchemaAndTypes";
import { newCustomerAction } from "./newCustomerAction";
import { CustomerComboBox } from "./searchCustomerComboBox";

export function CustomerForm() {
  const [showContact, setShowContact] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      raisonSociale: "",
    },
  });

  async function onSubmit(values: z.infer<typeof customerSchema>) {
    const { data, serverError } = await newCustomerAction(values);
    if (data) {
      router.push("/customers");
      router.refresh();
      toast.success(data);
    } else if (serverError) {
      toast.error(serverError);
    }
  }

  const toogleContact = () => {
    if (showContact) {
      form.unregister("contact");
    }
    setShowContact(!showContact);
  };

  const toogleAddress = () => {
    if (showAddress) {
      form.unregister("address");
    }
    setShowAddress(!showAddress);
  };

  const handleSelectEtablissement = (etablissement: Etablissement) => {
    setShowAddress(true);
    form.register("address");
    form.setValue("address.addressName", etablissement.adresse);
    form.setValue(
      "address.addressNumber",
      etablissement.adresse.substring(0, etablissement.adresse.indexOf(" "))
    );
    form.setValue("address.country", "France");
    form.setValue("address.poCode", etablissement.code_postal);
    form.setValue("address.siret", etablissement.siret);
    form.setValue("raisonSociale", etablissement.nom_complet);
    form.setValue("siren", etablissement.siren);
  };

  return (
    <div>
      <Typography variant={"h2"} className="pt-3">
        Nouveau client
      </Typography>
      <div className="flex justify-end mt-3">
        <CustomerComboBox
          callbackOnSelectEtablissement={handleSelectEtablissement}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="raisonSociale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raison sociale</FormLabel>
                <FormControl>
                  <Input placeholder="raison sociale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro siren</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro siren" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button type="button" onClick={toogleContact}>
              <PlusCircle className="mr-2" /> Ajouter Contact
            </Button>
            {showContact && <CustomerContactForm form={form} />}
            <Button type="button" onClick={toogleAddress}>
              <PlusCircle className="mr-2" />
              Ajouter Adresse
            </Button>
            {showAddress && <CustomerAddressForm form={form} />}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
