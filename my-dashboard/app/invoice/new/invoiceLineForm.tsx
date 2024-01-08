import { CustomTextField } from "@/components/ui/CutomMaterialTextField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceTypes } from "@/src/enums";
import TextField from "@mui/material/TextField";
import { InvoiceLine } from "../invoiceSchema";
import { ChangeEvent } from "react";

type Props = {
  line: InvoiceLine;
  onChangeLineCallBack: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ihmId: string
  ) => void;
};

export const InvoiceLineForm = ({ line, onChangeLineCallBack }: Props) => {
  return (
    <div>
      <Label>Type</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner type de prestation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ServiceTypes.map((type, index) => (
              <SelectItem key={index} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
        <div className="flex gap-3">
          <CustomTextField
            name="quantity"
            label="Quantité"
            variant="standard"
            type="number"
            onChange={(e) => onChangeLineCallBack(e, line.ihmId)}
            value={line.quantity}
          />
          <CustomTextField
            name="unitPrice"
            label="Prix HT"
            variant="standard"
            type="number"
            onChange={(e) => alert(e.target)}
          />
          <CustomTextField
            name="vatRate"
            label="Taux tva"
            variant="standard"
            type="number"
            onChange={(e) => alert(e.target)}
          />
          <CustomTextField
            name="totalHT"
            label="Total HT"
            variant="standard"
            type="number"
            onChange={(e) => alert(e.target)}
          />
          <CustomTextField
            name="totalTTC"
            label="Total TTC"
            variant="standard"
            type="number"
            onChange={(e) => alert(e.target)}
          />
        </div>
      </Select>
    </div>
  );
};
