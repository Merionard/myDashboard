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
import { cn } from "@/lib/utils";
import { Customer } from "@prisma/client";
import { Check, Search } from "lucide-react";
import { useState } from "react";

export default function CustomerComboBox(props: {
  customers: Customer[];
  customer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.customer?.businessName);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between max-h-9"
        >
          {(
            <>
              <Search />
              {value}
            </>
          ) ?? (
            <>
              <Search /> Selectionnez un client...
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {props.customers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={customer.businessName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  props.onSelectCustomer(customer);
                }}
              >
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === customer.businessName
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {customer.businessName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
