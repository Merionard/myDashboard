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
import { newCustomerAction, updateCustomerAction } from "./customerActions";
import { CustomerAddressForm } from "./customerAddressForm";
import { CustomerContactForm } from "./customerContactForm";
import { Etablissement, customerSchema } from "./customerSchemaAndTypes";
import { CustomerComboBox } from "./searchCustomerComboBox";

export function CustomerForm(props: {
  customer: z.infer<typeof customerSchema> | null;
}) {
  const [showContact, setShowContact] = useState(
    props.customer != null && props.customer.contact != null
  );
  const [showAddress, setShowAddress] = useState(
    props.customer != null && props.customer.address != null
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      businessName: props.customer ? props.customer.businessName : "",
      id: props.customer ? props.customer.id : undefined,
      siren: props.customer ? props.customer.siren : undefined,
      contact: props.customer ? props.customer.contact : undefined,
      address: props.customer ? props.customer.address : [],
      firstAddress: props.customer
        ? props.customer.address.length > 0
          ? props.customer.address[0]
          : undefined
        : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof customerSchema>) {
    const { data, serverError } = props.customer
      ? await updateCustomerAction(values)
      : await newCustomerAction(values);
    if (data) {
      router.push("/MyAE/customers");
      router.refresh();
      toast.success(data);
    } else if (serverError) {
      toast.error(serverError);
    }
  }

  const toogleContact = () => {
    if (showContact && props.customer == null) {
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
    form.register("firstAddress");
    form.setValue("firstAddress.addressName", etablissement.adresse);
    form.setValue(
      "firstAddress.number",
      etablissement.adresse.substring(0, etablissement.adresse.indexOf(" "))
    );
    form.setValue("firstAddress.country", "France");
    form.setValue("firstAddress.poCode", etablissement.code_postal);
    form.setValue("firstAddress.siret", etablissement.siret);
    form.setValue("businessName", etablissement.nom_complet);
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
            name="businessName"
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
            <Button onClick={() => form.handleSubmit(onSubmit)}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
