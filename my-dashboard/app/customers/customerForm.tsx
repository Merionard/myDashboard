"use client";

import { Typography } from "@/components/ui/Typography";
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

const formSchema = z.object({
  raisonSociale: z.string().min(2, {
    message: "raisonSociale must be at least 2 characters.",
  }),
  nom: z.string().min(3).optional(),
  prenom: z.string()?.min(3).optional(),
  email: z.string()?.email().optional(),
  poCode: z.number().min(5).optional(),
  country: z.string()?.min(3).optional(),
  addressName: z.string()?.min(10).optional(),
  addressNumber: z.number()?.min(1).optional(),
});

export function CustomerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressName: "",
      addressNumber: 0,
      country: "",
      email: "",
      nom: "",
      poCode: 0,
      prenom: "",
      raisonSociale: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // ...

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
        <Typography variant={"h2"}>Contact</Typography>
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="prénom contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Typography variant={"h2"}>Adresse</Typography>
        <FormField
          control={form.control}
          name="addressName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rue</FormLabel>
              <FormControl>
                <Input placeholder="rue voie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro</FormLabel>
              <FormControl>
                <Input placeholder="numéro adresse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input placeholder="Code postal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
