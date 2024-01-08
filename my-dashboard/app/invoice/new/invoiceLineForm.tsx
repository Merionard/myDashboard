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
import { ServiceTypes, VatRates } from "@/src/enums";
import TextField from "@mui/material/TextField";
import { InvoiceLine } from "../invoiceSchema";
import { ChangeEvent } from "react";
import { MenuItem } from "@mui/material";
import { NumericFormatCustom } from "@/components/ui/numericFormatInput";

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
            style={{ flex: "1 0 0" }}
            type="number"
            onChange={(e) => onChangeLineCallBack(e, line.ihmId)}
            value={line.quantity}
            inputProps={{ style: { textAlign: "right" } }}
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <CustomTextField
            name="unitPrice"
            label="Prix HT"
            variant="standard"
            style={{ flex: "1 0 0" }}
            onChange={(e) => onChangeLineCallBack(e, line.ihmId)}
            value={line.unitPrice}
            InputProps={{
              inputComponent: NumericFormatCustom as any,
              style: { textAlign: "right" },
            }}
          />
          <CustomTextField
            label="Taux TVA"
            select
            variant="standard"
            style={{ flex: "1 0 0" }}
            value={line.vatRate}
            name={"vatRate"}
            onChange={(e) => onChangeLineCallBack(e, line.ihmId)}
          >
            {VatRates.map((rate) => (
              <MenuItem key={rate} value={rate}>
                {rate}%
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            name="totalHT"
            label="Total HT"
            variant="standard"
            style={{ flex: "1 0 0" }}
            value={`${line.totalHT.toFixed(2)} €`}
            inputProps={{ style: { textAlign: "right" } }}
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <CustomTextField
            name="totalTTC"
            label="Total TTC"
            variant="standard"
            style={{ flex: "1 0 0" }}
            inputProps={{ style: { textAlign: "right" } }}
            InputProps={{
              style: { textAlign: "right" },
            }}
            value={`${line.totalTTC} €`}
          />
        </div>
      </Select>
    </div>
  );
};
