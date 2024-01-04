import { TableCell, TableRow } from "@/components/ui/table";
import CustomerComboBox from "./customerComboBox";
import { Customer, WorkPeriodLine } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { client } from "@/src/fetchClient";
import { useMutation, useQueryClient } from "react-query";
import { createWorkDay } from "./craAction";
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

  const test = async (date: Date, workPeriodLineId: number) => {
    const workDay = await createWorkDay(date, workPeriodLineId);
    if (workDay) {
      toast.success("gg");
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
          })}
          onDoubleClick={() => test(date, workLine.id)}
        >
          {}
        </TableCell>
      ))}
    </TableRow>
  );
}
