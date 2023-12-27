"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Loader2, Search } from "lucide-react";
import { useQuery } from "react-query";
import { CustomerFromApi, fetchCustomers } from "./apiGouvCustomer";
import { useRef } from "react";
import { Etablissement } from "./customerSchemaAndTypes";

function useSearchCustomer(searchValue: string) {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["customers", searchValue], () => fetchCustomers(searchValue));
  console.log(customers);
  return { customers, isLoading, isError };
}

function useDebounce<T>(callBack: (...args: [T]) => void, time: number) {
  const debounce = useRef<null | NodeJS.Timeout>(null);

  return (...args: [T]) => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => callBack(...args), time);
  };
}

export function CustomerComboBox(props: {
  callbackOnSelectEtablissement: (etablissement: Etablissement) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const majSearchValue = useDebounce((val: string) => setSearchValue(val), 500);
  const { customers, isError, isLoading } = useSearchCustomer(searchValue);
  console.log(value);

  const getValueLabel = () => {
    if (value === "") {
      return isLoading ? (
        <>
          Rechercher un client
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>
          <Search />
          Rechercher un client
        </>
      );
    }
    return value.toLocaleUpperCase();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between"
        >
          {getValueLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
            onValueChange={majSearchValue}
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {customers
              ?.flatMap((customer) =>
                customer.matching_etablissements.map((etablissement) => ({
                  ...etablissement,
                  siren: customer.siren,
                  nom_complet: customer.nom_complet,
                }))
              )
              .map((etablissement, id) => (
                <CommandItem
                  key={id}
                  value={etablissement.nom_complet + "_" + etablissement.siret}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    props.callbackOnSelectEtablissement(etablissement);
                  }}
                >
                  {etablissement.nom_complet + " " + etablissement.adresse}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === etablissement.nom_complet
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
