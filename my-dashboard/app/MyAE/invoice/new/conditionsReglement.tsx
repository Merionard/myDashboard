import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ConditionsReglement,
  ConditionsReglementType,
  ModeReglement,
  ModeReglementType,
} from "@/src/enums";
import { Invoice } from "../invoiceSchema";
import { Typography } from "@/components/ui/Typography";

type Props = {
  updateInvoiceConditionReg: (condition: ConditionsReglementType) => void;
  updateInvoiceModeReg: (mode: ModeReglementType) => void;
  invoice: Invoice;
};
export default function Conditions({
  updateInvoiceConditionReg,
  updateInvoiceModeReg,
  invoice,
}: Props) {
  return (
    <div className="space-y-2">
      <Typography variant={"h3"}>Réglement</Typography>
      <Select
        onValueChange={(value: ConditionsReglementType) =>
          updateInvoiceConditionReg(value)
        }
        value={invoice.conditionReglement}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner condition règlement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ConditionsReglement.map((cond, index) => (
              <SelectItem key={index} value={cond}>
                {cond}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value: ModeReglementType) =>
          updateInvoiceModeReg(value)
        }
        value={invoice.modeReglement}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Sélectionner mode règlement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ModeReglement.map((mode, index) => (
              <SelectItem key={index} value={mode}>
                {mode}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
