import { TableCell, TableRow } from "@/components/ui/table";
import CustomerComboBox from "./customerComboBox";
import { Customer, WorkPeriodLine } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { client } from "@/src/fetchClient";
import { useMutation, useQueryClient } from "react-query";
import { createWorkDay, deleteWorkDay } from "./craAction";
import { toast } from "sonner";
import { Typography } from "@/components/ui/Typography";

type Props = {
  workLine: {
    workDays: {
      id: number;
      date: Date;
      workPeriodLineId: number;
    }[];
  } & {
    id: number;
    customerId: number;
    workPeriodId: number;
    nbDaysWorked: number;
  };
  customers: Customer[];
  datesOfCurrentMonth: Array<Date>;
  year: number;
  month: number;
};

export default function CraTableRow({
  customers,
  datesOfCurrentMonth,
  workLine,
  year,
  month,
}: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState(
    customers.find((c) => c.id === workLine.customerId) ?? customers[0]
  );
  const isWeekEnd = (date: Date) => {
    return date.getDay() === 6 || date.getDay() === 0;
  };

  const isDayWorked = (
    date: Date,
    workDays: {
      id: number;
      date: Date;
      workPeriodLineId: number;
    }[]
  ) => {
    return workDays.some(
      (w) =>
        w.date.getDate() === date.getDate() &&
        w.date.getMonth() === date.getMonth() &&
        w.date.getFullYear() === date.getFullYear()
    );
  };

  const queryClient = useQueryClient();
  const workPeriodLineMutation = useMutation({
    mutationFn: (workPeriodLine: WorkPeriodLine) =>
      client(
        "/api/workPeriodLine",
        "POST",
        workPeriodLine,
        {} as Omit<WorkPeriodLine, "">
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const updateSelectedCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    const lineToUpdate = {
      ...workLine,
      customerId: customer.id,
      workDays: undefined,
    };
    workPeriodLineMutation.mutate(lineToUpdate);
  };

  const addOrRemoveWorkDay = async (date: Date, workPeriodLineId: number) => {
    if (!isDayWorked(date, workLine.workDays)) {
      const workDay = await createWorkDay(date, workPeriodLineId);
      if (workDay) {
        toast.success("Jour travaillé ajouté avec succès");
        queryClient.invalidateQueries(["workPeriod", year, month]);
      } else {
        toast.error("une erreur est survenue");
      }
    } else {
      const workDayToDelete = workLine.workDays.find(
        (w) =>
          w.date.getDate() === date.getDate() &&
          w.date.getMonth() === date.getMonth() &&
          w.date.getFullYear() === date.getFullYear()
      );
      if (workDayToDelete) {
        const workDay = await deleteWorkDay(workDayToDelete);
        if (workDay) {
          toast.success("Suppression effectuée avec succès!");
          queryClient.invalidateQueries(["workPeriod", year, month]);
        } else {
          toast.error("une erreur est survenue");
        }
      }
    }
  };

  return (
    <TableRow key={workLine.id}>
      <TableCell className="border p-3 min-w-[300px] h-12">
        <div className="flex flex-col gap-2">
          <CustomerComboBox
            customers={customers}
            customer={selectedCustomer}
            onSelectCustomer={updateSelectedCustomer}
          />
          <div className="flex gap-2">
            <Typography variant={"muted"}>Nb jour travaillés:</Typography>
            <span className="font-bold">{workLine.workDays.length}</span>
          </div>
        </div>
      </TableCell>
      {datesOfCurrentMonth.map((date) => (
        <TableCell
          key={date.toDateString()}
          className={clsx("border p-1", {
            "bg-gray-500": isWeekEnd(date),
            "cursor-pointer": !isWeekEnd(date),
            "bg-blue-500": isDayWorked(date, workLine.workDays),
          })}
          onDoubleClick={() => addOrRemoveWorkDay(date, workLine.id)}
        >
          {}
        </TableCell>
      ))}
    </TableRow>
  );
}
