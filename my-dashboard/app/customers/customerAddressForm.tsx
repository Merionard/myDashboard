import { Typography } from "@/components/ui/Typography";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customerSchema } from "./customerSchemaAndTypes";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

type props = {
  form: UseFormReturn<z.infer<typeof customerSchema>>;
};

export function CustomerAddressForm({ form }: props) {
  return (
    <>
      <Typography variant={"h2"}>Adresse</Typography>
      <FormField
        control={form.control}
        name="address.siret"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro Siret</FormLabel>
            <FormControl>
              <Input placeholder="Siret" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.addressName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input placeholder="rue voie" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.addressNumber"
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
        name="address.poCode"
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
      <FormField
        control={form.control}
        name="address.country"
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
    </>
  );
}
