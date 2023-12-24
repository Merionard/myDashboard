"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { customerSchema } from "./customerFormSchema";
import { newCustomerAction } from "./newCustomerAction";
import { toast } from "sonner";
import { CustomerContactForm } from "./customerContactForm";
import { useState } from "react";
import { CustomerAddressForm } from "./customerAddressForm";
import { PlusCircle } from "lucide-react";
import { useQuery } from "react-query";
import { fetchCustomers, useDebounce } from "./apiGouvCustomer";

export function CustomerForm() {
  const [showContact, setShowContact] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const { data, isLoading, isError } = useQuery("customers", () =>
    fetchCustomers("CASTO")
  );

  if (!isLoading && !isError) {
    console.log(data);
  }

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      raisonSociale: "",
    },
  });

  async function onSubmit(values: z.infer<typeof customerSchema>) {
    const { data, serverError } = await newCustomerAction(values);
    if (data) {
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

  return (
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
