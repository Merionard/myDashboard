"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Invoice } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Euro, Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteInvoice, payInvoice, validateInvoice } from "./invoiceAction";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

export const columnsInvoice: ColumnDef<Invoice>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "totalTTC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total TTC
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      const totalTTC = row.getValue("totalTTC") as string;
      return <div className="text-right">{totalTTC}€</div>;
    },
  },
  {
    accessorKey: "statut",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Statut
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      const statut = row.getValue("statut") as string;
      return <div className="text-center">{statut}</div>;
    },
  },

  {
    accessorKey: "validateAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date validation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const validatedAt = row.getValue("validateAt") as Date;
      const formatedDate = validatedAt
        ? validatedAt.toLocaleDateString("fr")
        : null;
      return <div className="text-center">{formatedDate}</div>;
    },
  },
  {
    accessorKey: "payedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date paiement
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const payedAt = row.getValue("payedAt") as Date;
      const formatedDate = payedAt ? payedAt.toLocaleDateString("fr") : null;
      return <div className="text-center">{formatedDate}</div>;
    },
  },
  {
    id: "Actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return <Actions invoice={row.original} />;
    },
  },
];

const Actions = (props: { invoice: Invoice }) => {
  const router = useRouter();

  const editAction = (
    <Link href={`/invoice/edit/${props.invoice.id}`}>
      <Button size={"icon"} title="Editer" className="bg-orange-500">
        <Pencil size={16} />
      </Button>
    </Link>
  );

  const showAction = (
    <Link href={`/invoice/view/${props.invoice.id}`}>
      <Button size={"icon"} title="show">
        <Eye />
      </Button>
    </Link>
  );

  let actions = null;

  if (props.invoice.statut === "DRAFT") {
    actions = (
      <>
        {editAction}
        {showAction}
        <DeleteAction invoiceId={props.invoice.id} router={router} />
        <ValidateAction invoiceId={props.invoice.id} router={router} />
      </>
    );
  }
  if (props.invoice.statut === "VALIDATED") {
    actions = (
      <>
        {showAction}
        <PayAction invoiceId={props.invoice.id} router={router} />
      </>
    );
  }

  if (props.invoice.statut === "PAYED") {
    actions = <>{showAction}</>;
  }

  return <div className="flex gap-2">{actions}</div>;
};

const DeleteAction = (props: {
  invoiceId: number;
  router: AppRouterInstance;
}) => {
  async function onConfirmDelete() {
    const deletedInvoice = await deleteInvoice(props.invoiceId);
    if (deletedInvoice) {
      toast.success("la facture " + deletedInvoice.number + " a été supprimée");
      props.router.refresh();
    } else {
      toast.error("une erreur est survenue");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"} title="Supprimer">
          <Trash2 size={"16"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est définitive. Confirmer la suppression de cette
            facture?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ValidateAction = (props: {
  invoiceId: number;
  router: AppRouterInstance;
}) => {
  async function onConfirmValidate() {
    const validatedInvoice = await validateInvoice(props.invoiceId);
    if (validatedInvoice) {
      toast.success("la facture " + validatedInvoice.number + " a été validée");
      props.router.refresh();
    } else {
      toast.error("une erreur est survenue");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500" size={"icon"}>
          <Check />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Après validation, cette facture ne pourra plus étre modifiée
            confirmez vous?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmValidate}>
            Valider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const PayAction = (props: { invoiceId: number; router: AppRouterInstance }) => {
  const [payDate, setPayDate] = useState<Date | undefined>(new Date());

  async function onConfirmPay() {
    if (!payDate) {
      alert("Veuillez sélectionner une date de paiement!");
      return;
    }
    const payedInvoice = await payInvoice(props.invoiceId, payDate);
    if (payedInvoice) {
      toast.success("la facture " + payedInvoice.number + " a été payée");
      props.router.refresh();
    } else {
      toast.error("une erreur est survenue");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-500" size={"icon"}>
          <Euro />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Veuillez sélectionner la date de paiement
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto">
            <Calendar
              mode="single"
              selected={payDate}
              onSelect={setPayDate}
              className="rounded-md border"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmPay}>
            Marqué comme payé le {payDate?.toLocaleDateString()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
