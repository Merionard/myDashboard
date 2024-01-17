import { CustomTextField } from "@/components/ui/CutomMaterialTextField";
import { Button } from "@/components/ui/button";
import { NumericFormatCustom } from "@/components/ui/numericFormatInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceTypes, VatRates } from "@/src/enums";
import { MenuItem } from "@mui/material";
import { Copy, X } from "lucide-react";
import { ChangeEvent } from "react";
import { InvoiceLine } from "../invoiceSchema";

type Props = {
  line: InvoiceLine;
  onChangeLineCallBack: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ihmId: string
  ) => void;
  deleteLine: (ihmId: string, id: number | null | undefined) => void;
  duplicateLine: (ihmId: string) => void;
  onSelectType: (
    ihmId: string,
    type: "Acompte" | "Heures" | "Jours" | "Produit" | "Service"
  ) => void;
};

export const InvoiceLineForm = ({
  line,
  onChangeLineCallBack,
  deleteLine,
  duplicateLine,
  onSelectType,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 border-l p-4 mb-2">
      <div className="flex justify-between">
        <Select
          onValueChange={(
            value: "Acompte" | "Heures" | "Jours" | "Produit" | "Service"
          ) => onSelectType(line.ihmId, value)}
          value={line.type}
        >
          <SelectTrigger className="w-1/5 my-2">
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
        </Select>
        <div className="space-y-2">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="border rounded-full p-1 hover:bg-slate-200">
                  <X onClick={() => deleteLine(line.ihmId, line.id)} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Supprimer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="border rounded-full p-1 hover:bg-slate-200">
                <Copy onClick={() => duplicateLine(line.ihmId)} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Dupliquer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
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

      <Textarea className="w-4/5" placeholder="Description" />
    </div>
  );
};
