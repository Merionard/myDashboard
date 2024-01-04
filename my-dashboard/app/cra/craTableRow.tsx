import { TableCell, TableRow } from "@/components/ui/table";
import CustomerComboBox from "./customerComboBox";
import { Customer, WorkPeriodLine } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { client } from "@/src/fetchClient";
import { useMutation, useQueryClient } from "react-query";
import { createWorkDay, deleteWorkDay } from "./craAction";
import { toast } from "sonner";

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
        {} as WorkPeriodLine
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const updateSelectedCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    workPeriodLineMutation.mutate({ ...workLine, customerId: customer.id });
  };

  const addOrRemoveWorkDay = async (date: Date, workPeriodLineId: number) => {
    console.log(date);
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
      <TableCell className="border p-2 min-w-[200px] h-12">
        <CustomerComboBox
          customers={customers}
          customer={selectedCustomer}
          onSelectCustomer={updateSelectedCustomer}
        />
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
