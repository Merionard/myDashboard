"use client";

import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { TypeActiviteEnums, userSchema } from "./userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { editUser } from "./userAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const UserForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      email: user.email,
      image: user.image != null ? user.image : "undefined",
      name: user.name != null ? user.name : undefined,
      typeActivite: user.typeActivite != null ? user.typeActivite : undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof userSchema>) {
    const { data, serverError } = await editUser(values);
    if (data) {
      router.push("/home");
      router.refresh();
      toast.success("Maj effectuée avec succès!");
    } else if (serverError) {
      toast.error(serverError);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeActivite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type activité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choissisez un type d'activité pour votre entreprise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TypeActiviteEnums.map((type, index) => (
                    <SelectItem value={type.type} key={index}>
                      {type.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
};
