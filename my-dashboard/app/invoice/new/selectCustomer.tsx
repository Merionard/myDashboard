import { Typography } from "@/components/ui/Typography";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { CustomerWithAddressAndContact } from "../page";
import { cn } from "@/lib/utils";

type Props = {
  customers: CustomerWithAddressAndContact[];
  selectedCustomer: CustomerWithAddressAndContact | null;
  onSelectCustomer: (c: CustomerWithAddressAndContact) => void;
};

export default function SelectCustomer({
  customers,
  onSelectCustomer,
  selectedCustomer,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <Typography variant={"h3"}>Destinataire</Typography>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[200px] justify-between my-2"
          >
            {value != "" ? value : "Sélectionner un destinataire..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandEmpty>Aucun client trouvé</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.businessName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelectCustomer(customer);
                  }}
                >
                  {customer.businessName}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === customer.businessName
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
      <div className="flex gap-5">
        <div>
          <p className="h-6 min-h-6">Société:</p>
          <p className="h-6 min-h-6">Nom:</p>
          <p className="h-6 min-h-6">Adresse</p>
          <p className="h-6 min-h-6">Pays:</p>
          <p className="h-6 min-h-6">Numéro d entreprise:</p>
          <p className="h-6 min-h-6">Numéro de TVA:</p>
          <p className="h-6 min-h-6">Adresse email:</p>
        </div>
        <div className="">
          <p className="h-6 min-h-6">{selectedCustomer?.businessName}</p>
          <p className="h-6 min-h-6">{selectedCustomer?.contact?.firstName}</p>
          <p className="h-6 min-h-6">
            {selectedCustomer?.address[0].addressName}
          </p>
          <p className="h-6 min-h-6">{selectedCustomer?.address[0].country}</p>
          <p className="h-6 min-h-6">{selectedCustomer?.siren}</p>
          <p className="h-6 min-h-6">{selectedCustomer?.siren}</p>
          <p className="h-6 min-h-6">{selectedCustomer?.contact?.email}</p>
        </div>
      </div>
    </div>
  );
}
